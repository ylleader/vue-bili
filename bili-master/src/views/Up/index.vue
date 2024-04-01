<template>
  <div class="up-page">
    <div class="header-contianer">
      <MinHeader color="#343434" hoverColor="#02B5DA" bgColor="white" :bgChange="false"></MinHeader>
    </div>
    <div class="h">
      <div class="wrapper">
        <div class="up-background" :style="{ backgroundImage: `url(${bgImgUrl})` }">
          <div class="back-theme-trigger" title="更换背景" @click="drawerShow = !drawerShow" v-if="self"></div>
          <div class="up-bg">
            <div class="up">
              <div class="up-avatar">
                <img :src="upInfo.avatar" alt="avatar" v-if="upInfo.avatar">
                <a class="set-avatar" v-if="self" href="/upcenter">更换头像</a>
              </div>
              <div class="up-basic">
                <div class="up-b-info">
                  <span class="up-nickname">
                    {{ upInfo.nickname }}
                  </span>
                  <span class="up-level">
                    <svg width="30" height="30">
                      <use :xlink:href="`#icon-ic_userlevel_${upInfo.level}`">
                      </use>
                    </svg>
                  </span>
                  <span class="up-vip" :class="{ vip: upInfo.vip > 0 }">
                    大会员
                  </span>
                </div>
                <div class="up-p-signature">
                  <input type="text" placeholder="编辑个性签名" maxlength="60" v-model="perSin" @blur="setPerSin" v-if="self">
                  <h4 v-else>{{ upInfo.signature || '这家伙什么也没留下...' }}</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="follow-news" v-if="!self">
            <div class="f-n-btn">
              <BButton width="80px" height="36px" padding="0" style="border-width:3px" borderColor="rgba(255,255,255,.6)"
                activeBorderColor="white" type="pink" @click="loginJudge">关注
              </BButton>
            </div>
            <div class="f-n-btn">
              <BButton width="80px" height="36px" padding="0" style="border-width:3px" type="t-black" @click="loginJudge">
                发消息</BButton>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="nav">
      <div class="wrapper">
        <div class="nav-bar">
          <div class="n-b-left">
            <Tabs v-model="tabActiveName" @tabClick="test">
              <TabPanel lable="主页" name="home"></TabPanel>
              <TabPanel lable="动态" name="dynamic"></TabPanel>
              <TabPanel lable="投稿" name="video"></TabPanel>
              <TabPanel lable="合集和列表" name="collections"></TabPanel>
              <TabPanel lable="收藏"></TabPanel>
              <TabPanel lable="订阅"></TabPanel>
              <TabPanel lable="设置" name="setting"></TabPanel>
            </Tabs>
            <div class="n-b-search">
              <input type="text" placeholder="搜索视频、动态">
              <i data-v-2d32c4cc="" class="iconfont icon-sousuo"></i>
            </div>
          </div>
          <div class="n-b-right">
            <div class="data-statistics">
              <div class="d-s-item">
                <div class="d-s-data">关注数</div>
                <div class="d-s-count">6</div>
              </div>
              <div class="d-s-item">
                <div class="d-s-data">粉丝数</div>
                <div class="d-s-count">1</div>
              </div>
              <div class="d-s-item">
                <div class="d-s-data">获赞数</div>
                <div class="d-s-count">100w</div>
              </div>
              <div class="d-s-item">
                <div class="d-s-data">播放数</div>
                <div class="d-s-count">26</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="m">
      <div class="wrapper">
        <div class="m-area">
          <transition name="up">
            <router-view>
            </router-view>
          </transition>
        </div>
      </div>
    </div>
    <Drawer :visible.sync="drawerShow" :mask="false" title="选择背景" direction="btt" size="372px"
      :beforeClose="beforeDrawerClose">
      <div class="wrapper">
        <div class="bg-s-panel">
          <div class="bg-item" v-for="(item, index) in bgList" :key="index" @click="changeBgImg(item.src, index)">
            <Card :mask="true" width="290px" height="90px" class="bg-card" ref="bgItem">
              <div class="bg-img">
                <img :src="item.src" :alt="index">
              </div>
              <div slot="mask" class="bg-info">
                <div class="bg-title">{{ item.title }}</div>
                <div class="bg-s">
                  <div class="s-btn" @click="useBgImg(item.src)">
                    使用
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Drawer>
    <Rocket></Rocket>
  </div>
</template>

<script>
import Rocket from '@/components/Rocket'
import Drawer from '@/components/Common/Drawer'
import Card from '@/components/Common/Card/Card'
import MinHeader from '@/components/Header/MinHeader'
import BButton from '@/components/Common/Button'
import Confirm from '@/components/Common/Dialog/Confirm'
import Tabs from '@/components/Tabs'
import TabPanel from '@/components/Tabs/TabPanel'
import loginMixin from '@/mixins/login'
import upMixin from '@/mixins/up'
import { getUpInfo, updateUser } from '@/api/user'


import { mapState, mapActions } from 'vuex'


export default {
  name: 'Up',
  mixins: [loginMixin, upMixin],
  components: {
    Rocket, MinHeader, Drawer, Card, Confirm, Tabs, TabPanel, BButton
  },
  data() {
    return {
      perSin: '',

      drawerShow: false,

      bgImgUrl: require('@/assets/images/up/up-bg-000.webp'),
      backgroundImgUrl: require('@/assets/images/up/up-bg-000.webp'),
      bgList: [
        {
          title: 'bilibili春',
          src: require('@/assets/images/up/up-bg-000.webp')
        },
        {
          title: '漫游仙境',
          src: require('@/assets/images/up/up-bg-001.webp')
        },
        {
          title: '下课后',
          src: require('@/assets/images/up/up-bg-002.webp')
        },
        {
          title: '成为偶像',
          src: require('@/assets/images/up/up-bg-003.webp')
        },
        {
          title: '4',
          src: require('@/assets/images/up/up-bg-004.webp')
        },
        {
          title: '5',
          src: require('@/assets/images/up/up-bg-005.webp')
        },
        {
          title: '6',
          src: require('@/assets/images/up/up-bg-006.webp')
        },
        {
          title: '7',
          src: require('@/assets/images/up/up-bg-007.webp')
        },
        {
          title: '8',
          src: require('@/assets/images/up/up-bg-008.webp')
        },
        {
          title: '9',
          src: require('@/assets/images/up/up-bg-009.webp')
        },
        {
          title: '10',
          src: require('@/assets/images/up/up-bg-010.webp')
        },
        {
          title: '11',
          src: require('@/assets/images/up/up-bg-011.webp')
        },
        {
          title: '12',
          src: require('@/assets/images/up/up-bg-012.webp')
        },
        {
          title: '13',
          src: require('@/assets/images/up/up-bg-013.webp')
        },
        {
          title: '14',
          src: require('@/assets/images/up/up-bg-014.webp')
        },
      ],

      tabActiveName: this.$route.fullPath.split('/')[3]?.split('?')[0],
    }
  },
  watch: {
    backgroundImgUrl(val) {
      this.bgImgUrl = val
    },
    $route() {
      this.$nextTick(() => {
        if (this.$route.query.sy) {
          window.scrollTo(0, this.$route.query.sy)
        }
      })
      this.tabActiveNameInit()
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.upId) {
      next()
    } else {
      next('/')
    }
  },
  methods: {
    ...mapActions('user', ['setPersonalSignature', '']),
    async setPerSin() {
      if (this.perSin !== this.upInfo.signature) {
        await updateUser({ user: { signature: this.perSin } })
        await this.getUpInfo(this.upId)
      }
    },
    beforeDrawerClose(done) {
      if (this.bgImgUrl !== this.backgroundImgUrl) {
        this.$confirm('已选择背景还未保存，确认离开？', '确认提示').then(() => {
          this.bgImgUrl = this.backgroundImgUrl
          done()
        }).catch(() => {
        })
      } else {
        done()
      }
    },
    changeBgImg(src, index) {
      this.$refs.bgItem.forEach((item, i) => {
        if (index === i) {
          item.$el.classList.add('bg-card-active')
        } else {
          item.$el.classList.remove('bg-card-active')
        }
      })
      this.bgImgUrl = src
    },
    useBgImg(val) {
      this.backgroundImgUrl = val
      this.drawerShow = false
    },
    async initUpInfo() {
      await this.getUpInfo(this.upId)
      this.perSin = this.upInfo.signature
    },
    test(name) {
      if (name == 'home') {
        if (this.$route.fullPath === `/up/${this.$route.params.upId}`) return
        this.$router.push({
          path: `/up/${this.$route.params.upId}`,
          query: {
            sy: document.documentElement.scrollTop
          }
        }, err => {
        })
      } else {
        if (this.$route.fullPath === `/up/${this.$route.params.upId}/${name}`) return
        this.$router.push({
          path: `/up/${this.$route.params.upId}/${name}`,
          // name: 'up-dynamic',
          query: {
            sy: document.documentElement.scrollTop
          }
        }, err => {
        })
      }
    },
    tabActiveNameInit() {
      const taname = this.$route.fullPath.split('/')[3]?.split('?')[0]

      if (!taname) {
        this.tabActiveName = 'home'
      } else if (taname == 'collectionsdetail') {
        this.tabActiveName = 'collections'
      } else {
        this.tabActiveName = taname
      }
    }
  },
  created() {
    this.initUpInfo()
    this.tabActiveNameInit()
  },
  mounted() {
    // setTimeout(() => {
    //   this.tabActiveName = 'collections'
    // }, 3000); 
  }
}
</script>

<style lang="scss" scoped>
.up-enter,
.up-leave-to {
  opacity: 0;
}

.up-enter-to,
.up-leave {
  opacity: 1;
}

.up-enter-active {
  transition: .5s;
}


.up-page {
  // background-color: rgb(244, 245, 247);
}

.header-contianer {
  height: var(--min-header-top);
}

@media (min-width: 1420px) {
  .wrapper {
    width: 1283px !important;
  }
}

.wrapper {
  width: 1101px;
  margin: 0 auto;
  position: relative;
}

.up-background {
  position: relative;
  height: 192px;
  background-image: url('@/assets/images/up/up-bg-000.webp');
  background-position: 50%;
  background-size: cover;
  transition: background-image .2s ease, background-size 1s ease;

  .back-theme-trigger {
    position: absolute;
    right: 0;
    top: 0;
    width: 58px;
    height: 49px;
    background-image: url('@/assets/images/up/theme-trigger-new.png');
    background-repeat: no-repeat;
    background-position-x: 0;
    transition: .1s steps(9);
    cursor: pointer;

    &:hover {
      background-position-x: -522px;
    }
  }

  .up-bg {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABQAAAABdCAMAAADNEjtLAAABEVBMVEUDAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAAADAACnjvHuAAAAW3RSTlMBAgMEBQYHCAkKCwwNDxAREhQVFhgZGxweHyEiJCUnKSosLS8xMjQ2ODk7PT5AQkNFR0hKTE5PUVNUVldZW1xeX2FiZGVnaGprbG5vcHFzdHV2d3h5ent8fX5/XoZ4lgAAAPVJREFUeAHt1AERADAQAiDdrX/mDyKEIAAAjGkDsOk3AAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECAgQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQECCBBAgAACBBAggAABBAggQAABAggQQIAAAgQQIIAAAQQIIEAAAQIIEECAAAIEECCAAAEECCBAAAECCBBAgAACBAQIIEAAAQIseAEYdZ9sAcJDX4ICAAAAAElFTkSuQmCC);
    background-repeat: repeat-x;
  }

  .up {
    padding: 8px 0 16px 20px;
    // width: 100%;
    height: 60px;
    display: flex;

    .up-avatar {
      position: relative;
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 50%;
      background-image: url('data: image/gif;base64,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');
      background-size: cover;
      box-shadow: 0 0 0 2px rgba(255, 255, 255, .4);

      &:hover .set-avatar {
        opacity: 1;
      }

      // &::after {
      //   content: '更换头像';
      //   position: absolute;
      //   left: 0;
      //   top: 0;
      //   width: 100%;
      //   height: 100%;
      //   border-radius: 50%;
      //   background-color: rgba(0, 0, 0, .3);
      //   display: flex;
      //   align-items: center;
      //   justify-content: center;
      //   color: white;
      //   font-size: 12px;
      //   opacity: 0;
      //   transition: .3s;
      // }

      .set-avatar {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: rgba(0, 0, 0, .3);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 12px;
        opacity: 0;
        transition: .3s;
        cursor: pointer;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }
    }

    .up-basic {
      margin-left: 20px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .up-b-info {
        margin-left: 7px;
        display: flex;
        align-items: center;

        span {
          margin-right: 10px;
        }

        .up-nickname {
          font-weight: bold;
          line-height: 18px;
          font-size: 18px;
          color: white;
        }

        .up-level {
          height: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .up-vip {
          font-size: 13px;
          color: #99a2aa;
          background-color: #ccd0d7;
          border-radius: 3px;
          padding: 0 6px;
          cursor: pointer;
        }

        .up-vip.vip {
          color: white;
          background-color: #fb7299;
        }
      }

      .up-p-signature {

        h4 {
          height: 26px;
          width: 730px;
          display: flex;
          align-items: center;
          color: white;
          padding: 0 6px;
          font-size: 13px;
          font-weight: 500;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          letter-spacing: 0.5px;
        }

        input {
          height: 26px;
          width: 730px;
          color: white;
          outline: none;
          border: none;
          background-color: transparent;
          border-radius: 4px;
          padding: 0 6px;
          font-size: 13px;
          letter-spacing: 0.5px;
          transition: .35s;

          &::placeholder {
            color: white;
          }

          &:hover {
            background-color: rgba(255, 255, 255, .2);
            box-shadow: 0 0 0 1px white;
          }

          &:focus {
            color: rgb(200, 200, 200);
            background-color: white;
            box-shadow: inset 0 2px 4px rgba(35, 54, 86, .3);

            &::placeholder {
              color: rgb(200, 200, 200);
            }
          }
        }
      }
    }

  }

  .follow-news {
    position: absolute;
    bottom: 15px;
    right: 20px;
    display: flex;

    .f-n-btn {
      margin-left: 10px;
    }
  }
}

.bg-s-panel {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .bg-item {
    margin: 3px 20px 20px 0;
    cursor: pointer;

    .bg-card {
      box-shadow: 0 0 0 3px rgba(0, 0, 0, .15);
      transition: .3s;
    }

    .bg-card-active {
      box-shadow: 0 0 0 3px rgba(2, 181, 218, 1);
    }

    .bg-img {
      width: 100%;
      height: 100%;

      img {
        width: inherit;
        height: inherit;
        object-fit: cover;
      }
    }

    .bg-info {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      box-sizing: border-box;
      padding: 8px;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;

      .s-btn {
        width: 54px;
        height: 24px;
        background-color: #00a1d6;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: #33b4de;
        }
      }
    }
  }
}

.nav {

  .nav-bar {
    height: 66px;
    padding: 0 20px;
    box-shadow: 0 0 0 1px #eee;
    border-radius: 0 0 6px 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .n-b-left {
      display: flex;
      align-items: center;
    }

    .n-b-search {
      // width: 135px;
      margin-left: 22px;
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
        width: 100%;
        flex-shrink: 1;
        height: 100%;
        box-sizing: border-box;
        border: none;
        outline: none;
        padding: 0 3px;
        font-size: 12px;
      }

      i {
        flex-shrink: 0;
        font-size: 20px;
        font-weight: bold;
        color: #9499A0;
        cursor: pointer;
      }

      &,
      i {
        transition: .3s;
      }
    }

    .n-b-right {

      .data-statistics {
        display: flex;

        .d-s-item {
          margin-left: 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 12px;
          cursor: pointer;

          &:hover {
            .d-s-data {
              color: #00a1d6;
            }

            .d-s-count {
              color: #00a1d6;
            }
          }

          .d-s-data {
            font-size: 13px;
            color: #9499A0;
            transition: .3s;
          }

          .d-s-count {
            margin-top: 2px;
            color: #18191C;
            transition: .3s;
          }

        }
      }
    }
  }

}

.m {
  margin-top: 10px;

  // .m-area {
  //   overflow: hidden;
  // }
}
</style>