<template>
    <div class="nav-search" :style="navSearchStyle" ref="navsearch">
        <input class="search-input" type="text" :style="inputStyle" v-model.trim="navSearch.value"
            :placeholder="navSearch.placeholder" @focus="inputFocus" @keydown.enter="search('')" ref="input">
        <div class="clear-sval-btn" v-show="navSearch.value" @click="navSearch.value = ''">
            <svg viewBox="0 0 1024 1024" width="16" height="16">
                <path d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462
                            0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102
                            447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499
                            12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997
                            9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727
                            c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415
                            c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221
                            c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093
                            l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924
                            0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z">
                </path>
            </svg>
        </div>
        <button @click="search('')">
            <i class="iconfont icon-sousuo"></i>
        </button>
        <div class="search-panel" v-show="searchPanelShow">
            <div class="search-history" v-if="searchHistorys.length">
                <div class="head">
                    <h4>搜索历史</h4>
                    <div class="delete-btn" @click="clearSearchHistorys(0, searchHistorys.length)">
                        清空
                    </div>
                </div>
                <div class="h-item-box" :style="{ maxHeight: searchHistoryBoxMaxHeigth }" ref="hBox">
                    <div class="h-item" v-for="(item, index) in searchHistorys" :key="index" @click="search(item)">
                        <span>{{ item }}</span>
                        <div class="clear-btn" @click.stop="clearSearchHistorys(index)">
                            <svg viewBox="0 0 1024 1024" width="14" height="14">
                                <path
                                    d="M512 64.303538c-247.25636 0-447.696462 200.440102-447.696462 447.696462
                                            0 247.254314 200.440102 447.696462 447.696462 447.696462s447.696462-200.440102
                                            447.696462-447.696462S759.25636 64.303538 512 64.303538zM710.491727 665.266709c12.491499
                                            12.491499 12.489452 32.729425-0.002047 45.220924-6.246261 6.246261-14.429641 9.370415-22.611997
                                            9.370415s-16.363689-3.121084-22.60995-9.366322L512 557.222971 358.730221 710.491727
                                            c-6.246261 6.246261-14.429641 9.366322-22.611997 9.366322s-16.365736-3.125177-22.611997-9.370415
                                            c-12.491499-12.491499-12.491499-32.729425 0-45.220924l153.268756-153.266709L313.50725 358.730221
                                            c-12.491499-12.491499-12.489452-32.729425 0.002047-45.220924s32.729425-12.495592 45.220924-0.004093
                                            l153.268756 153.268756 153.268756-153.268756c12.491499-12.491499 32.729425-12.487406 45.220924
                                            0.004093s12.493545 32.729425 0.002047 45.220924L557.225017 512 710.491727 665.266709z">
                                </path>
                            </svg>
                        </div>
                    </div>
                </div>
                <div class="h-more" v-if="searchHistoryBoxMLShow">
                    <span class="more-text" @click="searchHistoryBoxML = !searchHistoryBoxML">
                        <span>{{ searchHistoryBoxMLText }}</span>
                        <i class="iconfont icon-xiangxia2" v-if="!searchHistoryBoxML"></i>
                        <i class="iconfont icon-xiangshang2" v-if="searchHistoryBoxML"></i>
                    </span>
                </div>
            </div>
            <div class="search-hot">
                <h4>热搜</h4>
                <div class="serach-hot-box">
                    <div class="hot-box-left">
                        <div class="hot-item" v-for="(item, index) in hotListLeft" :key="index" :title="item.title"
                            @click="search(item.title)">
                            <span class="rank-num">{{ index + 1 }}</span>
                            <span class="rank-title">{{ item.title }}</span>
                            <img class="rank-icon" :src="hotType[item.type]" alt="" v-if="item.type != -1">
                        </div>
                    </div>
                    <div class="hot-box-right">
                        <div class="hot-item" v-for="(item, index) in hotListRight" :key="index" :title="item.title"
                            @click="search(item.title)">
                            <span class=" rank-num">{{ index + hotListRight.length + 1 }}</span>
                            <span class="rank-title">{{ item.title }}</span>
                            <img class="rank-icon" :src="hotType[item.type]" alt="" v-if="item.type != -1">
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'NavSearch',
    data() {
        return {
            navSearch: {
                value: '',
                placeholder: 'bilibili'
            },

            searchPanelShow: false,
            searchHistorys: JSON.parse(localStorage.getItem('searchHistorys')) || [],
            searchHistoryBoxMaxHeigth: '80px',
            searchHistoryBoxMLText: '展开更多',
            searchHistoryBoxML: false,
            searchHistoryBoxMLShow: false,

            hotList: [
                {
                    title: '爱情公寓3 13',
                    type: 0
                },
                {
                    title: '七十二家房客 发仔记/补鞋仔',
                    type: 0
                },
                {
                    title: '科目三 睡觉考试',
                    type: -1
                },
                {
                    title: '佛祖跟我许愿',
                    type: -1
                },
                {
                    title: '英雄联盟s12全球总决赛解说',
                    type: 1
                },
                {
                    title: '爱情公寓3 13',
                    type: -1
                },
                {
                    title: '爱情公寓3 13',
                    type: -1
                },
                {
                    title: '爱情公寓3 13',
                    type: -1
                },
                {
                    title: '爱情公寓3 13',
                    type: -1
                },
                {
                    title: '爱情公寓3 131111111111111111111111111',
                    type: -1
                },
            ],
            hotType: [
                require('@/assets/images/header/search/s-new.png'),
                require('@/assets/images/header/search/s-hot.png')
            ]

        }
    },
    computed: {
        navSearchStyle() {
            return {
                borderRadius: this.searchPanelShow ? '8px 8px 0 0' : '',
                borderBottom: this.searchPanelShow ? 'none' : ''
            }
        },
        inputStyle() {
            return {
                backgroundColor: this.searchPanelShow ? 'rgba(227,229,231,.85)' : ''
            }
        },
        hotListLeft() {
            return this.hotList.filter((item, index, arr) => {
                return index < arr.length / 2
            })
        },
        hotListRight() {
            return this.hotList.filter((item, index, arr) => {
                return index >= arr.length / 2
            })
        }
    },
    watch: {
        searchHistoryBoxML(val) {
            if (val) {
                this.searchHistoryBoxMaxHeigth = '160px'
                this.searchHistoryBoxMLText = '收起'
            } else {
                this.searchHistoryBoxMaxHeigth = '80px'
                this.searchHistoryBoxMLText = '展开更多'
            }
        },
        searchHistorys(val) {
            this.$nextTick(() => {
                this.setSearchHistoryBoxMLShow()
            })
        },
        searchPanelShow(val) {
            if (val) {
                this.$nextTick(() => {
                    this.setSearchHistoryBoxMLShow()
                })
            }
        }
    },
    methods: {
        inputFocus() {
            if (this.searchPanelShow) return
            this.searchPanelShow = true
            this.wclickEvent = (e) => {
                if (this.$refs.navsearch && !this.$refs.navsearch.contains(e.target)) {
                    this.searchPanelShow = false
                    window.removeEventListener('click', this.wclickEvent)
                    this.wclickEvent = null
                }
            }
            window.addEventListener('click', this.wclickEvent)
        },
        search(val) {

            //获取val
            val = val || this.navSearch.value || this.navSearch.placeholder

            //搜索记录持久化
            this.setSearchHistoryLocal(val)

            //跳转到搜索结果页面
            // this.$router.push({
            //     path: '/search',
            //     query: {
            //         val
            //     }
            // })

        },
        /**
         * 将搜索记录持久化到本地
         * @param {string} val      //要保存的记录
         * @param {array} list      //记录列表
         */
        setSearchHistoryLocal(val, list = this.searchHistorys) {
            //判断记录是否在列表中存在， 存在先将记录删除
            list.includes(val) && list.splice(list.indexOf(val), 1)
            //将记录从头部插入列表
            list.unshift(val)
            //将记录列表持久化到本地
            localStorage.setItem('searchHistorys', JSON.stringify(list))
        },
        clearSearchHistorys(index = -1, length = 1) {
            setImmediate(() => {
                this.searchHistorys.splice(index, length)
                localStorage.setItem('searchHistorys', JSON.stringify(this.searchHistorys))
            })
        },
        setSearchHistoryBoxMLShow() {
            if (this.$refs.hBox && this.$refs.hBox.scrollHeight > 92) {
                this.searchHistoryBoxMLShow = true
            } else {
                this.searchHistoryBoxMLShow = false
            }
        }
    },
    mounted() {
    }
}
</script>

<style lang="scss" scoped>
.nav-search {
    height: 40px;
    width: 500px;
    min-width: 180px;
    max-width: 800px;
    margin: 0 10px;
    padding: 0 4px;
    box-sizing: border-box;
    background-color: rgba(255, 255, 255, .85);
    // border: 1px solid #efefef;
    box-shadow: 0 0 2px rgba(0, 0, 0, .2);
    border-radius: 8px;
    display: flex;
    align-items: center;
    flex: auto;
    position: relative;

    &:hover {
        background-color: white;
    }

    .search-input {
        padding: 0 28px 0 12px;
        height: 32px;
        width: 0;
        box-sizing: border-box;
        border: none;
        border-radius: 6px;
        background-color: transparent;
        outline: none;
        display: block;
        flex: 1;

        font-size: 15px;

        &::placeholder {
            color: #999;
        }
    }

    .clear-sval-btn {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 50px;
        cursor: pointer;

        svg {
            fill: #C9CCD0
        }

        &:hover {
            svg {
                fill: #61666D;
            }
        }
    }

    button {
        // vertical-align: top;
        height: 32px;
        width: 32px;
        padding: 0;
        border: none;
        border-radius: 6px;
        margin-left: 6px;
        background-color: transparent;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        &:hover {
            background-color: #E3E5E7;
        }

        i {
            font-weight: bold;
            font-size: 18px;
            color: rgb(100, 100, 100);
        }
    }

    .search-panel {
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        top: 38px;
        left: 0;
        background-color: white;
        border-radius: 0 0 8px 8px;
        padding: 13px 16px 16px 16px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, .15);
        transition: .2s;

        .search-history {
            width: 100%;

            .head {
                display: flex;
                justify-content: space-between;

                // .title {
                //     height: 24px;
                //     font-size: 16px;
                //     line-height: 24px;
                //     color: #18191C;
                //     font-weight: bold;
                // }

                .delete-btn {
                    font-size: 12px;
                    line-height: 15px;
                    height: 15px;
                    color: #9499A0;
                    cursor: pointer;

                    &:hover {
                        color: #00AEEC;
                    }
                }
            }

            .h-item-box {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding-top: 12px;
                margin-bottom: 4px;
                max-height: 80px;
                overflow: hidden;
                transition: .3s;

                .h-item {
                    position: relative;
                    box-sizing: border-box;
                    height: 30px;
                    padding: 7px 10px 8px;
                    font-size: 12px;
                    letter-spacing: 1px;
                    line-height: 15px;
                    background: #F6F7F8;
                    color: gray;
                    border-radius: 4px;
                    margin-right: 10px;
                    margin-bottom: 10px;
                    cursor: pointer;

                    span {
                        display: inline-block;
                        max-width: 96px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    &:hover {
                        color: #00AEEC;
                    }

                    &:hover .clear-btn {
                        display: block;
                    }


                    .clear-btn {
                        display: none;
                        box-sizing: border-box;
                        position: absolute;
                        width: 16px;
                        height: 16px;
                        top: -6px;
                        right: -6px;
                        // padding: 2px;

                        svg {
                            width: 14px;
                            height: 14px;
                            fill: #ccc;
                        }
                    }
                }
            }

            .h-more {
                text-align: center;
                margin-bottom: 8px;
                // margin-top: 2px;

                .more-text {
                    font-size: 12px;
                    line-height: 15px;
                    height: 15px;
                    letter-spacing: 1px;
                    color: #9499A0;
                    cursor: pointer;

                    i {
                        font-size: 12px;
                    }

                    &:hover {
                        color: #00AEEC;
                    }
                }
            }
        }

        .search-hot {

            .serach-hot-box {
                display: flex;
                // justify-content: space-between;
                flex-wrap: wrap;

                .hot-box-left,
                .hot-box-right {
                    min-width: 160px;
                    flex: 1;
                }

                .hot-box-left {
                    margin-right: 20px;

                    .hot-item {

                        &:nth-child(1),
                        &:nth-child(2),
                        &:nth-child(3) {
                            .rank-num {
                                color: #ff473d;
                            }
                        }
                    }
                }

                .hot-item {

                    height: 38px;
                    box-sizing: border-box;

                    display: flex;
                    align-items: center;
                    font-size: 14px;
                    color: #18191c;
                    cursor: pointer;

                    padding: 0 6px;
                    border-radius: 8px;

                    // &:nth-child(odd) {
                    //     margin-right: 12px;
                    // }

                    &:hover {
                        background-color: #E3E5E7;
                    }

                    .rank-num {
                        margin-right: 8px;
                        color: #9499A0;
                        // font-weight: bold;
                    }

                    .rank-title {
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        margin-right: 8px;
                    }

                    .rank-icon {
                        width: 14px;
                    }
                }
            }
        }
    }
}
</style>