<template>
    <div :class="{ 'anthology-item-row': true, active }" @click="clickEvent" v-if="arrangement" ref="item">
        <div class="an-item-left">
            <div class="playing-icon" v-if="active">
                <img src="@/assets/images/video/playing.gif" alt="">
            </div>
            <div class="item-index">
                {{ `P${i}` }}
            </div>
            <div class="item-title" :title="title">
                {{ title }}
            </div>
        </div>
        <div class="an-item-right">
            04:20
        </div>
    </div>
    <div :class="{ 'anthology-item-grid': true, active }" @click="clickEvent" v-else-if="!arrangement">
        {{ i }}
    </div>
</template>

<script>
export default {
    name: 'AnthologyItem',
    emits: ['click'],
    props: {
        index: {
            type: [String, Number, Object],
        },
        title: {
            type: [String, Number],
        }
    },
    data() {
        return {
            arrangement: true,
            active: false,
            tran: false,
            i: this.index
        }
    },
    watch: {
        arrangement(val) {
            if (!val) {
                setImmediate(() => {
                    this.tran = true
                })
            } else {
                this.tran = false
            }
        },
        active: {
            immediate: true,
            handler(val) {
                if (val) {
                    // const center = this.$refs.item?.parentElement.clientHeight / 2
                    // const top = this.$refs.item.offsetTop - center + this.$refs.item.offsetHeight / 2 + 5
                    const top = (this.$refs.item.offsetTop + 10) - (this.$refs.item.offsetHeight + 10) * 3
                    this.$refs.item?.parentElement.scrollTo({ behavior: 'smooth', top: top })
                }
            }
        }
    },
    methods: {
        clickEvent() {
            this.$emit('click')
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.anthology-item-row {

    height: 30px;
    margin: 5px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    border-radius: 4px;
    font-size: 13px;
    cursor: pointer;
    transition-property: border, color;
    transition-duration: .3s;

    &:hover {
        background-color: white;
    }

    .an-item-left {
        display: flex;
        align-items: center;
        color: #18191c;
        overflow: hidden;

        .playing-icon {
            width: 14px;
            height: 14px;
            margin-right: 5px;
            flex-shrink: 0;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .item-index {
            margin-right: 10px;
            flex-shrink: 0;
        }

        .item-title {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            margin-right: 4px;
        }
    }

    .an-item-right {
        flex-shrink: 0;
        color: #9499A0;
        letter-spacing: 1px;
    }

}

.anthology-item-row.active {
    background-color: white;
}

.anthology-item-grid {
    margin-right: 7px;
    margin-bottom: 8px;
    width: 75px;
    height: 36px;
    border-radius: 6px;
    box-sizing: border-box;
    border: 1px solid #E3E5E7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    cursor: pointer;
    // transition-property: border, color;
    // transition-duration: .3s;

    &:hover {
        color: #00AEEC;
        border: 1px solid #00AEEC;
    }
}

.anthology-item-grid.active {
    background-color: #00AEEC;
    color: white;
    border: 1px solid #00AEEC;

    &:hover {
        color: white;
    }
}

.tran {
    transition: .3s;
}
</style>