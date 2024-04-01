<template>
    <transition :name="`animation-${animation}`">
        <div :class="`message-${messageType}`" :style="messageBoxStyle" v-if="msgShow">
            <div class="close-btn" :style="closeBtnStyle" v-if="showClose">
                <i class="iconfont icon-guanbi" @click="closeMessage(true)"></i>
            </div>
            <div v-html="msg">
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Message',
    data() {
        return {
            msg: '这是一条信息',
            messageType: 'common',
            msgShow: false,
            animation: 'top-to-bottom',
            duration: 3000,
            showClose: false,
            zIndex: 1,
            top: '',
            left: '',
            right: '',
            bottom: '',
            position: 'fixed',
            transform: '',
            padding: '',
            closeBtnStyle: {}
        }
    },
    computed: {
        messageBoxStyle() {
            return {
                zIndex: this.zIndex,
                top: this.top + 'px',
                left: this.left + 'px',
                right: this.right + 'px',
                bottom: this.bottom + 'px',
                position: this.position,
                transform: this.transform,
                padding: this.padding
            }
        }
    },
    watch: {
        msgShow(val) {
            if (!val) {
                this.$nextTick(() => {
                    this.$destroy()
                })
            }
        }
    },
    methods: {
        closeMessage(now = false) {
            if (now) {
                this.msgShow = false
                this.close()
            } else {
                this.timer = setTimeout(() => {
                    this.msgShow = false
                    this.close()
                }, this.duration)
            }

        },
        close() {
            if (typeof this.onClose === 'function') {
                this.onClose(this)
            }
        }
    },
    mounted() {
        this.closeMessage()
    },
    beforeDestroy() {
        this.timer && clearTimeout(this.timer)        
    }
}
</script>

<style lang="scss" scoped>
.close-btn {
    cursor: pointer;
    margin-top: 1px;

    i {
        font-size: 16px;
    }

    &:hover {
        opacity: .8;
    }
}

.message-common,
.message-info,
.message-warn,
.message-success,
.message-error {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    flex-shrink: 0;
    display: flex;
    align-items: center;
    padding: 10px 28px;
    letter-spacing: 2px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    transition: all .4s;
}

.message-common {
    background-color: rgba(0, 0, 0, .8);
    color: white;

    .close-btn i {
        font-size: 16px;
    }

}

.message-info {
    color: #909399;
    background-color: #edf2fc;
}

.message-warn {
    color: #e6a23c;
    background-color: #fdf6ec;
}

.message-success {
    color: #67c23a;
    background-color: #f0f9eb;
}

.message-error {
    color: #f56c6c;
    background-color: #fef0f0;
}


//动画 上到下 渐入
.animation-top-to-bottom-enter,
.animation-top-to-bottom-leave-to {
    opacity: 0;
    transform: translate(-50%, -100%);
}

.animation-top-to-bottom-enter-to,
.animation-top-to-bottom-leave {
    opacity: 1;
    transform: translate(-50%, 0);
}

.animation-top-to-bottom-p-enter,
.animation-top-to-bottom-p-leave-to {
    opacity: 0;
    transform: translateY(-100%) !important;
}

.animation-top-to-bottom-p-enter-to,
.animation-top-to-bottom-p-leave {
    opacity: 1;
    transform: translateY(0) !important;
}


//动画 下到上 渐入
.animation-bottom-to-top-enter,
.animation-bottom-to-top-leave-to {
    opacity: 0;
    transform: translate(-50%, 100%);
}

.animation-bottom-to-top-enter-to,
.animation-bottom-to-top-leave {
    opacity: 1;
    transform: translate(-50%, 0);
}

.animation-bottom-to-top-p-enter,
.animation-bottom-to-top-p-leave-to {
    opacity: 0;
    transform: translateY(100%) !important;
}

.animation-bottom-to-top-p-enter-to,
.animation-bottom-to-top-p-leave {
    opacity: 1;
    transform: translateY(0) !important;
}




.animation-gradual-out-in-enter,
.animation-gradual-out-in-leave-to {
    opacity: 0;
}

.animation-gradual-out-in-enter-to,
.animation-gradual-out-in-leave {
    opacity: 1;
}
</style>