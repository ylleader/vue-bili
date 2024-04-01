<template>
    <div class="ranking-item-box">
        <div class="ranking-item-content">
            <i :class="'iconfont ' + 'icon-number-' + ranking "></i>
            <router-link class="ranking-link" :to="link" :title="title">
                <div class="ranking-img-box" v-if="imgSrc">
                    <img :src="imgSrc" alt="">
                    <span
                        class="ranking-img-title">{{title}}
                    </span>
                </div>
                <span class="ranking-title" v-if="!imgSrc">
                    {{title}}
                </span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RankingItem',
    props: {
        ranking: {
            type: [String, Number],
            default: '0'
        },
        imgSrc: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        link: {
            type: [String, Object],
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.ranking-item-box {
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 8px;


    &:nth-child(odd) {
        background-color: #F6F7F8;
    }

    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3) {
        i {
            color: #ff473d;
        }
    }

    i {
        color: #C9CCD0;
    }

    .ranking-item-content {
        font-size: 14px;
        line-height: 15px;
        width: 100%;

        display: flex;
        align-items: center;


        i {
            font-size: 15px;
            font-weight: bold;
            margin-right: 8px;
            flex-shrink: 0;
        }

        .ranking-link {
            padding: 15px 0;
            color: #18191C;
            cursor: pointer;
            display: flex;
            align-items: center;
            overflow: hidden;
         

            &:hover {
                color: #02b5da;
            }

            .ranking-img-box {
                display: flex;
                align-items: center;

                img {
                    width: 92px;
                    height: 56px;
                    object-fit: cover;
                    border-radius: 6px;
                    margin-right: 6px;
                    vertical-align: bottom;
                    overflow: hidden;
                }

                .ranking-img-title {
                    vertical-align: top;
                    line-height: 1.4;
                    white-space: normal;
                    word-break: break-all;
                    overflow: hidden;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    white-space: normal;
                    letter-spacing: 2px;
                }
            }


            .ranking-title {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;     
            }

        }


    }

}
</style>

