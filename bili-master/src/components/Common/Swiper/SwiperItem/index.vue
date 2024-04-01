<template>
    <div class="swiper-item" :style="{borderRadius, width}">
        <slot></slot>
        <div v-if="info" class="swiper-info-box">
            <div class="swiper-info">
                {{ info }}
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'SwiperItem',
    props: {
        info: {
            type: String,
            default: ''
        },
        borderRadius: {
            type: String,
            default: ''
        },
        width: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.swiper-item {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    box-sizing: border-box;
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: white;
    background-image: url('@/assets/images/card/back-img.png');
    background-repeat: no-repeat;
    background-position: 50%;

    --x: 0px;
    --z: 0;
    --sca: 1;
    --black: 100%;
    transform: translate(var(--x)) scale(var(--sca));
    z-index: var(--z);
    filter: brightness(var(--black));


    .swiper-info-box {
        width: 100%;
        height: 22%;
        box-sizing: border-box;
        padding: 10px 20px 0 20px;
        background-image: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .8) 100%);
        position: absolute;
        left: 0;
        bottom: 0;
        overflow: hidden;

        .swiper-info {
            width: 100%;
            font-size: 20px;
            color: white;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
}
</style>