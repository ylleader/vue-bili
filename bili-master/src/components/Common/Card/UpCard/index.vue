<template>
    <div class="up-card">
        <div class="up-background"></div>
        <div class="up-card-content">
            <div class="content-left">
                <router-link class="up-avatar" to="/up/1111">
                    <img src="/2.jpg" alt="...">
                </router-link>
            </div>
            <div class="content-right">
                <div class="up-name">
                    <router-link class="name" :title="'12138111111111111111111111111111111111111111111111111111111111'"
                        to="/up/1111">{{
    '12138111111111111111111111111111111111111111111111111111111111'
                        }}</router-link>
                    <span class="level">
                        <svg width="26" height="26">
                            <use :xlink:href="`#icon-ic_userlevel_${4}`"></use>
                        </svg>
                    </span>
                    <span class="vip">
                        大会员
                    </span>
                </div>
                <div class="up-c-f-l">
                    <span class="c-f-l"><span class="num">{{ 123 }}</span> 关注</span>
                    <span class="c-f-l"><span class="num">{{ 123 }}</span> 粉丝</span>
                    <span class="c-f-l"><span class="num">{{ 123 }}</span> 点赞</span>
                </div>
                <div class="up-signature" :title="'你的支持就是我最大的动力！个人up，商务合作+'">
                    {{ '你的支持就是我最大的动力！' }}
                </div>
                <div class="follow-btn">
                    <i class="iconfont icon-jiahao"></i>
                    <span>关注</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UpCard',
    props: {
        upId: {
            type: [String, Number],
            default: ''
        }
    },
    watch: {
        upId: {
            immediate: true,
            handler(val) {
                //do...
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.up-card {
    width: 380px;
    border-radius: 6px;
    overflow: hidden;
    cursor: default;

    .up-background {
        height: 80px;
        background-image: url('@/assets/images/up/up-bg-000.webp');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
    }

    .up-card-content {
        display: flex;
        padding: 15px 12px 20px 15px;

        .content-left {
            margin-right: 8px;

            .up-avatar {
                img {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    object-fit: cover;
                }
            }
        }

        .content-right {
            flex: 1;

            .up-name {
                display: flex;
                height: 22px;
                font-size: 14px;

                align-items: center;

                .name {
                    max-width: 158px;
                    color: #FB7299;
                    font-weight: 600;
                    letter-spacing: 1px;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .level, .vip {
                    display: flex;
                    align-items: center;
                }

                .level {
                    margin-left: 3px;
                    height: 28px;
                    width: 28px;
                }

                .vip {
                    font-size: 12px;
                    height: 16px;
                    line-height: 16px;
                    color: white;
                    background-color: #fb7299;
                    border-radius: 3px;
                    padding: 0 6px;
                }
            }

            .up-c-f-l {
                margin-top: 8px;

                .c-f-l {
                    margin-right: 14px;
                    font-size: 12px;
                    color: #9499A0;

                    .num {
                        color: #18191C;
                    }
                }

            }

            .up-signature {
                margin-top: 10px;
                font-size: 12px;
                // line-height: 16px;
                // height: 44px;
                color: #9499A0;
                word-break: break-all;
                overflow: hidden;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 3;
                white-space: normal;
            }

            .follow-btn {
                margin-top: 12px;
                height: 30px;
                width: 80%;
                border-radius: 4px;
                background-color: #00AEEC;
                cursor: pointer;
                color: white;
                text-align: center;
                line-height: 30px;

                i,
                span {
                    font-size: 13px;
                }

                i {
                    margin-right: 3px;
                }

                &:hover {
                    background-color: #00b8f6;
                }
            }
        }

    }
}
</style>