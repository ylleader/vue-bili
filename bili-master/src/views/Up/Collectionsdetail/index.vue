<template>
    <div class="up-collectionsdetail">
        <div class="v-c-head">
            <router-link :to="`/up/${$route.params.upId}/collections`">
                <h3 class="my-collections">{{ self ? '我的视频合集' : 'Ta的视频合集' }}</h3>
            </router-link>
            <i class="iconfont icon-changyongicon-"></i>
            <h3 class="c-d-title">合集1</h3>
        </div>
        <div class="opt-bar">
            <div class="num-uptime">
                9个视频 | 刚刚更新
            </div>
            <div class="opt" v-if="self">
                <BButton class="opt-btn" size="13px" @click="showCollectionsDialog">
                    <i class="iconfont icon-bianji i"></i>编辑
                </BButton>
                <Popover class="opt-btn" placement='bottom-end' :top="8">
                    <BButton slot="reference" type="white" width="35px" height="32px" padding="0">
                        <i class="iconfont icon-diandian"></i>
                    </BButton>
                    <div class="opt-list">
                        <div class="opt-item" @click="deleteCollections">
                            删除视频合集
                        </div>
                    </div>
                </Popover>
            </div>
        </div>
        <div class="no-video-tips" v-if="!videoList.length && !self">
            <div class="tip-img"></div>
            <span class="tip">该集合还没有视频哦......</span>
        </div>
        <div class="m-v" ref="v">
            <div class="set" @click="showCollectionsVAddDialog" v-if="self">
                <div class="s-icon">
                    <i class="iconfont icon-jiahao g"></i>
                </div>
                <div class="s-tip">
                    添加视频
                </div>
            </div>
            <div class="m-v-item" :draggable="drag" v-for="(v, i) in videoList" :key="v.id" ref="vitem"
                @dragstart="vitemDragstart($event, v.title, i)" @dragenter.prevent="vitemDragenter(v.id, i)"
                @dragover.prevent="vitemDragover(v.id, i)" @dragend="vitemDragend(v.id, i)">
                <div class="v-sort" v-if="self">
                    {{ i + 1 }}
                </div>
                <div class="v-drag" @mousedown="drag = true" @mouseup="drag = true" v-if="self">
                    <i class="iconfont icon-drag"></i>
                </div>
                <VideoPreviewCard class="v" width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                    @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                    <div class="v-title">
                        {{ v.title }}
                    </div>
                    <div class="v-time-opt">
                        <div class="v-time">
                            {{ `2022-12-12` }}
                        </div>
                        <Popover class="v-opt" placement='bottom-end' :top="8" v-if="self">
                            <i slot="reference" class="iconfont icon-diandian"></i>
                            <div class="item-opt-list">
                                <div class="opt-item" @click="deleteVideo(v.id, i)">
                                    删除视频
                                </div>
                                <div class="opt-item" @click="moveToTop(v.id, i)" v-if="i != 0">
                                    移至顶部
                                </div>
                                <div class="opt-item" @click="moveToBottom(v.id, i)" v-if="i != videoList.length">
                                    移至底部
                                </div>
                            </div>
                        </Popover>
                    </div>
                </VideoPreviewCard>
            </div>
        </div>
        <Dialog width="400px" title="编辑视频合集" :visible.sync="collectionsDialogVisible" @close="closeCollectionsDialog"
            v-if="self">
            <div class="collections-form">
                <div class="form-item">
                    <div class="lable">
                        视频合集标题
                    </div>
                    <div class="f-input">
                        <input type="text" class="f-text" maxlength="20" v-model.trim="formCollectionsName"
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
                            v-model.trim="formCollectionsIntroduction" placeholder="请填写集合简介(选填)"></textarea>
                        <div class="word-count">{{ `(${collectionsIntroduction.length}/256)` }}</div>
                    </div>
                </div>
            </div>
            <div class="collections-foot" slot="footer">
                <div class="c-f-btn">
                    <BButton type="white" size="14px" @click="closeCollectionsDialog">取消</BButton>
                </div>
                <div class="c-f-btn">
                    <BButton size="14px" @click="updateCollections">确定</BButton>
                </div>
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


</template>

<script>
import BButton from '@/components/Common/Button'
import Tabs from '@/components/Tabs'
import TabPanel from '@/components/Tabs/TabPanel'
import VideoPreviewCard from "@/components/Common/Card/VideoPreviewCard";
import Popover from '@/components/Common/Popover'
import Dialog from '@/components/Common/Dialog'



import loginMixin from '@/mixins/login'
export default {
    name: 'Collectionsdetail',
    mixins: [loginMixin],
    components: {
        BButton, Tabs, TabPanel, VideoPreviewCard, Popover, Dialog
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

            collectionsDialogVisible: false,
            collectionsName: '原name',
            collectionsIntroduction: '原intro',
            formCollectionsName: '',
            formCollectionsIntroduction: '',

            collectionsVAddDialogVisible: false,

            drag: false

        }
    },
    computed: {
        self() {
            return this.$store.state.user.upId == this.$route.params.upId
        }
    },
    methods: {
        deleteCollections() {
            this.$confirm('确定要删除视频合集‘collections1’吗?', '删除视频合集', { lock: false }).then(() => {
                this.$msg.success('删除成功')
                this.$router.replace(`/up/${this.$route.params.upId}/collections`)
            }).catch(err => {
            })
        },
        deleteVideo(id, index) {
            this.$confirm('确定要删除视频合集‘video’吗?', '删除视频', { lock: false }).then(() => {
                this.videoList.splice(index, 1)
                this.$msg.success('删除成功')
            }).catch(err => {
            })
        },
        moveToTop(id, index) {
            const item = this.videoList[index]
            this.videoList.splice(index, 1)
            this.videoList.unshift(item)
        },
        moveToBottom(id, index) {
            const item = this.videoList[index]
            this.videoList.splice(index, 1)
            this.videoList.push(item)
        },
        showCollectionsDialog() {
            this.formCollectionsName = this.collectionsName
            this.formCollectionsIntroduction = this.collectionsIntroduction
            this.collectionsDialogVisible = true
        },
        closeCollectionsDialog() {
            this.collectionsDialogVisible = false
        },
        updateCollections() {
            if (!this.formCollectionsName) {
                this.$msg.warn('请先填写集合标题')
            } else {
                this.$msg.success('修改成功')
                this.collectionsDialogVisible = false
            }
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
        showCollectionsVAddDialog() {
            this.collectionsVSelectedList = []
            this.collectionsVAddDialogVisible = true
        },
        closeCollectionsVAddDialog() {
            this.collectionsVAddDialogVisible = false
            this.collectionsVSelectedList = []
            this.resetSelectCollectionsVitem()
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
        addCollectionsV() {
            if (this.collectionsVSelectedList && this.collectionsVSelectedList.length) {
                //do..
                this.$msg.success('视频添加成功')
                this.closeCollectionsVAddDialog()
            } else {
                this.$msg.warn('请选择至少一个视频')
            }
        },
        vitemDragstart(e, id, index) {
            setImmediate(() => {
                document.getElementsByClassName('m-v-item')[index].classList.add('moving')
            })
            e.dataTransfer.effectAllowed = 'move'

            this.mvitem = {
                id, index
            }
        },
        vitemDragenter(id, index) {
            if (this.mvitem && this.mvitem.id != id) {
                if (this.mvitem.index < index) {
                    this.videoList.splice(index + 1, 0, this.videoList[this.mvitem.index])
                    this.videoList.splice(this.mvitem.index, 1)
                    this.mvitem.index = index
                } else if (this.mvitem.index > index) {
                    this.videoList.splice(index, 0, this.videoList[this.mvitem.index])
                    this.videoList.splice(this.mvitem.index + 1, 1)
                    this.mvitem.index = index
                }
            }
        },
        vitemDragover() {},
        vitemDragend(id, index) {
            this.$refs.vitem.forEach((item) => {
                item.classList.remove('moving')
            })            
        }

    },
    created() {
        // this.self = this.$store.state.user.upId == this.$route.params.upId
    }
}
</script>

<style lang="scss" scoped>
.up-collectionsdetail {
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 15px;


    .v-c-head {
        display: flex;
        align-items: center;

        .my-collections {
            color: #18191C;

            &:hover {
                color: #00a1d6;
            }
        }

        i {
            font-weight: bold;
            font-size: 18px;
        }

        .c-d-title {
            color: #222;
            font-weight: 500;
        }
    }

    .opt-bar {
        min-height: 32px;
        display: flex;
        justify-content: space-between;

        .num-uptime {
            display: flex;
            align-items: flex-end;
            font-size: 13px;
            color: #9499A0;
        }

        .opt {
            display: flex;

            .opt-btn {
                margin-left: 8px;
            }

            .i {
                margin-right: 4px;
            }

            .opt-list {
                padding: 5px;

                .opt-item {
                    min-width: 60px;
                    border-radius: 6px;
                    padding: 5px 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    font-size: 13px;
                    color: #18191C;
                    transition: .3s;

                    &:hover {
                        background-color: #eee;
                        color: #00a1d6;
                    }
                }
            }
        }
    }

    .m-v {
        // max-height: 175px;
        width: 102%;
        margin-top: 18px;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;

        @media (min-width: 1420px) {
            .m-v-item {
                width: 196px !important;
            }
        }

        .m-v-item {
            position: relative;
            width: 201px;
            margin-right: 15px;
            margin-bottom: 22px;
            border-radius: 6px;
            box-sizing: border-box;
            overflow: hidden;

            .v-sort {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 2;
                padding: 2px 10px;
                border-radius: 6px 0 6px 0;
                background-color: rgba(0, 0, 0, .5);
                color: white;
                font-size: 12px;
            }

            .v-drag {
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
                height: 30px;
                width: 100%;
                background-color: white;
                border: 1px solid #eee;
                box-sizing: border-box;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: move;
                transition: .3s;
                transform: translateY(-100%);

                i {
                    color: #9499A0;
                    font-size: 20px;
                }
            }

            &:hover {
                .v-drag {
                    transform: translateY(0);
                }
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

.v-time-opt {
    margin-top: 3px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #9499A0;
    font-size: 13px;

    .v-opt {
        i {
            font-size: 14px;
            cursor: pointer;

            &:hover {
                color: #00a1d6;
            }
        }

        .item-opt-list {

            padding: 5px;

            .opt-item {
                min-width: 40px;
                border-radius: 6px;
                padding: 5px 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 13px;
                color: #18191C;
                transition: .3s;

                &:hover {
                    background-color: #eee;
                    color: #00a1d6;
                }
            }
        }
    }


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

.no-video-tips {
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

.moving {
    // border: 2px dashed #eee;

    .v-sort,
    .v-drag,
    .v {
        opacity: 0;
    }


}

.opt-list {
    padding: 5px;

    .opt-item {
        min-width: 60px;
        border-radius: 6px;
        padding: 5px 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 13px;
        color: #18191C;
        transition: .3s;

        &:hover {
            background-color: #eee;
            color: #00a1d6;
        }
    }
}

.item-opt-list {

    padding: 5px;

    .opt-item {
        min-width: 40px;
        border-radius: 6px;
        padding: 5px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 13px;
        color: #18191C;
        transition: .3s;

        &:hover {
            background-color: #eee;
            color: #00a1d6;
        }
    }
}
</style>