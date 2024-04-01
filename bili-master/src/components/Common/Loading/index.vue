<template>
    <transition name="loading">
        <div class="loading-box" :style="loadingBoxStyle" v-if="loadingShow">
            <div class="mask" :style="markStyle" @wheel="preventScroll" v-if="mask"></div>
            <div class="loading-content" :style="contentStyle" @wheel="preventScroll">
                <div class="loading-icon">
                    <div class="icon">
                        <slot name="icon">
                            <div class="icon i-pet" v-if="icon==='pet'"></div>
                            <div class="icon i-circle" v-if="icon==='circle'">
                                <svg viewBox="25 25 50 50">
                                    <circle cx="50" cy="50" r="20"></circle>
                                </svg>
                            </div>
                            <div class="icon i-loading" v-if="icon==='loading'">
                                <i class="iconfont icon-loading"></i>
                            </div>
                        </slot>
                    </div>

                </div>
                <div :class="loadingTextClass" :style="textStyle">
                    <span v-for="(item, index) in text" :key="index" :style="{'--delay': `${0.12 * index}s`}"
                        ref="text">{{ item }}</span>
                </div>
            </div>

        </div>
    </transition>

</template>

<script>
export default {
    name: 'Loading',
    data() {
        return {
            icon: 'pet',
            maskColor: 'rgba(0,0,0,.65)',
            position: 'fixed',
            zIndex: '',
            top: '',
            left: '',
            bottom: '',
            right: '',
            lock: true,
            loadingShow: false,
            mask: true,
            loadingTextClass: ['loading-text'],
            text: '加载中...',
            textAnima: 'none'
        }
    },
    computed: {
        markStyle() {
            return {
                backgroundColor: this.maskColor
            }
        },
        loadingBoxStyle() {
            return {
                position: this.position,
                zIndex: this.zIndex
            }
        },
        textStyle() {
            return {
                color: this.textColor
            }
        },
        contentStyle() {
            return {
                top: this.top + 'px',
                left: this.left + 'px',
                bottom: this.bottom + 'px',
                right: this.right + 'px',
            }
        }
    },
    watch: {
        loadingShow(val) {
            if (!val) {
                this.$nextTick(() => {
                    this.$destroy()
                })
            }
        }
    },
    methods: {
        close() {
            this.loadingShow = false
        },
        preventScroll(event) {
            if (this.lock && this.mask) {
                event.preventDefault();
                event.stopPropagation();
                return
            }
        },
        textAnimaInit() {
            if (!this.textAnima)
                return
            this.loadingTextClass.push(this.textAnima)
        }
    },
    mounted() {
        this.textAnimaInit()
    }
}
</script>

<style lang="scss" scoped>
.loading-box {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    z-index: 100;
    transition: .2s;
    pointer-events: none;

    .mask {
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: .6);
        position: absolute;
        left: 0;
        top: 0;
        pointer-events: auto;
    }

    .loading-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        pointer-events: auto;
        user-select: none;
        border-radius: 6px;


        .loading-icon,
        .loading-text {
            position: relative;
        }

        .loading-icon {
            height: 60px;
            width: 60px;

            .icon {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .i-pet {
                background-image: url('@/assets/images/loading/pet1.png');
                background-size: 100%;
                background-repeat: no-repeat;
                animation: pet steps(1) .5s infinite;

                @keyframes pet {
                    0% {
                        background-image: url('@/assets/images/loading/pet1.png');
                    }

                    25% {
                        background-image: url('@/assets/images/loading/pet2.png');
                    }

                    50% {
                        background-image: url('@/assets/images/loading/pet3.png');
                    }

                    75% {
                        background-image: url('@/assets/images/loading/pet4.png');
                    }

                    100% {
                        background-image: url('@/assets/images/loading/pet1.png');
                    }
                }
            }

            .i-circle {
                svg {
                    width: 3.75em;
                    transform-origin: center;
                    animation: rotate 2s linear infinite;
                }

                circle {
                    fill: none;
                    stroke: #02b5da;
                    stroke-width: 2;
                    stroke-dasharray: 1, 200;
                    stroke-dashoffset: 0;
                    stroke-linecap: round;
                    animation: dash 1.5s ease-in-out infinite;
                }

                @keyframes rotate {
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @keyframes dash {
                    0% {
                        stroke-dasharray: 1, 200;
                        stroke-dashoffset: 0;
                    }

                    50% {
                        stroke-dasharray: 90, 200;
                        stroke-dashoffset: -35px;
                    }

                    100% {
                        stroke-dashoffset: -125px;
                    }
                }
            }

            .i-loading {
                i {
                    color: white;
                    font-size: 35px;
                    animation: load 2s infinite linear;
                }

                @keyframes load {
                    from {
                        transform: rotateZ(0deg);
                    }
                    to {
                        transform: rotateZ(360deg);
                    }
                }
            }
        }

        .loading-text {
            font-size: 14px;
            letter-spacing: 1px;
            font-weight: bold;
            color: white;

            --delay: 0;

            span {
                display: inline-block;
                // animation: .5s infinite alternate-reverse;
                animation-duration: .5s;
                animation-iteration-count: infinite;
                animation-direction: alternate-reverse;
                animation-delay: var(--delay);
            }
        }

        .beat span {
            animation-name: beat;
        }

        .pop span {
            animation-name: pop;
        }

        .gradient span {
            animation-name: gradient;
        }

        .flip span {
            animation-name: flip;
            animation-duration: .65s;
        }


        @keyframes beat {
            0% {
                transform: translateY(0);
            }

            100% {
                transform: translateY(-25%);
            }
        }

        @keyframes pop {
            0% {
                transform: scale(0.85);
            }

            100% {
                transform: scale(1.15);
            }
        }

        @keyframes gradient {
            0% {
                opacity: 1;
            }

            100% {
                opacity: .4;
            }
        }

        @keyframes flip {
            0% {
                transform: perspective(800px) rotateY(180deg);
            }

            100% {
                transform: perspective(800px) rotateY(0);
            }
        }
    }

}


.loading-enter,
.loading-leave-to {
    opacity: 0;
}

.loading-enter-to,
.loading-leave {
    opacity: 1;
}
</style>