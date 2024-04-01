<template>
  <div class="channer">
    <div class="channer-icons">
      <router-link class="channer-icons-item" to="123">
        <div class="icon-bg icon-bg1">
          <i class="iconfont icon-weibiaoti-"></i>
        </div>
        <div class="title">动态</div>
      </router-link>
      <router-link class="channer-icons-item" to="123">
        <div class="icon-bg icon-bg2">
          <i class="iconfont icon-huo"></i>
        </div>
        <div class="title">热门</div>
      </router-link>
      <router-link class="channer-icons-item" to="123">
        <div class="icon-bg icon-bg3">
          <i class="iconfont icon-caozuo-pindaojia"></i>
        </div>
        <div class="title">频道</div>
      </router-link>
    </div>

    <div class="channer-left">
      <router-link class="channer-link-left" v-for="(item, index) in linkL" :key="index" :to="item.link"
        :target="linkTarget" active-class="link-left-active">
        {{ item.title }}
      </router-link>
    </div>

    <div class="channer-right">
      <router-link class="channer-link-right" v-for="(item, index) in linkR" :key="index" to="123">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </router-link>
    </div>

  </div>
</template>

<script>
export default {
  name: "Channel",
  props: {
    linkTarget: {
      type: String,
      default: '_self'
    }
  },
  data() {
    return {
      // linkR: [,'活动','社区中心','直播','课堂',''],
      linkR: [
        {
          title: "专栏",
          icon: ["iconfont", "icon-weimingmingwenjianjia_lanmu"],
        },
        {
          title: "活动",
          icon: ["iconfont", "icon-huodong"],
        },
        {
          title: "直播",
          icon: ["iconfont", "icon-zhibo"],
        },
        {
          title: "课堂",
          icon: ["iconfont", "icon-ketang"],
        },
        {
          title: "新歌热榜",
          icon: ["iconfont", "icon-yinle"],
        },
        {
          title: "社区中心",
          icon: ["iconfont", "icon-Community"],
        }
      ],
      linkL: [
        {
          title: "番剧",
          link: '/channel/anime',
        },
        {
          title: "国创",
          link: '/channel/guochuang',
        }, {
          title: "美食",
          link: '/channel/food',
        }, {
          title: "综艺",
          link: '/channel/variety',
        }, {
          title: "动画",
          link: '/channel/donhua',
        }, {
          title: "鬼畜",
          link: '/channel/guichu',
        }, {
          title: "娱乐",
          link: '/channel/entertainment',
        }, {
          title: "科技",
          link: '/channel/tech',
        }, {
          title: "电影",
          link: '3',
        }, {
          title: "电视剧",
          link: '4',
        }, {
          title: "纪录片",
          link: '/channel/documentary',
        }, {
          title: "游戏",
          link: '6',
        }, {
          title: "音乐",
          link: '7',
        }, {
          title: "影视",
          link: '8',
        }, {
          title: "知识",
          link: '9',
        }, {
          title: "资讯",
          link: '10',
        }, {
          title: "生活",
          link: '2',
        }, {
          title: "时尚",
          link: '2',
        }, {
          title: "汽车",
          link: '2',
        }, {
          title: "运动",
          link: '2',
        }, {
          title: "舞蹈",
          link: '2',
        }, {
          title: "更多",
          icon: ["iconfont", "icon-changyongicon-"],
          link: '2',
        },
      ],
      num: 22,
    };
  },
  methods: {},
  mounted() { },
};
</script>

<style lang="scss" scoped>
.channer {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #61666d;
  font-size: 14px;
  letter-spacing: 2px;
  // padding: var(--layout-padding);

  @media (max-width: 1366.9px) {
    .channer-icons {
      width: 168px;
    }
  }

  @media (min-width: 1367px) {
    .channer-icons {
      width: 210px;
    }
  }

  .channer-icons {

    margin-right: 16px;
    flex-shrink: 1;
    display: flex;
    justify-content: space-around;

    .channer-icons-item {
      border-radius: 50%;
      text-align: center;
      font-size: 14px;
      color: #61666d;
      cursor: pointer;

      // .title {
      //   width: 46px;
      // }

      .icon-bg {
        margin-bottom: 6px;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        line-height: 46px;

        i {
          color: white;
          font-weight: bold;
          font-size: 22px;
          letter-spacing: 0px;
        }
      }

      .icon-bg1 {
        background-color: #ff9212;
      }

      .icon-bg2 {
        background-color: #f07775;
      }

      .icon-bg3 {
        background-color: #59ca73;
      }
    }
  }

  .channer-left {
    flex: 1;
    padding-right: 22px;
    border-right: 1px solid #e3e5e7;
    height: 66px;
    // min-width: 600px;

    display: grid;
    grid-template-columns: repeat(11, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 10px;
    grid-row: 1;

    .channer-link-left {
      display: block;
      text-align: center;
      line-height: 26px;
      height: 26px;
      color: #61666d;
      background-color: #f6f7f8;
      border-radius: 6px;
      border: 1px solid transparent;
      text-overflow: ellipsis;
      white-space: nowrap;

      &:hover {
        background-color: rgb(224, 226, 228);
      }

    }

    .link-left-active {
      color: #00aeec;
    }
  }

  @media (min-width: 1367px) and (max-width: 1700.9px) {
    .channer-right {
      width: 240px;
    }
  }

  @media (min-width: 1100px) and (max-width: 1366.9px) {
    .channer-right {
      width: 230px;
    }
  }

  @media (min-width: 2200px) {
    .channer-right {
      width: 258px;
    }
  }

  @media (max-width: 1099.9px) {
    .channer-right {
      width: 168px;

      i {
        display: none !important;
      }
    }
  }

  .channer-right {
    // width: 240px;
    height: 66px;

    grid-column: span 1;
    grid-row-gap: 10px;
    grid-auto-flow: column;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    flex-shrink: 0;

    .channer-link-right {
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      color: #61666d;

      &:hover {
        color: #02b5da;
      }

      span {
        margin-left: 3px;
      }
    }
  }

  // }
}
</style>

