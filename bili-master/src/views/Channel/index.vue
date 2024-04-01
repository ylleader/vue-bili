<template>
    <div>
        <router-view></router-view>
        <div class="main">
            <ChannelPart></ChannelPart>
            <div class="chnnel-title">
                <h1>{{ $route.meta.title }} </h1>
            </div>
            <div class="channel-swiper-container" :key="$route.fullPath">
                <Swiper slot="swiper" :interval="6000" width="100%" height="270px" type="card">
                    <SwiperItem v-for="(item, index) in swiperList" :key="index" :info="item.title" borderRadius="8px"
                        width="946px">
                        <router-link class="swiper-link"
                            :to="{ path: '/video', query: { videoSrc: item.videoSrc, title: item.title, up: item.up } }"
                            target="_blank">
                            <img :src="item.src" alt="">
                        </router-link>
                    </SwiperItem>
                </Swiper>
            </div>
        </div>
    </div>
</template>

<script>
import ChannelPart from '@/components/Channel';
import BannerWinter from '@/components/Header/Banner/BannerWinter';
import Swiper from '@/components/Common/Swiper/index.vue';
import SwiperItem from '@/components/Common/Swiper/SwiperItem/index.vue';

export default {
    name: "Channel",
    components: { ChannelPart, BannerWinter, Swiper, SwiperItem },
    data() {
        return {
            swiperList: [
                {
                    src: '/swi-01.webp',
                    id: '1',
                    videoSrc: 'http://47.113.204.129/s0313.mp4',
                    title: '爱情公寓3 13',
                    up: '发仔记'
                },
                {
                    id: '2',
                    videoSrc: '/v001.mp4',
                    src: '/swi-02.webp',
                    title: 's13全球总决赛',
                    up: '金医生'
                },
                {
                    id: '3',
                    videoSrc: '/v002.mp4',
                    src: '/swi-03.webp',
                    title: '七十二家房客发仔记',
                    up: '发仔记'
                },
                {
                    id: '4',
                    videoSrc: '/v003.mp4',
                    src: '/swi-04.webp',
                    title: '科目三睡觉考试',
                    up: '发仔记'
                },
                {
                    id: '5',
                    videoSrc: '/v003.mp4',
                    src: '/swi-05.webp',
                    title: '科目三睡觉考试',
                    up: '发仔记'
                },
                {
                    id: '6',
                    videoSrc: '/v003.mp4',
                    src: '/swi-06.webp',
                    title: '科目三睡觉考试',
                    up: '发仔记'
                }
            ]
        }
    },
    mounted() {
    }

}
</script>

<style lang="scss" scoped>
.main {
    max-width: 1980px;
    margin: 0 auto;
    padding-left: var(--layout-padding);
    padding-right: var(--layout-padding);
}

.chnnel-title {
    padding-top: 12px;
    padding-bottom: 15px;
}

.channel-swiper-container {
    box-sizing: border-box;
}

.swiper-link {
    display: block;
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
</style>