<template>
    <div class="anthology">
        <div class="an-head">
            <div class="h-left">
                <div class="an-title">
                    <span class="title">
                        {{ title }}
                    </span>
                    <span class="an-num">
                        {{ `(${activeIndex}/${itemLength})` }}
                    </span>
                </div>
                <div class="an-icon" @click="arrangement = !arrangement">
                    <i
                        :class="{ 'iconfont': true, 'icon-liebiao': arrangement, 'icon-icon_category': !arrangement }"></i>
                </div>
            </div>
            <div class="h-right">
                <SwitchButton v-model="next" :text="'自动连播'"></SwitchButton>
            </div>
        </div>
        <div :class="{ 'an-item-list': true, 'grid': !arrangement }" @click="activeChange">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import SwitchButton from '@/components/Common/Button/SwitchButton'

export default {
    name: 'Anthology',
    components: { SwitchButton },
    emits: ['activeChange'],
    props: {
        title: {
            type: String,
            default: '视频选集'
        },
        defauleActiveIndex: {
            type: [String, Number],
            default: 1
        },
    },
    data() {
        return {
            arrangement: true,
            activeIndex: this.defauleActiveIndex,
            itemLength: 1
        }
    },
    computed: {
        next: {
            get() {
                return this.$store.state.custom.next
            },
            set(val) {
                this.$store.dispatch('custom/setNext', val)
            }
        }
    },
    watch: {
        arrangement(val) {
            this.$children.forEach((item, index) => {
                if (index === 0) return
                item.arrangement = val
            })
        },
        defauleActiveIndex(val) {
            this.activeIndex = val
        },
        activeIndex: {
            handler(val) {
                if (this.$children.length === 0) return
                this.$children.forEach((item, index) => {
                    if (index === 0) return
                    if (this.activeIndex == item.i) {
                        item.active = true
                        this.$emit('activeChange', index)
                    } else {
                        item.active = false
                    }
                })
            }
        },
        $children: {
            immediate: true,
            handler() {
                this.$nextTick(() => {
                    this.itemLength = this.$children.length - 1
                    this.$children.forEach((item, index) => {
                        if (index === 0) return
                        if (!item.i) {
                            item.i = index
                        }
                        if (this.activeIndex == item.i) {
                            item.active = true
                        } else {
                            item.active = false
                        }
                    })
                })
            }
        }
    },
    methods: {
        activeChange(event) {
            this.$children.forEach((item, index) => {
                if (index === 0) return
                if (item.$el.contains(event.target)) {
                    this.activeIndex = item.i
                }
            })
        },
        setActiveIndex(val) {
            this.$emit('update:activeIndex', val)
        }
    },
    beforeCreate() {
        this.$store.dispatch('cache/add', 'VideoPage')
        this.$store.dispatch('cache/add', 'Anthology')
        this.$store.dispatch('cache/add', 'AnthologyItem')
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.anthology {
    // max-height: 386px;
    padding-top: 14px;
    padding-bottom: 4px;
    border-radius: 6px;
    background-color: #F1F2F3;

    .an-head {
        display: flex;
        justify-content: space-between;
        padding: 0 14px;

        .h-left {

            display: flex;

            .title {
                font-size: 15px;
                color: #18191c;
            }

            .an-num {
                font-size: 13px;
                color: #9499A0;
                // margin-left: 2px;
            }

            .an-icon {
                margin-left: 10px;
                color: #757575;
                cursor: pointer;

                &:hover {
                    color: #00AEEC;
                }

                i {
                    font-size: 14px;
                }
            }
        }
    }

    .an-item-list {
        position: relative;
        max-height: 286px;
        padding: 0 6px;
        overflow-y: hidden;
        // overflow-y: auto;
        // overflow-y: overlay;
        // scrollbar-width: none;
        // -ms-overflow-style: none;
        // overflow: -moz-scrollbars-none;
        // overflow-y: auto;

        &:hover {
            overflow-y: auto;
            overflow-y: overlay;
        }

        // &:hover::-webkit-scrollbar {
        //     display: block;
        // }

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #9499A0;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-track {
            // background-color: white;            
        }

    }

    .grid {
        max-height: 270px;
        margin-top: 12px;
        padding-left: 14px;
        padding-right: 6px;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>