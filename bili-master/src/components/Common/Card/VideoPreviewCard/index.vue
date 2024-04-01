<template>
    <div class="video-preview-card" :style="videoPreviewCardStyle">
        <div class="video-container" @click="clickEvent('vclick')">
            <div class="equal-ratio-box">
                <div class="video-box" @mouseenter="playPermit()()" @mouseleave="playCancel" v-if="videoSrc || imgSrc">
                    <transition name="pre-img">
                        <video class="pre-video" muted autoplay x5-playsinline playsInline webkit-playsinline
                            x5-video-player ref="preVideo" v-if="isPlay" :poster="imgSrc">
                            <source :src="videoSrc" type="video/mp4">
                            您的浏览器不支持播放视频
                        </video>
                    </transition>
                    <transition name="pre-img">
                        <div class="pre-img" :src="imgSrc" :style="{ backgroundImage: `url(${imgSrc})`}" v-show="imgShow"></div>
                    </transition>
                    <transition name="pre-img" v-if="mode === 'column'">
                        <div class="video-play-data" v-show="imgShow">
                            <div class="play-thumbs-up">
                                <div class="play">
                                    <!-- <i class="iconfont icon-bofang2"></i> -->
                                    <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"
                                        class="play">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M3.67735 2.2798C4.98983 2.1725 6.85812 2.0625 9 2.0625C11.1421 2.0625 13.0105 2.17252 14.323 2.27983C15.2216 2.3533 15.9184 3.04049 15.9989 3.9318C16.0962 5.00837 16.1875 6.43614 16.1875 8C16.1875 9.56386 16.0962 10.9916 15.9989 12.0682C15.9184 12.9595 15.2216 13.6467 14.323 13.7202C13.0105 13.8275 11.1421 13.9375 9 13.9375C6.85812 13.9375 4.98983 13.8275 3.67735 13.7202C2.77861 13.6467 2.08174 12.9593 2.00119 12.0678C1.90388 10.9908 1.8125 9.56273 1.8125 8C1.8125 6.43727 1.90388 5.00924 2.00119 3.93221C2.08174 3.04067 2.77861 2.35327 3.67735 2.2798ZM9 0.8125C6.81674 0.8125 4.9136 0.924562 3.5755 1.03395C2.07738 1.15643 0.892104 2.31616 0.756257 3.81973C0.656505 4.92379 0.5625 6.39058 0.5625 8C0.5625 9.60942 0.656505 11.0762 0.756256 12.1803C0.892104 13.6838 2.07738 14.8436 3.5755 14.966C4.9136 15.0754 6.81674 15.1875 9 15.1875C11.1835 15.1875 13.0868 15.0754 14.4249 14.966C15.9228 14.8436 17.108 13.6841 17.2438 12.1807C17.3435 11.077 17.4375 9.61052 17.4375 8C17.4375 6.38948 17.3435 4.92296 17.2438 3.81931C17.108 2.31588 15.9228 1.15645 14.4249 1.03398C13.0868 0.924583 11.1835 0.8125 9 0.8125ZM11.1876 8.72203C11.7431 8.40128 11.7431 7.59941 11.1876 7.27866L8.06133 5.47373C7.50577 5.15298 6.81133 5.55392 6.81133 6.19542V9.80527C6.81133 10.4468 7.50577 10.8477 8.06133 10.527L11.1876 8.72203Z">
                                        </path>
                                    </svg>
                                    <span>{{ play }}</span>
                                </div>
                                <div class="thumbs-up">
                                    <!-- <i class="iconfont icon-dianzan"></i> -->
                                    <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg"
                                        class="dm">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4 6.4375C4 6.09232 4.27982 5.8125 4.625 5.8125H4.9375C5.28268 5.8125 5.5625 6.09232 5.5625 6.4375C5.5625 6.78268 5.28268 7.0625 4.9375 7.0625H4.625C4.27982 7.0625 4 6.78268 4 6.4375ZM6.5 6.4375C6.5 6.09232 6.77982 5.8125 7.125 5.8125H12.125C12.4702 5.8125 12.75 6.09232 12.75 6.4375C12.75 6.78268 12.4702 7.0625 12.125 7.0625H7.125C6.77982 7.0625 6.5 6.78268 6.5 6.4375ZM5.875 8.9375C5.52982 8.9375 5.25 9.21732 5.25 9.5625C5.25 9.90768 5.52982 10.1875 5.875 10.1875H6.1875C6.53268 10.1875 6.8125 9.90768 6.8125 9.5625C6.8125 9.21732 6.53268 8.9375 6.1875 8.9375H5.875ZM8.375 8.9375C8.02982 8.9375 7.75 9.21732 7.75 9.5625C7.75 9.90768 8.02982 10.1875 8.375 10.1875H13.375C13.7202 10.1875 14 9.90768 14 9.5625C14 9.21732 13.7202 8.9375 13.375 8.9375H8.375Z">
                                        </path>
                                    </svg>
                                    <span>{{ dm }}</span>
                                </div>
                            </div>
                        </div>
                    </transition>
                    <div class="play-icon-box" v-if="mode === 'column' && !imgShow && seeLaterIcon"
                        @click="seeLaterCollection($event)">
                        <div class="play-tip">
                            {{ seeLaterTip }}
                        </div>
                        <div class="play-icon">
                            <i class="iconfont icon-dui" v-if="seeLater && isLogin"></i>
                            <i class="iconfont icon-bofang1" v-else></i>
                        </div>
                    </div>
                    <div class="play-icon-box-min" v-if="mode === 'row' && !imgShow && seeLaterIcon"
                        @click="seeLaterCollection($event)">
                        <div class="play-tip-min">
                            {{ seeLaterTip }}
                        </div>
                        <div class="play-icon">
                            <i class="iconfont icon-dui" v-if="seeLater && isLogin"></i>
                            <i class="iconfont icon-bofang1" v-else></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="info-box-column" v-if="mode === 'column' && (title || up)">
            <div class="title" v-if="title">
                <div class="title-link" @click="clickEvent('vclick')" :title="title">
                    {{ title }}
                </div>
            </div>
            <div class="up" v-if="up">
                <div class="up-link" @click="clickEvent('uclick')" :title="up">
                    <svg class="up-icon" width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4.41663 4.93726C4.72729 4.93726 4.97913 5.1891 4.97913 5.49976V8.62476C4.97913 9.34963 5.56675 9.93726 6.29163 9.93726C7.0165 9.93726 7.60413 9.34963 7.60413 8.62476V5.49976C7.60413 5.1891 7.85597 4.93726 8.16663 4.93726C8.47729 4.93726 8.72913 5.1891 8.72913 5.49976V8.62476C8.72913 9.97095 7.63782 11.0623 6.29163 11.0623C4.94543 11.0623 3.85413 9.97095 3.85413 8.62476V5.49976C3.85413 5.1891 4.10597 4.93726 4.41663 4.93726ZM10.2501 4.93726C9.9394 4.93726 9.68756 5.1891 9.68756 5.49976V10.4998C9.68756 10.8104 9.9394 11.0623 10.2501 11.0623C10.5607 11.0623 10.8126 10.8104 10.8126 10.4998V9.60392H12.2292C13.5179 9.60392 14.5626 8.55925 14.5626 7.27059C14.5626 5.98193 13.5179 4.93726 12.2292 4.93726H10.2501ZM12.2292 8.47892H10.8126V6.06226H12.2292C12.8966 6.06226 13.4376 6.60325 13.4376 7.27059C13.4376 7.93793 12.8966 8.47892 12.2292 8.47892Z">
                        </path>
                    </svg>
                    <span>
                        {{ up }}
                    </span>
                    <span class="time" v-if="time">
                        {{ `· ${time}` }}
                    </span>
                </div>
            </div>
        </div>
        <div class="info-box-row" v-if="mode === 'row' && (title || up)">
            <div class="title" v-if="title">
                <div class="title-link" @click="clickEvent('vclick')" :title="title">
                    {{ title }}
                </div>
            </div>
            <div class="up" v-if="up">
                <div class="up-link" @click="clickEvent('uclick')" :title="up">
                    <!-- <i v-show="up" class="iconfont icon-UPzhu"></i> -->
                    <svg class="up-icon" width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4.41663 4.93726C4.72729 4.93726 4.97913 5.1891 4.97913 5.49976V8.62476C4.97913 9.34963 5.56675 9.93726 6.29163 9.93726C7.0165 9.93726 7.60413 9.34963 7.60413 8.62476V5.49976C7.60413 5.1891 7.85597 4.93726 8.16663 4.93726C8.47729 4.93726 8.72913 5.1891 8.72913 5.49976V8.62476C8.72913 9.97095 7.63782 11.0623 6.29163 11.0623C4.94543 11.0623 3.85413 9.97095 3.85413 8.62476V5.49976C3.85413 5.1891 4.10597 4.93726 4.41663 4.93726ZM10.2501 4.93726C9.9394 4.93726 9.68756 5.1891 9.68756 5.49976V10.4998C9.68756 10.8104 9.9394 11.0623 10.2501 11.0623C10.5607 11.0623 10.8126 10.8104 10.8126 10.4998V9.60392H12.2292C13.5179 9.60392 14.5626 8.55925 14.5626 7.27059C14.5626 5.98193 13.5179 4.93726 12.2292 4.93726H10.2501ZM12.2292 8.47892H10.8126V6.06226H12.2292C12.8966 6.06226 13.4376 6.60325 13.4376 7.27059C13.4376 7.93793 12.8966 8.47892 12.2292 8.47892Z">
                        </path>
                    </svg>
                    <span>
                        {{ up }}
                    </span>
                </div>
            </div>

            <div class="play-data" v-if="play && dm">
                <div class="play-thumbs-up">
                    <div class="play" v-if="play">
                        <!-- <i class="iconfont icon-bofang2"></i> -->
                        <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="play">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M3.67735 2.2798C4.98983 2.1725 6.85812 2.0625 9 2.0625C11.1421 2.0625 13.0105 2.17252 14.323 2.27983C15.2216 2.3533 15.9184 3.04049 15.9989 3.9318C16.0962 5.00837 16.1875 6.43614 16.1875 8C16.1875 9.56386 16.0962 10.9916 15.9989 12.0682C15.9184 12.9595 15.2216 13.6467 14.323 13.7202C13.0105 13.8275 11.1421 13.9375 9 13.9375C6.85812 13.9375 4.98983 13.8275 3.67735 13.7202C2.77861 13.6467 2.08174 12.9593 2.00119 12.0678C1.90388 10.9908 1.8125 9.56273 1.8125 8C1.8125 6.43727 1.90388 5.00924 2.00119 3.93221C2.08174 3.04067 2.77861 2.35327 3.67735 2.2798ZM9 0.8125C6.81674 0.8125 4.9136 0.924562 3.5755 1.03395C2.07738 1.15643 0.892104 2.31616 0.756257 3.81973C0.656505 4.92379 0.5625 6.39058 0.5625 8C0.5625 9.60942 0.656505 11.0762 0.756256 12.1803C0.892104 13.6838 2.07738 14.8436 3.5755 14.966C4.9136 15.0754 6.81674 15.1875 9 15.1875C11.1835 15.1875 13.0868 15.0754 14.4249 14.966C15.9228 14.8436 17.108 13.6841 17.2438 12.1807C17.3435 11.077 17.4375 9.61052 17.4375 8C17.4375 6.38948 17.3435 4.92296 17.2438 3.81931C17.108 2.31588 15.9228 1.15645 14.4249 1.03398C13.0868 0.924583 11.1835 0.8125 9 0.8125ZM11.1876 8.72203C11.7431 8.40128 11.7431 7.59941 11.1876 7.27866L8.06133 5.47373C7.50577 5.15298 6.81133 5.55392 6.81133 6.19542V9.80527C6.81133 10.4468 7.50577 10.8477 8.06133 10.527L11.1876 8.72203Z">
                            </path>
                        </svg>
                        <span>{{ play }}</span>
                    </div>
                    <div class="thumbs-up" v-if="dm">
                        <!-- <i class="iconfont icon-dianzan"></i> -->
                        <svg width="18" height="16" viewBox="0 0 18 16" xmlns="http://www.w3.org/2000/svg" class="dm">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M9 2.0625C6.85812 2.0625 4.98983 2.1725 3.67735 2.2798C2.77861 2.35327 2.08174 3.04067 2.00119 3.93221C1.90388 5.00924 1.8125 6.43727 1.8125 8C1.8125 9.56273 1.90388 10.9908 2.00119 12.0678C2.08174 12.9593 2.77861 13.6467 3.67735 13.7202C4.98983 13.8275 6.85812 13.9375 9 13.9375C11.1421 13.9375 13.0105 13.8275 14.323 13.7202C15.2216 13.6467 15.9184 12.9595 15.9989 12.0682C16.0962 10.9916 16.1875 9.56386 16.1875 8C16.1875 6.43614 16.0962 5.00837 15.9989 3.9318C15.9184 3.04049 15.2216 2.3533 14.323 2.27983C13.0105 2.17252 11.1421 2.0625 9 2.0625ZM3.5755 1.03395C4.9136 0.924562 6.81674 0.8125 9 0.8125C11.1835 0.8125 13.0868 0.924583 14.4249 1.03398C15.9228 1.15645 17.108 2.31588 17.2438 3.81931C17.3435 4.92296 17.4375 6.38948 17.4375 8C17.4375 9.61052 17.3435 11.077 17.2438 12.1807C17.108 13.6841 15.9228 14.8436 14.4249 14.966C13.0868 15.0754 11.1835 15.1875 9 15.1875C6.81674 15.1875 4.9136 15.0754 3.5755 14.966C2.07738 14.8436 0.892104 13.6838 0.756256 12.1803C0.656505 11.0762 0.5625 9.60942 0.5625 8C0.5625 6.39058 0.656505 4.92379 0.756257 3.81973C0.892104 2.31616 2.07738 1.15643 3.5755 1.03395ZM4 6.4375C4 6.09232 4.27982 5.8125 4.625 5.8125H4.9375C5.28268 5.8125 5.5625 6.09232 5.5625 6.4375C5.5625 6.78268 5.28268 7.0625 4.9375 7.0625H4.625C4.27982 7.0625 4 6.78268 4 6.4375ZM6.5 6.4375C6.5 6.09232 6.77982 5.8125 7.125 5.8125H12.125C12.4702 5.8125 12.75 6.09232 12.75 6.4375C12.75 6.78268 12.4702 7.0625 12.125 7.0625H7.125C6.77982 7.0625 6.5 6.78268 6.5 6.4375ZM5.875 8.9375C5.52982 8.9375 5.25 9.21732 5.25 9.5625C5.25 9.90768 5.52982 10.1875 5.875 10.1875H6.1875C6.53268 10.1875 6.8125 9.90768 6.8125 9.5625C6.8125 9.21732 6.53268 8.9375 6.1875 8.9375H5.875ZM8.375 8.9375C8.02982 8.9375 7.75 9.21732 7.75 9.5625C7.75 9.90768 8.02982 10.1875 8.375 10.1875H13.375C13.7202 10.1875 14 9.90768 14 9.5625C14 9.21732 13.7202 8.9375 13.375 8.9375H8.375Z">
                            </path>
                        </svg>
                        <span>{{ dm }}</span>
                    </div>
                </div>
            </div>

        </div>
        <slot></slot>
    </div>

</template>

<script>

import loginMixin from '@/mixins/login'

export default {
    name: 'VideoPreviewCard',
    mixins: [loginMixin],
    props: {
        width: {
            type: String,
            default: '320px',
        },
        size: {
            type: Number,
            default: 1
        },
        videoSrc: {
            type: String,
            default: ''
        },
        imgSrc: {
            type: String,
            default: require('@/assets/images/card/no-cover.png') 
        },
        up: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        play: {

        },
        dm: {

        },
        time: {
            type: String
            // default: '2022-11-11'
        },
        mode: {
            type: String,
            default: 'column'
        },
        textSize: {
            type: String,
            default: ''
        },
        seeLaterIcon: {
            type: Boolean,
            default: true
        }
    },
    emits: ['vclick', 'uclick'],
    data() {
        return {
            isPlay: false,
            imgShow: true,
            seeLater: false,
            seeLaterTip: '稍后再看'
        }
    },
    computed: {
        videoPreviewCardStyle() {
            return {
                width: parseInt(this.width) * this.size + this.matchUnit(this.width),
                flexDirection: this.mode,
                '--f-s': this.textSize
            }
        }
    },
    methods: {
        playPermit() {
            let timeout = null
            return () => {
                this.videoMouseEnter = true
                timeout && clearTimeout(timeout)
                timeout = setTimeout(() => {
                    if (this.videoMouseEnter) {
                        this.isPlay = true
                        this.$nextTick(() => {
                            this.$refs.preVideo && this.$refs.preVideo.addEventListener('play', () => {
                                if (this.isPlay) {
                                    this.imgShow = false
                                }
                            })
                            this.visibilitychangeFun = () => {
                                if (document.visibilityState === 'hidden') {
                                    this.playCancel()
                                }
                            }
                            document.addEventListener('visibilitychange', this.visibilitychangeFun)
                        })
                    }
                }, 200);
            }
        },
        playCancel() {
            this.$refs.preVideo && (this.$refs.preVideo.src = '')
            this.isPlay = false
            this.imgShow = true
            this.videoMouseEnter = false
            document.removeEventListener('visibilitychange', this.visibilitychangeFun)
        },
        matchUnit(str) {
            if (typeof str !== 'string') {
                throw new Error('need String')
            } else {
                return str.match(/[a-zA-Z%]+/g)[0]
            }
        },
        clickEvent(eName) {
            this.$emit(eName)
        },
        pointAnima(e) {
            // e.stopPropagation()
            const p = document.querySelector('.point-sign-anima')
            const end = document.querySelector('.col-position').getBoundingClientRect()
            const rp = document.querySelector('.col-point-sign-position')

            const start = e.target.getBoundingClientRect()

            p.style.setProperty('--x', (start.left + start.width / 2 - 3) / 2 + 'px')
            p.style.setProperty('--y', (start.top + start.height / 2 - 3) / 2 + 'px')
            p.style.setProperty('--d', '0s')
            p.style.setProperty('--s', 2)
            p.style.setProperty('--dp', 'block')
            p.style.setProperty('opacity', 1)

            setTimeout(() => {
                p.style.setProperty('--x', end.right - 5 + 'px')
                p.style.setProperty('--y', end.top - 1 + 'px')
                p.style.setProperty('--d', '0.9s')
                p.style.setProperty('--s', 1)
            }, 100);

            setTimeout(() => {
                p.style.setProperty('opacity', 0)
                rp.style.setProperty('display', 'block')
            }, 1000);
        },
        seeLaterCollection(e, id) {
            e.stopPropagation()
            e.preventDefault()
            if (this.isLogin) {
                if (this.seeLater) {
                    //...
                    this.seeLaterTip = '稍后再看'

                } else {
                    this.pointAnima(e)
                    this.seeLaterTip = '取消'
                }
                this.seeLater = !this.seeLater
            } else {
                this.$login()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.video-preview-card {
    --f-s: 15px;

    position: relative;
    border-radius: 6px;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    // flex-direction: column;

    .video-container {
        width: 100%;
    }

    .equal-ratio-box {
        width: 100%;
        padding-top: 56.25%;
        box-sizing: border-box;
        position: relative;

        // background-image: url('@/assets/images/card/back-img.png');
        // background-repeat: no-repeat;
        // background-size: 40%;
        // background-position: 50%;
    }

    .video-box {
        width: 100%;
        height: 100%;
        border-radius: 6px;
        overflow: hidden;
        position: absolute;
        top: 0;
        cursor: pointer;
        user-select: none;
        // background-color: black;

        background-image: url('@/assets/images/card/no-cover.png');
        background-size: cover;

        display: flex;
        align-items: center;
        justify-content: center;

        .pre-video,
        .pre-img,
        .video-play-data {
            position: absolute;
            border-radius: 6px;
            width: 100%;
            height: 100%;
            transition: opacity .6s;
        }

        .pre-img {
            background-image: url('@/assets/images/card/no-cover.png');
            background-size: cover;
            background-repeat: no-repeat;
            background-position: 50%;
            // object-fit: cover;
        }

        .pre-img-leave,
        .pre-img-enter-to {
            opacity: 1;
        }

        .pre-img-leave-to,
        .pre-img-enter {
            opacity: 0;
        }

        .pre-video {
            background-color: black;
        }

        .video-play-data {
            height: 100%;
            color: white;
            fill: white;
            background-image: linear-gradient(to top, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 0) 100%);

            .play-thumbs-up {
                font-size: 13px;
                font-size: calc(var(--f-s) - 2px);
                display: flex;
                // align-items: center;
                height: 16px;
                position: absolute;
                bottom: 6px;
                left: 10px;
                transition: inherit;

                .thumbs-up,
                .play {
                    display: flex;
                    align-items: center;
                    margin-right: 12px;

                    svg {
                        margin-right: 4px;
                    }
                }
            }

        }
    }

    .play-icon-box,
    .play-icon-box-min {
        position: absolute;
        bottom: 15px;
        right: 15px;
        flex-direction: column;
        color: white;

        &,
        .play-icon,
        .play-tip {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .play-icon {
            width: 35px;
            height: 35px;
            position: relative;
            background-color: rgba($color: #000000, $alpha: .7);
            border-radius: 6px;

            i {
                font-size: 20px;
                line-height: 100%;
            }
        }

        .play-tip {
            width: 62px;
            height: 26px;
            font-size: 13px;
            background-color: rgba($color: #000000, $alpha: .7);
            border-radius: 3px;
            position: absolute;
            top: 0;
            transform: scale(0);
            transition-delay: .4s;
            transition-duration: .2s;
        }

        &:hover .play-tip {
            top: -80%;
            transform: scale(1);
        }

        &:hover .play-icon {
            animation: duan .4s;
        }

        @keyframes duan {

            0%,
            100% {
                transform: scale(1);
            }

            25% {
                transform: scale(.6);
            }

            50% {
                transform: scale(1.1);
            }

            75% {
                transform: scale(0.9);
            }
        }
    }

    .play-icon-box-min {
        top: 5px;
        right: 5px;
        bottom: auto;
        opacity: 0;
        transition: .3s;

        display: flex;
        align-items: center;
        justify-content: center;

        .play-icon {
            width: 25px;
            height: 25px;

            i {
                font-size: 15px;
            }
        }

        .play-tip-min {
            width: 58px;
            height: 21px;
            font-size: 12px;
            background-color: rgba($color: #000000, $alpha: .7);
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            left: 0;
            transform: scale(0);
            transition-delay: .4s;
            transition-duration: .2s;
        }

        &:hover .play-tip-min {
            left: -60px;
            transform: scale(1);
        }
    }

    .video-box:hover .play-icon-box-min {
        opacity: 1;
    }

    .info-box-column {
        margin-top: 10px;

        .title .title-link,
        .up .up-link {
            transition: .3s;
            cursor: pointer;

            &:hover {
                color: #02b5da;
                fill: #02b5da;
            }
        }

        .title {
            font-size: 15px;
            font-size: calc(var(--f-s) + 0px);
            height: 42px;
            color: #18191C;
            display: flex;

            .title-link {
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                white-space: normal;
                overflow: hidden;
            }
        }

        .up {
            overflow: hidden;
            margin-top: 4px;
            display: flex;

            .up-link {
                white-space: nowrap;
                display: flex;
                align-items: center;
                overflow: hidden;
                color: #9499A0;
                fill: #9499A0;
                font-size: 13px;
                font-size: calc(var(--f-s) - 2px);

                span {
                    max-width: 90%;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    line-height: 16px;
                }

                svg {
                    margin-right: 4px;
                }

                i {
                    font-weight: bold;
                    margin-right: 4px;
                }

                .time {
                    flex-shrink: 0;
                    margin-left: 4px;
                }

                .up-icon {
                    flex-shrink: 0;
                }
            }


        }


    }

    .info-box-row {
        margin-left: 10px;
        width: 56%;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .title .title-link,
        .up .up-link {
            transition: .3s;
            cursor: pointer;

            &:hover {
                color: #02b5da;
                fill: #02b5da;
            }
        }

        .title {
            font-size: 15px;
            font-size: calc(var(--f-s) + 0px);
            color: #18191C;
            line-height: 16px;
            display: flex;


            .title-link {
                word-break: break-all;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                white-space: normal;
                overflow: hidden;
            }
        }

        .up {
            overflow: hidden;
            display: flex;

            .up-link {
                white-space: nowrap;
                display: flex;
                align-items: center;
                color: #9499A0;
                fill: #9499A0;
                font-size: 13px;
                font-size: calc(var(--f-s) - 2px);
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;

                span {
                    max-width: 90%;
                    line-height: 16px;
                }

                .up-icon {
                    margin-right: 4px;
                }

                i {
                    font-weight: bold;
                }
            }
        }

        .play-data {
            color: #9499A0;
            fill: #9499A0;

            .play-thumbs-up {
                font-size: 13px;
                font-size: calc(var(--f-s) - 2px);
                display: flex;
                height: 16px;

                .thumbs-up,
                .play {
                    display: flex;
                    align-items: center;
                    margin-right: 8px;

                    svg {
                        margin-right: 4px;
                    }
                }
            }
        }


    }
}
</style>

