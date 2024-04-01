<template>
    <div class="sidebar-item-rectangle" :style="itemStyle" @click="itemClick" v-if="type==='rectangle'">
        <div class="sidebar-item-icon">
            <slot name="icon"></slot>
        </div>
        <slot name="title">
        </slot>
    </div>
    <div class="sidebar-item-square" :style="itemStyle" @click="itemClick" v-else-if="type==='square'">
        <div class="sidebar-item-icon">
            <slot name="icon">
            </slot>
        </div>
        <span>
            <slot name="title">
            </slot>
        </span>
    </div>
    <div class="sidebar-item-square" :style="itemStyle" @click="backToTop" v-else-if="type==='backToTop'">
        <div class="sidebar-item-icon">
            <slot name="icon">
                <svg width="24" height="8" xmlns="http://www.w3.org/2000/svg">
                    <path class="fill"
                        d="M11.8214 0.626818C12.2046 0.272889 12.7954 0.27289 13.1786 0.626819L17.1175 4.26545C17.786 4.88302 17.3491 6 16.4389 6H8.56107C7.65094 6 7.21398 4.88302 7.88252 4.26545L11.8214 0.626818Z">
                    </path>
                </svg>
            </slot>
        </div>
        <span>
            <slot name="title">
                顶部
            </slot>
        </span>
    </div>
</template>

<script>
export default {
    name: 'SideBarItem',
    props: {
        type: {
            type: String,
            default: 'rectangle'
        },
        itemStyle: {
            type: Object
        }
    },
    emits: ['click'],
    methods: {
        backToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },
        itemClick() {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
.sidebar-item-rectangle,
.sidebar-item-square {
    width: 100%;
    border: 1px solid #E3E5E7;
    background-color: var(--background-color);
    border-radius: 6px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0 6px 0;
    color: var(--color);
    transition: .3s;
    user-select: none;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }

    &:hover {
        background-color: var(--active-background-color);
        color: var(--active-color);

        .fill {
            fill: var(--active-color);
        }
    }

    .fill {
        fill: var(--color);
        transition: .3s;
    }

    .sidebar-item-icon {
        height: 24px;
        margin-bottom: 2px;

        i {
            font-size: 26px;
            font-weight: 500;
        }
    }

    span {
        font-size: 12px;
        letter-spacing: 1px;
        line-height: 14px;
    }
}

.sidebar-item-square {
    padding: 8px 0;

    .sidebar-item-icon {
        display: flex;
        align-items: center;
        height: 8px;
    }
}
</style>