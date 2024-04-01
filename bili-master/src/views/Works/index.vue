<template>
    <div class="works">

        <MinHeader color="#343434" hoverColor="#02B5DA" bgColor="white" :bgChange="false"></MinHeader>

        <div class="w">
            <div class="nav">
                <router-link class="ud-btn" to="/works/upload">
                    <BButton width="100%" height="40px">投稿</BButton>
                </router-link>
                <router-link class="nav-item" :class="{ active: navActive === n.id }" v-for="n in navList" :key="n.id" @click="navActive = n.id" :to="n.route">
                    <i class="iconfont" :class="n.icon" ></i>
                    <span>{{ n.title }}</span>
                </router-link>
            </div>
            <div class="main">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import MinHeader from '@/components/Header/MinHeader'
import BButton from '@/components/Common/Button'

export default {
    name: 'Works',
    components: { MinHeader, BButton },
    data() {
        return {
            navActive: 1,
            navList: [{
                id: 'upload',
                title: '首页',
                icon: 'icon-shouye',
                route: '/works/home'
            },
            {
                id: 'manager',
                title: '内容管理',
                icon: 'icon-weimingmingwenjianjia_lanmu',
                route: '/works/manager'
            },
            {
                id: 'data',
                title: '数据中心',
                icon: 'icon-shujukanban',
                route: '/works/datacenter'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
.header-contianer {
    height: var(--min-header-top);
}

.w {
    height: 100vh;
    padding-top: var(--min-header-top);
    box-sizing: border-box;

    .nav {
        position: fixed;
        left: 0;
        z-index: 2;
        top: var(--min-header-top);
        width: 200px;
        height: 100%;
        box-sizing: border-box;
        box-shadow: 1px 0 4px rgba(0, 0, 0, .1);
        // overflow-y: auto;
        background-color: #fff;

        .nav-item {
            height: 50px;
            padding: 0 24px;
            display: flex;
            align-items: center;
            font-size: 15px;
            color: #18191c;
            cursor: pointer;

            i {
                margin-right: 16px;
                font-size: 18px;
                font-weight: bold;
            }

            &:hover {
                background-color: #f3f4f5;
            }
        }

        .ud-btn {
            display: flex;
            padding: 20px 24px 5px 24px;
        }

        .active {
            color: #00a1d6;
        }
    }

    .main {
        min-height: 100%;
        background-color: #f6f7f8;
        margin-left: 200px;
    }
}
</style>