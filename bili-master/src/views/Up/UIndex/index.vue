<template>
  <div class="up-index">
    <div class="col-l">
      <div class="l">
        <div class="up-t-r">
          <Tabs type="line" fontSize="13px" :line="true" v-model="TRTabsName">
            <TabPanel lable="置顶视频" name="t"></TabPanel>
            <TabPanel lable="代表作" name="r"></TabPanel>
          </Tabs>
          <div class="t-r">
            <div class="t" v-if="TRTabsName === 't'">
              <div class="tr-v" v-for="(v, i) in tvideoLidt" :key="i">
                <div class="e-i-pop" v-if="self">
                  <Popover backgroundColor="rgba(0, 0, 0, .7)" :top="2" placement="bottom-end" :clickClose="true">
                    <div slot="reference" class="edit-icon">
                      <i class="iconfont icon-bianji"></i>
                    </div>
                    <div class="tr-v-opt">
                      <div class="cancel" @click="cancelVitem(v, 't')">取消置顶</div>
                      <div class="change" @click="changeVitem(v, 't')">更换视频</div>
                    </div>
                  </Popover>
                </div>
                <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc" :title="v.title"
                  @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                </VideoPreviewCard>
              </div>
              <div class="set" @click="showTRDialog('t')" v-if="self && tvideoLidt.length < 3">
                <div class="s-icon">
                  <i class="iconfont icon-jiahao g"></i>
                </div>
                <div class="s-tip">
                  设置置顶视频
                </div>
                <div class="s-count">
                  {{ `${tvideoLidt.length}/3` }}
                </div>
              </div>
            </div>
            <div class="r" v-if="TRTabsName === 'r'">
              <div class="tr-v" v-for="(v, i) in rvideoLidt" :key="i">
                <div class="e-i-pop" v-if="self">
                  <Popover backgroundColor="rgba(0, 0, 0, .7)" :top="2" placement="bottom-end">
                    <div slot="reference" class="edit-icon">
                      <i class="iconfont icon-bianji"></i>
                    </div>
                    <div class="tr-v-opt">
                      <div class="cancel" @click="cancelVitem(v, 'r')">取消代表</div>
                      <div class="change" @click="changeVitem(v, 'r')">更换视频</div>
                    </div>
                  </Popover>
                </div>
                <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc" :title="v.title"
                  @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                </VideoPreviewCard>
              </div>
              <div class="set" @click="showTRDialog('r')" v-if="self && rvideoLidt.length < 3">
                <div class="s-icon">
                  <i class="iconfont icon-jiahao g"></i>
                </div>
                <div class="s-tip">
                  设置代表作
                </div>
                <div class="s-count">
                  {{ `${rvideoLidt.length}/3` }}
                </div>
              </div>
            </div>
            <Dialog :title="TRDialogTitle" :visible.sync="TRDialogVisible" @close="closeTRDialog" v-if="self">
              <div class="t-r-dialog">
                <div class="d-search">
                  <input type="text">
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
                    <div class="v-item" v-for="(v, i) in videoList" :key="i" @click="selectVitem($event, v)" ref="vitem">
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
                <div class="d-foot">
                  <div class="can-btn" @click="closeTRDialog">
                    取消
                  </div>
                  <div class="con-btn" @click="useVitem">
                    确定
                  </div>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
        <div class="c up-my-video">
          <div class="c-head">
            <h3>
              {{ self ? '我的视频' : 'Ta的视频' }}
            </h3>
            <div class="tabs">
              <Tabs type="line" fontSize="13px" v-model="NPLTabsName">
                <TabPanel lable="最新发布" name="n"></TabPanel>
                <TabPanel lable="最多播放" name="p"></TabPanel>
                <TabPanel lable="最多点赞" name="l"></TabPanel>
              </Tabs>
            </div>
            <div class="btn">
              <BButton size="12" type="white" padding="3px 16px">
                <i class="iconfont icon-bofang bf-ico"></i>播放全部
              </BButton>
            </div>
            <div class="btn">
              <BButton size="12" type="white" padding="3px 16px">
                更多<i class="iconfont icon-changyongicon- more-ico"></i>
              </BButton>
            </div>
          </div>
          <div class="m-v" v-if="NPLTabsName === 'n'">
            <div class="m-v-item" v-for="(v, i) in videoList.concat(videoList)" :key="i">
              <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                <div class="v-title">
                  {{ v.title }}
                </div>
                <div class="v-time">
                  {{ `2022-12-12` }}
                </div>
              </VideoPreviewCard>
            </div>
          </div>
          <div class="m-v" v-else-if="NPLTabsName === 'p'">
            <div class="m-v-item" v-for="(v, i) in videoList" :key="i">
              <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                <div class="v-title">
                  {{ v.title }}
                </div>
                <div class="v-time">
                  {{ `2022-12-12` }}
                </div>
              </VideoPreviewCard>
            </div>
          </div>
          <div class="m-v" v-else-if="NPLTabsName === 'l'">
            <div class="m-v-item" v-for="(v, i) in videoList" :key="i">
              <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                <div class="v-title">
                  {{ v.title }}
                </div>
                <div class="v-time">
                  {{ `2022-12-12` }}
                </div>
              </VideoPreviewCard>
            </div>
          </div>
        </div>
        <div class="c up-video-collections" v-if="self || videocollectionList.length">
          <div class="v-c-head">
            <router-link :to="`/up/${upId}/collections`">
              <h3>{{ self ? '我的视频合集' : 'Ta的视频合集' }}</h3>
            </router-link>
            <BButton class="create-btn" size="12" type="white" padding="3px 16px" @click="showCollectionsDialog"
              v-if="self && videocollectionList.length">
              新建<i class="iconfont icon-jiahao create-ico"></i>
            </BButton>
          </div>
          <div class="create-tips" v-if="!videocollectionList.length">
            <BButton @click="showCollectionsDialog">
              创建视频合集
            </BButton>
            <span class="tip">你还没有视频合集，点击按钮去创建吧</span>
          </div>
          <div class="c v-c" v-for="(c, index) in videocollectionList" :key="index">
            <div class="c-head">
              <router-link class="h-title" :to="`/up/${upId}/collectionsdetail`">
                {{ c.name }}
              </router-link>
              <div class="btns">
                <div class="btn">
                  <BButton size="12" type="white" padding="3px 16px">
                    <i class="iconfont icon-bofang bf-ico"></i>播放全部
                  </BButton>
                </div>
                <router-link class="btn" :to="`/up/${upId}/collectionsdetail`">
                  <BButton size="12" type="white" padding="3px 16px">
                    更多<i class="iconfont icon-changyongicon- more-ico"></i>
                  </BButton>
                </router-link>
              </div>
            </div>
            <div class="m-v">
              <div class="m-v-item" v-for="(v, i) in c.videos" :key="i">
                <VideoPreviewCard width="100%" :videoSrc="v.videoSrc" :imgSrc="v.imgSrc"
                  @vclick="goTo('/video', { up: v.up, videoSrc: v.videoSrc, title: v.title }, 'blank')">
                  <div class="v-title">
                    {{ v.title }}
                  </div>
                  <div class="v-time">
                    {{ `2022-12-12` }}
                  </div>
                </VideoPreviewCard>
              </div>
            </div>
          </div>
          <Dialog width="400px" :title="collectionsDialogTitle" :visible.sync="collectionsDialogVisible"
            @close="closeCollectionsDialog" v-if="self">
            <div class="collections-form" v-show="collectionsCreateSteps === 1">
              <div class="form-item">
                <div class="lable">
                  视频合集标题
                </div>
                <div class="f-input">
                  <input type="text" class="f-text" maxlength="20" v-model.trim="collectionsName" placeholder="请填写集合标题">
                  <div class="word-count">{{ `(${collectionsName.length}/20)` }}</div>
                </div>
              </div>
              <div class="form-item">
                <div class="lable">
                  视频合集简介
                </div>
                <div class="f-input">
                  <textarea class="f-textarea f-text min-scroll" maxlength="256" v-model.trim="collectionsIntroduction"
                    placeholder="请填写集合简介(选填)"></textarea>
                  <div class="word-count">{{ `(${collectionsIntroduction.length}/256)` }}</div>
                </div>
              </div>
            </div>
            <div class="collections-videos-select" v-show="collectionsCreateSteps === 2">
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
              <template v-if="collectionsCreateSteps === 1">
                <div class="c-f-btn">
                  <BButton type="white" size="14px" @click="closeCollectionsDialog">取消</BButton>
                </div>
                <div class="c-f-btn">
                  <BButton size="14px" @click="collectionsCreateNext()">下一步</BButton>
                </div>
              </template>
              <template v-else-if="collectionsCreateSteps === 2">
                <div class="c-f-btn">
                  <BButton type="white" size="14px" @click="collectionsCreateStepsChange(1)">上一步</BButton>
                </div>
                <div class="c-f-btn">
                  <BButton size="14px" @click="createCollections">确定</BButton>
                </div>
              </template>
            </div>
          </Dialog>
        </div>
        <div class="c up-favorites">
          <div class="c-head">
            <h3>{{ self ? '收藏夹' : 'Ta的收藏夹' }}</h3>
            <div class="btn">
              <BButton size="12" type="white" padding="3px 16px">
                更多<i class="iconfont icon-changyongicon- more-ico"></i>
              </BButton>
            </div>
          </div>
          <div class="favorites">
            <div class="f-item" v-for="i in 4" :key="i">
              <Card :mask="true" width="100%" height="100%">
                <div class="f-info" :style="{ backgroundImage: i < 3 ? 'url(/567-2.webp)' : 'url(/567.webp)' }">
                  <div class="num">
                    112
                  </div>
                  <div class="t-s">
                    <div class="title">
                      刺客五六七
                    </div>
                    <div class="state">
                      公开
                    </div>
                  </div>
                </div>
                <div slot="mask" class="view">
                  <div class="v-btn">
                    进入收藏夹
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-r">
      <div class="c up-auth">
        <div class="no-auth" v-if="self">
          <div class="a-icon">
            <img src="@/assets/images/up/icon-auth.png" alt="">
          </div>
          <div class="a-title">
            <router-link class="a-link" to="/auth">点此申请 bilibili 认证</router-link>
            <span class="a-desc">获得 bilibili 认证，享受多重认证福利！</span>
          </div>
        </div>
        <div class="auth" v-if="!self">
          <div class="auth-description">
            <div class="auth-icon"></div>
            <div class="auth-type">
              bili个人认证：{{ 'bilibili 知名娱乐UP主' }}
            </div>
          </div>
        </div>
      </div>
      <div class="c up-charge" v-if="!self">
        <div class="charge-opt">
          <div class="charge-btn">
            <BButton type="pink" size="19px" height="50px" width="155px" borderRadius="4px" @click="loginJudge">为Ta充电
            </BButton>
          </div>
          <div class="charge-anima">
            <div class="charge"></div>
            <div class="charging"></div>
            <div class="charge-mask"> </div>
          </div>
        </div>
        <div class="charge-up">
          <div class="c-u-title">
            本月共11人为Ta充电
          </div>
          <div class="c-u">
            <Popover v-for="i in 4" :key="i" :top="15">
              <div slot="reference" class="c-u-avatar">
                <img :src="`/h(${i}).jpg`" alt="">
              </div>
              <UpCard></UpCard>
            </Popover>
          </div>
        </div>
      </div>
      <div class="c up-creation" v-if="self">
        <div class="c-title" title="进入创作中心">
          <svg data-v-92e3ffaa="" width="30" height="25" viewBox="0 0 19 15" xmlns="http://www.w3.org/2000/svg"
            class="play">
            <path data-v-92e3ffaa="" fill-rule="evenodd" clip-rule="evenodd"
              d="M3.67735 2.2798C4.98983 2.1725 6.85812 2.0625 9 2.0625C11.1421 2.0625 13.0105 2.17252 14.323 2.27983C15.2216 2.3533 15.9184 3.04049 15.9989 3.9318C16.0962 5.00837 16.1875 6.43614 16.1875 8C16.1875 9.56386 16.0962 10.9916 15.9989 12.0682C15.9184 12.9595 15.2216 13.6467 14.323 13.7202C13.0105 13.8275 11.1421 13.9375 9 13.9375C6.85812 13.9375 4.98983 13.8275 3.67735 13.7202C2.77861 13.6467 2.08174 12.9593 2.00119 12.0678C1.90388 10.9908 1.8125 9.56273 1.8125 8C1.8125 6.43727 1.90388 5.00924 2.00119 3.93221C2.08174 3.04067 2.77861 2.35327 3.67735 2.2798ZM9 0.8125C6.81674 0.8125 4.9136 0.924562 3.5755 1.03395C2.07738 1.15643 0.892104 2.31616 0.756257 3.81973C0.656505 4.92379 0.5625 6.39058 0.5625 8C0.5625 9.60942 0.656505 11.0762 0.756256 12.1803C0.892104 13.6838 2.07738 14.8436 3.5755 14.966C4.9136 15.0754 6.81674 15.1875 9 15.1875C11.1835 15.1875 13.0868 15.0754 14.4249 14.966C15.9228 14.8436 17.108 13.6841 17.2438 12.1807C17.3435 11.077 17.4375 9.61052 17.4375 8C17.4375 6.38948 17.3435 4.92296 17.2438 3.81931C17.108 2.31588 15.9228 1.15645 14.4249 1.03398C13.0868 0.924583 11.1835 0.8125 9 0.8125ZM11.1876 8.72203C11.7431 8.40128 11.7431 7.59941 11.1876 7.27866L8.06133 5.47373C7.50577 5.15298 6.81133 5.55392 6.81133 6.19542V9.80527C6.81133 10.4468 7.50577 10.8477 8.06133 10.527L11.1876 8.72203Z">
            </path>
          </svg>
          <span class="title">
            创作中心
          </span>
          <svg data-v-94c9e06a="" data-v-0b1c01f8="" width="18" height="18" viewBox="0 0 12 11"
            xmlns="http://www.w3.org/2000/svg" class="more">
            <path data-v-94c9e06a="" data-v-0b1c01f8="" fill-rule="evenodd" clip-rule="evenodd"
              d="M3.61957 0.96967C3.91247 0.676777 4.38734 0.676777 4.68023 0.96967L9.00346 5.29289C9.39398 5.68342 9.39398 6.31658 9.00346 6.70711L4.68023 11.0303C4.38734 11.3232 3.91247 11.3232 3.61957 11.0303C3.32668 10.7374 3.32668 10.2626 3.61957 9.96967L7.58924 6L3.61957 2.03033C3.32668 1.73744 3.32668 1.26256 3.61957 0.96967Z">
            </path>
          </svg>
        </div>
        <div class="c-c-m">
          <div class="con">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"
              class="header-upload-entry__icon">
              <path
                d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
                stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413" stroke="currentColor" stroke-width="1.7"
                stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span>
              视频投稿
            </span>

          </div>
          <div class="man">
            <svg width="18" height="16" viewBox="0 0 18 17" xmlns="http://www.w3.org/2000/svg" class="link-icon">
              <rect opacity="0.01" width="18" height="18" fill="#C4C4C4"></rect>
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3.375 1.875H10.875C12.739 1.875 14.25 3.38604 14.25 5.25V7.875V8.625C14.25 9.03921 14.5858 9.375 15 9.375C15.4142 9.375 15.75 9.03921 15.75 8.625V7.875V5.25C15.75 2.55761 13.5674 0.375 10.875 0.375H3.375C2.33947 0.375 1.5 1.21447 1.5 2.25V15C1.5 16.0355 2.33947 16.875 3.375 16.875H6.75H7.5C7.91421 16.875 8.25 16.5392 8.25 16.125C8.25 15.7108 7.91421 15.375 7.5 15.375H6.75H3.375C3.16789 15.375 3 15.2071 3 15V2.25C3 2.04289 3.16789 1.875 3.375 1.875ZM10.4 8.51962C10.8 8.28868 10.8 7.71132 10.4 7.48038L7.7 5.92154C7.3 5.6906 6.8 5.97927 6.8 6.44115V9.55885C6.8 10.0207 7.3 10.3094 7.7 10.0785L10.4 8.51962ZM15.518 14.2511L14.3215 16.3234H11.9285L10.7321 14.2511L11.9285 12.1787H14.3215L15.518 14.2511ZM16.817 13.5011C17.0849 13.9652 17.0849 14.537 16.817 15.0011L15.6205 17.0734C15.3526 17.5375 14.8574 17.8234 14.3215 17.8234H11.9285C11.3926 17.8234 10.8974 17.5375 10.6295 17.0734L9.43302 15.0011C9.16507 14.537 9.16507 13.9652 9.43302 13.5011L10.6295 11.4287C10.8974 10.9646 11.3926 10.6787 11.9285 10.6787H14.3215C14.8574 10.6787 15.3526 10.9646 15.6205 11.4287L16.817 13.5011ZM13.125 13.3125C12.6072 13.3125 12.1875 13.7322 12.1875 14.25C12.1875 14.7678 12.6072 15.1875 13.125 15.1875C13.6428 15.1875 14.0625 14.7678 14.0625 14.25C14.0625 13.7322 13.6428 13.3125 13.125 13.3125Z">
              </path>
            </svg>
            <span>
              内容管理
            </span>
          </div>
        </div>
      </div>
      <div class="c up-notice" ref="notice">
        <h4 class="n-title">公告</h4>
        <div class="n-editing-area">
          <div class="word-count" v-if="self">
            {{ notice.length }}/150
          </div>
          <textarea class="text-area" type="textarea" placeholder="编辑我的空间公告" maxlength="150" v-model="notice"
            @focus="saveONotice" @blur="setNotice" v-if="self"></textarea>
          <div class="text-area-u" v-else>
            暂时没有公告哦。。。
          </div>
        </div>
      </div>
      <div class="c up-info">
        <div class="i-head">
          <h4>个人资料</h4>
          <router-link class="i-set" to="/12138" v-if="self">
            修改资料
          </router-link>
        </div>
        <div class="i-m">
          <div class="i-item">
            <span class="lable">UID</span>
            <span class="i">{{ '123' }}</span>
          </div>
          <div class="i-item">
            <span class="lable">生日</span>
            <span class="i">{{ '2002-02-02' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Tabs from '@/components/Tabs'
import TabPanel from '@/components/Tabs/TabPanel'
import Dialog from '@/components/Common/Dialog'
import VideoPreviewCard from "@/components/Common/Card/VideoPreviewCard"
import Popover from '@/components/Common/Popover'
import BButton from '@/components/Common/Button'
import Card from '@/components/Common/Card/Card'
import UpCard from '@/components/Common/Card/UpCard'

import loginMixin from '@/mixins/login'
import upMixin from '@/mixins/up'



export default {
  name: 'UpIndex',
  mixins: [loginMixin, upMixin],
  components: {
    Tabs, TabPanel, Dialog, VideoPreviewCard, Popover, BButton, Card, UpCard
  },
  data() {
    return {
      notice: '',
      TRTabsName: 't',
      TRDialogVisible: false,
      TRDialogTitle: '设置置顶视频',

      NPLTabsName: 'n',

      collectionsDialogVisible: false,
      collectionsDialogTitle: '新建视频集合',
      collectionsCreateSteps: 1,
      collectionsName: '',
      collectionsIntroduction: '',

      videocollectionList: [
        {
          name: 'collection1',
          videos: [{
            videoSrc: 'http://47.113.204.129/s0313.mp4',
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
          }],
        },
        {
          name: 'collection2',
          videos: [{
            videoSrc: 'http://47.113.204.129/s0313.mp4',
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
          }],
        },
        {
          name: 'collection3',
          videos: [{
            videoSrc: 'http://47.113.204.129/s0313.mp4',
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
          }],
        },
      ],

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

      tvideoLidt: [
        {
          videoSrc: 'http://47.113.204.129/s0313.mp4',
          imgSrc: '/s03.jpg',
          title: '爱情公寓3 13',
          up: '发仔记'
        },
      ],

      rvideoLidt: [
        {
          videoSrc: '/v001.mp4',
          imgSrc: '/v001.jpg',
          title: 's13全球总决赛',
          up: '金医生'
        }
      ]
    }
  },
  methods: {
    setNotice() {
      if (this.oNotice === this.notice.trim()) {
        this.$msg({
          msg: '公告木有改动',
          top: 1,
          cover: true,
          container: this.$refs.notice
        })
      } else {
        this.$msg({
          msg: '公告修改成功',
          top: 1,
          cover: true,
          container: this.$refs.notice
        })
      }
    },
    saveONotice() {
      this.oNotice = this.notice.trim()
    },
    showTRDialog(type) {
      if (type === 't') {
        this.TRDialogTitle = '设置置顶视频'
      } else if (type === 'r') {
        this.TRDialogTitle = '设置代表作'
      }
      this.tr = type
      this.selectedVID = void 0
      this.TRDialogVisible = true
    },
    closeTRDialog() {
      this.TRDialogVisible = false
      this.changeVId = void 0
    },
    /**
     * 选中视频，获取视频id和设置视被频选中时样式等
     * @param e 事件对象
     * @param v 视频信息对象
     */
    selectVitem(e, v) {
      this.$refs.vitem.forEach((item, index) => {
        if (item.contains(e.target)) {
          //设置选中视频的样式
          if (!item.classList.contains('selected')) {
            item.classList.add('selected')
            //保存选中的视频id
            this.selectedVID = v
          } else {
            //若视频已选中，则取消选中
            item.classList.remove('selected')
            this.selectedVID = void 0
          }
        } else {
          //设置未选中视频的样式
          item.classList.remove('selected')
        }
      })
    },
    /**
     * 使用选中的视频
     */
    useVitem() {
      //判断是否有选中的视频
      if (!this.selectedVID) {
        this.$msg.warn('请选择作品')
        return
      }

      if (this.tr === 't') {
        //use...
        if (this.changeVId) {
          this.tvideoLidt.forEach((item, index) => {
            if (item.title === this.changeVId.title) {
              this.tvideoLidt[index] = this.selectedVID
            }
          })
        } else {
          this.tvideoLidt.push(this.selectedVID)
        }
        this.$msg.success('置顶作品设置成功')
      } else if (this.tr === 'r') {
        if (this.changeVId) {
          this.rvideoLidt.forEach((item, index) => {
            if (item.title === this.changeVId.title) {
              this.rvideoLidt[index] = this.selectedVID
            }
          })
        } else {
          this.rvideoLidt.push(this.selectedVID)
        }
        this.$msg.success('代表作设置成功')
      } else {
        this.$msg.error('设置失败!')
      }

      this.closeTRDialog()
      // this.TRDialogVisible = false

    },
    changeVitem(v, type) {
      this.changeVId = v
      this.showTRDialog(type)
    },
    cancelVitem(v, type) {
      if (type === 't') {
        this.tvideoLidt.forEach((item, index) => {
          if (item.title === v.title) {
            this.tvideoLidt.splice(index, 1)
          }
        })
      } else if (type === 'r') {
        this.rvideoLidt.forEach((item, index) => {
          if (item.title === v.title) {
            this.rvideoLidt.splice(index, 1)
          }
        })
      }
    },
    goTo(path, query, target = '_self') {
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
    collectionsCreateStepsChange(step) {
      if (step === 1) {
        this.collectionsDialogTitle = '新建视频集合'
      }
      if (step === 2) {
        this.collectionsDialogTitle = '选择视频'
      }
      this.collectionsCreateSteps = step
    },
    showCollectionsDialog() {
      this.collectionsVSelectedList = []
      this.collectionsDialogVisible = true
    },
    closeCollectionsDialog() {
      this.collectionsDialogVisible = false
      this.collectionsCreateSteps = 1
      this.collectionsName = ''
      this.collectionsIntroduction = ''
      this.collectionsVSelectedList = []
      this.resetSelectCollectionsVitem()
    },
    collectionsCreateNext() {
      if (this.collectionsName) {
        this.collectionsCreateStepsChange(2)
      } else {
        this.$msg.warn('请先填写集合标题')
      }
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
    resetSelectCollectionsVitem() {
      this.videoList.forEach((item, index) => {
        if (item.selected === undefined) {
          this.$set(item, 'selected', false)
        } else {
          item.selected = false
        }
      })
    },
    createCollections() {
      if (this.collectionsVSelectedList.length) {
        //do..
        this.$msg.success('合集创建成功')
        this.closeCollectionsDialog()
      } else {
        this.$msg.warn('请选择至少一个视频')
      }

    }
  },
  created() {
  },
  mounted() {
  }

}
</script>

<style lang="scss" scoped>
.up-index {
  display: flex;

  .col-l {
    flex: 1;

    .l {
      background-color: #fff;
      border: 1px solid #eee;
      border-radius: 6px;
      padding: 20px;

      h3 {
        color: #18191c;
        font-weight: 500;
        cursor: pointer;

        &:hover {
          color: #00a1d6;
        }
      }

      .c {
        border-top: 1px solid #eee;
        padding-top: 20px;
      }

      .c-head {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .btns {
          display: flex;
          align-items: center;
        }

        h4,
        .btn {
          flex-shrink: 0;
        }

        .tabs {
          flex: 1;
          margin-left: 12px;
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

      .up-t-r {

        .t-r {
          padding-top: 9px;
          display: flex;

          .tr-v {
            position: relative;
            margin-left: 20px;
            width: 233px;

            &:first-child {
              margin-left: 0;
            }

            &:hover {
              .edit-icon {
                opacity: 1;
              }
            }

            .e-i-pop {
              position: absolute;
              z-index: 1;
              top: 15px;
              right: 15px;

              .tr-v-opt {
                padding: 6px 12px;
                font-size: 12px;
                color: rgb(255, 255, 255, .7);

                .cancel,
                .change {
                  cursor: pointer;

                  &:hover {
                    color: white;
                  }
                }

                .change {
                  margin-top: 2px;
                }
              }
            }

            .edit-icon {
              width: 25px;
              height: 25px;
              background-color: rgba(0, 0, 0, .6);
              border-radius: 6px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 13px;
              cursor: pointer;
              transition: .3s;
              opacity: 0;

              i {
                font-size: 14px;
                color: white;
              }
            }

          }

          .set {
            position: relative;
            margin-left: 20px;
            width: 233px;
            height: 132px;
            border: 2px dashed #b8c0cc;
            box-sizing: border-box;
            border-radius: 6px;
            cursor: pointer;
            transition: .3s;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            &:first-child {
              margin-left: 0;
            }

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
              width: 50px;
              height: 50px;

              i {
                display: inline-block;
                font-size: 50px;
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

          .t-r-dialog {
            width: 480px;
            padding: 5px 16px 22px 16px;

            .d-head {
              padding-bottom: 8px;
              border-bottom: 2px solid #eee;
            }

            .d-foot {
              margin-top: 30px;
              display: flex;
              justify-content: center;

              .can-btn,
              .con-btn {
                padding: 6px 35px;
                border-radius: 6px;
                font-size: 14px;
                letter-spacing: 2px;
                cursor: pointer;
                border: 1px solid #e7e7e7;
                color: #18191c;
              }

              .can-btn:hover {
                color: #00a1d6;
                border-color: #00a1d6;
              }

              .con-btn {
                margin-left: 20px;
                background-color: #00a1d6;
                color: #fff;

                &:hover {
                  background-color: #33b4de;
                }
              }
            }
          }

          .t,
          .r {
            display: flex;
          }
        }
      }

      .v-title {
        margin-top: 8px;
        word-break: break-all;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        color: #18191c;
        cursor: pointer;

        &:hover {
          color: #00AEEC;
        }
      }

      .v-time {
        margin-top: 3px;
        font-size: 12px;
        color: #9499A0;
      }

      .up-my-video,
      .v-c {
        margin-bottom: 8px;

        .m-v {
          max-height: 300px;
          margin-top: 15px;
          display: flex;
          flex-wrap: wrap;
          overflow: hidden;
        }

        @media (min-width: 1420px) {

          .m-v-item {
            margin-left: 16px !important;
          }

          .m-v-item:nth-child(5n + 1) {
            margin-left: 0 !important;
          }
        }

        @media (max-width: 1419.99px) {
          .m-v-item:nth-child(4n + 1) {
            margin-left: 0 !important;
          }
        }

        .m-v-item {
          width: 163px;
          margin-left: 15px;
          margin-bottom: 15px;
        }
      }

      .up-video-collections {

        .c:nth-child(2) {
          border-top: none;
        }

        .v-c-head {
          display: flex;
          align-items: center;

          .create-btn {
            margin-left: 10px;

            &:hover {
              .create-ico {
                display: inline-block;
                animation: create .5s linear;
              }
            }
          }

          .create-ico {
            font-weight: bold;
            margin-left: 2px;
          }

          @keyframes create {
            0% {
              transform: scale(1);
            }

            50% {
              transform: scale(1.3);
            }

            100% {
              transform: scale(1);
            }

          }
        }

        .create-tips {
          margin: 20px 0 30px 0;
          display: flex;
          flex-direction: column;
          align-items: center;

          .tip {
            margin-top: 4px;
            font-size: 12px;
            color: #9499A0;
          }
        }

        .v-c {
          .m-v {
            height: 150px;
            justify-content: space-between;
          }

          .h-title {
            color: #6D757A;
            font-size: 16px;
            cursor: pointer;

            &:hover {
              color: #00a1d6;
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

      .up-favorites {

        .favorites {
          margin-top: 15px;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;

          @media (min-width: 1420px) {
            .f-item {
              width: 208px !important;
              height: 140px !important;
            }
          }

          .f-item {
            margin-bottom: 15px;
            width: 164px;
            height: 111px;

            .f-info {
              position: relative;
              width: 100%;
              height: 100%;
              background-size: cover;
              background-repeat: no-repeat;
              background-position: 50% 50%;

              .num {
                position: absolute;
                top: 10px;
                right: 10px;
                max-width: 60%;
                border-radius: 6px;
                background-color: rgba(0, 0, 0, .6);
                padding: 3px 10px;
                font-size: 12px;
                color: #fff;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }

              .t-s {
                position: absolute;
                left: 0;
                bottom: 0;
                width: 100%;
                box-sizing: border-box;
                background-image: linear-gradient(to top, rgba(0, 0, 0, .5), rgba(0, 0, 0, 0));
                padding: 8px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #fff;
                font-size: 17px;

                .title {
                  flex: 1;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                }

                .state {
                  font-size: 13px;
                  margin-left: 6px;
                  flex-shrink: 0;
                }
              }
            }

            .view {
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              cursor: pointer;

              &:hover {
                .v-btn {
                  opacity: 1;
                  transform: translateY(0);
                  // transform: scale(1);
                }
              }

              .v-btn {
                padding: 3px 12px;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, .5);
                opacity: 0;
                transform: translateY(25%);
                // transform: scale(.5);
                transition: .6s;
              }
            }
          }
        }

      }


    }
  }

  .col-r {
    flex-shrink: 0;
    margin-left: 10px;
    width: 350px;

    .c {
      margin-bottom: 10px;
      background-color: #fff;
      border: 1px solid #eee;
      border-radius: 6px;
    }

    .up-auth {

      .no-auth {
        width: 100%;
        height: 70px;
        display: flex;

        .a-icon {
          flex-shrink: 0;
          width: 99px;
          height: 70px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .a-title {
          flex-grow: 1;
          padding: 15px 15px;
          display: flex;
          flex-direction: column;

          .a-link {
            color: #18191C;
            font-size: 18px;
          }

          .a-desc {
            font-size: 12px;
            color: #99A2AA;
          }
        }
      }

      .auth {
        padding: 18px 20px;

        .auth-description {
          display: flex;
          font-size: 14px;

          .auth-icon {
            flex-shrink: 0;
            margin-right: 6px;
            width: 18px;
            height: 18px;
            background-image: url('@/assets/images/up/up-auth.png');
            background-position: -39px -54px;
            background-repeat: no-repeat;
          }

          .auth-type {
            line-height: 18px;
            word-break: break-all;
          }
        }
      }

    }

    .up-charge {
      padding: 15px;

      &:hover .charge-opt .charge-anima .charge {
        opacity: 1;
      }

      .charge-opt {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .charge-btn:hover+.charge-anima {
          .charging {
            background-position-x: 0;
          }
        }

        .charge-anima {
          position: relative;
          height: 74px;
          width: 156px;
          background-color: #e5e9ef;

          .charge-mask {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url('@/assets/images/up/charging-bg.png');
          }

          .charge {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url('@/assets/images/up/charging-hover.gif');
            opacity: 0;
          }

          .charging {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-image: url('@/assets/images/up/charging-focus.gif');
            background-position-x: -156px;
            background-repeat: no-repeat;
            transition: .4s;
          }

        }
      }

      .charge-up {
        margin: 10px 0;

        .c-u-title {
          font-size: 12px;
          color: #99A2AA;
          margin-bottom: 8px;
        }

        .c-u {
          display: flex;

          .c-u-avatar {
            margin-right: 8px;
            height: 42px;
            width: 42px;
            border-radius: 50%;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
              border-radius: 50%;
              // object-fit: cover;
            }
          }
        }
      }


    }

    .up-creation {
      padding: 15px 15px 20px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .c-title {
        display: flex;
        align-items: center;
        font-size: 22px;
        font-weight: bold;
        color: #02B5DA;
        fill: #009ab8;
        cursor: pointer;

        .title {
          margin-right: 6px;
        }

        .more {
          transition: .5s;
        }

        &:hover {
          .more {
            transform: translateX(8px);
          }
        }
      }

      .c-c-m {
        margin-top: 20px;
        width: 100%;
        display: flex;
        justify-content: space-around;

        .man,
        .con {
          flex: 1;
          height: 35px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: .2s;
        }

        .con {
          border: 1px solid #02B5DA;
          border-radius: 6px 0 0 6px;
          background-color: #02B5DA;
          color: white;

          &:hover {
            background-color: #00bfe5;
          }
        }

        .man {
          border: 1px solid #eee;
          border-left: none;
          border-radius: 0 6px 6px 0;
          background-color: white;
          fill: #18191C;

          &:hover {
            color: #02B5DA;
            border-color: #02B5DA;
            fill: #02B5DA;
          }
        }



      }
    }

    .up-notice {
      position: relative;
      padding: 15px 8px;

      .n-title {
        margin: 0 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
      }

      .n-editing-area {
        position: relative;

        .text-area,
        .text-area-u {
          width: 100%;
          height: 194px;
          vertical-align: bottom;
          border-radius: 6px;
          outline: none;
          resize: none;
          border: 1px solid transparent;
          box-sizing: border-box;
          padding: 10px;
          font-family: 'PingFang SC', Helvetica, sans-serif, Arial;
          font-size: 14px;
          letter-spacing: 1px;
          color: #6d757a;
          transition: .3s;

          &:focus,
          &:hover {
            border: 1px solid #02B5DA;

            &~.word-count {
              opacity: 1;
            }
          }
        }

        .text-area-u {
          &:hover {
            border: 1px solid transparent;
          }
        }

        .word-count {
          position: absolute;
          bottom: 8px;
          right: 12px;
          font-size: 12px;
          color: #99a2aa;
          opacity: 0;
          transition: .3s;
        }

        // .text-area:hover~.word-count {

        // }
      }
    }

    .up-info {
      padding: 15px;

      .i-head {
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .i-set {
          font-size: 12px;
          color: #99A2AA;
          border: 1px solid #eee;
          border-radius: 4px;
          padding: 3px 8px;
          transition: .3s;

          &:hover {
            color: #02B5DA;
            border-color: #02B5DA;
          }
        }


      }

      .i-m {
        padding: 5px 0;
        display: flex;
        flex-wrap: wrap;

        .i-item {
          width: 50%;
          font-size: 14px;
          padding-top: 10px;

          .lable {
            margin-right: 6px;
            color: #9499A0;
          }

          .i {
            color: #6D757A;
          }
        }

      }
    }
  }

  .op-enter,
  .op-leave-to {
    opacity: 0;
  }

  .op-enter-to,
  .op-leave {
    opacity: 1;
  }

  .op-enter-active {
    transition-duration: .5s;
  }

  // .op-leave-active {
  //   transition: .5s;
  // }
}

@media (min-width: 1420px) {
  .tr-v {
    width: 280px !important;
  }

  .set {
    width: 280px !important;
    height: 157px !important;
  }

}

.tr-v-opt {
  padding: 6px 12px;
  font-size: 12px;
  color: rgb(255, 255, 255, .7);

  .cancel,
  .change {
    cursor: pointer;

    &:hover {
      color: white;
    }
  }

  .change {
    margin-top: 2px;
  }
}
</style>