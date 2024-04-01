<template>
    <div class="video-card" :style="viedoCardStyle">
        <div class="video-img-box">
            <slot name="img"></slot>
        </div>
        <div class="video-info-box">
            <div class="video-title">
                {{ title }}
            </div>
            <div class="up-pv">
                <div class="video-up">
                    <i class="iconfont icon-UPzhu"></i>
                    <span> {{ up }}</span>
                </div>
                <div class="video-play-volume">
                    {{ playVolume }} 播放
                </div>
            </div>
            <div class="play-icon-box" @click="seeLaterCollection($event)">
                <div class="play-tip">
                    {{ seeLaterTip }}
                </div>
                <div class="play-icon">
                    <i class="iconfont icon-dui" v-if="seeLater && isLogin"></i>
                    <i class="iconfont icon-bofang1" v-else></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import loginMixin from '@/mixins/login'

export default {
    name: 'VideoCard',
    mixins: [loginMixin],
    props: {
        title: {
            type: String,
            default: ''
        },
        up: {
            type: String,
            default: ''
        },
        playVolume: {
            type: Number,
            default: 0
        },
        width: {
            type: String,
            default: '320px',
        },
        height: {
            type: String,
            default: '180px',
        }
    },
    data() {
        return {
            titleStyle: {
                opacity: 1
            },
            src: '',
            v: false,

            seeLater: false,
            seeLaterTip: '稍后再看'
        }
    },
    computed: {
        viedoCardStyle() {
            return {
                height: this.height,
                width: this.width
            }
        }
    },
    methods: {
        pointAnima(e) {
            // e.stopPropagation()
            const p = document.querySelector('.point-sign-anima')
            const end = document.querySelector('.col-position').getBoundingClientRect()
            const rp = document.querySelector('.col-point-sign-position')

            const start = e.target.getBoundingClientRect()

            p.style.setProperty('--x', (start.left + start.width / 2 - 3) / 2 + 'px')
            p.style.setProperty('--y', (start.top + start.height / 2 - 3) / 2 + 'px')
            p.style.setProperty('--d', '0s')
            p.style.setProperty('--s', 2)
            p.style.setProperty('--dp', 'block')
            p.style.setProperty('opacity', 1)

            setTimeout(() => {
                p.style.setProperty('--x', end.right - 5 + 'px')
                p.style.setProperty('--y', end.top - 1 + 'px')
                p.style.setProperty('--d', '0.9s')
                p.style.setProperty('--s', 1)
            }, 100);

            setTimeout(() => {
                p.style.setProperty('opacity', 0)
                rp.style.setProperty('display', 'block')
            }, 1000);
        },
        seeLaterCollection(e, id) {
            e.stopPropagation()
            e.preventDefault()
            if (this.isLogin) {
                if (this.seeLater) {
                    //...
                    this.seeLaterTip = '稍后再看'
                } else {
                    this.pointAnima(e)
                    this.seeLaterTip = '取消'
                }
                this.seeLater = !this.seeLater
            } else {
                this.$login()
            }
        }
    }
}

</script>

<style lang="scss" scoped>
.video-card {
    border-radius: 6px;
    overflow: hidden;
    position: relative;

    background-image: url('@/assets/images/card/back-img.png');
    background-repeat: no-repeat;
    background-size: 40%;
    background-position: 50%;



    &::before,
    &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        transition: opacity .5s;
    }

    &::before {
        height: 100%;
        border-radius: 6px;
        background-color: black;
        opacity: 0;

    }

    &::after {
        height: 30%;
        border-radius: 0 0 6px 6px;
        background-image: linear-gradient(to top, rgba(0, 0, 0, .6), rgba(0, 0, 0, 0));
        bottom: 0;
    }

    &:hover .video-info-box {
        top: 0;
    }

    &:hover::before {
        opacity: .6;
    }

    &:hover::after {
        opacity: 0;
    }

    &:hover .video-info-box .video-title {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        white-space: normal;
    }

    .video-info-box {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        box-sizing: border-box;
        padding: 13% 15px 15px;
        color: white;
        top: 60%;
        cursor: pointer;
        transition: top .3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: none;

        .video-title,
        .video-play-volume,
        .video-up {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .video-title {
            width: 100%;
            // height: 42%;
            font-size: 16px;
            // border: 1px solid red;

            word-break: break-all;


            flex-shrink: 0;
            // display: -webkit-box;
            // -webkit-box-orient: vertical;
            // -webkit-line-clamp: 2;
        }

        .video-up,
        .video-play-volume {
            width: 100%;
            flex-shrink: 0;
        }

        .video-up {
            height: 16px;
            display: flex;
            align-items: center;

            i {
                font-size: 16px;
                margin-right: 4px;
            }
        }

        .up-pv {
            font-size: 12px;
            height: 38px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

    }

    .video-img-box {
        // position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }

    .play-icon-box {
        position: absolute;
        bottom: 15px;
        right: 15px;
        flex-direction: column;
        pointer-events: auto;

        &,
        .play-icon,
        .play-tip {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .play-icon {
            width: 35px;
            height: 35px;
            background-color: rgba($color: #000000, $alpha: .8);
            border-radius: 6px;
            position: relative;

            i {
                font-size: 20px;
                line-height: 100%;
            }
        }

        .play-tip {
            width: 62px;
            height: 26px;
            font-size: 13px;
            background-color: rgba($color: #000000, $alpha: .8);
            border-radius: 3px;
            display: flex;
            position: absolute;
            top: 0;
            transform: scale(0);
            transition-delay: .4s;
            transition-duration: .2s;
        }

        &:hover .play-tip {
            top: -80%;
            transform: scale(1);
        }

        &:hover .play-icon {
            animation: duan .4s;
        }

        @keyframes duan {

            0%,
            100% {
                transform: scale(1);
            }

            25% {
                transform: scale(.6);
            }

            50% {
                transform: scale(1.1);
            }

            75% {
                transform: scale(0.9);
            }
        }
    }


}
</style>