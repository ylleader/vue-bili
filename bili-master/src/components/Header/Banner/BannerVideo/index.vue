<template>
    <div ref="bannerPaperCtane" class="banner-container">
        <video class="banner-video" loop muted autoplay preload="true" :src="src"></video>
        <BiliLogo :imgSrc="require('@/assets/images/header/logo/d8e3b48c675f110f823d08cb1c7a6ca4659a2643.png')"></BiliLogo>
        <slot>
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
            default: require('@/assets/videos/banner/dcc12b53-ef30-4751-8d3d-b11c430b2e01.webm')
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

.banner-video {
    /* position: absolute;
    left: 0;
    top: 0; */
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
}
</style>