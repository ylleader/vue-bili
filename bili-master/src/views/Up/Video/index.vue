<template>
    <div class="up-videos">
        <div class="up-my-video">
            <div class="c-head">
                <h3>
                    {{ self ? '我的视频' : 'Ta的视频' }}
                </h3>
                <div class="tabs">
                    <Tabs type="line" fontSize="13px" v-model="NPLTabsName">
                        <TabPanel lable="最新发布" name="n"></TabPanel>
                        <TabPanel lable="最多播放" name="p"></TabPanel>
                        <TabPanel lable="最多点赞" name="l"></TabPanel>
                    </Tabs>
                </div>
                <div class="btn">
                    <BButton size="12" type="white" padding="3px 16px">
                        <i class="iconfont icon-bofang bf-ico"></i>播放全部
                    </BButton>
                </div>
                <!-- <div class="btn">
                    <BButton size="12" type="white" padding="3px 16px">
                        更多<i class="iconfont icon-changyongicon- more-ico"></i>
                    </BButton>
                </div> -->
            </div>
            <div class="m-v" v-if="NPLTabsName === 'n'">
                <div class="m-v-item" v-for="(v, i) in videoList.concat(videoList)" :key="i">
                    <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                        @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                        <div class="v-title">
                            {{ v.title }}
                        </div>
                        <div class="v-time">
                            {{ `2022-12-12` }}
                        </div>
                    </VideoPreviewCard>
                </div>
            </div>
            <div class="m-v" v-else-if="NPLTabsName === 'p'">
                <div class="m-v-item" v-for="(v, i) in videoList" :key="i">
                    <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                        @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                        <div class="v-title">
                            {{ v.title }}
                        </div>
                        <div class="v-time">
                            {{ `2022-12-12` }}
                        </div>
                    </VideoPreviewCard>
                </div>
            </div>
            <div class="m-v" v-else-if="NPLTabsName === 'l'">
                <div class="m-v-item" v-for="(v, i) in videoList" :key="i">
                    <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                        @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                        <div class="v-title">
                            {{ v.title }}
                        </div>
                        <div class="v-time">
                            {{ `2022-12-12` }}
                        </div>
                    </VideoPreviewCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BButton from '@/components/Common/Button'
import Tabs from '@/components/Tabs'
import TabPanel from '@/components/Tabs/TabPanel'
import VideoPreviewCard from "@/components/Common/Card/VideoPreviewCard";


import loginMixin from '@/mixins/login'


export default {
    name: 'UpVideo',
    mixins: [loginMixin],
    components: {
        BButton, Tabs, TabPanel, VideoPreviewCard
    },
    data() {
        return {
            NPLTabsName: 'n',

            videoList: [
                {
                    videoSrc: 'http://47.113.204.129/s0313.mp4',
                    imgSrc: '/s03.jpg',
                    title: '爱情公寓3 13',
                    up: '发仔记',
                    id: 1
                },
                {
                    videoSrc: '/v001.mp4',
                    imgSrc: '/v001.jpg',
                    title: 's13全球总决赛',
                    up: '金医生',
                    id: 2
                },
                {
                    videoSrc: '/v002.mp4',
                    imgSrc: '/v002.jpg',
                    title: '七十二家房客发仔记',
                    up: '发仔记',
                    id: 3
                },
                {
                    videoSrc: '/v003.mp4',
                    imgSrc: '/v003.jpg',
                    title: '科目三睡觉考试',
                    up: '发仔记',
                    id: 4
                },
                {
                    videoSrc: '/v004.mp4',
                    imgSrc: '/v004.jpg',
                    title: '佛祖向我许愿',
                    up: '发仔记',
                    id: 5
                },
                {
                    videoSrc: '/s0313.mp4',
                    imgSrc: '/s03.jpg',
                    title: '爱情公寓3 13',
                    up: '发仔记',
                    id: 6
                },
                {
                    videoSrc: '/s0313.mp4',
                    imgSrc: '/s03.jpg',
                    title: '爱情公寓3 13',
                    up: '发仔记',
                    id: 7
                },
                {
                    videoSrc: '/s0313.mp4',
                    imgSrc: '/s03.jpg',
                    title: '爱情公寓3 13',
                    up: '发仔记',
                    id: 8
                }
            ],
        }
    },
    computed: {
        self() {
            return this.$store.state.user.upId == this.$route.params.upId
        }
    },
    created() {
        // this.self = this.$store.state.user.upId == this.$route.params.upId
    },
}
</script>

<style lang="scss" scoped>
.up-videos {
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 6px;
}


.c-head {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btns {
        display: flex;
        align-items: center;
    }

    h4,
    .btn {
        flex-shrink: 0;
    }

    .tabs {
        flex: 1;
        margin-left: 12px;
    }
}

.btn {
    margin-left: 8px;

    &:hover {
        .bf-ico {
            animation: bf 1s infinite;
        }

        .more-ico {
            animation: m 1s infinite;
        }
    }

    .bf-ico {
        transform: scale(.83);
        display: inline-block;
        margin-right: 2px;
    }

    .more-ico {
        transform: scale(1.2);
        display: inline-block;
        font-weight: bold;
        margin: 0 -3px 0 0;
    }

    @keyframes bf {
        0% {
            transform: scale(.83);
            opacity: 0.1;
        }

        50% {
            transform: scale(.95);
            opacity: 1;
        }

        100% {
            transform: scale(.83);
            opacity: 0.1;
        }
    }

    @keyframes m {
        0% {
            transform: translateX(0) scale(1.2);
            opacity: 0;
        }

        50% {
            // transform: translateX(50%) scale(1.2);
            opacity: 1;
        }

        100% {
            transform: translateX(50%) scale(1.2);
            opacity: 0;
        }
    }
}

.v-title {
    margin-top: 8px;
    word-break: break-all;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 15px;
    color: #18191c;
    cursor: pointer;

    &:hover {
        color: #00AEEC;
    }
}

.v-time {
    margin-top: 3px;
    font-size: 13px;
    color: #9499A0;
}

.up-my-video,
.v-c {
    margin-bottom: 8px;

    .m-v {
        // max-height: 300px;
        width: 102%;
        margin-top: 18px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
    }

    @media (min-width: 1420px) {

        .m-v-item {
            width: 238px !important;
        }

    }

    .m-v-item {
        width: 256px;
        margin-right: 15px;
        margin-bottom: 18px;
    }
}
</style>