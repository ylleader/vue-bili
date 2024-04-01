<template>
  <div class="page">
    <!-- 头部（横幅和头部） -->
    <BannerSpring></BannerSpring>

    <div class="layout">
      <Channel linkTarget="_blank" ref="channel"></Channel>
      <!-- 推荐区 -->
      <div class="rec-container">
        <Recommend>
          <!-- 轮播图 -->
          <Swiper slot="swiper" :interval="6000" :width="'100%'" :height="'100%'">
            <SwiperItem v-for="(item, index) in data.swiperList" :key="index" :info="item.title">
              <router-link class="swiper-link"
                :to="{ path: '/video', query: { videoSrc: item.videoSrc, title: item.title, up: item.up, p: index + 1 } }"
                target="_blank">
                <img :src="item.src" alt="">
              </router-link>
            </SwiperItem>
          </Swiper>
          <!-- 推荐视频区 -->
          <template slot="card">
            <div class="skeleton rec-skeleton" v-if="!data.recommendList || !data.recommendList.length">
              <div class="tip">
                暂无数据
              </div>
            </div>
            <router-link class="video-card-link" v-for="(item, index) in data.recommendList" :key="index"
              :to="{ path: '/video', query: { videoSrc: item.videoSrc, title: item.title, up: item.up, p: index + 1 } }"
              target="_blank">
              <VideoCard :width="'100%'" :height="'100%'" :title="item.title" :up="item.up">
                <div slot="img" class="video-img">
                  <img :src="item.imgSrc" alt="">
                </div>
              </VideoCard>
            </router-link>
          </template>
        </Recommend>
      </div>

      <!-- 分区列表 -->
      <div class="classification-container" v-for="(classification, index) in data.classificationList" :key="index"
        ref="classification" :classification="classification.name">

        <LayoutGrid :ref="classification.name">
          <!-- 分区头部 -->
          <div :class="classification.rankingList.length ? 'head-area' : 'head-area-rank'"
            :classificationId="classification.id" ref="classificationHead">
            <div class="head-left-area">
              <div class="clas-title">
                {{ classification.title }}
              </div>
            </div>
            <div class="head-right-area">
              <button @click="testTip">
                <!-- <i class="iconfont icon-liebiaoxunhuan loop"></i> -->
                <svg class="loop" fill="none" width="12" height="12" viewBox="0 0 12 12">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M12 6.002C12 3.142 10.205.664 7.683.024a.75.75 0 0 0-.369 1.454C9.15 1.943 10.5 3.807 10.5 6c0 1.8-.908 3.38-2.25 4.144V8.25a.75.75 0 0 0-1.499 0v2.796c0 .045.004.089.013.132a.75.75 0 0 0 .932.798c2.516-.643 4.304-3.118 4.304-5.973ZM4.524.005H4.49a.757.757 0 0 0-.172.022C1.797.658 0 3.14 0 6.004c0 2.86 1.788 5.337 4.304 5.974a.75.75 0 0 0 .367-1.454C2.846 10.062 1.5 8.198 1.5 6.004c0-1.805.91-3.385 2.25-4.147V3.55a.75.75 0 0 0 1.5 0V.745a.75.75 0 0 0-.023-.173l-.01-.04A.654.654 0 0 0 5.155.39.756.756 0 0 0 4.58.01h.001a.665.665 0 0 0-.056-.004Z">
                  </path>
                </svg>
                <span>换一换</span>
              </button>
              <button @click="testTip">
                <span>&nbsp;查看更多</span>
                <!-- <i class="iconfont icon-changyongicon- more"></i> -->
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="more">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.61957 0.96967C3.91247 0.676777 4.38734 0.676777 4.68023 0.96967L9.00346 5.29289C9.39398 5.68342 9.39398 6.31658 9.00346 6.70711L4.68023 11.0303C4.38734 11.3232 3.91247 11.3232 3.61957 11.0303C3.32668 10.7374 3.32668 10.2626 3.61957 9.96967L7.58924 6L3.61957 2.03033C3.32668 1.73744 3.32668 1.26256 3.61957 0.96967Z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <!-- 分区排行榜头部 -->
          <div class="ranking-list-head" v-if="classification.rankingList.length">
            <div class="ranking-list-head-left">
              排行榜
            </div>
            <div class="ranking-list-head-right">
              <button @click="testTip">
                <span>&nbsp;更多</span>
                <!-- <i class="iconfont icon-changyongicon- more"></i> -->
                <svg width="12" height="12" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg"
                  class="more">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M3.61957 0.96967C3.91247 0.676777 4.38734 0.676777 4.68023 0.96967L9.00346 5.29289C9.39398 5.68342 9.39398 6.31658 9.00346 6.70711L4.68023 11.0303C4.38734 11.3232 3.91247 11.3232 3.61957 11.0303C3.32668 10.7374 3.32668 10.2626 3.61957 9.96967L7.58924 6L3.61957 2.03033C3.32668 1.73744 3.32668 1.26256 3.61957 0.96967Z">
                  </path>
                </svg>
              </button>
            </div>
          </div>
          <!-- 分区排行榜 -->
          <div class="ranking-list" v-if="classification.rankingList.length">
            <Ranking :height="'100%'" :width="'100%'">
              <RankingItem v-for="(ranking, index) in classification.rankingList" :ranking="index + 1" :key="index"
                :title="ranking.title"
                :link="{ path: '/video', query: { videoSrc: ranking.videoSrc, title: ranking.title, up: ranking.up } }"
                :imgSrc="ranking.imgSrc">
              </RankingItem>
            </Ranking>
          </div>
          <!-- 分区视频 -->
          <VideoPreviewCard :width="'100%'" v-for="(video, i) in classification.videoList" :key="i"
            :videoSrc="video.videoSrc" :imgSrc="video.imgSrc" :up="video.up" :title="video.title"
            @vclick="goTo('/video', { up: video.up, videoSrc: video.videoSrc, title: video.title, upId: video.upId }, 'blank')"
            @uclick="goTo(`/up/${video.upId}`, '', 'blank')">
          </VideoPreviewCard>
          <!-- 分区骨架 -->
          <div class="skeleton cls-skeleton" v-if="!classification.videoList || !classification.videoList.length">
            <div class="tip">
              暂无数据
            </div>
          </div>
        </LayoutGrid>

        <!-- 广告区域 -->
        <div class="adv" v-if="classification.advIndex">
          <Adv
            :src="[require('@/assets/images/adv/adv-00' + classification.advIndex + '.avif'), require('@/assets/images/adv/adv-00' + classification.advIndex + '.webp')]">
          </Adv>
        </div>
      </div>
    </div>

    <!-- 菜单栏 -->
    <transition name="menu-mask">
      <div class="menu-mask" v-if="menuSHow" @click="menuSHow = false"></div>
    </transition>
    <Menu :visible.sync="menuSHow" :activeIndex="menuIndexs[0]">
      <MenuItem v-for="(item, index) in data.classificationList" :menuId="item.id" :key="index"
        @click.native="scrollToView(item.name, item.id, $event)">
      {{ item.title }}
      </MenuItem>
    </Menu>

    <!-- 侧边栏 -->
    <SideBar :visible="true">
      <SideBarItem @click="menuSHow = true">
        <i class="iconfont icon-caidanguanli" slot="icon"></i>
        <span slot="title">分区</span>
      </SideBarItem>
      <transition name="back-to-top">
        <SideBarItem type="backToTop" v-show="backToTopSHow" style="transition: .4s"></SideBarItem>
      </transition>
    </SideBar>

  </div>
</template>

<script>
import Channel from "@/components/Channel";
import Recommend from "@/components/Layout/Recommend";
import Swiper from "@/components/Common/Swiper";
import SwiperItem from "@/components/Common/Swiper/SwiperItem";
import VideoCard from "@/components/Common/Card/VideoCard";
import VideoPreviewCard from "@/components/Common/Card/VideoPreviewCard";
import LayoutGrid from "@/components/Layout/LayoutGrid";
import Ranking from "@/components/Common/Ranking/index";
import RankingItem from "@/components/Common/Ranking/RankingItem/index.vue";
import Menu from "@/components/Common/Menu/index.vue";
import MenuItem from "@/components/Common/Menu/MenuItem/index.vue";
import SideBar from "@/components/Common/SideBar/index.vue";
import SideBarItem from "@/components/Common/SideBar/SideBarItem/index.vue";
import BannerSpring from "@/components/Header/Banner/BannerSpring/index.vue";

import Adv from "@/components/Adv";

export default {
  name: "Home",
  components: {
    Channel,
    Recommend,
    Swiper,
    SwiperItem,
    VideoCard,
    VideoPreviewCard,
    LayoutGrid,
    Ranking,
    RankingItem,
    Menu,
    MenuItem,
    SideBar,
    SideBarItem,
    Adv,
    BannerSpring
  },
  data() {
    return {
      data: {
        classificationList: {
          donhua:
          {
            title: '动画',
            name: 'donhua',
            id: '1',
            advIndex: 1,
            videoList: [],
            rankingList: [
              {
                videoSrc: '/s0313.mp4',
                imgSrc: '/s03.jpg',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/v001.mp4',

                title: 's13全球总决赛',
                up: '金医生'
              },
              {
                videoSrc: '/v002.mp4',

                title: '七十二家房客发仔记',
                up: '发仔记'
              },
              {
                videoSrc: '/v003.mp4',

                title: '科目三睡觉考试',
                up: '发仔记'
              },
              {
                videoSrc: '/v004.mp4',

                title: '佛祖向我许愿',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              }
            ]
          },
          anima: {
            title: '番剧',
            name: 'anima',
            id: '2',
            advIndex: 2,
            videoList: [],
            rankingList: [
              {
                videoSrc: '/v002.mp4',
                imgSrc: '/v002.jpg',
                title: '七十二家房客发仔记',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/v001.mp4',

                title: 's13全球总决赛',
                up: '金医生'
              },
              {
                videoSrc: '/v003.mp4',

                title: '科目三睡觉考试',
                up: '发仔记'
              },
              {
                videoSrc: '/v004.mp4',

                title: '佛祖向我许愿',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              }
            ]

          },
          knowledge: {
            title: '知识',
            name: 'knowledge',
            id: '3',
            advIndex: 3,
            videoList: [],
            rankingList: [
              {
                videoSrc: '/v001.mp4',
                imgSrc: '/v001.jpg',
                title: 's13全球总决赛',
                up: '金医生'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/v002.mp4',

                title: '七十二家房客发仔记',
                up: '发仔记'
              },
              {
                videoSrc: '/v003.mp4',

                title: '科目三睡觉考试',
                up: '发仔记'
              },
              {
                videoSrc: '/v004.mp4',

                title: '佛祖向我许愿',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              }
            ]

          },
          guichu: {
            title: '鬼畜',
            name: 'guichu',
            id: '4',
            videoList: [],
            rankingList: [
              {
                videoSrc: '/v001.mp4',
                imgSrc: '/v001.jpg',
                title: 's13全球总决赛',
                up: '金医生'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/v002.mp4',

                title: '七十二家房客发仔记',
                up: '发仔记'
              },
              {
                videoSrc: '/v003.mp4',

                title: '科目三睡觉考试',
                up: '发仔记'
              },
              {
                videoSrc: '/v004.mp4',

                title: '佛祖向我许愿',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              },
              {
                videoSrc: '/s0313.mp4',
                title: '爱情公寓3 13',
                up: '发仔记'
              }
            ]

          },
          food: {
            title: '美食',
            name: 'food',
            id: '5',
            videoList: [],
            rankingList: []
          }
        },
        recommendList: [
          {
            imgSrc: '/s03.jpg',
            id: '1',
            videoSrc: '/s0313.mp4',
            title: '爱情公寓3 13',
            up: '发仔记'
          },
          {
            id: '2',
            videoSrc: '/v001.mp4',
            imgSrc: '/v001.jpg',
            title: 's13全球总决赛',
            up: '金医生'
          },
          {
            id: '3',
            videoSrc: '/v002.mp4',
            imgSrc: '/v002.jpg',
            title: '七十二家房客发仔记',
            up: '发仔记'
          },
          {
            id: '4',
            videoSrc: '/v003.mp4',
            imgSrc: '/v003.jpg',
            title: '科目三睡觉考试',
            up: '发仔记'
          },
          {
            id: '5',
            videoSrc: '/v004.mp4',
            imgSrc: '/v004.jpg',
            title: '佛祖向我许愿',
            up: '发仔记'
          },
          {
            imgSrc: '/s03.jpg',
            id: '6',
            videoSrc: '/s0313.mp4',
            title: '爱情公寓3 13',
            up: '发仔记'
          },
        ],
        swiperList: [
          {
            src: '/swi-001.avif',
            id: '1',
            videoSrc: '/s0313.mp4',
            title: '爱情公寓3 13',
            up: '发仔记'
          },
          {
            id: '2',
            videoSrc: '/v001.mp4',
            src: '/swi-002.avif',
            title: 's13全球总决赛',
            up: '金医生'
          },
          {
            id: '3',
            videoSrc: '/v002.mp4',
            src: '/swi-003.avif',
            title: '七十二家房客发仔记',
            up: '发仔记'
          },
          {
            id: '4',
            videoSrc: '/v003.mp4',
            src: '/swi-004.avif',
            title: '科目三睡觉考试',
            up: '发仔记'
          }
        ]
      },
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
          up: '金医生',
          upId: '369'
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
          videoSrc: '/s0313.mp4',
          imgSrc: '/s03.jpg',
          title: '爱情公寓3 13',
          up: '发仔记'
        }
      ],
      // sideBarShow: false,
      menuSHow: false,
      menuIndexs: [],
      backToTopSHow: false
    }
  },
  methods: {
    /**
     * 初始化元素可视状态监听对象
     */
    IntersectionObserverInit() {
      this.classificationDomObserver = new IntersectionObserver(entries => {

        entries.forEach(item => {
          // if (item.isIntersecting) {
          //   let type = item.target.getAttribute('classification')
          //   let id = item.target.getAttribute('classificationId')
          //   this.menuIndex = id
          //   // axios.get('http://192.168.0.104:8080/getVideoList?type=' + type).then(res => {
          //   //   this.data.classificationList[type].videoList = res.data
          //   //   this.classificationDomObserver.unobserve(item.target)
          //   // },
          //   //   err => {
          //   //     console.log(err)
          //   //   })
          // }
          if (item.isIntersecting) {
            let type = item.target.getAttribute('classification')
            if (type) {
              this.data.classificationList[type].videoList = [...this.videoList]
              if (type === 'food') {
                this.data.classificationList[type].videoList.push({
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
                  })
              }
              this.classificationDomObserver.unobserve(item.target)
            }
          }
          this.menuActiveIndexChange(item)
          this.backToTopSHowChange(item)
        });
      }, { root: document });

      this.$refs.classificationHead.forEach((clf) => {
        this.classificationDomObserver.observe(clf)
      })
      //监听channel元素
      this.classificationDomObserver.observe(this.$refs.channel.$el)

      this.$refs.classification.forEach((item, index) => {
        this.classificationDomObserver.observe(item)
      })

    },
    /**
     * 分区滚动至可视区域，改变menu中的activeIndex
     * 若多个元素同时出现在可视区域，则优先使用最上方的indexId
     * @params {object} 元素监听信息对象
     */
    menuActiveIndexChange(item) {
      //获取元素对应的indexId
      let id = item.target.getAttribute('classificationId')
      if (!id) return

      //元素为menu菜单对应的元素（拥有classificationId属性）

      //元素出现在可视区域
      if (item.isIntersecting) {

        //元素在顶部出现，对应id插入Index数组头部，优先显示
        if (item.boundingClientRect.top <= 0) {
          this.menuIndexs.unshift(id)
        } else {  //元素在底部出现，对应id插入Index数组尾部
          this.menuIndexs.push(id)
        }

      } else {
        //元素在可视区域消失，在index数组中删除对应的indexId
        if (this.menuIndexs.indexOf(id) !== -1) {
          this.menuIndexs.splice(this.menuIndexs.indexOf(id), 1)
        }
      }
    },
    /**
     * 元素滚动至可视区域
     * @param {String} val 元素ref值
     */
    scrollToView(val) {
      const rect = this.$refs[val][0].$el.getBoundingClientRect()
      document.documentElement.scrollBy({
        top: rect.top - 80,
      })
    },
    /**
     * 根据channel的可视状态（页面滚动一定的高度）控制回到顶部按钮的展示和隐藏
     * @param {Object} item 元素监听信息对象
     */
    backToTopSHowChange(item) {
      //监听元素为目标元素
      if (item.target === this.$refs.channel.$el) {
        if (item.isIntersecting) {    //元素出现，隐藏按钮
          this.backToTopSHow = false
        } else {                      //元素消失，展示按钮
          this.backToTopSHow = true
        }
      }
    },
    goTo(path = '/', query = {}, target = '_self') {
      if (target === 'blank') {
        const url = this.$router.resolve({
          path, query
        })
        window.open(url.href, '_blank')
      } else {
        this.$router.push({
          path, query, target
        })
      }

    },
    testTip() {
      this.$msg({
        msg: '暂时没有更多了...',
        top: 80
      })
    }
  },
  created() {
    // axios.get('http://192.168.0.104:8080/getData').then(res => {
    //   this.data.classificationList = res.data
    //   this.$nextTick(() => {
    //     this.$refs.video && this.$refs.video.forEach((video) => {
    //       this.classificationDomObserver.observe(video)
    //     })
    //   })
    // },
    //   err => {
    //     console.log(err)
    //   })

    // axios.get('http://192.168.0.104:8080/getSwiperList').then(res => {
    //   this.data.swiperList = res.data
    //   console.log(res.data)

    // },
    //   err => {
    //     console.log(err)
    //   })

    // axios.get('http://192.168.0.104:8080/getRecommendList').then(res => {
    //   this.data.recommendList = res.data
    //   console.log(res.data)

    // },
    //   err => {
    //     console.log(err)
    //   })

    // request({
    //   url: 'http://192.168.0.104:8080/g',
    //   params: {

    //   },
    //   method: 'get'
    // }).then(res=>{
    //   console.log(res)

    // })

  },
  mounted() {
    try {
      this.IntersectionObserverInit()
    } catch (error) {

    }
  },
  beforeDestroy() {
    this.classificationDomObserver.disconnect()
  }
}
</script>

<style lang="scss" scoped>
.page {
  margin: 0 auto;
}

.layout {
  max-width: 1980px;
  margin: 0 auto;
  padding-left: var(--layout-padding);
  padding-right: var(--layout-padding);
}

.skeleton {
  position: relative;
  padding-top: 36%;
  box-sizing: border-box;
  color: #E3E5E7;
  border-radius: 6px;
  border: 1px solid;

  background-image: url('@/assets/images/card/bgm-nodata.png');
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: 50% 50%;

  .tip {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
  }
}

.rec-container {

  .swiper-link {
    display: block;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    box-sizing: border-box;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .video-card-link {
    width: 100%;
    height: 100%;
    display: block;

    .video-img {
      width: inherit;
      height: inherit;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .rec-skeleton {
    grid-row: 1 / span 2;
    grid-column: 3 / span 3;

  }
}

.classification-container {
  margin-top: 66px;
  position: relative;

  .head-area,
  .head-area-rank {
    grid-row: 1 / span 1;
    grid-column: 1 / span 4;
    height: 100%;
    justify-content: space-between;
    overflow: hidden;

    &,
    .head-left-area,
    .head-right-area {
      display: flex;
      align-items: center;
      height: 34px;
    }

    .head-left-area {

      .clas-title {
        font-size: 24px;
        margin-right: 6px;
        letter-spacing: 3px;
        font-weight: bold;
        color: #18191C;
        transition: .3s;
        cursor: pointer;

        &:hover {
          color: #02b5da;
        }
      }
    }
  }

  .head-area-rank {
    grid-row: 1 / span 1;
    grid-column: 1 / span 5;
  }

  button {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 13px;
    // line-height: 12px;
    color: #18191C;
    letter-spacing: 1px;
    border: 1px solid #E3E5E7;
    background-color: white;
    border-radius: 8px;
    outline: none;
    padding: 0 12px;
    margin-left: 8px;
    transition: .3s background-color;
    cursor: pointer;

    &:active {
      transform: scale(.95);
    }

    &:hover {
      background-color: rgb(227, 229, 231);
    }

    &:hover .loop {
      transform: rotateZ(360deg);
    }

    &:hover .more {
      transform: translate(6px);
    }

    .more,
    .loop {
      transition: .5s;
      font-weight: bold;

      path {
        fill: #18191C;
      }
    }

    .loop {
      margin-right: 6px;
    }

  }

  .ranking-list-head {
    grid-row: 1 / span 1;
    grid-column: 5 / span 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 34px;

    .ranking-list-head-left {
      font-size: 20px;
      letter-spacing: 3px;
      color: #18191C;
      transition: .3s;
      cursor: pointer;

      &:hover {
        color: #02b5da;
      }
    }

    .ranking-list-head-right {
      height: 100%;
    }
  }

  .ranking-list {
    overflow: hidden;
    grid-row: 2 / span 2;
    grid-column: 5 / span 1;
  }

  .cls-skeleton {
    grid-row: 2 / 4;
    grid-column: 1 / 5;
  }
}

.adv {
  width: 100%;
  margin-top: 66px;
  box-sizing: border-box;
}

.menu-mask {
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 100;
  background-color: rgba(0, 0, 0, .3);
  transition: .3s;
}

.menu-mask-enter,
.menu-mask-leave-to,
.back-to-top-enter,
.back-to-top-leave-to {
  opacity: 0;
}

.menu-mask-enter-to,
.menu-mask-leave,
.back-to-top-enter-to,
.back-to-top-leave {
  opacity: 1;
}
</style>