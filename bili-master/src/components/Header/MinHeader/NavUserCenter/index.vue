<template>
  <div class="nav-user-center" :style="{ ...navUserCenterStyle }" ref="navUserCenter">
    <div class="bic-contianer">
      <UserAvatar @avatarClick="openLoginDialog"></UserAvatar>
    </div>
    <div class="n-u-c-o option" @click="testTip">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="right-entry-icon">
        <path fill-rule="evenodd" clip-rule="evenodd"
          d="M10 1C5.02955 1 1 5.02955 1 10C1 14.9705 5.02955 19 10 19C14.9705 19 19 14.9705 19 10C19 5.02955 14.9705 1 10 1ZM10.0006 2.63614C14.0612 2.63614 17.3642 5.93996 17.3642 9.99977C17.3642 14.0604 14.0612 17.3634 10.0006 17.3634C5.93996 17.3634 2.63696 14.0604 2.63696 9.99977C2.63696 5.93996 5.93996 2.63614 10.0006 2.63614Z"
          fill="currentColor"></path>
        <path
          d="M13.1381 8.05573V8.05331H10.7706C10.7859 7.8643 10.7948 7.67286 10.7948 7.47981C10.7948 7.26414 10.7843 7.05008 10.7649 6.83926C10.7658 6.82552 10.7674 6.81179 10.7674 6.79725V6.79483C10.7674 6.35541 10.4111 6 9.97254 6C9.53312 6 9.17771 6.35622 9.17771 6.79483V6.79725C9.17771 6.85137 9.18336 6.90468 9.19386 6.95557L9.18255 6.95719C9.19871 7.12924 9.20759 7.30291 9.20759 7.479C9.20759 7.67286 9.19709 7.8643 9.17771 8.0525H6.74313V8.05573C6.32876 8.08239 6 8.42649 6 8.84814V8.85057C6 9.28998 6.33683 9.64216 6.77544 9.64216C6.80937 9.64216 6.8441 9.64378 6.89903 9.64297L8.7601 9.63893C8.28837 10.7294 7.47011 11.6341 6.44507 12.2149C6.44023 12.2173 6.43619 12.2197 6.43134 12.2229C6.42003 12.2294 6.40953 12.2359 6.39822 12.2423L6.39903 12.2431C6.17528 12.3837 6.02585 12.6325 6.02585 12.916V12.9184C6.02585 13.3578 6.38207 13.7132 6.82068 13.7132C6.99111 13.7132 7.14782 13.6591 7.27706 13.5687C8.7706 12.706 9.9168 11.3094 10.4556 9.64055H13.0105C13.0517 9.64136 13.1131 9.63893 13.1131 9.63893C13.5905 9.62924 13.9039 9.2916 13.9039 8.85299V8.85057C13.9047 8.42003 13.5638 8.07108 13.1381 8.05573Z"
          fill="currentColor"></path>
        <path
          d="M13.7731 12.5388C13.7715 12.5356 13.7691 12.5331 13.7674 12.5307C13.74 12.4814 13.7077 12.4362 13.6713 12.3942C13.1584 11.6672 12.513 11.0412 11.7674 10.5541L11.7666 10.555C11.6366 10.4613 11.4766 10.4055 11.3046 10.4055C10.8652 10.4055 10.5098 10.7617 10.5098 11.2003V11.2028C10.5098 11.5033 10.677 11.765 10.9233 11.8999C11.5615 12.3215 12.0825 12.8045 12.4944 13.4499L12.5372 13.5041C12.6786 13.6333 12.866 13.7133 13.0728 13.7133C13.5122 13.7133 13.8676 13.3571 13.8676 12.9184V12.916C13.8668 12.7795 13.8329 12.6511 13.7731 12.5388Z"
          fill="currentColor"></path>
      </svg>
      <span class="option-text">
        大会员
      </span>
    </div>
    <div class="n-u-c-o">
      <Popover :top="15">
        <div slot="reference" class="option msg-num-sign" msg-num="40" @click="testTip">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="right-entry-icon">
            <path
              d="M15.435 17.7717H4.567C2.60143 17.7717 1 16.1723 1 14.2047V5.76702C1 3.80144 2.59942 2.20001 4.567 2.20001H15.433C17.3986 2.20001 19 3.79943 19 5.76702V14.2047C19.002 16.1703 17.4006 17.7717 15.435 17.7717ZM4.567 4.00062C3.59327 4.00062 2.8006 4.79328 2.8006 5.76702V14.2047C2.8006 15.1784 3.59327 15.9711 4.567 15.9711H15.433C16.4067 15.9711 17.1994 15.1784 17.1994 14.2047V5.76702C17.1994 4.79328 16.4067 4.00062 15.433 4.00062H4.567Z"
              fill="currentColor"></path>
            <path
              d="M9.99943 11.2C9.51188 11.2 9.02238 11.0667 8.59748 10.8019L8.5407 10.7635L4.3329 7.65675C3.95304 7.37731 3.88842 6.86226 4.18996 6.50976C4.48954 6.15544 5.0417 6.09699 5.4196 6.37643L9.59412 9.45943C9.84279 9.60189 10.1561 9.60189 10.4067 9.45943L14.5812 6.37643C14.9591 6.09699 15.5113 6.15544 15.8109 6.50976C16.1104 6.86409 16.0478 7.37731 15.6679 7.65675L11.4014 10.8019C10.9765 11.0667 10.487 11.2 9.99943 11.2Z"
              fill="currentColor"></path>
          </svg>
          <span class="option-text">
            消息
          </span>
        </div>
        <div>
          <div class="message-card" v-if="isLogin">
            <div class="msg-item">
              <span>
                回复我的
              </span>
              <span class="msg-num">{{ 2 }}</span>
            </div>
            <div class="msg-item">
              <span>
                系统消息
              </span>
              <span class="msg-num">{{ 7 }}</span>
            </div>
            <div class="msg-item">
              <span>
                我的消息
              </span>
              <span class="msg-num">{{ 22 }}</span>
            </div>
          </div>
          <div class="login-tip-card" v-else>
            <div class="tip">登录即可查看消息记录</div>
            <BButton width="100%" height="40px" @click="testTip">登录</BButton>
          </div>
        </div>
      </Popover>
    </div>
    <div class="n-u-c-o">
      <Popover :top="15">
        <div slot="reference" class="option" @click="testTip">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="right-entry-icon">
            <g clip-path="url(#clip0)">
              <path
                d="M10 10.743C7.69883 10.743 5.83333 8.87747 5.83333 6.5763C5.83333 4.27512 7.69883 2.40964 10 2.40964V10.743Z"
                stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
              <path
                d="M10 10.743C10 13.0441 8.1345 14.9096 5.83333 14.9096C3.53217 14.9096 1.66667 13.0441 1.66667 10.743H10Z"
                stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
              <path
                d="M10 10.743C10 8.44182 11.8655 6.57632 14.1667 6.57632C16.4679 6.57632 18.3333 8.44182 18.3333 10.743H10Z"
                stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
              <path
                d="M9.99999 10.743C12.3012 10.743 14.1667 12.6085 14.1667 14.9096C14.1667 17.2108 12.3012 19.0763 9.99999 19.0763V10.743Z"
                stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"></path>
            </g>
            <defs>
              <clipPath id="clip0">
                <rect width="20" height="20" fill="currentColor" transform="matrix(-1 0 0 1 20 0.742981)"></rect>
              </clipPath>
            </defs>
          </svg>
          <span class="option-text">
            动态
          </span>
        </div>
        <div class="login-tip-card" v-if="!isLogin">
          <div class="tip">登录即可查看关注状态</div>
          <BButton width="100%" height="40px" @click="testTip">登录</BButton>
        </div>
      </Popover>
    </div>
    <div class="n-u-c-o">
      <Popover :top="15" @show="hidepointSign">
        <div slot="reference" class="option col-position" @click="testTip">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="right-entry-icon">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M11.0505 3.16759L12.7915 6.69573C12.954 7.02647 13.2702 7.25612 13.6349 7.30949L17.5294 7.87474C18.448 8.00817 18.8159 9.13785 18.1504 9.78639L15.3331 12.5334C15.0686 12.7905 14.9481 13.1609 15.0104 13.5256L15.6759 17.4031C15.8328 18.3184 14.8721 19.0171 14.0497 18.5845L10.5661 16.7537C10.2402 16.5823 9.85042 16.5823 9.52373 16.7537L6.04087 18.5845C5.21848 19.0171 4.2578 18.3184 4.41468 17.4031L5.07939 13.5256C5.14166 13.1609 5.02198 12.7905 4.75755 12.5334L1.9394 9.78639C1.27469 9.13785 1.64182 8.00817 2.56126 7.87474L6.4549 7.30949C6.82041 7.25612 7.13578 7.02647 7.29832 6.69573L9.04015 3.16759C9.45095 2.33468 10.6389 2.33468 11.0505 3.16759Z"
              stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
            <path
              d="M11.603 11.8739C11.413 12.5556 10.7871 13.0554 10.0447 13.0554C9.29592 13.0554 8.66679 12.5467 8.48242 11.8569"
              stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
          </svg>
          <span class="option-text">
            收藏
          </span>
          <div class="point-sign col-point-sign-position" ref="pointSign" v-if="isLogin"></div>
        </div>
        <div class="favorite-card" v-if="isLogin">
          <div class="favorite-nav">
            <div :class="{ 'f-n-item': true, 'f-n-active': favoriteId === f.id }" v-for="(f, fi) in favoriteList"
              :key="fi" @click="getFavoritevideos(f.id)">
              <span>
                {{ f.name }}
              </span>
              <span class="favorite-num">
                {{ f.total }}
              </span>
            </div>
          </div>
          <div class="favorite-content">
            <div class="favorite-content-head">
              {{ '视频合集12138' }}
            </div>
            <div class="favorite-box">
              <div class="favorite-item" v-for="i in sum" :key="i">
                <VideoPreviewCard mode="row" width="100%" :seeLaterIcon="false" textSize="14px" :title="'video.title'"
                  :up="'video.up'" :videoSrc="'/s0313.mp4'" :imgSrc="'/s03.jpg'"></VideoPreviewCard>
              </div>
            </div>
            <div class="favorite-content-bottom">
              <BButton size="14" type="white" width="40%">查看全部</BButton>
              <div style="width:1px;height:25px;background-color: #E3E5E7;"></div>
              <BButton class="bf-btn" size="14" width="40%">
                <i class="iconfont icon-bofang bf-ico"></i>
                播放全部
              </BButton>
            </div>
          </div>
        </div>
        <div class="login-tip-card" v-else>
          <div class="tip">登录即可查看我的收藏</div>
          <BButton width="100%" height="40px" @click="testTip">登录</BButton>
        </div>
      </Popover>
    </div>
    <div class="n-u-c-o">
      <Popover :top="15">
        <div slot="reference" class="option" @click="testTip">
          <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="right-entry-icon">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M10 1.74286C5.02955 1.74286 1 5.7724 1 10.7429C1 15.7133 5.02955 19.7429 10 19.7429C14.9705 19.7429 19 15.7133 19 10.7429C19 5.7724 14.9705 1.74286 10 1.74286ZM10.0006 3.379C14.0612 3.379 17.3642 6.68282 17.3642 10.7426C17.3642 14.8033 14.0612 18.1063 10.0006 18.1063C5.93996 18.1063 2.63696 14.8033 2.63696 10.7426C2.63696 6.68282 5.93996 3.379 10.0006 3.379Z"
              fill="currentColor"></path>
            <path d="M9.99985 6.6521V10.743" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
            <path d="M12.4545 10.7427H10" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"></path>
          </svg>
          <span class="option-text">
            历史
          </span>
        </div>
        <div v-if="isLogin">
          <div class="history-card">
            <div class="history-box">
              <div class="history-today">
                <div class="h-title">
                  今天
                </div>
                <div class="history-item" v-for="i in 4" :key="i">
                  <VideoPreviewCard mode="row" width="100%" :seeLaterIcon="false" textSize="14px"
                    :title="'【Apple官网特效】iPhone SE 产品网页之颜色切换特效'" :up="'video.up'" :videoSrc="'/s0313.mp4'"
                    :imgSrc="'/s03.jpg'"></VideoPreviewCard>
                </div>
              </div>
              <div class="history-yesterday">
                <div class="h-title">
                  昨天
                </div>
                <div class="history-item" v-for="i in 4" :key="i">
                  <VideoPreviewCard mode="row" width="100%" :seeLaterIcon="false" :title="'video.title'"
                    :up="'video.up'" :videoSrc="'/s0313.mp4'" :imgSrc="'/s03.jpg'"></VideoPreviewCard>
                </div>
              </div>
              <div class="history-Earlier">
                <div class="h-title">
                  更早
                </div>
                <div class="history-item" v-for="i in 4" :key="i">
                  <VideoPreviewCard mode="row" width="100%" :seeLaterIcon="false" :title="'video.title'"
                    :up="'video.up'" :videoSrc="'/s0313.mp4'" :imgSrc="'/s03.jpg'"></VideoPreviewCard>
                </div>
              </div>
              <div class="h-more-btn">
                <BButton size="14" width="100%" height="36px" type="l-gray">查看更多</BButton>
              </div>
            </div>
          </div>
        </div>
        <div class="login-tip-card" v-else>
          <div class="tip">登录即可查看历史记录</div>
          <BButton width="100%" height="40px" @click="testTip">登录</BButton>
        </div>
      </Popover>
    </div>
    <div class="n-u-c-o option" @click="testTip">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg"
        class="right-entry-icon">
        <mask id="mask0" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="16" height="20">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 1.74286H17.5V20.0762H2.5V1.74286Z" fill="currentColor">
          </path>
        </mask>
        <g mask="url(#mask0)">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M9.99999 1.74286C9.92916 1.74286 9.85916 1.74369 9.78833 1.74536C5.85416 1.85453 2.58416 5.14869 2.50166 9.08286C2.44999 11.5404 3.58666 13.7304 5.36999 15.1337C5.52166 15.2529 5.63166 15.4162 5.67333 15.6045L6.30416 18.447C6.51583 19.3987 7.36083 20.0762 8.33583 20.0762H11.6617C12.6383 20.0762 13.4842 19.3987 13.6958 18.4445L14.3275 15.602C14.3692 15.4154 14.4775 15.2537 14.6275 15.1354C16.3733 13.7629 17.5 11.637 17.5 9.24286C17.5 5.10036 14.1425 1.74286 9.99999 1.74286ZM10.0003 3.40939C13.2161 3.40939 15.8336 6.02606 15.8336 9.24273C15.8336 11.0386 15.0186 12.7086 13.5978 13.8252C13.1428 14.1827 12.8244 14.6852 12.7011 15.2402L12.0686 18.0827C12.0269 18.2752 11.8586 18.4094 11.6619 18.4094H8.33609C8.14109 18.4094 7.97359 18.2761 7.93192 18.0852L7.30025 15.2427C7.17609 14.6869 6.85775 14.1827 6.40109 13.8236C4.94359 12.6769 4.12942 10.9619 4.16859 9.11773C4.23192 6.05523 6.77442 3.49606 9.83442 3.41189C9.88942 3.41023 9.94525 3.40939 10.0003 3.40939Z"
            fill="currentColor"></path>
          <path d="M10 6.81299L8.81253 9.18726H11.1875L9.99952 11.561" stroke="currentColor" stroke-width="1.6"
            stroke-linecap="round" stroke-linejoin="round"></path>
        </g>
        <path d="M6.66656 15.9095H13.3332" stroke="currentColor" stroke-width="1.7"></path>
      </svg>
      <span class="option-text">
        创造中心
      </span>
    </div>
    <div class="contribution-btn" @click="goTo('/works/upload')">
      <div href="/works/upload" class="btn">
        <span>投稿</span>
        <svg data-v-ca28f7ea="" data-v-83bdd12c="" width="20" height="20" viewBox="0 0 18 18" fill="none"
          xmlns="http://www.w3.org/2000/svg" class="header-upload-entry__icon">
          <path data-v-ca28f7ea="" data-v-83bdd12c=""
            d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
            stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
          <path data-v-ca28f7ea="" data-v-83bdd12c="" d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
          <path data-v-ca28f7ea="" data-v-83bdd12c="" d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413"
            stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </div>
    </div>

    <Dialog width="360px" height="150px" right="100px" bottom="80px" :mask="false"
      backgroundColor="rgba(255,255,255,.5)" filter="blur(5px)" title="登录Bili，高清视频免费看！" :visible.sync="loginTipDialog">
      <div class="login-tip">
        <div class="login-tip-desc">
          更多登录后权益等你解锁
        </div>
        <div class="login-tip-btn" @click="openLoginDialog">
          <svg width="50" height="58" viewBox="0 0 50 58" fill="none" xmlns="http://www.w3.org/2000/svg"
            class="tv-icon">
            <g clip-path="url(#clip0_5121_279027)">
              <path
                d="M38.1783 59.2421C39.0604 58.2498 39.6183 57.4039 39.9474 56.8345L42.4835 58.5032L45.3289 61.031L41.7215 65.091L38.8859 62.5698L36.3828 60.9306C36.814 60.618 37.4196 60.0963 38.1799 59.2421H38.1783Z"
                fill="white" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path
                d="M47.4987 58.2931C47.4987 58.2931 48.0681 58.2273 48.4565 58.5729C48.8449 58.9185 49.0078 59.0518 49.2991 59.3217C50.1335 60.0984 49.0374 62.4057 47.5086 64.1255C45.9287 65.9029 41.4688 65.9062 41.4688 65.9062C41.4688 65.9062 39.9844 64.9385 39.9844 64.4727L47.4987 58.2931Z"
                fill="#2C2F39" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path
                d="M42.7535 58.3111C42.268 58.4526 40.8576 60.7368 40.9778 61.2964C41.0897 61.8164 41.9603 62.3891 41.9603 62.3891C41.9603 62.3891 40.0628 63.2515 38.8861 62.5702C38.8861 62.5702 38.3562 63.1215 40.3985 64.8314C40.3985 64.8314 44.0552 64.3969 45.4409 63.7995C46.8266 63.2021 48.0708 60.8405 48.214 59.7461C48.3555 58.6517 47.5524 57.9375 46.1832 58.1597C44.8139 58.3818 44.3021 58.3966 43.8693 58.3736C43.5369 58.3555 43.1501 58.1942 42.7551 58.3111H42.7535Z"
                fill="#E6E6E6" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path
                d="M40.7947 56.0875L33.7938 50.6978L26.742 55.0753H19.4844L19.7263 64.5843C19.7263 64.5843 21.0807 65.078 23.5361 65.078C25.9915 65.078 26.8275 64.5843 26.8275 64.5843L28.7728 58.1133L36.6146 62.3181C36.6146 62.3181 40.9395 59.7344 40.793 56.0858L40.7947 56.0875Z"
                fill="black" stroke="black" stroke-width="0.658285" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path d="M28.7734 58.1149L30.6117 56.6025" stroke="black" stroke-width="0.658285" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M35.8809 35.7646L39.9951 31.2521C40.9431 30.523 43.1878 29.6837 44.483 30.3041C45.6202 30.8489 48.4228 33.5873 45.6498 34.9385"
                fill="white"></path>
              <path
                d="M35.8809 35.7646L39.9951 31.2521C40.9431 30.523 43.1878 29.6837 44.483 30.3041C45.6202 30.8489 48.4228 33.5873 45.6498 34.9385"
                stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M33.2776 43.4517L37.201 41.3337C37.7852 40.0204 37.9926 35.6429 35.1455 34.1831L30.5902 35.763L21.1816 38.0176L28.8309 41.4539L33.2776 43.4517Z"
                fill="white" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path
                d="M31.744 54.3481C33.2301 53.6305 34.7425 52.4818 35.6213 51.1883C35.6213 51.1883 34.6948 45.6686 33.4128 41.8686L29.4976 39.5811L27.7959 38.6167L19.2382 37.9288L11.0936 32.9653L7.49609 38.773L17.0544 45.1568C17.1103 47.6813 17.7044 52.3765 18.3594 56.0612C18.3594 56.0612 24.6971 56.894 30.1065 55.0212"
                fill="white"></path>
              <path
                d="M22.1191 37.9766C22.1191 37.9766 22.8877 39.0463 24.1154 39.9086C25.7841 41.0804 27.9038 40.3299 28.7859 38.1609C28.9637 37.7231 29.1085 37.2327 29.1973 36.688L22.1208 37.9766H22.1191Z"
                fill="white" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path d="M11.9922 4.42871L15.7543 9.34939" stroke="black" stroke-width="4.27885" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path d="M29.0006 2.13965L26.6719 7.88153" stroke="black" stroke-width="4.27885" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M36.9789 7.59165C33.7122 5.65464 26.29 6.69967 21.0517 7.40568C15.8134 8.11004 8.3781 9.06456 5.74002 11.7948C3.10195 14.525 3.56933 19.0557 4.34775 24.8371C5.12617 30.6184 6.24526 35.911 9.8724 37.4597C13.4996 39.0083 19.4159 38.3023 25.1068 37.5354C30.7976 36.7701 36.6909 35.888 39.7783 33.4359C42.8673 30.9838 42.548 25.5826 41.7696 19.8012C40.9912 14.0198 40.2457 9.527 36.9789 7.59165Z"
                fill="white" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path d="M12.1445 20.874L17.814 17.9775" stroke="black" stroke-width="2.63314" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path d="M32.6207 18.1194L26.3867 16.8242" stroke="black" stroke-width="2.63314" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M27.3235 21.9834C27.3235 21.9834 27.2857 24.2183 25.5708 24.4487C23.856 24.6791 22.8225 22.7618 22.8225 22.7618C22.8225 22.7618 22.3321 24.8848 20.6172 25.1152C18.9024 25.3456 18.2754 23.1996 18.2754 23.1996"
                stroke="black" stroke-width="1.31657" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M34.5979 9.56352C33.1678 8.66496 24.8586 9.70834 21.1344 10.2103C17.4101 10.7122 9.11902 11.9004 7.97854 13.1446C6.83642 14.3887 7.66421 20.5305 8.06741 23.5307C8.47061 26.5308 9.0713 30.9874 10.2957 31.9863C11.5201 32.9853 18.6148 32.4833 24.0341 31.7543C29.4518 31.0252 36.4263 29.6346 37.3446 28.3477C38.2629 27.0607 37.6622 22.6041 37.259 19.604C36.8558 16.6039 36.0297 10.4621 34.5996 9.56352H34.5979Z"
                stroke="black" stroke-width="1.31657" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M7.26104 30.7041L2.5 35.7005C3.02169 37.0138 4.48144 37.858 5.97574 37.7593L14.3162 43.33"
                fill="white">
              </path>
              <path d="M7.26104 30.7041L2.5 35.7005C3.02169 37.0138 4.48144 37.858 5.97574 37.7593L14.3162 43.33"
                stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M3.00792 33.0132C4.02991 33.558 4.57135 34.5372 4.21917 35.1987C3.86534 35.8603 2.75119 35.9558 1.73085 35.411C0.708863 34.8663 0.167424 33.8871 0.519606 33.2255C0.873434 32.5639 1.98758 32.4685 3.00792 33.0132Z"
                fill="white" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path
                d="M4.24084 30.6779C5.22827 31.4102 5.62653 32.5458 5.13117 33.2139C4.63581 33.8821 3.43279 33.8311 2.44701 33.0987C1.45959 32.3664 1.06132 31.2309 1.55668 30.5627C2.05204 29.8945 3.25341 29.9456 4.24084 30.6779Z"
                fill="white" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path
                d="M5.88861 28.7754C6.83654 29.5588 7.17391 30.7124 6.64563 31.3542C6.11571 31.9961 4.91764 31.8809 3.96971 31.0975C3.02178 30.3141 2.68276 29.1605 3.21433 28.5187C3.74424 27.8768 4.94232 27.992 5.89025 28.7754H5.88861Z"
                fill="white" stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round">
              </path>
              <path d="M6.04883 32.6855C6.05706 33.2978 6.24138 34.272 7.26172 34.6686" stroke="black"
                stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M14.3157 43.0046L17.5627 38.3308L9.66493 31.7825C9.63366 30.9234 8.57876 28.6227 6.63847 29.0342C4.69818 29.4472 3.69923 31.9964 4.80021 32.7024C5.89955 33.4085 7.19801 31.6788 7.19801 31.6788"
                fill="white"></path>
              <path
                d="M14.3157 43.0046L17.5627 38.3308L9.66493 31.7825C9.63366 30.9234 8.57876 28.6227 6.63847 29.0342C4.69818 29.4472 3.69923 31.9964 4.80021 32.7024C5.89955 33.4085 7.19801 31.6788 7.19801 31.6788"
                stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M12.9824 42.68L15.3374 36.4839" stroke="black" stroke-width="0.658285" stroke-linecap="round"
                stroke-linejoin="round"></path>
              <path
                d="M18.9723 38.2595C18.0277 37.5437 15.3353 35.7646 15.3353 35.7646C15.197 37.468 13.4263 40.7001 11.5781 42.2274C11.5781 42.2274 12.1541 42.9893 16.9201 45.3328"
                fill="white"></path>
              <path
                d="M18.9723 38.2595C18.0277 37.5437 15.3353 35.7646 15.3353 35.7646C15.197 37.468 13.4263 40.7001 11.5781 42.2274C11.5781 42.2274 12.1541 42.9893 16.9201 45.3328"
                stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M17.0293 43.3279C17.0293 43.3279 17.4095 50.7336 18.359 56.0591C18.359 56.0591 24.6967 56.8919 30.1061 55.019L31.0639 54.6915L31.742 54.3476C33.228 53.6301 34.7404 52.4814 35.6193 51.1878C35.6193 51.1878 34.6927 45.6681 33.4107 41.8682"
                stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round"></path>
              <path
                d="M36.4453 35.4061C36.4453 35.4061 38.091 37.1801 37.4459 40.46L41.3084 37.1982C41.8005 37.8187 43.8806 38.0013 44.7743 36.3227C44.7743 36.3227 46.1649 36.5844 46.4891 35.6299C46.7985 34.7181 45.8143 34.0615 44.8467 33.915"
                fill="white"></path>
              <path
                d="M36.4453 35.4061C36.4453 35.4061 38.091 37.1801 37.4459 40.46L41.3084 37.1982C41.8005 37.8187 43.8806 38.0013 44.7743 36.3227C44.7743 36.3227 46.1649 36.5844 46.4891 35.6299C46.7985 34.7181 45.8143 34.0615 44.8467 33.915"
                stroke="black" stroke-width="0.822856" stroke-linecap="round" stroke-linejoin="round"></path>
            </g>
            <defs>
              <clipPath id="clip0_5121_279027">
                <rect width="50" height="58" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
          <span>立即登录</span>
        </div>
      </div>
    </Dialog>

    <div class="point-sign-anima"></div>

  </div>
</template>

<script>
import UserAvatar from "./UserAvatar/index.vue"
import Dialog from "@/components/Common/Dialog/index.vue"
import Popover from '@/components/Common/Popover'
import BButton from '@/components/Common/Button'
import VideoPreviewCard from '@/components/Common/Card/VideoPreviewCard/index.vue'

import loginMixin from '@/mixins/login'

export default {
  name: "NavUserCenter",
  components: { UserAvatar, Dialog, Popover, BButton, VideoPreviewCard },
  mixins: [loginMixin],
  props: {
    color: {
      type: String,
      default: "white",
    },
    hoverColor: {
      type: String,
      default: "#fb7299",
    }
  },
  data() {
    return {
      loginTipDialog: false,

      favoriteId: '1213811',
      sum: 1,

      favoriteList: [{
        id: '1213811',
        name: '默认合集',
        total: 32
      }, {
        id: '1213812',
        name: '默认合集2',
        total: 311
      }, {
        id: '1213813',
        name: '默认合集3',
        total: 3
      },
      {
        id: '1213814',
        name: '默认合集4',
        total: 0
      }]
    }
  },
  computed: {
    navUserCenterStyle() {
      return {
        '--color': this.color,
        '--hoverColor': this.hoverColor
      }
    }

  },
  watch: {
    isLogin(val) {
      if (val) {
        this.setLoginDialogShow(false)
        this.loginTipDialog = false
      }
    }
  },
  methods: {
    // navUserCenterIntersectionObserverInit() {
    //   if (this.isLogin) return
    //   this.intersectionObserver = new IntersectionObserver((entries) => {
    //     if (this.isLogin) {
    //       this.intersectionObserver.unobserve(this.$refs.navUserCenter)
    //       this.intersectionObserver.disconnect()
    //       this.intersectionObserver = null
    //       return
    //     }
    //     entries.forEach((item) => {
    //       if (!item.isIntersecting) {
    //         this.loginTipDialog = true
    //         this.intersectionObserver.unobserve(this.$refs.navUserCenter)
    //         this.intersectionObserver.disconnect()
    //         this.intersectionObserver = null
    //       }
    //     })
    //   }, { root: document })
    //   this.intersectionObserver.observe(this.$refs.navUserCenter)
    // },
    openLoginDialog() {
      this.loginJudge(() => { })
    },
    loginTipDialogShowListenerInit() {
      if (this.isLogin) return
      this.loginTipDialogShowListener = () => {

        if (this.isLogin) {
          window.removeEventListener('scroll', this.loginTipDialogShowListener)
          return
        }

        if (document.documentElement.scrollTop > 80) {
          this.loginTipDialog = true
          window.removeEventListener('scroll', this.loginTipDialogShowListener)
          this.listenerHandle = null
        }
      }
      window.addEventListener('scroll', this.loginTipDialogShowListener)
    },
    testTip() {
      this.loginJudge(() => {
        this.$msg({
          msg: '功能还在努力开发中。。。',
          top: 80
        })
      })
    },
    getFavoritevideos(fid) {
      this.favoriteId = fid
      this.sum += 1
    },
    hidepointSign() {
      this.$refs.pointSign.style.setProperty('display', 'none')
    },
    goTo(route) {
      this.loginJudge(() => {
        this.$router.push(route)
      })

    }
  },
  mounted() {
    // this.navUserCenterIntersectionObserverInit()
    this.loginTipDialogShowListenerInit()
  },
  beforeDestroy() {
    this.intersectionObserver && this.intersectionObserver.disconnect()
    this.intersectionObserver = null
  }
};
</script>

<style lang="scss" scoped>
.nav-user-center {
  display: flex;
  align-items: center;
  height: 40px;
  flex-shrink: 0;
  font-size: 13px;
  position: relative;

  --color: white;
  --hoverColor: #fb7299;


  .bic-contianer {
    margin-left: 12px;
  }

  .n-u-c-o {
    margin-left: 15px;
    transition: .3s;
  }

  .option {
    position: relative;
    display: flex;
    flex-direction: column;
    // line-height: 30px;
    align-items: center;
    color: var(--color);
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    cursor: pointer;

    &:hover {
      color: var(--hoverColor);
    }

    @media (max-width: 1279.9px) {
      .option-text {
        display: none;
      }
    }

    @media (min-width: 1280px) {
      .option-text {
        display: block;
      }
    }

  }

  .login-tip-card {
    width: 360px;
    box-sizing: border-box;
    padding: 22px 20px;
    user-select: none;

    .tip {
      margin-bottom: 20px;
      color: #9499A0;
      text-align: center;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .contribution-btn {
    // width: 100px;
    // height: 40px;
    margin-left: 14px;
    cursor: pointer;

    .btn {
      position: relative;
      width: 100%;
      height: 100%;
      background-color: var(--hoverColor);
      box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
      font-weight: bold;
      overflow: hidden;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      transition: .8s;

      &::after {
        content: "";
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        z-index: 0;
        background-color: white;
        border-radius: 50%;
        transition: .8s;
      }

      &:hover {
        color: var(--hoverColor);
      }

      span {
        z-index: 1;
      }

      svg {
        z-index: 1;
      }
    }
  }

  @media (max-width: 1279.9px) {
    .contribution-btn {
      width: 36px;
      height: 34px;

      .btn {

        &:hover::after {
          width: 60px;
          height: 60px;
        }

        border-radius: 6px;

        span {
          display: none;
        }
      }


    }
  }

  @media (min-width: 1280px) {
    .contribution-btn {
      width: 100px;
      height: 36px;

      .btn {
        border-radius: 3px;

        &:hover::after {
          width: 110px;
          height: 110px;
        }

        svg {
          display: none;
        }
      }
    }


  }

  .message-card {
    overflow: hidden;
    border-radius: 6px;
    font-size: 14px;

    .msg-item {
      padding: 10px 22px;
      cursor: pointer;
      display: flex;
      // justify-content: space-between;
      align-items: center;

      &:hover {
        background-color: #F1F2F3;
      }

      .msg-num {
        margin-left: 6px;
        background-color: #fa5a57;
        color: white;
        border-radius: 8px;
        padding: 0 5px;
        font-size: 12px;
        height: 16px;
        line-height: 16px;
      }
    }
  }

  .favorite-card {
    width: 500px;
    display: flex;
    border-radius: 6px;
    overflow: hidden;

    .favorite-nav {
      flex-shrink: 0;
      box-sizing: border-box;
      width: 150px;
      max-height: 540px;
      min-height: 366px;
      border-right: 1px solid #E3E5E7;

      .f-n-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        height: 46px;
        color: #18191c;
        font-size: 14px;
        line-height: 22px;
        cursor: pointer;
        transition: background-color .3s, color .3s;

        &:hover {
          background-color: #F1F2F3;
          color: #00AEEC;

          .favorite-num {
            color: #00AEEC;
          }
        }

        &.f-n-active {
          background-color: #00AEEC;
          color: white;

          .favorite-num {
            color: #fff;
          }
        }

        .favorite-num {
          color: #9499A0;
          word-break: normal;
          font-size: 12px;
          line-height: 20px;
        }

      }
    }

    .favorite-content {
      flex: 1 auto;

      .favorite-box {
        max-height: 450px;
        min-height: 276px;

        .favorite-item {
          padding: 10px 18px;
          cursor: pointer;

          &:hover {
            background-color: #F1F2F3;
          }
        }
      }

      .favorite-content-head {
        padding: 12px 18px 6px 18px;
        font-size: 15px;
      }

      .favorite-content-bottom {
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        border-top: 1px solid #E3E5E7;

        .bf-btn {

          &:hover .bf-ico {
            animation: bf 1s infinite;
          }

          .bf-ico {
            font-size: 14px;
            margin-right: 4px;
          }
        }

        @keyframes bf {
          0% {
            transform: scale(1);
            opacity: 0.15;
          }

          50% {
            transform: scale(1.1);
            opacity: 1;
          }

          100% {
            transform: scale(1);
            opacity: 0.15;
          }
        }
      }
    }
  }

  .history-card {
    width: 370px;
    border-radius: 6px;
    padding-bottom: 6px;
    overflow: hidden;

    .history-box {
      position: relative;
      min-height: 323px;
      max-height: 534px;

      .h-title {
        position: sticky;
        top: 0;
        z-index: 1;
        width: 366px;
        border-radius: 6px 6px 0 0;
        box-sizing: border-box;
        background-color: white;
        padding: 12px 20px 5px 20px;
        font-size: 15px;
      }

      .history-item {
        padding: 10px 20px;
        cursor: pointer;

        &:hover {
          background-color: #F1F2F3;
        }
      }

      .h-more-btn {
        padding: 16px 20px;
      }
    }


  }

  .favorite-nav,
  .favorite-box,
  .history-box {
    overflow: hidden;
    overscroll-behavior: none;

    &:hover {
      overflow-y: auto;
      overflow-y: overlay;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #E3E5E7;
      border-radius: 4px;
    }
  }

}

.login-tip {
  width: 100%;
  height: 100%;
  padding: 0 18px;
  box-sizing: border-box;
  letter-spacing: 1px;

  .login-tip-desc {
    color: gray;
    // font-weight: bold;
    // font-size: 16px;
    // margin-bottom: 6px;
  }

  .login-tip-btn {
    height: 40px;
    width: 320px;
    margin-top: 20px;
    border-radius: 8px;
    background-color: #00a1d6;
    position: relative;
    line-height: 40px;
    text-align: center;
    box-sizing: border-box;
    cursor: pointer;
    // border: 1px solid #00a1d6;

    &:hover {
      background-color: #33b4de;
    }

    span {
      color: white;
      font-size: 14px;
      font-weight: bold;
    }

    svg {
      position: absolute;
      left: 18px;
      top: -18px;
    }
  }
}

.msg-num-sign {
  position: relative;

  &::after {
    content: attr(msg-num);
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(50%, -50%);
    background-color: #fa5a57;
    color: white;
    border-radius: 8px;
    padding: 0 5px;
    font-size: 12px;
    height: 16px;
    line-height: 16px;
  }
}

.point-sign {
  display: none;
  position: absolute;
  right: -1px;
  top: -1px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fa5a57;
}

.point-sign-anima {
  --x: 0px;
  --y: 0px;
  --d: 0s;
  --s: 1;
  --dp: none;

  display: var(--dp);
  pointer-events: none;
  position: fixed;
  z-index: 999;
  left: 0;
  top: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fa5a57;
  transition: var(--d);
  transform: scale(var(--s)) translate(var(--x), var(--y));
}

.login-tip-card {
  width: 360px;
  box-sizing: border-box;
  padding: 22px 20px;
  user-select: none;

  .tip {
    margin-bottom: 20px;
    color: #9499A0;
    text-align: center;
    font-size: 14px;
    line-height: 20px;
  }
}

.message-card {
  overflow: hidden;
  border-radius: 6px;
  font-size: 14px;

  .msg-item {
    padding: 10px 22px;
    cursor: pointer;
    display: flex;
    // justify-content: space-between;
    align-items: center;

    &:hover {
      background-color: #F1F2F3;
    }

    .msg-num {
      margin-left: 6px;
      background-color: #fa5a57;
      color: white;
      border-radius: 8px;
      padding: 0 5px;
      font-size: 12px;
      height: 16px;
      line-height: 16px;
    }
  }
}

.favorite-card {
  width: 500px;
  display: flex;
  border-radius: 6px;
  overflow: hidden;

  .favorite-nav {
    flex-shrink: 0;
    box-sizing: border-box;
    width: 150px;
    max-height: 540px;
    min-height: 366px;
    border-right: 1px solid #E3E5E7;

    .f-n-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      height: 46px;
      color: #18191c;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      transition: background-color .3s, color .3s;

      &:hover {
        background-color: #F1F2F3;
        color: #00AEEC;

        .favorite-num {
          color: #00AEEC;
        }
      }

      &.f-n-active {
        background-color: #00AEEC;
        color: white;

        .favorite-num {
          color: #fff;
        }
      }

      .favorite-num {
        color: #9499A0;
        word-break: normal;
        font-size: 12px;
        line-height: 20px;
      }

    }
  }

  .favorite-content {
    flex: 1 auto;

    .favorite-box {
      max-height: 450px;
      min-height: 276px;

      .favorite-item {
        padding: 10px 18px;
        cursor: pointer;

        &:hover {
          background-color: #F1F2F3;
        }
      }
    }

    .favorite-content-head {
      padding: 12px 18px 6px 18px;
      font-size: 15px;
    }

    .favorite-content-bottom {
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      border-top: 1px solid #E3E5E7;

      .bf-btn {

        &:hover .bf-ico {
          animation: bf 1s infinite;
        }

        .bf-ico {
          font-size: 14px;
          margin-right: 4px;
        }
      }

      @keyframes bf {
        0% {
          transform: scale(1);
          opacity: 0.15;
        }

        50% {
          transform: scale(1.1);
          opacity: 1;
        }

        100% {
          transform: scale(1);
          opacity: 0.15;
        }
      }
    }
  }
}

.history-card {
  width: 370px;
  border-radius: 6px;
  padding-bottom: 6px;
  overflow: hidden;

  .history-box {
    position: relative;
    min-height: 323px;
    max-height: 534px;

    .h-title {
      position: sticky;
      top: 0;
      z-index: 1;
      width: 366px;
      border-radius: 6px 6px 0 0;
      box-sizing: border-box;
      background-color: white;
      padding: 12px 20px 5px 20px;
      font-size: 15px;
    }

    .history-item {
      padding: 10px 20px;
      cursor: pointer;

      &:hover {
        background-color: #F1F2F3;
      }
    }

    .h-more-btn {
      padding: 16px 20px;
    }
  }


}

.favorite-nav,
.favorite-box,
.history-box {
  overflow: hidden;
  overscroll-behavior: none;

  &:hover {
    overflow-y: auto;
    overflow-y: overlay;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #E3E5E7;
    border-radius: 4px;
  }
}
</style>