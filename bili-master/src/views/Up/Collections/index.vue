<template>
    <div class="up-collections">
        <div class="c up-video-collections">
            <div class="v-c-head">
                <h3>{{ self ? '我的视频合集' : 'Ta的视频合集' }}</h3>
                <BButton class="create-btn" size="12" type="white" padding="3px 16px" @click="showCollectionsDialog"
                    v-if="self && videocollectionList.length">
                    新建<i class="iconfont icon-jiahao create-ico"></i>
                </BButton>
            </div>
            <div class="create-tips" v-if="!videocollectionList.length">
                <div class="tip-img"></div>
                <span class="tip" v-if="self">你还没有视频合集，点击按钮去创建吧</span>
                <span class="tip" v-if="!self">该up没有视频合集哦......</span>
                <BButton @click="showCollectionsDialog" v-if="self">
                    创建视频合集
                </BButton>
            </div>
            <div class="v-c" v-for="(c, index) in videocollectionList" :key="index">
                <div class="c-head">
                    <router-link class="h-title" :to="`/up/${$route.params.upId}/collectionsdetail`">
                        {{ c.name }}
                    </router-link>
                    <div class="no-video-tip" v-if="!c.videos.length && !self">
                        该合集还没有视频哦......
                    </div>
                    <div class="btns">
                        <div class="btn" v-if="c.videos.length">
                            <BButton size="12" type="white" padding="3px 16px">
                                <i class="iconfont icon-bofang bf-ico"></i>播放全部
                            </BButton>
                        </div>
                        <router-link class="btn" :to="`/up/${$route.params.upId}/collectionsdetail`">
                            <BButton size="12" type="white" padding="3px 16px">
                                更多<i class="iconfont icon-changyongicon- more-ico"></i>
                            </BButton>
                        </router-link>
                    </div>
                </div>
                <div class="m-v">
                    <div class="set" @click="showCollectionsVAddDialog(c.id)" v-if="self">
                        <div class="s-icon">
                            <i class="iconfont icon-jiahao g"></i>
                        </div>
                        <div class="s-tip">
                            添加视频
                        </div>
                    </div>
                    <div class="m-v-item" v-for="(v, i) in c.videos" :key="i">
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
            <Dialog width="400px" :title="collectionsDialogTitle" :visible.sync="collectionsDialogVisible"
                @close="closeCollectionsDialog" v-if="self">
                <div class="collections-form" v-show="collectionsCreateSteps === 1">
                    <div class="form-item">
                        <div class="lable">
                            视频合集标题
                        </div>
                        <div class="f-input">
                            <input type="text" class="f-text" maxlength="20" v-model.trim="collectionsName"
                                placeholder="请填写集合标题">
                            <div class="word-count">{{ `(${collectionsName.length}/20)` }}</div>
                        </div>
                    </div>
                    <div class="form-item">
                        <div class="lable">
                            视频合集简介
                        </div>
                        <div class="f-input">
                            <textarea class="f-textarea f-text min-scroll" maxlength="256"
                                v-model.trim="collectionsIntroduction" placeholder="请填写集合简介(选填)"></textarea>
                            <div class="word-count">{{ `(${collectionsIntroduction.length}/256)` }}</div>
                        </div>
                    </div>
                </div>
                <div class="collections-videos-select" v-show="collectionsCreateSteps === 2">
                    <div class="d-search">
                        <input type="text" placeholder="搜索视频名称/关键词">
                        <i data-v-2d32c4cc="" class="iconfont icon-sousuo"></i>
                    </div>
                    <div class="d-videos">
                        <div class="d-v-head">
                            <div class="v-title">视频列表</div>
                            <div class="v-sort">
                                <span>最新发布</span>
                                <i class="iconfont icon-paixu"></i>
                            </div>
                        </div>
                        <div class="d-v-list">
                            <div v-for="(v, i) in videoList" :key="i" :class="{ 'v-item': true, selected: v.selected }"
                                @click="selectCollectionsVitem(v)">
                                <div class="v-img">
                                    <img :src="v.imgSrc" alt="">
                                </div>
                                <div class="v-info">
                                    <div>
                                        {{ v.title }}
                                    </div>
                                    <div class="v-data">
                                        <div class="view">
                                            <div class="v-icon"></div>
                                            <span>1001w</span>
                                        </div>
                                        <div class="time">
                                            <div class="t-icon"></div>
                                            <span>4小时前</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collections-foot" slot="footer">
                    <template v-if="collectionsCreateSteps === 1">
                        <div class="c-f-btn">
                            <BButton type="white" size="14px" @click="closeCollectionsDialog">取消</BButton>
                        </div>
                        <div class="c-f-btn">
                            <BButton size="14px" @click="collectionsCreateNext()">下一步</BButton>
                        </div>
                    </template>
                    <template v-else-if="collectionsCreateSteps === 2">
                        <div class="c-f-btn">
                            <BButton type="white" size="14px" @click="collectionsCreateStepsChange(1)">上一步</BButton>
                        </div>
                        <div class="c-f-btn">
                            <BButton size="14px" @click="createCollections">确定</BButton>
                        </div>
                    </template>
                </div>
            </Dialog>
            <Dialog width="400px" title="选择视频" :visible.sync="collectionsVAddDialogVisible"
                @close="closeCollectionsVAddDialog" v-if="self">
                <div class="collections-videos-select">
                    <div class="d-search">
                        <input type="text" placeholder="搜索视频名称/关键词">
                        <i data-v-2d32c4cc="" class="iconfont icon-sousuo"></i>
                    </div>
                    <div class="d-videos">
                        <div class="d-v-head">
                            <div class="v-title">视频列表</div>
                            <div class="v-sort">
                                <span>最新发布</span>
                                <i class="iconfont icon-paixu"></i>
                            </div>
                        </div>
                        <div class="d-v-list">
                            <div v-for="(v, i) in videoList" :key="i" :class="{ 'v-item': true, selected: v.selected }"
                                @click="selectCollectionsVitem(v)">
                                <div class="v-img">
                                    <img :src="v.imgSrc" alt="">
                                </div>
                                <div class="v-info">
                                    <div>
                                        {{ v.title }}
                                    </div>
                                    <div class="v-data">
                                        <div class="view">
                                            <div class="v-icon"></div>
                                            <span>1001w</span>
                                        </div>
                                        <div class="time">
                                            <div class="t-icon"></div>
                                            <span>4小时前</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="collections-foot" slot="footer">
                    <div class="c-f-btn">
                        <BButton type="white" size="14px" @click="closeCollectionsVAddDialog">取消</BButton>
                    </div>
                    <div class="c-f-btn">
                        <BButton size="14px" @click="addCollectionsV()">确定</BButton>
                    </div>
                </div>
            </Dialog>
        </div>
    </div>
</template>

<script>
import BButton from '@/components/Common/Button'
import Tabs from '@/components/Tabs'
import TabPanel from '@/components/Tabs/TabPanel'
import VideoPreviewCard from "@/components/Common/Card/VideoPreviewCard";
import Dialog from '@/components/Common/Dialog'

import loginMixin from '@/mixins/login'

export default {
    name: 'Collections',
    mixins: [loginMixin],
    components: {
        BButton, Tabs, TabPanel, VideoPreviewCard, Dialog
    },
    data() {
        return {
            // self: false,

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
            videocollectionList: [
                {
                    name: 'collection1',
                    id: 1,
                    videos: [
                        {
                            videoSrc: 'http://47.113.204.129/s0313.mp4',
                            imgSrc: '/s03.jpg',
                            title: '爱情公寓3 13',
                            up: '发仔记'
                        },
                        {
                            videoSrc: '/v001.mp4',
                            imgSrc: '/v001.jpg',
                            title: 's13全球总决赛',
                            up: '金医生'
                        },
                        {
                            videoSrc: '/v002.mp4',
                            imgSrc: '/v002.jpg',
                            title: '七十二家房客发仔记',
                            up: '发仔记'
                        },
                        {
                            videoSrc: '/v003.mp4',
                            imgSrc: '/v003.jpg',
                            title: '科目三睡觉考试',
                            up: '发仔记'
                        },
                        {
                            videoSrc: '/v004.mp4',
                            imgSrc: '/v004.jpg',
                            title: '佛祖向我许愿',
                            up: '发仔记'
                        }
                    ],
                },
                {
                    name: 'collection2',
                    id: 2,
                    videos: [{
                        videoSrc: 'http://47.113.204.129/s0313.mp4',
                        imgSrc: '/s03.jpg',
                        title: '爱情公寓3 13',
                        up: '发仔记'
                    },
                    {
                        videoSrc: '/v001.mp4',
                        imgSrc: '/v001.jpg',
                        title: 's13全球总决赛',
                        up: '金医生'
                    },
                    {
                        videoSrc: '/v002.mp4',
                        imgSrc: '/v002.jpg',
                        title: '七十二家房客发仔记',
                        up: '发仔记'
                    },
                    {
                        videoSrc: '/v003.mp4',
                        imgSrc: '/v003.jpg',
                        title: '科目三睡觉考试',
                        up: '发仔记'
                    },
                    {
                        videoSrc: '/v004.mp4',
                        imgSrc: '/v004.jpg',
                        title: '佛祖向我许愿',
                        up: '发仔记'
                    }],
                },
                {
                    name: 'collection3',
                    id: 3,
                    videos: [{
                        videoSrc: 'http://47.113.204.129/s0313.mp4',
                        imgSrc: '/s03.jpg',
                        title: '爱情公寓3 13',
                        up: '发仔记'
                    },
                    {
                        videoSrc: '/v001.mp4',
                        imgSrc: '/v001.jpg',
                        title: 's13全球总决赛',
                        up: '金医生'
                    },
                    {
                        videoSrc: '/v002.mp4',
                        imgSrc: '/v002.jpg',
                        title: '七十二家房客发仔记',
                        up: '发仔记'
                    },
                    {
                        videoSrc: '/v003.mp4',
                        imgSrc: '/v003.jpg',
                        title: '科目三睡觉考试',
                        up: '发仔记'
                    },
                    {
                        videoSrc: '/v004.mp4',
                        imgSrc: '/v004.jpg',
                        title: '佛祖向我许愿',
                        up: '发仔记'
                    }],
                },
            ],

            collectionsDialogVisible: false,
            collectionsDialogTitle: '新建视频集合',
            collectionsCreateSteps: 1,
            collectionsName: '',
            collectionsIntroduction: '',

            collectionsVAddDialogVisible: false
        }
    },
    computed: {
        self() {
            return this.$store.state.user.upId == this.$route.params.upId
        }
    },
    methods: {
        collectionsCreateStepsChange(step) {
            if (step === 1) {
                this.collectionsDialogTitle = '新建视频集合'
            }
            if (step === 2) {
                this.collectionsDialogTitle = '选择视频'
            }
            this.collectionsCreateSteps = step
        },
        showCollectionsDialog() {
            this.collectionsVSelectedList = []
            this.collectionsDialogVisible = true
        },
        closeCollectionsDialog() {
            this.collectionsDialogVisible = false
            this.collectionsName = ''
            this.collectionsIntroduction = ''
            this.collectionsVSelectedList = []
            this.resetSelectCollectionsVitem()
        },
        collectionsCreateNext() {
            if (this.collectionsName) {
                this.collectionsCreateStepsChange(2)
            } else {
                this.$msg.warn('请先填写集合标题')
            }
        },
        selectCollectionsVitem(v) {
            this.videoList.forEach((item, index) => {
                if (item.id === v.id) {
                    if (item.selected) {
                        item.selected = false
                        const vindex = this.collectionsVSelectedList.indexOf(v.id)
                        if (vindex !== -1) {
                            this.collectionsVSelectedList.splice(vindex, 1)
                        }

                    } else {
                        if (item.selected === undefined) {
                            this.$set(item, 'selected', true)
                        } else {
                            item.selected = true
                        }
                        if (!this.collectionsVSelectedList.includes(v.id)) {
                            this.collectionsVSelectedList.push(v.id)
                        }
                    }
                }
            })
        },
        resetSelectCollectionsVitem() {
            this.videoList.forEach((item, index) => {
                if (item.selected === undefined) {
                    this.$set(item, 'selected', false)
                } else {
                    item.selected = false
                }
            })
        },
        createCollections() {
            if (this.collectionsVSelectedList.length) {
                //do..
                this.$msg.success('集合创建成功')
                this.closeCollectionsDialog()
            } else {
                this.$msg.warn('请选择至少一个视频')
            }
        },
        showCollectionsVAddDialog(cid) {
            this.collectionsId = cid
            this.collectionsVSelectedList = []
            this.collectionsVAddDialogVisible = true
        },
        closeCollectionsVAddDialog() {
            this.collectionsVAddDialogVisible = false
            this.collectionsId = ''
            this.collectionsVSelectedList = []
            this.resetSelectCollectionsVitem()
        },
        addCollectionsV() {
            if (this.collectionsVSelectedList && this.collectionsVSelectedList.length && this.collectionsId) {
                //do..
                this.$msg.success('视频添加成功')
                this.closeCollectionsVAddDialog()
            } else {
                this.$msg.warn('请选择至少一个视频')
            }
        }
    },
    created() {
        // this.self = this.$store.state.user.upId == this.$route.params.upId
    }
}
</script>

<style lang="scss" scoped>
.up-collections {
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

    .no-video-tip {
        font-size: 15px;
        letter-spacing: 1px;
        color: #9499A0;
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

.d-videos {
    .d-v-head {
        margin-bottom: 4px;
        padding: 0 4px;
        display: flex;
        justify-content: space-between;
        color: #18191c;

        .v-title {
            font-size: 13px;
        }

        .v-sort {
            display: flex;
            align-items: center;
            font-size: 12px;
            cursor: pointer;

            &:hover {
                color: #009ab8;

                i {
                    transform: rotateZ(180deg);
                }
            }

            i,
            span {
                transition: .3s;
            }
        }
    }

    .d-v-list {
        height: 290px;
        overflow: hidden;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgb(207, 207, 207);
            border-radius: 4px;
        }

        &:hover {
            overflow-y: overlay;
            overflow-y: auto;
        }

        .v-item {
            border-radius: 4px;
            padding: 4px;
            display: flex;
            cursor: pointer;

            &:hover {
                background-color: #eee;
            }

            .v-img {
                flex-shrink: 0;
                margin-right: 15px;
                width: 80px;
                height: 50px;

                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    object-fit: cover;
                }
            }

            .v-info {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                font-size: 13px;
                color: #18191C;


                .v-data {
                    display: flex;

                    .view,
                    .time {
                        margin-right: 30px;
                        display: flex;
                        align-items: center;
                        color: #999;

                        span {
                            flex-shrink: 0;
                            margin-left: 4px;
                            font-size: 12px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                        }
                    }

                    .v-icon,
                    .t-icon {
                        flex-shrink: 0;
                        width: 16px;
                        height: 15px;
                        background-size: 100%;
                    }

                    .v-icon {
                        background-image: url('@/assets/images/video/view.svg');
                    }

                    .t-icon {
                        background-image: url('@/assets/images/video/time.svg');
                    }
                }
            }
        }

        .selected {
            background-color: #00a1d6 !important;
            color: white;

            .v-info {
                color: #fff;

                .v-data {

                    .view,
                    .time {
                        color: white;
                    }

                    .v-icon {
                        background-image: url('@/assets/images/video/view-w.svg');
                    }

                    .t-icon {
                        background-image: url('@/assets/images/video/time-w.svg');
                    }
                }
            }
        }
    }
}

.d-search {
    margin-bottom: 12px;
    height: 30px;
    box-sizing: border-box;
    border: 1px solid #d6dce5;
    border-radius: 15px;
    padding: 0 8px;
    display: flex;
    align-items: center;
    overflow: hidden;

    &:hover,
    &:focus-within {
        border-color: #00AEEC;

        i {
            color: #00AEEC;
        }
    }

    input {
        flex: 1;
        height: 100%;
        box-sizing: border-box;
        border: none;
        outline: none;
        padding: 0 3px;
    }

    i {
        flex-shrink: 0;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
    }

    &,
    i {
        transition: .3s;
    }
}

@media (min-width: 1420px) {

    .set {
        width: 196px !important;
        height: 110px !important;
    }

}

.set {
    position: relative;
    margin-right: 15px;
    width: 201px;
    height: 113px;
    border: 2px dashed #b8c0cc;
    box-sizing: border-box;
    border-radius: 6px;
    cursor: pointer;
    transition: .3s;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
        border-color: #00AEEC;

        .s-icon {
            i {
                color: #00AEEC;
                transform: translateY(-5px);
            }
        }

        .s-tip {
            color: #00AEEC;
        }

        .s-count {
            color: #00AEEC;
        }
    }

    .s-icon {
        width: 43px;
        height: 43px;

        i {
            display: inline-block;
            font-size: 43px;
            color: #b8c0cc;
            transition: .5s;
        }


    }

    .s-tip {
        margin-top: 3px;
        font-size: 13px;
        color: #666;
        transition: .5s;
    }

    .s-count {
        position: absolute;
        bottom: 4px;
        right: 8px;
        color: #b8c0cc;
        font-size: 12px;
        transition: .5s;
    }

}

.up-video-collections {

    .c:nth-child(2) {
        border-top: none;
    }

    .v-c-head {
        display: flex;
        align-items: center;

        .create-btn {
            margin-left: 10px;

            &:hover {
                .create-ico {
                    display: inline-block;
                    animation: create .5s linear;
                }
            }
        }

        .create-ico {
            font-weight: bold;
            margin-left: 2px;
        }

        @keyframes create {
            0% {
                transform: scale(1);
            }

            50% {
                transform: scale(1.3);
            }

            100% {
                transform: scale(1);
            }

        }
    }

    .create-tips {
        margin: 20px 0 20px 0;
        display: flex;
        flex-direction: column;
        align-items: center;

        .tip-img {
            width: 350px;
            height: 206px;
            background-image: url('@/assets/images/card/bgm-nodata.png');
            background-repeat: no-repeat;
            background-size: 100%;
            background-position: 50%;
        }

        .tip {
            margin-bottom: 12px;
            font-size: 13px;
            color: #9499A0;
        }
    }

    .v-c {
        border-top: 2px solid #eee;
        padding-top: 18px;
        margin-bottom: 8px;

        &:nth-child(2) {
            // margin-top: 18px;
            border: none;
        }

        .m-v {
            max-height: 175px;
            width: 102%;
            margin-top: 18px;
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
        }

        @media (min-width: 1420px) {

            .m-v-item {
                width: 196px !important;
            }

        }

        .m-v-item {
            width: 201px;
            margin-right: 15px;
            margin-bottom: 18px;
        }

        .h-title {
            color: #222;
            font-size: 16px;
            cursor: pointer;

            &:hover {
                color: #00a1d6;
            }
        }
    }

    .collections-form {
        padding: 0 15px;

        .form-item {
            margin-top: 13px;

            .lable {
                font-size: 15px;
                margin-bottom: 6px;
            }

            .f-input {
                position: relative;

                .word-count {
                    position: absolute;
                    bottom: 5px;
                    right: 8px;
                    font-size: 12px;
                    color: #9499A0;
                }
            }

            .f-text {
                position: relative;
                height: 32px;
                width: 100%;
                border-radius: 6px;
                border: 1px solid #ccd0d7;
                outline: none;
                box-sizing: border-box;
                padding: 0 8px;

                &::after {
                    content: '1233';
                    display: block;
                    position: absolute;
                    height: 10px;
                    width: 10px;
                    background-color: red;
                    right: 3px;
                    bottom: 3px;
                }
            }

            .f-textarea {
                height: 96px;
                resize: none;
                padding: 8px;
            }
        }
    }

    .collections-videos-select {
        padding: 5px 15px;

        .v-item {
            margin: 2px 0;
        }
    }

    .collections-foot {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;

        .c-f-btn {
            margin-left: 8px;
        }
    }
}
</style>