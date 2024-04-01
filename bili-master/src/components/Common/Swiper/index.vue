<template>
    <div class="swiper-container" :style="swiperContainerStyle" @mouseenter="stopCarousel" @mouseleave="carousel">
        <div class="swiper">
            <div :class="swiperClass" ref="swiper">
                <slot></slot>
            </div>
        </div>
        <div class="swiper-trigger">
            <div class="swiper-trigger-item" v-for="index in itemLength" :key="index"
                :style="swiperTriggerItemStyle(index)" @click="activeItemIndexChange(index - 1, false)">
            </div>
        </div>
        <div class="pre" @click="activeItemIndexChange(activeItemIndex - 1)" v-show="itemLength">
            <i class="iconfont icon-changyongicon-1"></i>
        </div>
        <div class="next" @click="activeItemIndexChange(activeItemIndex+1)" v-show="itemLength">
            <i class="iconfont icon-changyongicon-"></i>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Swiper',
    props: {
        interval: {
            type: Number,
            default: 4000
        },
        width: {
            type: String,
            default: '160px'
        },
        height: {
            type: String,
            default: '90px'
        },
        autoCarousel: {
            type: Boolean,
            default: true
        },
        info: {
            type: String,
            default: ''
        },
        type: {
            type: String,
            default: 'default'
        }
    },
    data() {
        return {
            swiperClass: ['swiper-img-box'],
            translationData: {
                left: 0
            },
            activeItemIndex: 0,
            itemLength: 0,
            swiperList: []
        }
    },
    computed: {
        swiperContainerStyle() {
            return {
                width: this.width,
                height: this.height,
                border: this.itemLength ? 'none' : '1px solid #e7e7e7'
            }
        },
        swiperTriggerItemStyle() {
            return function (index) {
                if (index === 1 && this.activeItemIndex === this.itemLength) {
                    return { opacity: 1 }
                }
                return this.activeItemIndex === index - 1 ? { opacity: 1 } : { opacity: .5 }
            }
        }
    },
    watch: {
        activeItemIndex(val) {
            this.modes[this.type]()
        }
    },
    methods: {
        /**
         * 初始化swiperItem，获取swiperItem列表，确定模式，开启自动轮播等
         */
        swiperItemInit() {

            //判断swiperItem是否已存在（静态数据），获取swiperItemList
            if (this.$refs.swiper.childNodes && this.$refs.swiper.childNodes.length) {
                this.swiperList = this.$refs.swiper.childNodes
                this.itemLength = this.swiperList.length
                this.ModeInit()
                this.carouselInit()
            }

            /**
             * 节点观察器，观察节点内容变化，这里用于观察插槽内容变化，获取插槽中item的最新数量（动态数据）
             * （动态数据有延时问题，需要使用MutationObserver观察节点是否发生变化，即数据以获取成功并渲染）
             * @param mutationRecoards 节点变动数组
             * @param observer         观测器实例
             * 
             */
            this.domObserver = new MutationObserver((mutationRecoards, observer) => {
                if (this.$refs.swiper.childNodes.length) {
                    this.swiperList = this.$refs.swiper.childNodes
                    this.itemLength = this.swiperList.length
                    this.ModeInit()
                    this.carouselInit()

                    //取消观察
                    observer.disconnect()
                    this.domObserver = null
                }
            })

            //添加观察对象
            this.domObserver.observe(this.$refs.swiper, {
                childList: true,
            })
        },
        /**
         * 默认轮播模式（向左滚动）
         */
        default() {
            const length = this.itemLength                    //swiperItem数量
            const right = length / 2                          //激活item的右边item数量
            const left = length - right - 1                   //激活item的左边item数量

            /**
             * 用于设置swiperitem元素的样式属性
             * 
             * @param {number} si   元素数组下标
             * @param {string} prop 样式属性名
             * @param {string} val  属性值
             */
            const setProperty = (si, prop, val) => {
                this.swiperList[si].style.setProperty(prop, val)
            }

            //设置activeItem的位置和其他样式
            setProperty(this.activeItemIndex, '--x', 0)
            setProperty(this.activeItemIndex, '--z', length)

            //设置左侧item的位置
            let i = 1
            while (i <= left) {
                //计算activeItem左侧的index，和其位置
                let index = this.activeItemIndex - i >= 0 ? (this.activeItemIndex - i) : (length + (this.activeItemIndex - i))
                setProperty(index, '--x', -100 + '%')
                setProperty(index, '--z', 0)
                i++
            }
            //计算activeItem右侧的index，和其位置
            i = 1
            while (i <= right) {
                let index = this.activeItemIndex + i < length ? (this.activeItemIndex + i) : (this.activeItemIndex + i - length)
                setProperty(index, '--x', 100 + '%')
                setProperty(index, '--z', 0)
                i++
            }

        },
        /**
         * 卡片轮播模式
         */
        card() {
            const length = this.swiperList.length                           //swiperItem数量
            const right = Math.floor(length / 2)                            //激活item的右边item数量
            const left = length - right - 1                                 //激活item的左边item数量
            const swiperWidth = this.$refs.swiper.clientWidth               //swiper的总宽度，用于计算位移
            const itemWidth = this.swiperList[0].offsetWidth * 0.85         //swiperItem的宽度，用于计算位移
            const adjDis = (swiperWidth - itemWidth) / 2                    //与激活item相邻的item位移的绝对值
            const athDis = (swiperWidth - itemWidth) / 2 + itemWidth + 20   //与激活item不相邻的item位移的绝对值

            /**
             * 用于设置swiperitem元素的样式属性
             * @param {number} si   元素数组下标
             * @param {string} prop 样式属性名
             * @param {string} val  属性值
             */
            const setProperty = (si, prop, val) => {
                this.swiperList[si].style.setProperty(prop, val)
            }

            //设置左侧item的位置
            let i = 1
            while (i <= left) {
                //计算activeItem左侧的index，和其位置
                let index = this.activeItemIndex - i >= 0 ? (this.activeItemIndex - i) : (length + (this.activeItemIndex - i))
                //i为 1 时，则是和activeItemIndex左侧相邻的item，其位置为 -adjDis
                if (i == 1) {
                    setProperty(index, '--x', -adjDis + 'px')
                    setProperty(index, '--z', 1)
                } else {    //i为其他时，则是和activeItemIndex左侧非相邻的item，其位置为 -athDis
                    setProperty(index, '--x', -athDis + 'px')
                    setProperty(index, '--z', 0)
                }
                setProperty(index, '--sca', 0.85)
                setProperty(index, '--black', '40%')
                // setProperty(index, 'width', '68%')
                i++
            }
            //计算activeItem右侧的index，和其位置
            i = 1
            while (i <= right) {
                let index = this.activeItemIndex + i < length ? (this.activeItemIndex + i) : (this.activeItemIndex + i - length)
                if (i == 1) {
                    setProperty(index, '--x', adjDis + 'px')
                    setProperty(index, '--z', 1)
                } else {
                    setProperty(index, '--x', athDis + 'px')
                    setProperty(index, '--z', 0)
                }
                setProperty(index, '--sca', 0.85)
                setProperty(index, '--black', '40%')
                // setProperty(index, 'width', '68%')
                i++
            }

            //设置activeItem的位置和其他样式
            // setProperty(this.activeItemIndex, 'width', '68%')
            setProperty(this.activeItemIndex, '--x', 0 + 'px')
            setProperty(this.activeItemIndex, '--z', 2)
            setProperty(this.activeItemIndex, '--sca', 1)
            setProperty(this.activeItemIndex, '--black', '100%')
        },
        /**
         * 模式初始化，根据参数type确定轮播模式
         */
        ModeInit() {
            this.modes = {
                'card': this.card,
                'default': this.default
            }
            this.modes[this.type]()
            //swiper初始化后再开启过度，防止闪屏
            setTimeout(() => {
                this.swiperClass.push('tra')
            }, 0)
        },
        /**
         * 自动轮播初始化
         */
        carouselInit() {
            //判断是否自动开启轮播
            if (this.autoCarousel) {
                //从第一个item开始轮播
                this.activeItemIndex = 0
                this.carousel()
                //在页面隐藏时停止轮播
                window.addEventListener('visibilitychange', this.leaveEnterPage)
            }
        },
        /**
         * 开启自动轮播定时器
         */
        carousel() {
            if (!this.itemLength) return
            this.carouselInterval = setInterval(() => {
                this.activeItemIndexChange(this.activeItemIndex + 1)
            }, this.interval)
        },
        /**
         * 停止自动轮播
         */
        stopCarousel() {
            this.carouselInterval && clearInterval(this.carouselInterval)
        },
        /**
         * 开启自动轮播
         */
        // turnOnCarousel() {
        //     this.carouselInterval && this.carousel()
        // },
        leaveEnterPage() {
            if (document.visibilityState === 'visible') {
                this.carousel()
            } else if (document.visibilityState === 'hidden') {
                this.stopCarousel()
            }
        },
        activeItemIndexChange(val, transition = true) {
            //是否过度切换
            if (transition) {
                //设置节流阀，上一次切换结束后才可以继续切换
                if (this.transitionEnd) {
                    return
                }
                if (this.swiperList.length && this.swiperList[this.activeItemIndex]) {
                    this.transitionEnd = true
                    setTimeout(() => {
                        this.transitionEnd = false
                    }, 600);
                }

            } else {    //不进行过度切换
                this.swiperClass.splice(this.swiperClass.indexOf('tra'), 1)
                setTimeout(() => {
                    this.swiperClass.push('tra')
                }, 0);
            }

            //activeIndex越界调整
            if (val > this.itemLength - 1) {
                val = 0
            } else if (val < 0) {
                val = this.itemLength - 1
            }
            this.activeItemIndex = val
        },
    },
    mounted() {
        this.swiperItemInit()
    },
    beforeDestroy() {
        this.stopCarousel()
        window.removeEventListener('visibilitychange', this.leaveEnterPage)
    }
}
</script>

<style lang="scss" scoped>
.swiper-container {
    //width: 100%;
    //height: 100%;

    min-width: 160px;
    min-height: 90px;
    box-sizing: border-box;
    overflow: hidden;
    position: relative;

    background-image: url('@/assets/images/card/back-img.png');
    background-repeat: no-repeat;
    background-position: 50%;

    .swiper {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        box-sizing: border-box;
        z-index: 0;


        .swiper-img-box {
            --left: 0;

            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            transition: .8s;
            left: var(--left);
            // transform: translateX(var(--left));
        }

        .transition-none {
            transition: none;
        }

        .skeleton {
            width: 100%;
            height: 100%;
            border: 1px solid red;
        }
    }

    .swiper-trigger {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 60%;
        height: 20px;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        z-index: 1;

        .swiper-trigger-item {
            width: 40px;
            min-width: 4px;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .4s;
            margin: 0 3px;
            opacity: .5;
            cursor: pointer;
            // border: 1px solid red;

            &::after {
                content: '';
                display: block;
                height: 3px;
                width: 100%;
                border-radius: 1.5px;
                background-color: white;
            }

            &:hover::after {
                transition: .3px;
                opacity: .5;
            }
        }


    }

    .pre,
    .next {
        width: 48px;
        // aspect-ratio: 1 / 1;
        height: 48px;
        color: white;
        background: rgba($color: #000000, $alpha: .6);
        border-radius: 30%;
        transition: .3s;
        transition-property: left, right;
        transition-delay: 0.3s;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 1;
        // backdrop-filter: blur(100px);

        &:hover {
            background: rgba($color: gray, $alpha: .5);
        }

        i {
            font-size: 20px;
            font-weight: bold;
        }

        &:active {
            transform: translateY(-50%) scale(.95);
        }

    }

    &:hover .pre {
        left: 8px;
    }

    &:hover .next {
        right: 8px;
    }

    .pre {
        left: -52px;
        top: 50%;
        transform: translateY(-50%);

    }

    .next {
        right: -52px;
        top: 50%;
        transform: translateY(-50%);
    }

    .tra .swiper-item {
        transition: .6s;
    }

}
</style>
