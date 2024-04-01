<template>
    <transition name="side-bar">
        <div class="sidebar-min" :style="sideBarStyle" v-show="visible">
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'SideBar',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        color: {
            type: String,
            default: '#18191c'
        },
        activeColor: {
            type: String,
            default: 'white'
        },
        backgroundColor: {
            type: String,
            default: 'white'
        },
        activeBackgroundColor: {
            type: String,
            default: '#00AEEC'
        }
    },
    computed: {
        sideBarStyle() {
            return {
                '--color': this.color,
                '--active-color': this.activeColor,
                '--background-color': this.backgroundColor,
                '--active-background-color': this.activeBackgroundColor
            }

        }
    },
    methods: {

    }
}
</script>

<style lang="scss">
.sidebar-min {
    position: fixed;
    bottom: 60px;
    right: 8px;
    width: 38px;
    transition: .2s;
    // border: 1px solid red;
    --color: '#18191c';
    --active-color: 'white';
    --background-color: 'white';
    --active-background-color: '#00AEEC';

    // .sidebar-item-rectangle,
    // .sidebar-item-square {

    //     // --color: '#18191C';

    //     width: 100%;
    //     border: 1px solid #E3E5E7;
    //     background-color: var(--background-color);
    //     border-radius: 6px;
    //     margin-bottom: 12px;
    //     display: flex;
    //     flex-direction: column;
    //     align-items: center;
    //     padding: 8px 0 6px 0;
    //     color: var(--color);
    //     transition: .3s;
    //     cursor: pointer;

    //     &:last-child {
    //         margin-bottom: 0;
    //     }

    //     &:hover {
    //         background-color: var(--active-background-color);
    //         color: var(--active-color);

    //         .fill {
    //             fill: var(--active-color);
    //         }
    //     }

    //     .fill {
    //         fill: var(--color);
    //         transition: .3s;
    //     }

    //     .sidebar-item-icon {
    //         height: 24px;
    //         margin-bottom: 2px;
    //     }

    //     span {
    //         font-size: 12px;
    //         letter-spacing: 1px;
    //         line-height: 14px;
    //     }
    // }

    // .sidebar-item-square {
    //     padding: 8px 0;

    //     .sidebar-item-icon {
    //         display: flex;
    //         align-items: center;
    //         height: 8px;
    //     }
    // }
}

.side-bar-enter,
.side-bar-leave-to {
    right: -42px;
}

.side-bar-enter-to,
.side-bar-leave {
    right: 6px;
}
</style>