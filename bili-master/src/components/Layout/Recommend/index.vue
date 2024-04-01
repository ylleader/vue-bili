<template>
    <div class="equal-ratio-container">
        <div class="recommend-container">
            <div class="rec-swipe-container">
                <slot name="swiper"></slot>
            </div>
            <slot name="card"></slot>
        </div>
    </div>

</template>

<script>
import VideoCard from '@/components/Common/Card/VideoCard';
import VideoPreviewCard from '@/components/Common/Card/VideoPreviewCard/index.vue';

export default {
    name: "Recommend",
    data() {
        return {};
    },
    components: { VideoCard, VideoCard, VideoPreviewCard }
}
</script>

<style lang="scss" scoped>
// @media (max-width: 1366.99px) {
//     .recommend-container {
//         padding: 0 56px;
//     }
// }

// @media (min-width: 1367px) and (max-width: 1700.9px) {
//     .recommend-container {
//         padding: 0 64px;
//     }
// }

.equal-ratio-container {
    width: 100%;
    padding-top: 25%;
    box-sizing: border-box;
    position: relative;
}

.recommend-container {
    height: 100%;
    width: 100%;
    // aspect-ratio: 4/1;
    box-sizing: border-box;
    // padding: var(--layout-padding);
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    display: grid;
    grid-template-rows: repeat(2, minmax(0, 500px));
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px 12px;

    .rec-swipe-container {
        grid-row: 1 / span 2;
        grid-column: 1 / span 2;
        border-radius: 6px;
        overflow: hidden;
    }


    // .video-card {
    //     background-color: yellow;
    //     border-radius: 6px;
    //     overflow: hidden;
    //     position: relative;

    //     &::before {
    //         content: '';
    //         display: block;
    //         position: absolute;
    //         width: 100%;
    //         height: 100%;
    //         border-radius: 6px;
    //         background-color: black;
    //         opacity: 0;
    //         transition: opacity .5s;
    //     }

    //     &:hover .video-info {
    //         top: 0;
    //     }

    //     &:hover::before {
    //         opacity: .5;
    //     }

    //     .video-info {
    //         width: 100%;
    //         height: 100%;
    //         position: absolute;
    //         box-sizing: border-box;
    //         padding: 26px 15px 15px;
    //         color: black;
    //         // background-color: rgba(0, 0, 0, .5);
    //         // opacity: 0.5;
    //         top: 60%;
    //         transition: top .3s;
    //     }


    //     img {
    //         width: 100%;
    //         height: 100%;
    //         object-fit: cover;
    //     }
    // }
}

// .video-img {
//     width: 100%;
//     height: 100%;

//     img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//     }
// }

// .video-info {
//     display: block;
//     width: 100%;
//     height: 100%;
//     box-sizing: border-box;

//     div {
//         width: 100%;
//         height: 100%;
//         color: white;
//     }

// }
</style>