<template>
    <transition name="dialog">
        <!-- <div :class="{ 'dialog-container': true, mask }" :style="dialogContainerStyle" @click="maskCilckDialogClose"
            @mousemove.stop v-if="visible" ref="dialogBg"> -->
        <div :class="{ 'dialog-container': true, mask }" :style="dialogContainerStyle" @click="maskCilckDialogClose"
             v-if="visible" ref="dialogBg">
            <div class="dialog-box" :style="dialogBoxStyle">
                <div class="dialog-head" v-if="head" ref="head">
                    <slot name="title">
                        <div class="dialog-title" v-if="title">
                            <span>{{ title }}</span>
                        </div>
                    </slot>
                </div>
                <div class="dialog-close" @click="dialogClose" v-if="showClose">
                    <i class="iconfont icon-guanbi"></i>
                </div>
                <div class="dialog-body">
                    <slot></slot>
                </div>
                <div class="dialog-foot" v-if="foot" ref="foot">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>

export default {
    name: 'Dialog',
    props: {
        width: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        },
        position: {
            type: String,
            default: 'fixed'
        },
        padding: {
            type: String,
            default: ''
        },
        top: {
            type: String,
            default: ''
        },
        left: {
            type: String,
            default: ''
        },
        right: {
            type: String,
            default: ''
        },
        bottom: {
            type: String,
            default: ''
        },
        visible: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
            default: ''
        },
        lockScroll: {
            type: Boolean,
            default: false
        },
        mask: {
            type: Boolean,
            default: true
        },
        maskCloseDialog: {
            type: Boolean,
            default: true
        },
        backgroundColor: {
            type: String,
            default: ''
        },
        filter: {
            type: String,
            default: ''
        },
        beforeClose: Function,
        showClose: {
            type: Boolean,
            default: true
        }
    },
    emits: ['close', 'open'],
    data() {
        return {
            dialogBoxStyle: {
                width: this.width,
                height: this.height,
                // position: this.position,
                padding: this.padding,
                top: this.top,
                left: this.left,
                right: this.right,
                bottom: this.bottom,
                backgroundColor: this.backgroundColor,
                backdropFilter: this.filter
            },
            dialogContainerStyle: {
                position: this.position,
            },
            foot: true,
            head: true
        }
    },
    watch: {
        visible: {
            // immediate: true,
            handler(val) {
                if (val) {
                    if (this.lockScroll) {
                        document.documentElement.classList.add('overflow-hidden')
                        document.body.classList.add('overflow-hidden')
                    }
                    if (this.foot) {
                        this.footerInit()
                    }
                    if (this.head) {
                        this.headerInit()
                    }
                    this.$emit('open')
                } else {
                    if (this.lockScroll) {
                        document.documentElement.classList.remove('overflow-hidden')
                        document.body.classList.remove('overflow-hidden')
                    }
                    this.$emit('close')
                }
            }
        }
    },
    methods: {
        dialogClose() {
            if (this.beforeClose) {
                new Promise((resolve, reject) => {
                    this.beforeClose(resolve)
                }).then(res => {
                    this.$emit('update:visible', false)
                })
            } else {
                this.$emit('update:visible', false)
            }
        },
        maskCilckDialogClose(e) {
            if (this.maskCloseDialog && e.target === this.$refs.dialogBg) {
                this.dialogClose()
            }
        },
        footerInit() {
            this.$nextTick(() => {
                if (!this.$refs.foot.children.length) {
                    this.foot = false
                }
            })
        },
        headerInit() {
            this.$nextTick(() => {
                if (!this.$refs.head.children.length) {
                    this.head = false
                }
            })
        }
    },
    mounted() {

    }
}
</script>

<style lang="scss" scoped>
.dialog-container {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    box-sizing: border-box;
    pointer-events: none;
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
    transition: .4s;
    overflow: auto;
    overflow: overlay;

    .dialog-box {
        position: absolute;
        min-width: 80px;
        min-height: 45px;
        border-radius: 8px;
        background-color: white;
        box-sizing: border-box;
        pointer-events: auto;
        user-select: none;
        box-shadow: 0 0 8px rgba(0, 0, 0, .2);
        display: flex;
        flex-direction: column;


        .dialog-head {
            flex-shrink: 0;
            padding: 15px 16px 10px 16px;
            display: flex;
            justify-content: space-between;

            .dialog-title {
                font-size: 17px;
                color: #18191c;
            }
        }

        .dialog-close {
            position: absolute;
            top: 15px;
            right: 16px;
            z-index: 1;
            flex-shrink: 0;

            i {
                font-size: 18px;
                font-weight: bold;
                color: #AEB3B9;
                cursor: pointer;

                &:hover {
                    color: #00AEEC;
                }
            }
        }

        .dialog-body {
            flex: 1;
            position: relative;
        }

        .dialog-foot {
            padding: 10px 16px 15px 16px;
        }


    }

    .dialog-mask {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, .5);
        // z-index: 666;
        pointer-events: auto;
    }
}

.mask {
    pointer-events: auto;
    background-color: rgba(0, 0, 0, .5);
}

.dialog-enter,
.dialog-leave-to {
    opacity: 0;
}

.dialog-leave,
.dialog-enter-to {
    opacity: 1;
}
</style>