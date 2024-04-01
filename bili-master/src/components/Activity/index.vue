<template>
    <!-- <div class="ratio-box"> -->
    <div class="activity-box">
        <div class="act-left">
            <div class="act-title">
                {{ '音乐全品类投稿 + 直播双赛道！瓜分万元奖金' }}
            </div>
            <div class="act-des">
                {{ '本视频参加过[夏日音浪大作战]活动，该活动已结束~' }}
            </div>
        </div>
        <div class="act-right">
            <img :src="require('@/assets/images/activity/act-001.png')" alt="">
        </div>
    </div>
    <!-- </div> -->
</template>

<script>
export default {
    name: 'Activity',
    props: {
        src: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.ratio-box {
    width: 100%;
    position: relative;
    padding-top: 15.269%;
}

.activity-box {
    height: 100px;
    width: 100%;
    border: 1px solid #E3E5E7;
    border-radius: 6px;
    box-sizing: border-box;
    display: flex;
    overflow: hidden;

    .act-left {
        padding: 0 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;
        flex: 1;

        .act-title,
        .act-des {
            max-height: 20px;
            font-size: 14px;
            line-height: 20px;
            font-weight: bold;
            letter-spacing: 1px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .act-des {
            font-weight: 500;
        }
    }

    .act-right {
        position: relative;
        width: 320px;
        height: 100px;
        flex-shrink: 0;

        &::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 0) 100%);
        }

        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>