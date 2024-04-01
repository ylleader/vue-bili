<template>
    <div ref="bannerPaperCtane" class="banner-container">
        <div class="back"></div>
        <img class="banner-img" loop muted autoplay preload="true" :src="src">
        <slot name="logo">
            <BiliLogo :imgSrc="logoSrc"></BiliLogo>
        </slot>
        <slot name="min-header">
            <MinHeader boxShadowOpa="0.1"></MinHeader>
        </slot>
    </div>
</template>

<script>
import MinHeader from "@/components/Header/MinHeader";
import BiliLogo from "@/components/Header/Banner/BiliLogo";
export default {
    name: "BannerPaperCtane",
    props: {
        src: {
            type: String,
            default: require('@/assets/images/up/up-bg-000.webp')
        },
        logoSrc: {
            type: String,
            default: require('@/assets/images/header/logo/logo-bili-white.png')
        }
    },
    components: {
        MinHeader,
        BiliLogo
    },
    mounted() {

    }
};
</script>

<style scoped>
.banner-container {
    width: 100%;
    height: 180px;
    position: relative;
}

.banner-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}

.back {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .2) 0%, rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, 0) 100%);
}
</style>