<template>
    <div class="banner-container" @mouseenter="benter" @mousemove="bmove" @mouseleave="bleave">
        <div class="img-box" v-for="i in 6" :key="i" ref="imgs">
            <img :class="imgClass" :src="require(`@/assets/images/header/banner/autumn/bilibili-autumn-${i}.webp`)"
                alt="">
        </div>
        <BiliLogo :imgSrc="require('@/assets/images/header/logo/logo-bili-autumn.png')"></BiliLogo>
        <slot>
            <MinHeader :hoverColor="'rgb(253,89,35)'"></MinHeader>
        </slot>
    </div>
</template>

<script>
import BiliLogo from '../BiliLogo/index.vue';
import MinHeader from '../../MinHeader/index.vue';
export default {
    name: "BannerAutumn",
    data() {
        return {
            imgClass: ""
        };
    },
    methods: {
        benter(event) {
            this.imgClass = "";
            this.t = false;
        },
        bmove(event) {
            if (!this.imgClass && !this.t) {
                setTimeout(() => {
                    this.imgClass = "transition-none";
                }, 250);
            }

            this.t = true;
            let percentage = event.clientX / window.innerWidth;
            let x = percentage * 10;
            let blur = 20;
            let length = this.$refs.imgs.length;
            this.$refs.imgs.forEach((item, index) => {
                x *= 1.3;
                let blurV = (Math.pow((index / length - percentage), 2) * blur);
                item.style.setProperty("--x", `${x}px`);
                item.style.setProperty("--blur", `${blurV}px`);
            });
        },
        bleave(event) {
            this.imgClass = "";
            this.t = false;
            this.$refs.imgs.forEach((item, index) => {
                item.style.setProperty("--x", `0px`);
                item.style.setProperty("--blur", `2px`);
            });
        }
    },
    components: { BiliLogo, MinHeader }
}
</script>

<style lang="scss" scoped>
.banner-container {
    height: 160px;
    position: relative;
    overflow: hidden;

    .img-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        --blur: 2px;
        --x: 0px;

        img {
            width: 110%;
            height: 100%;
            object-fit: cover;
            transition: .2s;
            filter: blur(var(--blur));
            transform: translateX(var(--x));
        }

        .transition-none {
            transition: none;
        }
    }
}
</style>