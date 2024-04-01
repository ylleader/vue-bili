<template>
  <div>
    <div class="header-contianer">
      <MinHeader color="#343434" hoverColor="#02B5DA" bgColor="white" :bgChange="false"></MinHeader>
    </div>
    <div class="v-container">
      <div class="v-left-container" :style="{ width: vLeftContainerWidth, minWidth: vLeftContainerWidth }">
        <div class="v-header">
          <h1 class="video-title">
            {{ title }}
          </h1>
          <div class="video-data">
            <div class="video-data-list">
              <div class="d-item">
                <img src="@/assets/images/video/view.svg" alt="">
                <span>123w</span>
              </div>
              <div class="d-item">
                <img src="@/assets/images/video/dm.svg" alt="">
                <span>12w</span>
              </div>
              <div class="d-item">
                <img src="@/assets/images/video/time.svg" alt="">
                <span>2022.09.01 20:20:20</span>
              </div>
            </div>
          </div>
        </div>
        <div class="v-wrap" :style="{ width: vwarpWidth }" ref="vwrap">

          <VideoPlayer :videoSrc="videoSrc" :borderRadius="'6px 6px 0 0'" :pipAuto="pipAuto" @end="videoEnd"
            @play="videoPlay" @videoDisappear="videoDisappear" @videoAppear="videoAppear" @pipOpen="pipOpen"
            @pipClose="pipClose" @widescreen="widescreen">

            <transition name="next-loading">
              <div class="rec-ratio-box" v-if="nextLoading">
                <div class="rec-container">
                  <router-link class="video-card-link" :to="{
                    path: '/video',
                    query: {
                      videoSrc: videoList[0].videoSrc,
                      up: videoList[0].up,
                      title: videoList[0].title
                    }
                  }">
                    <VideoCard :width="'250px'" :height="'140px'" :title="videoList[0].title" :up="videoList[0].up">
                      <div slot="img" class="video-img">
                        <div class="next-operation-bar">
                          <div class="next-close-btn" @click.stop.prevent="nextLoading = false">
                            取消连播
                          </div>
                        </div>
                        <div class="next-loading">
                          <div class="next-loading-bg">
                            <i class="iconfont icon-bofang"></i>
                          </div>
                          <svg width="60" height="60">
                            <circle :class="nextLoadingCircleClass" fill="none" stroke="white" stroke-width="4" cx="30"
                              cy="30" r="28" stroke-linecap="round" ref="nextLoadingCircle"></circle>
                          </svg>
                        </div>
                        <img :src="videoList[0].imgSrc" alt="">
                      </div>
                    </VideoCard>

                  </router-link>
                </div>
              </div>
            </transition>
          </VideoPlayer>


          <div class="v-sending-box">
            <div class="v-play-info">
              <span>已填装 {{ 123 }} 条弹幕</span>
            </div>
            <div class="v-sending-input">
              <input type="text" placeholder="发一条友善的弹幕">
              <button @click="loginJudge">发送</button>
            </div>
          </div>
        </div>
        <div class="v-toolbar">
          <div class="v-toolbar-left">
            <span class="v-toolbar-opt" title="点赞(Q)" @click="loginJudge">
              <svg width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M9.77234 30.8573V11.7471H7.54573C5.50932 11.7471 3.85742 13.3931 3.85742 15.425V27.1794C3.85742 29.2112 5.50932 30.8573 7.54573 30.8573H9.77234ZM11.9902 30.8573V11.7054C14.9897 10.627 16.6942 7.8853 17.1055 3.33591C17.2666 1.55463 18.9633 0.814421 20.5803 1.59505C22.1847 2.36964 23.243 4.32583 23.243 6.93947C23.243 8.50265 23.0478 10.1054 22.6582 11.7471H29.7324C31.7739 11.7471 33.4289 13.402 33.4289 15.4435C33.4289 15.7416 33.3928 16.0386 33.3215 16.328L30.9883 25.7957C30.2558 28.7683 27.5894 30.8573 24.528 30.8573H11.9911H11.9902Z">
                </path>
              </svg>
              <span>
                1234
              </span>
            </span>
            <span class="v-toolbar-opt" title="投币(W)" @click="loginJudge">
              <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="icon">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M14.045 25.5454C7.69377 25.5454 2.54504 20.3967 2.54504 14.0454C2.54504 7.69413 7.69377 2.54541 14.045 2.54541C20.3963 2.54541 25.545 7.69413 25.545 14.0454C25.545 17.0954 24.3334 20.0205 22.1768 22.1771C20.0201 24.3338 17.095 25.5454 14.045 25.5454ZM9.66202 6.81624H18.2761C18.825 6.81624 19.27 7.22183 19.27 7.72216C19.27 8.22248 18.825 8.62807 18.2761 8.62807H14.95V10.2903C17.989 10.4444 20.3766 12.9487 20.3855 15.9916V17.1995C20.3854 17.6997 19.9799 18.1052 19.4796 18.1052C18.9793 18.1052 18.5738 17.6997 18.5737 17.1995V15.9916C18.5667 13.9478 16.9882 12.2535 14.95 12.1022V20.5574C14.95 21.0577 14.5444 21.4633 14.0441 21.4633C13.5437 21.4633 13.1382 21.0577 13.1382 20.5574V12.1022C11.1 12.2535 9.52148 13.9478 9.51448 15.9916V17.1995C9.5144 17.6997 9.10883 18.1052 8.60856 18.1052C8.1083 18.1052 7.70273 17.6997 7.70265 17.1995V15.9916C7.71158 12.9487 10.0992 10.4444 13.1382 10.2903V8.62807H9.66202C9.11309 8.62807 8.66809 8.22248 8.66809 7.72216C8.66809 7.22183 9.11309 6.81624 9.66202 6.81624Z">
                </path>
              </svg>
              <span>
                1234
              </span>
            </span>
            <span class="v-toolbar-opt" title="收藏(E)" @click="loginJudge">
              <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="icon"
                style="fill:;">
                <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M19.8071 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z">
                </path>
              </svg>
              <span>
                12341w
              </span>
            </span>
            <Popover placement="top" mode="to-top" :top="-10">
              <div slot="reference" class="v-toolbar-opt" @click="copyUrl">
                <svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" class="icon">
                  <path
                    d="M12.6058 10.3326V5.44359C12.6058 4.64632 13.2718 4 14.0934 4C14.4423 4 14.78 4.11895 15.0476 4.33606L25.3847 12.7221C26.112 13.3121 26.2087 14.3626 25.6007 15.0684C25.5352 15.1443 25.463 15.2144 25.3847 15.2779L15.0476 23.6639C14.4173 24.1753 13.4791 24.094 12.9521 23.4823C12.7283 23.2226 12.6058 22.8949 12.6058 22.5564V18.053C7.59502 18.053 5.37116 19.9116 2.57197 23.5251C2.47607 23.6489 2.00031 23.7769 2.00031 23.2122C2.00031 16.2165 3.90102 10.3326 12.6058 10.3326Z">
                  </path>
                </svg>
                <div class="cp-box">
                  <div>
                    1234
                  </div>
                  <div>
                    点击复制链接
                  </div>
                </div>
              </div>
              <Card width="auto" height="auto" backgroundImage="none">
                <div class="share-card">
                  <div class="s-v-img" ref="shareCard">
                    <Card width="280px" height="157px">
                      <div class="v-img" :style="{ backgroundImage: `url(${'/v002.jpg'})` }">
                        <!-- <div class="v-des-mask"></div> -->
                        <div class="v-des">
                          {{
                            's13全球总决赛111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
                          }}
                        </div>
                      </div>
                    </Card>
                  </div>
                  <div class="s-link">
                    <div class="s-t">
                      <input type="checkbox">
                      <span>从xxx处开始分享</span>
                    </div>
                    <BButton size="12" @click="copyUrl">
                      获取视频分享连接
                    </BButton>
                  </div>
                  <div class="s-choose">
                    <div class="s-c-item" @click="copyUrl">
                      <img src="@/assets/images/video/share/dynamic.svg" alt="">
                      <span>动态</span>
                    </div>
                    <div class="s-c-item" @click="copyUrl">
                      <img src="@/assets/images/video/share/wechat.svg" alt="">
                      <span>微信</span>
                    </div>
                    <div class="s-c-item" @click="copyUrl">
                      <img src="@/assets/images/video/share/qq.svg" alt="">
                      <span>QQ</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Popover>
          </div>
        </div>
        <div class="adv">
          <Adv :src="advSrc"></Adv>
        </div>
        <div class="comment">
          <VideoComment></VideoComment>
        </div>
      </div>
      <div class="v-right-container">
        <div class="up-info">
          <div class="up-info-left">
            <Popover ref="upCard" width="380px" :top="10">
              <UpCard></UpCard>
              <router-link slot="reference" class="up-avatar" to="/up/11111" target="_blank">
                <img src="/2.jpg" alt="...">
              </router-link>
            </Popover>
          </div>
          <div class="up-info-right">
            <div class="up-name">
              <Popover ref="upCard" width="380px" :top="10">
                <UpCard></UpCard>
                <router-link slot="reference" class="name" to="/up/11111" target="_blank">
                  {{ up }}
                </router-link>
              </Popover>
            </div>
            <div class="up-signature" :title="'你的支持就是我最大的动力！个人up，商务合作+VX:tpf2235770146 QQ:2235770146'">
              {{ '你的支持就是我最大的动力！个人up，商务合作+VX:tpf2235770146 QQ:2235770146' }}
            </div>
            <div class="btn-panel">
              <div class="charge-btn" @click="loginJudge">充电</div>
              <div class="follow-btn" @click="loginJudge">
                <i class="iconfont icon-jiahao"></i>
                <span>关注</span>
              </div>
            </div>
          </div>
        </div>
        <div class="adv" :style="{ marginTop: radvMt }">
          <VideoPreviewCard mode="row" :width="'100%'" :imgSrc="minAdvSrc" title="每天建模一小时，自由接单做副业！" up="广告 建模免费公开课">
          </VideoPreviewCard>
        </div>
        <div class="anthology">
          <Anthology :defauleActiveIndex="p" v-if="p">
            <AnthologyItem v-for="(video, index) in videoList.concat(videoList)" :key="index" :title="video.title"
              @click="goTo('/video', { up: video.up, videoSrc: video.videoSrc, title: video.title, p: index + 1, sy: dom.documentElement.scrollTop })">
            </AnthologyItem>
          </Anthology>
        </div>
        <div class="next-list">
          <div class="next-list-head" v-if="!p">
            <span>接下来播放</span>
            <SwitchButton v-model="next" :text="'自动连播'"></SwitchButton>
          </div>
          <div class="next-list-container">
            <div :class="{ 'next-list-item': true, slv: !p }" v-for="(video, i) in videoList" :key="i">
              <VideoPreviewCard mode="row" :width="'100%'" :videoSrc="video.videoSrc" :imgSrc="video.imgSrc"
                :up="video.up" :title="video.title" dm="1982" play="1234"
                @vclick="goTo('/video', { up: video.up, videoSrc: video.videoSrc, title: video.title })"
                @uclick="goTo(`/up/${video.upId}`, '', 'blank')">
              </VideoPreviewCard>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SideBar :visible="sidebarShow">
      <SideBarItem @click="pipOC" :itemStyle="pipItemStyle">
        <svg slot="icon" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" class="fill"
            d="M12 4.99805C9.48178 4.99805 7.283 5.12615 5.73089 5.25202C4.6522 5.33949 3.81611 6.16351 3.72 7.23253C3.60607 8.4998 3.5 10.171 3.5 11.998C3.5 13.8251 3.60607 15.4963 3.72 16.7636C3.81609 17.8324 4.65266 18.6567 5.73154 18.7441C6.92356 18.8408 8.49741 18.9388 10.3047 18.979L10.4569 18.9822C10.871 18.9907 11.1998 19.3334 11.1913 19.7475C11.1828 20.1616 10.8402 20.4904 10.426 20.4819L10.2714 20.4787C8.42988 20.4377 6.82632 20.3378 5.61031 20.2392C3.81291 20.0935 2.38833 18.7032 2.22602 16.8979C2.10918 15.5982 2 13.8808 2 11.998C2 10.1153 2.10918 8.39787 2.22602 7.09822C2.38831 5.29311 3.81205 3.90269 5.60965 3.75692C7.19232 3.62858 9.43258 3.49805 12 3.49805C14.5677 3.49805 16.8081 3.62861 18.3908 3.75696C20.1882 3.90273 21.6118 5.2931 21.7741 7.09798C21.8566 8.0156 21.9352 9.141 21.9743 10.3859C21.9873 10.8 21.6622 11.1461 21.2482 11.1591C20.8342 11.1721 20.488 10.847 20.475 10.433C20.437 9.22209 20.3605 8.12621 20.2801 7.23229C20.184 6.16347 19.348 5.33951 18.2696 5.25205C16.7174 5.12618 14.5185 4.99805 12 4.99805Z">
          </path>
          <path fill-rule="evenodd" clip-rule="evenodd" class="fill"
            d="M17.8036 13.85C16.5966 13.85 15.496 13.8859 14.6736 13.9236C14.2535 13.9429 13.9314 14.2664 13.9107 14.6766C13.8781 15.3249 13.85 16.1353 13.85 17C13.85 17.8647 13.8781 18.6751 13.9107 19.3234C13.9314 19.7336 14.2535 20.0571 14.6736 20.0764C15.496 20.1141 16.5966 20.15 17.8036 20.15C19.0001 20.15 20.0922 20.1147 20.9124 20.0774C21.3358 20.0581 21.6693 19.7268 21.6908 19.3015C21.7259 18.6056 21.7571 17.7686 21.7571 17C21.7571 16.2314 21.7259 15.3944 21.6908 14.6985C21.6693 14.2732 21.3358 13.9419 20.9124 13.9226C20.0922 13.8853 19.0001 13.85 17.8036 13.85ZM17.8036 12.5C16.571 12.5 15.4491 12.5366 14.6117 12.575C13.5044 12.6258 12.6184 13.4966 12.5624 14.6087C12.529 15.2735 12.5 16.1072 12.5 17C12.5 17.8928 12.529 18.7265 12.5624 19.3913C12.6184 20.5034 13.5044 21.3742 14.6117 21.425C15.4491 21.4634 16.571 21.5 17.8036 21.5C19.0256 21.5 20.1388 21.464 20.9738 21.426C22.0935 21.375 22.9826 20.4879 23.039 19.3695C23.0747 18.6628 23.1071 17.8006 23.1071 17C23.1071 16.1994 23.0747 15.3372 23.039 14.6305C22.9826 13.5121 22.0935 12.625 20.9738 12.574C20.1388 12.536 19.0256 12.5 17.8036 12.5Z">
          </path>
          <path class="fill"
            d="M19.2501 16.4432C19.6787 16.6907 19.6787 17.3092 19.2501 17.5567L17.3215 18.6701C16.893 18.9176 16.3572 18.6083 16.3572 18.1134L16.3572 15.8865C16.3572 15.3916 16.893 15.0823 17.3215 15.3298L19.2501 16.4432Z">
          </path>
        </svg>
        <span slot="title">小窗</span>
      </SideBarItem>
      <SideBarItem type="backToTop"></SideBarItem>
    </SideBar>
  </div>
</template>

<script>
import MinHeader from '@/components/Header/MinHeader/index.vue';
import VideoPlayer from '@/components/Common/VideoPlayer/index.vue';
import SwitchButton from '@/components/Common/Button/SwitchButton'
import VideoPreviewCard from '@/components/Common/Card/VideoPreviewCard/index.vue';
import VideoCard from '@/components/Common/Card/VideoCard/index.vue';
import SideBar from '@/components/Common/SideBar/index.vue';
import SideBarItem from '@/components/Common/SideBar/SideBarItem/index.vue';
import Adv from "@/components/Adv";
import Popover from '@/components/Common/Popover/index.vue';
import Activity from "@/components/Activity";
import Anthology from "@/components/Anthology";
import AnthologyItem from "@/components/Anthology/AnthologyItem";
import Card from '@/components/Common/Card/Card'
import BButton from '@/components/Common/Button'
import UpCard from '@/components/Common/Card/UpCard'

import VideoComment from './VideoComment'

import loginMixin from '@/mixins/login'


export default {
  name: "Video",
  components: { MinHeader, VideoPlayer, SwitchButton, BButton, VideoPreviewCard, VideoCard, SideBar, SideBarItem, Popover, Adv, Activity, Anthology, AnthologyItem, Card, VideoComment, UpCard },
  mixins: [loginMixin],
  data() {
    return {
      dom: document,

      videoSrc: this.$route.query.videoSrc,   //视频地址
      title: this.$route.query.title,
      up: this.$route.query.up,
      p: this.$route.query.p,
      nextLoading: false,
      nextLoadingCircleClass: '',
      videoList: [
        {
          videoSrc: '/s0313.mp4',
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
        },
        {
          videoSrc: '/s0313.mp4',
          imgSrc: '/s03.jpg',
          title: '爱情公寓3 13',
          up: '发仔记'
        },
        {
          videoSrc: '/s0313.mp4',
          imgSrc: '/s03.jpg',
          title: '爱情公寓3 13',
          up: '发仔记'
        },
        {
          videoSrc: 'http://192.168.0.109:5500/ndmz.mp4',
          imgSrc: '/s03.jpg',
          title: '爱情公寓3 13',
          up: '发仔记'
        }
      ],
      //画中画数据
      pipColor: '#18191C',
      pipAuto: JSON.parse(localStorage.getItem('pipAuto')),

      sidebarShow: false,

      vLeftContainerWidth: '',
      vwarpWidth: '',
      radvMt: '',

      //广告数据
      advSrc: require(`@/assets/images/adv/adv-00${Math.ceil(Math.random() * 14)}.webp`),
      minAdvSrc: require(`@/assets/images/adv/adv-min-00${Math.ceil(Math.random() * 7)}.webp`)
    }
  },
  computed: {
    pipItemStyle() {
      return {
        '--color': this.pipColor,
      }
    },
    next: {
      get() {
        return this.$store.state.custom.next
      },
      set(val) {
        this.$store.dispatch('custom/setNext', val)
      }
    }
  },
  watch: {
    nextLoading(val) {
      if (val) {
        this.nextLoadingCircleClass = 'circle'
        this.$nextTick(() => {
          this.$refs.nextLoadingCircle.addEventListener('webkitAnimationEnd', () => {
            this.nextLoading = false
            this.$router.push({
              path: '/video',
              query: { up: this.videoList[0].up, videoSrc: this.videoList[0].videoSrc, title: this.videoList[0].title }
            })
          })
        })
      } else {
        this.nextLoadingCircleClass = ''
      }
    },
    $route() {
      this.videoSrc = this.$route.query.videoSrc
      this.title = this.$route.query.title
      this.up = this.$route.query.up
      this.p = this.$route.query.p
      this.$nextTick(() => {
        if (this.$route.query.sy) {
          window.scrollTo(0, this.$route.query.sy)
        }
      })
    }

  },
  beforeRouteEnter(to, from, next) {
    if (to.query.videoSrc) {
      next()
    } else {
      next('/')
    }
  },
  methods: {
    /**
     * 复制网页地址到剪贴板
     */
    copyUrl() {    
      if (navigator.clipboard) {
        navigator.clipboard.writeText(process.env.VUE_APP_BASE_URL + this.$route.fullPath).then(res => {
          this.$msg({
            msg: '链接已复制',
            container: this.$refs.shareCard,
            cover: true,
            type: 'success',
          })
        }, err => {
          this.$msg({
            msg: '复制失败！',
            container: this.$refs.shareCard,
            cover: true,
            type: 'success'
          })
        })
      } else {
        let input = document.createElement('input')
        input.style.opacity = '0'
        input.style.position = 'absolute'
        input.value = process.env.VUE_APP_BASE_URL + this.$route.fullPath
        document.body.appendChild(input)
        input.select()
        const copy = document.execCommand('copy')
        if (copy) {
          this.$msg({
            msg: '链接已复制',
            container: this.$refs.shareCard,
            cover: true
          })
        } else {
          this.$msg({
            msg: '复制失败！',
            container: this.$refs.shareCard,
            cover: true
          })
        }
      }
      // const copyToClipboard = (text) => navigator?.clipboard?.writeText && navigator.clipboard.writeText(text)
      // copyToClipboard(process.env.VUE_APP_BASE_URL + this.$route.fullPath).then(res => {
      //   this.$msg({
      //     msg: '视频链接已复制',
      //     top: -50,
      //     container: this.$refs.toolbar,
      //     cover: true
      //   })
      // }, err => {
      //   this.$msg({
      //     msg: '复制失败！',
      //     top: -50,
      //     container: this.$refs.toolbar,
      //     cover: true
      //   })
      // })
    },
    videoEnd() {
      if (this.next && this.videoAppearState) {
        this.nextLoading = true
      }
    },
    videoPlay() {
      this.nextLoading = false
    },
    videoAppear() {
      this.videoAppearState = true
      this.sidebarShow = false
    },
    videoDisappear() {
      this.nextLoading = false
      this.videoAppearState = false
      this.sidebarShow = true
    },
    pipOpen() {
      this.pipColor = '#00AEEC'
    },
    pipClose() {
      this.pipColor = '#18191C'
    },
    playNext() {
      // this.nextLoading = true
      // this.playNextTimeout = setTimeout(() => {
      //   this.nextLoading = false
      //   this.$router.push({
      //     path: '/video',
      //     query: { up: this.videoList[0].up, videoSrc: this.videoList[0].videoSrc, title: this.videoList[0].title }
      //   })
      // }, 5000);

    },
    pipOC() {
      this.pipAuto = !this.pipAuto
    },
    widescreen(w, h, val) {
      if (val) {
        this.vwarpWidth = w + 'px'
        this.vLeftContainerWidth = w - 380 + 'px'
        this.radvMt = h + 50 + 'px'

        this.$refs.vwrap.scrollIntoView({ block: "center" })
      } else {
        this.vwarpWidth = ''
        this.vLeftContainerWidth = ''
        this.radvMt = ''
      }
    },
    goTo(path = '/', query = {}, target = '_self') {
      if (target === 'blank') {
        const url = this.$router.resolve({
          path, query
        })
        window.open(url.href, '_blank')
      } else {
        this.$router.scrollY = 200
        this.$router.push({
          path, query
        })
      }
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
    this.playNextTimeout && clearTimeout(this.playNextTimeout)
  }
}
</script>

<style lang="scss" scoped>
.header-contianer {
  height: var(--min-header-top);
}

.v-container {
  margin: 0 auto;
  max-width: 2540px;
  min-width: 1080px;
  padding: 0 10px;
  display: flex;
  justify-content: center;
  box-sizing: content-box;

  .v-left-container {

    margin: 0 0;
    width: 51.96%;
    min-width: 668px;
    z-index: 1;

    .v-header {
      padding-top: 24px;
      height: 102px;
      box-sizing: border-box;

      .video-title {
        font-size: 20px;
        font-family: PingFang SC, HarmonyOS_Regular, Helvetica Neue, Microsoft YaHei, sans-serif;
        font-weight: 500;
        -webkit-font-smoothing: antialiased;
        color: #18191C;
        line-height: 28px;
        margin-bottom: 6px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .video-data {
        font-size: 14px;
        color: #9499A0;
        display: flex;
        align-items: center;
        height: 24px;
        line-height: 18px;
        position: relative;
        overflow: hidden;

        .video-data-list {
          display: flex;
          align-items: center;
          overflow: hidden;
          box-sizing: border-box;

          // path {
          //   color: #9499A0;
          //   // background-color: ;
          // }

          .d-item {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: 12px;

            img {
              width: 20px;
              height: 20px;
              margin-right: 4px;
            }

            span {
              display: inline-block;
              line-height: 20px;
            }

          }

          // >span {
          //   margin-right: 14px;
          //   line-height: 24px;

          //   // i {
          //   //   font-weight: bold;
          //   //   font-size: 15px;
          //   //   margin-right: 3px;
          //   // }


          // }
        }
      }
    }

    .v-wrap {
      position: relative;
      width: 100%;


      .v-sending-box {
        width: 100%;
        height: 46px;
        border-radius: 0 0 6px 6px;
        box-shadow: 0 0 6px rgba(0, 0, 0, .2);
        padding: 0 12px;
        font-size: 13px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .v-play-info {
          // font-weight: bold;
          color: #61666D;
          letter-spacing: 1px;
        }

        .v-sending-input {
          height: 34px;
          border-radius: 8px;
          overflow: hidden;
          display: flex;
          align-items: center;

          input {
            border: none;
            padding: 0 12px;
            min-width: 250px;
            height: 100%;
            background-color: #F1F2F3;
            outline: none;
          }

          button {
            height: 100%;
            border: none;
            background-color: #00AEEC;
            min-width: 60px;
            color: white;
            cursor: pointer;

            &:hover {
              background-color: #40beeb;
            }
          }
        }
      }
    }

    .v-toolbar {
      height: 28px;
      padding-top: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid #E3E5E7;

      .v-toolbar-left {
        position: relative;
        height: 100%;
        display: flex;
        align-items: center;
        user-select: none;

        .v-toolbar-opt {
          min-width: 92px;
          max-width: 116px;
          margin-right: 8px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
          white-space: nowrap;
          height: 28px;
          // box-sizing: border-box;
          overflow: hidden;
          fill: #61666D;
          color: #61666D;
          display: inline-flex;
          align-items: center;

          svg {
            margin-right: 4px;
            flex: none;
          }

          >span,
          >div {
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-word;
            white-space: nowrap;
            display: inline-block;
            margin-top: 1px;
          }

          .cp-box {
            align-self: flex-start;
            width: 100%;
            height: 200%;
            margin-top: 1px;
            transition: .5s;

            >div {
              height: 50%;
              display: flex;
              align-items: center;
            }
          }

          &:hover {
            fill: #00AEEC;
            color: #00AEEC;
          }

          &:hover {
            .cp-box {
              transform: translateY(-52%);
            }
          }
        }

        .share-card {
          padding: 12px;

          .v-img {
            position: relative;
            width: 100%;
            height: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            // background-clip: border-box;

            .v-des {
              width: 100%;
              position: absolute;
              left: 0;
              bottom: 0;
              background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
              padding: 5px 8px;
              box-sizing: border-box;
              font-size: 14px;
              color: white;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }

          .s-link {
            margin: 8px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .s-t {
              display: flex;
              align-items: center;
              font-size: 12px;
            }
          }

          .s-choose {
            padding: 6px 0;
            background-color: #eee;
            border-radius: 6px;
            display: flex;
            justify-content: space-around;

            .s-c-item {
              display: flex;
              flex-direction: column;
              align-items: center;
              cursor: pointer;
              font-size: 13px;

              img {
                width: 35px;
                height: 35px;
                margin-bottom: 2px;
              }
            }
          }
        }
      }
    }

    .adv {
      margin: 24px 0;
    }


  }

  @media screen and (min-width: 1681px) {
    .v-right-container {
      width: 432px;
    }
  }

  @media screen and (max-width: 1680.99px) {
    .v-right-container {
      width: 350px;
    }
  }

  .v-right-container {
    // width: 350px;
    margin-left: 30px;
    padding-bottom: 20px;
    position: relative;

    .up-info {
      position: relative;
      margin: 18px 0 10px 0;
      height: 80px;
      // overflow: hidden;
      display: flex;

      .up-info-left {
        width: 50px;
        height: 80px;
        // display: flex;
        // justify-content: center;

        .up-avatar {
          display: inline-block;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
            vertical-align: bottom;
          }
        }
      }

      .up-info-right {
        flex: 1;
        overflow: hidden;
        margin-left: 12px;

        .up-name {
          display: flex;
          height: 22px;
          line-height: 22px;
          font-size: 15px;
          align-items: center;
          // border: 1px solid red;

          .name {
            color: #FB7299;
            font-weight: 600;
            letter-spacing: 1px;
          }
        }

        .up-signature {
          margin: 2px 0 10px 0;
          font-size: 13px;
          line-height: 16px;
          height: 16px;
          color: #9499A0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .btn-panel {
          display: flex;
          justify-content: space-between;
          margin-top: 5px;
          height: 30px;
          font-size: 14px;
          // border: 1px solid red;

          .follow-btn,
          .charge-btn {
            height: 30px;
            border-radius: 6px;
            padding: 0 12px;
            box-sizing: border-box;
            border: 1px solid #00AEEC;
            letter-spacing: 2px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .charge-btn {
            width: 78px;
            color: #00AEEC;
            margin-right: 12px;
            position: relative;

            &:hover {
              color: #00b8f6;
            }
          }

          .follow-btn {
            flex: 1;
            max-width: 200px;
            background-color: #00AEEC;
            color: white;

            &:hover {
              background-color: #00b8f6;
            }
          }
        }
      }

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

          // justify-content: center;

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
            // width: 50px;
            // height: 50px;
            // border: 1px solid red;
            flex: 1;

            .up-name {
              display: flex;
              height: 22px;
              line-height: 22px;
              font-size: 14px;
              align-items: center;

              // border: 1px solid red;
              .name {
                color: #FB7299;
                font-weight: 600;
                letter-spacing: 1px;
              }
            }

            .up-c-f-l {
              margin-top: 8px;
              // border: 1px solid red;
              // height: 10px;

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


    }

    .next-list {

      .next-list-head {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        color: #18191C;
        font-size: 15px;
      }

      .next-list-container {


        .next-list-item {
          margin-bottom: 12px;
        }

        .slv {
          &:nth-child(1) {
            border-bottom: 1px solid #E3E5E7;
            margin-bottom: 12px;
            padding-bottom: 16px;
          }
        }
      }
    }

    .adv {
      padding: 18px 0;
    }

    .anthology {
      margin-bottom: 18px;
    }

  }


}


.rec-ratio-box {
  padding-top: 56.29%;
  transition: .5s;

  &,
  .rec-container {
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 6px 6px 0 0;
    pointer-events: none;
  }

  .rec-container {
    height: 100%;
    background-color: rgba(0, 0, 0, .5);

    .video-card-link {
      position: absolute;
      left: 50%;
      top: 30%;
      transform: translateX(-50%);
      pointer-events: auto;
      transition: .3s;
      border-radius: 6px;
      box-sizing: border-box;
      border: 2px solid transparent;

      &:hover {
        border: 2px solid white;
      }

      .video-img {

        .next-operation-bar {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          padding: 2px 2px;
          // background-color: rgba(0,0,0,.8);

          .next-tip,
          .next-close-btn {
            color: white;
            font-weight: bold;
            padding: 5px 8px;
            border-radius: 4px;
            font-size: 12px;
            background-color: rgba(0, 0, 0, .6);
            margin-right: 2px;
            transition: .5s;

            &:hover {
              background-color: rgba(255, 255, 255, .4) !important;
            }
          }
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      &:hover .video-img .next-operation-bar .next-close-btn {
        background-color: rgba(255, 255, 255, .6);
      }

      .next-loading {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 60px;
        height: 60px;

        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotateZ(-90deg);

          circle {
            stroke-dasharray: 180;
            stroke-dashoffset: 180;
          }
        }

        .circle {
          animation: circle 8s linear forwards;
        }

        @keyframes circle {
          from {
            stroke-dasharray: 180;
            stroke-dashoffset: 180;
          }

          to {
            stroke-dasharray: 180;
            stroke-dashoffset: 0;
          }
        }

        .next-loading-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 60px;
          height: 60px;
          // background-color: red;
          border-radius: 50%;
          box-sizing: border-box;
          border: 4px solid rgba(0, 0, 0, .6);
          background-color: rgba(255, 255, 255, .4);
          background-clip: content-box;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;

          i {
            font-size: 28px;
            margin-left: 5px;
          }
        }
      }
    }
  }
}

.next-loading-enter,
.next-loading-leave-to {
  opacity: 0;
}

.next-loading-leave,
.next-loading-enter-to {
  opacity: 1;
}

.sidebar-min {
  position: fixed;
  bottom: 60px;
  right: 8px;
  width: 38px;
  transition: .2s;
  // border: 1px solid red;

  .sidebar-item-rectangle,
  .sidebar-item-square {

    --color: '#18191C';

    width: 100%;
    border: 1px solid #E3E5E7;
    background-color: white;
    border-radius: 6px;
    margin-bottom: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 0 6px 0;
    color: var(--color);
    transition: .3s;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background-color: #00AEEC;
      color: white;

      .fill {
        fill: white;
      }
    }

    .fill {
      fill: var(--color);
      transition: .3s;
    }

    .sidebar-item-icon {
      height: 24px;
      margin-bottom: 2px;
    }

    span {
      font-size: 12px;
      letter-spacing: 1px;
      line-height: 14px;
    }
  }

  .sidebar-item-square {
    padding: 8px 0;

    .sidebar-item-icon {
      display: flex;
      align-items: center;
      height: 8px;
    }
  }
}

.side-bar-enter,
.side-bar-leave-to {
  right: -42px;
}

.side-bar-enter-to,
.side-bar-leave {
  right: 6px;
}

.share-card {
  padding: 12px;

  .v-img {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    // background-clip: border-box;

    .v-des {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      background-image: linear-gradient(to top, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
      padding: 5px 8px;
      box-sizing: border-box;
      font-size: 14px;
      color: white;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
  }

  .s-link {
    margin: 8px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .s-t {
      display: flex;
      align-items: center;
      font-size: 12px;
    }
  }

  .s-choose {
    padding: 6px 0;
    background-color: #eee;
    border-radius: 6px;
    display: flex;
    justify-content: space-around;

    .s-c-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      cursor: pointer;
      font-size: 13px;

      img {
        width: 35px;
        height: 35px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>