<template>
    <div class="banner-container" ref="banner" @mouseenter="BannerMouseenter" @mousemove="BannerMousemove"
        @mouseleave="BannerMouseleave">
        <div class="banner">
            <div class="view">
                <img src="@/assets/images/header/banner/winter/bilibili-winter-view-1.jpg" class="morning" alt="">
                <img src="@/assets/images/header/banner/winter/bilibili-winter-view-2.jpg" class="afternoon" alt="">
                <video autoplay loop muted>
                    <source src="@/assets/images/header/banner/winter/bilibili-winter-view-3.webm" type="video/webm"
                        class="evening" />
                </video>
                <img src="@/assets/images/header/banner/winter/bilibili-winter-view-3-snow.png" class="window-cover"
                    alt="">
            </div>
            <div class="tree">
                <img src="@/assets/images/header/banner/winter/bilibili-winter-tree-1.png" class="morning" alt="">
                <img src="@/assets/images/header/banner/winter/bilibili-winter-tree-2.png" class="afternoon" alt="">
                <img src="@/assets/images/header/banner/winter/bilibili-winter-tree-3.png" class="evening" alt="">
            </div>
        </div>
        <BiliLogo :imgSrc="require('@/assets/images/header/logo/logo-bili-winter.webp')"></BiliLogo>
        <slot>
            <MinHeader></MinHeader>
        </slot>
    </div>
</template>

<script>

import BiliLogo from '@/components/Header/Banner/BiliLogo'
import MinHeader from '@/components/Header/MinHeader'

export default {
    name: 'BannerWinter',
    components: {
        BiliLogo,
        MinHeader
    },
    data() {
        return {
            startingPoint: 0
        }
    },
    mounted() {
        // let startingPoint
        // const header = document.querySelector('.banner-container')

        // header.addEventListener('mouseenter', (e) => {
        //     startingPoint = e.clientX
        //     header.classList.add('moving')
        // })

        // header.addEventListener('mouseout', (e) => {
        //     header.classList.remove('moving')
        //     header.style.setProperty('--percentage', 0)
        //     // header.style.setProperty('--percentage', 0.5)
        // })

        // header.addEventListener('mousemove', (e) => {
        //     let percentage = (e.clientX - startingPoint) / window.outerWidth 
        //     // let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5
        //     header.style.setProperty('--percentage', percentage)
        //     console.log(window.outerWidth);
        // })
    },
    methods: {
        BannerMouseenter(e) {
            this.startingPoint = e.clientX
            this.$refs.banner.classList.add('moving')
        },
        BannerMousemove(e) {
            let percentage = (e.clientX - this.startingPoint) / window.outerWidth
            // let percentage = (e.clientX - startingPoint) / window.outerWidth + 0.5
            this.$refs.banner.style.setProperty('--percentage', percentage)
        },
        BannerMouseleave(e) {
            this.$refs.banner.classList.remove('moving')
            this.$refs.banner.style.setProperty('--percentage', 0)
            // header.style.setProperty('--percentage', 0.5)
        }
    }
}
</script>

<style lang="scss" scoped>
.banner-container {
    height: 160px;
    position: relative;


    --percentage: 0;
    //--percentage: 0.5; 

    .banner {
        height: 100%;
        position: relative;
        overflow: hidden;

        .view,
        .tree {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        }

        img,
        video {
            position: absolute;
            display: block;
            width: 120%;
            height: 100%;
            object-fit: cover;
        }

        .morning {
            z-index: 20;
            /* opacity: calc(1 - (var(--percentage) - 0.25) / 0.25); */
            opacity: calc((0 - var(--percentage))*2);
        }

        .afternoon {
            z-index: 10;
            /* opacity: calc(1 - (var(--percentage) - 0.5) / 0.5); */
            opacity: calc(1 + (0 - var(--percentage))*2);
        }

        .tree {
            transform: translateX(calc(var(--percentage) * 50px));
            filter: blur(3px);
        }

        .view,
        .tree,
        .morning,
        header,
        .afternoon {
            transition: .4s all ease-in;
        }

        .window-cover {
            /* opacity: calc((var(--percentage) - 0.9) / 0.1); */
            opacity: calc(var(--percentage)*2);
        }

        .view {
            transform: translateX(calc(var(--percentage) * 100px));
        }

    }

    &.moving .view,
    &.moving .tree,
    &.moving .morning,
    &.moving .afternoon {
        transition: none;
    }



}

// .logo-container {
//     width: 167px;
//     height: 78px;
//     position: absolute;
//     bottom: 10px;
//     left: 64px;

//     img {
//         width: 100%;
//         height: 100%;
//     }
// }
</style>