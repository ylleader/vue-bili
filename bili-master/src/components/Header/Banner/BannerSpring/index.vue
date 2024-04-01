<template>
    <div class="banner-spring" ref="banner" :style="{ '--transition-duration': transitionDuration }"
        @mouseenter="bannerMouserEnter" @mousemove="bannerMouserMove" @mouseleave="bannerMouserLeave">
        <div class="banner-img">
            <img class="img-back" src="@/assets/images/header/banner/spring/back.webp" alt="">
        </div>
        <div class="banner-img">
            <img class="img-leaf-gear" src="@/assets/images/header/banner/spring/leaf-gear.webp" alt="">
        </div>
        <div class="banner-img">
            <img class="img-two-trees" src="@/assets/images/header/banner/spring/two-trees.webp" alt="">
        </div>
        <div class="banner-img">
            <img class="img-leaf-gear2" src="@/assets/images/header/banner/spring/leaf-gear.webp"
                :style="{ transform: `rotateZ(${percentage * 90}deg)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-leaf-gear3" src="@/assets/images/header/banner/spring/leaf-gear.webp"
                :style="{ transform: `translateX(${10 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-bee-tree" src="@/assets/images/header/banner/spring/bee-tree.webp"
                :style="{ transform: `translateX(${13 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-ant-worker" src="@/assets/images/header/banner/spring/ant-worker.webp"
                :style="{ transform: `translateX(${65 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-bird" src="@/assets/images/header/banner/spring/bird.webp"
                :style="{ transform: `translateX(${141 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-ant-mover" src="@/assets/images/header/banner/spring/ant-mover.webp"
                :style="{ transform: `translateX(${61 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-staircase" src="@/assets/images/header/banner/spring/staircase.webp"
                :style="{ transform: `translateX(${76 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-bee" src="@/assets/images/header/banner/spring/bee.webp"
                :style="{ transform: `translateX(${44 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-leaf" src="@/assets/images/header/banner/spring/leaf.webp"
                :style="{ transform: `translateX(${131 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-ladder" src="@/assets/images/header/banner/spring/ladder.webp"
                :style="{ transform: `translateX(${91 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-timbo" src="@/assets/images/header/banner/spring/timbo.webp"
                :style="{ transform: `translateX(${91 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-crotch" src="@/assets/images/header/banner/spring/crotch.webp"
                :style="{ transform: `translateX(${91 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-pull-rope1" src="@/assets/images/header/banner/spring/pull-rope1.webp"
                :style="{ transform: `translateX(${120 * percentage}px)`, opacity: (1 - Math.abs(2 * percentage)) }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-pull-rope2" src="@/assets/images/header/banner/spring/pull-rope2.webp"
                :style="{ transform: `translateX(${121 * percentage}px)`, opacity: (Math.abs(2.5 * percentage)) }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-sling" src="@/assets/images/header/banner/spring/sling.webp"
                :style="{ transform: `translate(${141 * percentage}px, ${35 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-command" src="@/assets/images/header/banner/spring/command.webp"
                :style="{ transform: `translateX(${182 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-branch" src="@/assets/images/header/banner/spring/branch.webp"
                :style="{ transform: `translateX(${182 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-trunk" src="@/assets/images/header/banner/spring/trunk.webp"
                :style="{ transform: `translateX(${157 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-paling" src="@/assets/images/header/banner/spring/paling.webp"
                :style="{ transform: `translateX(${324 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-stake" src="@/assets/images/header/banner/spring/stake.webp"
                :style="{ transform: `translateX(${202 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-timbo2" src="@/assets/images/header/banner/spring/timbo2.webp"
                :style="{ transform: `translateX(${283 * percentage}px)` }" alt="">
        </div>
        <div class="banner-img">
            <img class="img-wood" src="@/assets/images/header/banner/spring/wood.webp"
                :style="{ transform: `translateX(${250 * percentage}px)` }" alt="">
        </div>
        <BiliLogo :imgSrc="require('@/assets/images/header/logo/38a9518784220f7f3c894bc9ba1ee799b2f1644b.png')" />
        <slot>
            <MinHeader :hoverColor="'rgb(110, 118, 24)'"></MinHeader>
        </slot>
    </div>
</template>

<script>
import MinHeader from '@/components/Header/MinHeader'
import BiliLogo from '../BiliLogo/index.vue';
export default {
    name: 'BannerSpring',
    components: { MinHeader, BiliLogo },
    data() {
        return {
            percentage: 0,
            transitionDuration: 0
        }
    },
    methods: {
        bannerMouserEnter(event) {
            this.transitionDuration = 0
            this.enterX = event.clientX;

            const bannerRect = this.$refs.banner.getBoundingClientRect();
            this.bannerWidth = bannerRect.width;
        },
        bannerMouserMove(event) {
            this.percentage = (event.clientX - this.enterX) / this.bannerWidth;
        },
        bannerMouserLeave() {
            this.transitionDuration = '0.5s'
            this.percentage = 0
        }
    }
}
</script>

<style lang="scss" scoped>
.banner-spring {
    position: relative;
    height: 155px;
    overflow: hidden;
    --transition-duration: 0;

    .banner-img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition-duration: var(--transition-duration);
        }

        .img-back {
            height: 600px;
            width: 2986px;
            transform: translate(-60px, 0px) rotate(0deg) scale(1);
            filter: blur(2px);
        }

        @keyframes gear-run {
            0% {
                transform: rotateZ(0);
            }

            100% {
                transform: rotateZ(360deg);
            }
        }

        .img-leaf-gear {
            left: 928px;
            top: 30px;
            width: 105px;
            height: 105px;
            filter: blur(2px);
            animation: gear-run 10s linear infinite;
        }

        .img-leaf-gear2 {
            left: 367px;
            top: -61px;
            width: 160px;
            height: 177px;
            filter: blur(1px);
        }

        .img-leaf-gear3 {
            left: 560px;
            top: -93px;
            height: 300px;
            width: 300px;
            animation: gear-run 50s linear infinite;
        }

        .img-two-trees {
            height: 450px;
            width: 709px;
            filter: blur(1px);
        }

        .img-bee-tree {
            left: 613px;
            top: -112px;
            height: 330px;
            width: 333px;
        }

        .img-ant-worker {
            left: 986px;
            top: 81px;
            height: 73px;
            width: 92px;
        }

        .img-bird {
            left: 146px;
            top: 45px;
            width: 219px;
            height: 104px;
        }

        .img-ant-mover {
            left: 350px;
            top: 65px;
            height: 86px;
            width: 198px;
        }

        .img-staircase {
            left: 1116px;
            top: 47px;
            height: 67px;
            width: 137px;
        }

        .img-bee {
            left: 1034px;
            top: 9px;
            height: 71px;
            width: 46px;
        }

        .img-leaf {
            left: 1039px;
            top: -109px;
            height: 165px;
            width: 222px;
        }

        .img-ladder {
            left: 1094px;
            top: 2px;
            width: 52px;
            height: 151px;
        }

        .img-timbo {
            left: 480px;
            top: -9px;
            width: 79px;
            height: 162px;
        }

        .img-crotch {
            left: 96px;
            top: -142px;
            width: 1688px;
            height: 450px;
        }

        .img-pull-rope1 {
            left: 748px;
            top: -37px;
            width: 203px;
            height: 204px;
        }

        .img-pull-rope2 {
            left: 748px;
            top: -37px;
            width: 203px;
            height: 204px;
            opacity: 0;
        }

        .img-sling {
            left: 604px;
            top: -110px;
            width: 100px;
            height: 234px;
        }

        .img-command {
            left: 739px;
            top: 75px;
            width: 71px;
            height: 84px;
        }

        .img-branch {
            left: -138px;
            top: -26px;
            width: 196px;
            height: 206px;
        }

        .img-trunk {
            left: -51px;
            top: -155px;
            width: 443px;
            height: 465px;
        }

        .img-paling {
            left: 147px;
            top: 40px;
            width: 264px;
            height: 132px;
        }

        .img-stake {
            left: 1078px;
            top: 72px;
            width: 163px;
            height: 112px;
        }

        .img-timbo2 {
            left: 1235px;
            top: -39px;
            width: 99px;
            height: 233px;
        }

        .img-wood {
            left: 1310px;
            top: 37px;
            width: 300px;
            height: 137px;
        }
    }
}
</style>