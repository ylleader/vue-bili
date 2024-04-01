<template>
    <div class="comment">
        <div class="comment-header">
            <h3>评论</h3>
            <div class="comment-num">{{ 2730 }}</div>
            <div class="comment-sort">
                <span :class="{ 't-sort': true, 'sort-active': sortType === 0 }" @click="sortType = 0">最新</span>
                <span class="division">|</span>
                <span :class="{ 'h-sort': true, 'sort-active': sortType === 1 }" @click="sortType = 1">最热</span>
            </div>
        </div>

        <div class="comment-send-area" ref="sendArea">
            <div class="up-avatar">
                <img :src="$store.state.user.avatar" alt="">
            </div>
            <div class="send-input">
                <textarea placeholder="发一条友善的评论"></textarea>
            </div>
            <div class="send-btn">
                <BButton width="70px" height="48px">
                    发布
                </BButton>
            </div>
        </div>

        <div :class="{'comment-area':true, 'ca-no-login':!isLogin}">
            <div class="main-comment" v-for="(comment, i) in     commentList" :key="i">
                <div class="up-avatar">
                    <Popover placement="bottom-start" :top="10" >
                        <div class="avatar" slot="reference">
                            <img :src="comment.up.avatar" alt="">
                        </div>
                        <UpCard></UpCard>
                    </Popover>
                </div>
                <div class="m-c">
                    <div class="m-c-c">
                        <div class="up-name">
                            <Popover class="icon" placement="bottom-start" :top="10">
                                <div :class="{ 'u-n': true, 'vip-u-n': comment.up.vip !== 0 }" slot="reference">
                                    {{ comment.up.nickname }}</div>
                                <UpCard></UpCard>
                            </Popover>
                            <div class="icon">
                                <svg width="24" height="24">
                                    <use :xlink:href="`#icon-ic_userlevel_${comment.up.level ? comment.up.level : ''}`">
                                    </use>
                                </svg>
                            </div>
                            <div class="up-icon icon" v-if="comment.up.upId === '12138'">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="6" width="18" height="11.5" rx="2" fill="#FF6699"></rect>
                                    <path
                                        d="M5.7 8.36V12.79C5.7 13.72 5.96 14.43 6.49 14.93C6.99 15.4 7.72 15.64 8.67 15.64C9.61 15.64 10.34 15.4 10.86 14.92C11.38 14.43 11.64 13.72 11.64 12.79V8.36H10.47V12.81C10.47 13.43 10.32 13.88 10.04 14.18C9.75 14.47 9.29 14.62 8.67 14.62C8.04 14.62 7.58 14.47 7.3 14.18C7.01 13.88 6.87 13.43 6.87 12.81V8.36H5.7ZM13.0438 8.36V15.5H14.2138V12.76H15.9838C17.7238 12.76 18.5938 12.02 18.5938 10.55C18.5938 9.09 17.7238 8.36 16.0038 8.36H13.0438ZM14.2138 9.36H15.9138C16.4238 9.36 16.8038 9.45 17.0438 9.64C17.2838 9.82 17.4138 10.12 17.4138 10.55C17.4138 10.98 17.2938 11.29 17.0538 11.48C16.8138 11.66 16.4338 11.76 15.9138 11.76H14.2138V9.36Z"
                                        fill="white"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="comment-content">{{ comment.content }}</div>
                        <div class="comment-info">
                            <div class="c-i-left">
                                <div class="comment-time">{{ '2022-12-24 20:43' }}</div>
                                <div :class="{ 'c-like': true, 'like-a': comment.upAction.like }">
                                    <svg v-if="comment.upAction.like" t="1636093991833" class="a-icon"
                                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        p-id="4447" width="16" height="16">
                                        <path
                                            d="M860.032 341.12h-182.08c7.488-17.408 14.72-38.528 18.048-60.544 5.952-39.872 4.992-87.36-18.368-129.088-21.76-38.848-50.304-60.928-83.52-61.376-30.72-0.384-53.888 18.176-65.728 33.408a199.296 199.296 0 0 0-32.064 59.264l-1.92 5.184c-5.44 14.976-10.88 29.952-23.04 51.456-19.712 34.816-48.832 56.128-77.696 74.368a391.936 391.936 0 0 1-30.976 17.92v552.448a4621.952 4621.952 0 0 0 351.872-5.312c51.264-2.752 100.672-28.544 127.488-76.032 24.32-43.136 55.168-108.16 74.368-187.264 20.416-84.16 24.64-152.704 24.576-195.968-0.128-46.336-38.72-78.4-80.96-78.4z m-561.344 541.312V341.12H215.808c-59.712 0-113.408 42.048-120.896 104.32a1376 1376 0 0 0 0.64 330.368c7.36 58.688 56.128 100.032 113.024 102.848 25.024 1.28 55.552 2.56 90.112 3.712z"
                                            p-id="4448" fill="#00aeec"></path>
                                    </svg>
                                    <svg v-else t="1636093575017" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3323" width="16" height="16">
                                        <path
                                            d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z"
                                            p-id="3324"></path>
                                    </svg>
                                    <span>{{ comment.like }}</span>
                                </div>
                                <div :class="{ 'c-dislike': true, 'like-a': comment.upAction.dislike }">
                                    <svg v-if="comment.upAction.dislike" t="1636094030855" class="a-icon"
                                        viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                        p-id="5103" width="16" height="16">
                                        <path
                                            d="M860.032 693.632h-182.08c7.488 17.408 14.72 38.592 18.048 60.608 5.952 39.872 4.992 87.296-18.368 129.088-21.76 38.848-50.304 60.928-83.52 61.312-30.72 0.384-53.888-18.176-65.728-33.408a199.296 199.296 0 0 1-32.064-59.2l-1.92-5.248c-5.44-14.912-10.88-29.888-23.04-51.456-19.712-34.816-48.832-56.128-77.696-74.304a391.68 391.68 0 0 0-30.976-17.984V150.592a4617.408 4617.408 0 0 1 351.872 5.312c51.264 2.752 100.672 28.608 127.488 76.096 24.32 43.136 55.168 108.16 74.368 187.264 20.416 84.096 24.64 152.64 24.576 195.904-0.128 46.336-38.72 78.464-80.96 78.464zM298.624 152.32v541.248H215.808c-59.712 0-113.408-42.048-120.896-104.32a1376 1376 0 0 1 0.64-330.432c7.36-58.624 56.128-100.032 113.024-102.848 25.024-1.216 55.552-2.56 90.112-3.648z"
                                            p-id="5104" fill="#00aeec"></path>
                                    </svg>
                                    <svg v-else t="1636093677814" class="icon" viewBox="0 0 1024 1024" version="1.1"
                                        xmlns="http://www.w3.org/2000/svg" p-id="3933" width="16" height="16">
                                        <path
                                            d="M594.112 872.768a34.048 34.048 0 0 1-29.12-10.816c-11.264-13.248-15.872-24.064-21.504-40.064l-1.92-5.632c-5.632-16.128-12.8-36.864-27.712-63.232-25.344-44.928-50.24-74.432-86.144-97.024-23.104-14.528-43.648-26.432-65.024-32.64V203.84a4570.24 4570.24 0 0 1 339.072 4.672c38.656 2.048 72 21.12 88.896 52.032 21.504 39.36 47.232 95.744 63.552 163.008 16.448 67.52 21.568 123.776 22.592 163.008 0.448 16.832-13.44 32.256-35.392 32.256h-197.248a32 32 0 0 0-28.608 46.336l0.128 0.32 0.64 1.28 2.56 5.568c2.176 4.8 5.12 11.776 8.384 20.16 6.528 17.088 13.568 39.04 16.768 60.416 4.928 33.344 3.712 60.16-9.344 84.992-14.08 26.688-30.016 33.728-40.576 34.944z m97.728-190.016h149.568c52.8 0 100.864-40.128 99.392-97.92a846.336 846.336 0 0 0-24.32-176.448 742.016 742.016 0 0 0-69.632-178.56c-29.248-53.44-84.48-82.304-141.824-85.248-55.68-2.88-138.24-5.952-235.712-5.952-96 0-183.488 3.008-244.672 5.76-66.368 3.136-123.328 51.392-130.944 119.872a1380.608 1380.608 0 0 0-0.768 296.704c7.68 72.768 70.4 121.792 140.032 121.792h97.728c13.76 0 28.16 5.504 62.976 27.392 24.064 15.168 42.432 35.264 64.448 74.368 11.968 21.12 17.472 36.864 22.976 52.736l2.048 5.888c6.656 18.88 14.336 38.4 33.216 60.416 19.456 22.72 51.456 36.736 85.184 32.768 35.2-4.096 67.776-26.88 89.792-68.672 22.208-42.112 21.888-84.8 16-124.288a343.04 343.04 0 0 0-15.488-60.608zM298.688 205.568v413.184H232.96c-40.512 0-72.448-27.712-76.352-64.512a1318.912 1318.912 0 0 1 0.64-282.88c3.904-34.816 32.896-61.248 70.4-62.976 20.8-0.96 44.736-1.92 71.04-2.816z"
                                            p-id="3934"></path>
                                    </svg>
                                    <span>{{ comment.dislike }}</span>
                                </div>
                                <div class="reply" @click="showReplySendArea(comment.id)">回复</div>
                            </div>
                            <div class="c-i-right">
                                <Popover placement="bottom-end" :top="5">
                                    <i slot="reference" class="iconfont icon-diandian comment-opt m-opt"></i>
                                    <div class="comment-opt-box">
                                        <div class="c-opt-item">
                                            置顶评论
                                        </div>
                                        <div class="c-opt-item">
                                            删除
                                        </div>
                                    </div>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div class="sub-comment-area">
                        <div class="sub-comment" v-for="(sub, s) in subCommentMap[comment.id]" :key="s">
                            <div class="up-avatar">
                                <Popover placement="bottom-start" :top="10">
                                    <div class="avatar" slot="reference">
                                        <img :src="sub.up.avatar" alt="">
                                    </div>
                                    <UpCard></UpCard>
                                </Popover>
                            </div>
                            <div class="s-c">
                                <div class="s-c-c">
                                    <div class="up-name">
                                        <Popover class="icon" placement="bottom-start" :top="10">
                                            <div :class="{ 'u-n': true, 'vip-u-n': sub.up.vip !== 0 }" slot="reference">
                                                {{ sub.up.nickname }}</div>
                                            <UpCard></UpCard>
                                        </Popover>
                                        <div class="icon">
                                            <svg width="24" height="24">
                                                <use
                                                    :xlink:href="`#icon-ic_userlevel_${sub.up.level ? sub.up.level : ''}`">
                                                </use>
                                            </svg>
                                        </div>
                                        <div class="up-icon icon" v-if="sub.up.upId === '12138'">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <rect x="3" y="6" width="18" height="11.5" rx="2" fill="#FF6699"></rect>
                                                <path
                                                    d="M5.7 8.36V12.79C5.7 13.72 5.96 14.43 6.49 14.93C6.99 15.4 7.72 15.64 8.67 15.64C9.61 15.64 10.34 15.4 10.86 14.92C11.38 14.43 11.64 13.72 11.64 12.79V8.36H10.47V12.81C10.47 13.43 10.32 13.88 10.04 14.18C9.75 14.47 9.29 14.62 8.67 14.62C8.04 14.62 7.58 14.47 7.3 14.18C7.01 13.88 6.87 13.43 6.87 12.81V8.36H5.7ZM13.0438 8.36V15.5H14.2138V12.76H15.9838C17.7238 12.76 18.5938 12.02 18.5938 10.55C18.5938 9.09 17.7238 8.36 16.0038 8.36H13.0438ZM14.2138 9.36H15.9138C16.4238 9.36 16.8038 9.45 17.0438 9.64C17.2838 9.82 17.4138 10.12 17.4138 10.55C17.4138 10.98 17.2938 11.29 17.0538 11.48C16.8138 11.66 16.4338 11.76 15.9138 11.76H14.2138V9.36Z"
                                                    fill="white"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <span class="sub-comment-content">
                                        {{ sub.content }}
                                    </span>
                                </div>
                                <div class="comment-info">
                                    <div class="c-i-left">
                                        <div class="comment-time">{{ '2022-12-24 20:43' }}</div>
                                        <div :class="{ 'c-like': true, 'like-a': sub.upAction.like }">
                                            <svg v-if="sub.upAction.like" t="1636093991833" class="a-icon"
                                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                p-id="4447" width="16" height="16">
                                                <path
                                                    d="M860.032 341.12h-182.08c7.488-17.408 14.72-38.528 18.048-60.544 5.952-39.872 4.992-87.36-18.368-129.088-21.76-38.848-50.304-60.928-83.52-61.376-30.72-0.384-53.888 18.176-65.728 33.408a199.296 199.296 0 0 0-32.064 59.264l-1.92 5.184c-5.44 14.976-10.88 29.952-23.04 51.456-19.712 34.816-48.832 56.128-77.696 74.368a391.936 391.936 0 0 1-30.976 17.92v552.448a4621.952 4621.952 0 0 0 351.872-5.312c51.264-2.752 100.672-28.544 127.488-76.032 24.32-43.136 55.168-108.16 74.368-187.264 20.416-84.16 24.64-152.704 24.576-195.968-0.128-46.336-38.72-78.4-80.96-78.4z m-561.344 541.312V341.12H215.808c-59.712 0-113.408 42.048-120.896 104.32a1376 1376 0 0 0 0.64 330.368c7.36 58.688 56.128 100.032 113.024 102.848 25.024 1.28 55.552 2.56 90.112 3.712z"
                                                    p-id="4448" fill="#00aeec"></path>
                                            </svg>
                                            <svg v-else t="1636093575017" class="icon" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3323" width="16"
                                                height="16">
                                                <path
                                                    d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z"
                                                    p-id="3324"></path>
                                            </svg>
                                            <span>{{ sub.like }}</span>
                                        </div>
                                        <div :class="{ 'c-dislike': true, 'like-a': sub.upAction.dislike }">
                                            <svg v-if="sub.upAction.dislike" t="1636094030855" class="a-icon"
                                                viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                                p-id="5103" width="16" height="16">
                                                <path
                                                    d="M860.032 693.632h-182.08c7.488 17.408 14.72 38.592 18.048 60.608 5.952 39.872 4.992 87.296-18.368 129.088-21.76 38.848-50.304 60.928-83.52 61.312-30.72 0.384-53.888-18.176-65.728-33.408a199.296 199.296 0 0 1-32.064-59.2l-1.92-5.248c-5.44-14.912-10.88-29.888-23.04-51.456-19.712-34.816-48.832-56.128-77.696-74.304a391.68 391.68 0 0 0-30.976-17.984V150.592a4617.408 4617.408 0 0 1 351.872 5.312c51.264 2.752 100.672 28.608 127.488 76.096 24.32 43.136 55.168 108.16 74.368 187.264 20.416 84.096 24.64 152.64 24.576 195.904-0.128 46.336-38.72 78.464-80.96 78.464zM298.624 152.32v541.248H215.808c-59.712 0-113.408-42.048-120.896-104.32a1376 1376 0 0 1 0.64-330.432c7.36-58.624 56.128-100.032 113.024-102.848 25.024-1.216 55.552-2.56 90.112-3.648z"
                                                    p-id="5104" fill="#00aeec"></path>
                                            </svg>
                                            <svg v-else t="1636093677814" class="icon" viewBox="0 0 1024 1024"
                                                version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3933" width="16"
                                                height="16">
                                                <path
                                                    d="M594.112 872.768a34.048 34.048 0 0 1-29.12-10.816c-11.264-13.248-15.872-24.064-21.504-40.064l-1.92-5.632c-5.632-16.128-12.8-36.864-27.712-63.232-25.344-44.928-50.24-74.432-86.144-97.024-23.104-14.528-43.648-26.432-65.024-32.64V203.84a4570.24 4570.24 0 0 1 339.072 4.672c38.656 2.048 72 21.12 88.896 52.032 21.504 39.36 47.232 95.744 63.552 163.008 16.448 67.52 21.568 123.776 22.592 163.008 0.448 16.832-13.44 32.256-35.392 32.256h-197.248a32 32 0 0 0-28.608 46.336l0.128 0.32 0.64 1.28 2.56 5.568c2.176 4.8 5.12 11.776 8.384 20.16 6.528 17.088 13.568 39.04 16.768 60.416 4.928 33.344 3.712 60.16-9.344 84.992-14.08 26.688-30.016 33.728-40.576 34.944z m97.728-190.016h149.568c52.8 0 100.864-40.128 99.392-97.92a846.336 846.336 0 0 0-24.32-176.448 742.016 742.016 0 0 0-69.632-178.56c-29.248-53.44-84.48-82.304-141.824-85.248-55.68-2.88-138.24-5.952-235.712-5.952-96 0-183.488 3.008-244.672 5.76-66.368 3.136-123.328 51.392-130.944 119.872a1380.608 1380.608 0 0 0-0.768 296.704c7.68 72.768 70.4 121.792 140.032 121.792h97.728c13.76 0 28.16 5.504 62.976 27.392 24.064 15.168 42.432 35.264 64.448 74.368 11.968 21.12 17.472 36.864 22.976 52.736l2.048 5.888c6.656 18.88 14.336 38.4 33.216 60.416 19.456 22.72 51.456 36.736 85.184 32.768 35.2-4.096 67.776-26.88 89.792-68.672 22.208-42.112 21.888-84.8 16-124.288a343.04 343.04 0 0 0-15.488-60.608zM298.688 205.568v413.184H232.96c-40.512 0-72.448-27.712-76.352-64.512a1318.912 1318.912 0 0 1 0.64-282.88c3.904-34.816 32.896-61.248 70.4-62.976 20.8-0.96 44.736-1.92 71.04-2.816z"
                                                    p-id="3934"></path>
                                            </svg>
                                            <span>{{ sub.dislike }}</span>
                                        </div>
                                        <div class="reply" @click="showReplySendArea(comment.id)">回复</div>
                                    </div>
                                    <div class="c-i-right">
                                        <Popover placement="bottom-end" :top="5">
                                            <i slot="reference" class="iconfont icon-diandian comment-opt s-opt"></i>
                                            <div class="comment-opt-box">
                                                <!-- <div class="c-opt-item">
                                                    置顶评论
                                                </div> -->
                                                <div class="c-opt-item">
                                                    删除
                                                </div>
                                            </div>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="view-more" v-if="comment.subTotal > 5 && !comment.viewMore">
                            共{{ comment.subTotal }}条回复,
                            <span class="more" @click="viewMore(comment)">点击查看</span>
                        </div>
                        <div v-if="comment.viewMore">
                            <Pagination small layout="total, prev, pager, next" hide-on-single-page
                                :total="20" @size-change="sc" @current-change="cc"></Pagination>
                        </div>
                    </div>
                    <transition name="comment-send-area">
                        <div class="comment-send-area" v-if="commentId === comment.id">
                            <div class="up-avatar">
                                <img :src="$store.state.user.avatar" alt="">
                            </div>
                            <div class="send-input">
                                <textarea placeholder="回复@XXX: " ref="replyInput"></textarea>
                            </div>
                            <div class="send-btn">
                                <BButton width="70px" height="48px">
                                    发布
                                </BButton>
                            </div>
                        </div>
                    </transition>
                    <div class="split-line"></div>
                </div>
            </div>
            <div class="comment-bottom" ref="commentBottom" v-if="isLogin">
                {{ "正在加载..." }}
            </div>
            <div class="login-view-more" @click="loginViewMore" v-else>
                <div class="login-view-more-btn">
                    <BButton width="100%" height="50px" backgroundColor="#DFF6FD" borderColor="#DFF6FD" color="#00AEEC"
                        activeBackgroundColor="#BFEDFA" activeBorderColor="#BFEDFA" activeColor="#00AEEC">登录后查看 8000+
                        条评论</BButton>
                </div>
            </div>
        </div>
        <transition name="send-fixed">
            <div class="comment-send-area fixed-send" v-if="sendFixedShow">
                <div class="up-avatar">
                    <img :src="$store.state.user.avatar" alt="">
                </div>
                <div class="send-input">
                    <textarea v-model="value" placeholder="发一条友善的评论"></textarea>
                </div>
                <div class="send-btn">
                    <BButton width="70px" height="48px">
                        发布
                    </BButton>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import BButton from '@/components/Common/Button'
import Popover from '@/components/Common/Popover'
import UpCard from '@/components/Common/Card/UpCard'
import Card from '@/components/Common/Card/Card'
import Pagination from '@/components/Common/Pagination'

import loginMixin from '@/mixins/login'



export default {
    name: 'VideoComment',
    mixins: [loginMixin],
    components: { BButton, Popover, UpCard, Card, Pagination },
    data() {
        return {
            sortType: 0,
            text: '开始是麦有问题所以声音很小，不过无所谓～ 大家都只会觉得是芙自己的问题，说麦有问题大家也只会觉得是狡辩，没关系，被嘲了一年了芙粉已经练就了一颗强壮的心脏噜，期待路人们对芙的审判（苍蝇搓手）',
            text2: '不管是什么的问题反正芙宝宝\n都要被高贵黄泉路人审判[微笑][微笑]',
            commentId: '',
            value: '',
            sendFixedShow: false,
            commentList: [],
            subCommentMap: {},

            ps: 10,
            cp: 1
        }
    },
    methods: {
        intersectionObserverInit() {
            if (!this.isLogin) return
            this.intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach((item) => {
                    this.sendAreaHideAShow(item)
                })
            }, { root: document })
            this.intersectionObserver.observe(this.$refs.sendArea)
            this.intersectionObserver.observe(this.$refs.commentBottom)
        },
        sendAreaHideAShow(item) {
            if (this.$refs.sendArea !== item.target) return

            if (item.isIntersecting) {
                this.sendFixedShow = false
            } else {
                if (item.boundingClientRect.top <= 0) {
                    this.sendFixedShow = true
                }
            }
        },
        moreComment(item) {
            if (this.$refs.commentBottom !== item.target) return
            if (item.isIntersecting) {
                if (!this.moreCommentThrottle) {
                    this.moreCommentThrottle = true
                    setTimeout(() => {
                        this.commentList.push(...this.arr)
                        this.moreCommentThrottle = false
                    }, 3000);
                }

            }
        },
        viewMore(comment) {
            this.loginJudge(() => {
                this.$set(comment, 'viewMore', true)
                if (this.subCommentMap['12138']) {
                    this.subCommentMap['12138'].push(...this.commentList)
                } else {
                    this.$set(this.subCommentMap, '12138', [...this.commentList, ...this.commentList])
                }
            })
        },
        sc(val) {
            console.log(val)
        },
        cc(val) {
            console.log(val)
        },
        showReplySendArea(commentId) {
            this.loginJudge(() => {
                this.commentId = commentId
                this.$nextTick(() => {
                    console.log(this.$refs.replyInput[0].focus())
                })
            })
        },
        loginViewMore() {
            this.loginJudge(() => {
                this.commentList = this.clist
            })
        }
    },
    watch: {
        value(val) {
        }
    },
    mounted() {
        this.intersectionObserverInit()

        this.clist = [{
            id: '12138',
            content: '开始是麦有问题所以声音很小，不过无所谓～ 大家都只会觉得是芙自己的问题，说麦有问题大家也只会觉得是狡辩，没关系，被嘲了一年了芙粉已经练就了一颗强壮的心脏噜，期待路人们对芙的审判（苍蝇搓手）',
            time: '2022-01-01 08:00',
            like: 289,
            dislike: 3,
            state: 1,
            subTotal: 66,

            up: {
                upId: '12138',
                nickname: '金医生12138金医生',
                avatar: '/1.jpg',
                level: '2',
                vip: 1
            },
            upAction: {
                like: 1,
                dislike: 0
            }
        },
        {
            id: '121381',
            content: '我的也没有果冻屏问题[藏狐]用着很爽，就是有一些游戏还没适配，横屏边框看着有点难受',
            time: '2022-01-01 08:00',
            like: 289,
            dislike: 3,
            state: 1,
            subTotal: 6,
            up: {
                upId: '121381',
                nickname: '鸡公福',
                avatar: '/2.jpg',
                level: '3',
                vip: 0
            },
            upAction: {
                like: 1,
                dislike: 0
            }
        },
        {
            id: '121382',
            content: '不注意看其实看不出来',
            time: '2022-01-01 08:00',
            like: 289,
            dislike: 3,
            state: 1,
            subTotal: 0,
            up: {
                upId: '121382',
                nickname: '一天撸8次猫猫',
                avatar: '/h(1).jpg',
                level: '2',
                vip: 1
            },
            upAction: {
                like: 0,
                dislike: 0
            }
        },
        {
            id: '121383',
            content: '横屏本来就没有，竖着才有的',
            time: '2022-01-01 08:00',
            like: 289,
            dislike: 3,
            state: 1,
            subTotal: 3,
            up: {
                upId: '121383',
                nickname: '三六九',
                avatar: '/4.png',
                level: '2',
                vip: 0
            },
            upAction: {
                like: 0,
                dislike: 1
            }
        }]

        if (this.isLogin) {
            this.commentList = this.clist
        } else {
            this.commentList = this.clist.slice(0, 2)
        }

        this.$set(this.subCommentMap, '12138', [...this.commentList])
        this.$set(this.subCommentMap, '121381', [...this.commentList])

        this.arr = [...this.commentList]

    }
}
</script>

<style lang="scss" scoped>
.comment {

    .comment-header {
        display: flex;
        align-items: center;

        h3 {
            font-size: 20px;
        }

        .comment-num,
        .comment-sort {
            margin-left: 8px;
            color: #9499A0;
            font-size: 13px;
        }

        .comment-sort {
            margin-left: 36px;


            .division {
                margin: 0 10px;
            }

            .t-sort,
            .h-sort {
                cursor: pointer;

                &:hover {
                    color: #00AEEC;
                }
            }

            .sort-active {
                color: black !important;
            }
        }
    }

    .comment-send-area {
        margin: 22px 0 10px 0;
        display: flex;
        align-items: center;

        .up-avatar {
            flex-shrink: 0;
            height: 40px;
            width: 80px;
            display: flex;
            justify-content: center;

            img {
                height: 40px;
                width: 40px;
                border-radius: 50%;
                object-fit: cover;
            }
        }

        .send-input {
            flex-grow: 1;

            textarea {
                width: 100%;
                height: 48px;
                vertical-align: bottom;
                box-sizing: border-box;
                border-radius: 6px;
                border: 1px solid #F1F2F3;
                background-color: #F1F2F3;
                outline: none;
                resize: none;
                padding: 8px 10px;
                letter-spacing: 1px;
                transition: .3s;
                line-height: 30px;
                font-size: 13px;

                &:hover,
                &:focus {
                    border: 1px solid #C9CCD0;
                    background-color: #fff;
                }

                &:focus {
                    line-height: 13px;
                    height: 65px;
                }
            }
        }

        .send-btn {
            flex-shrink: 0;
            margin-left: 10px;
        }
    }

    .comment-area {
        padding-bottom: 100px;

        .main-comment {
            padding-top: 22px;
            display: flex;

            .up-avatar {
                width: 80px;
                height: 40px;
                display: flex;
                justify-content: center;
                flex-shrink: 0;

                .avatar {
                    height: 40px;
                    cursor: pointer;

                    img {
                        width: 40px;
                        height: 40px;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
            }

            .m-c {
                flex-grow: 1;
        
                .m-c-c {
                    margin-bottom: 10px;

                    &:hover {
                        .comment-info {

                            .m-opt {
                                opacity: 1;
                            }
                        }
                    }
                }

            }
        }

        .mc-no-login {
            &:nth-last-child(2) {
                position: relative;

                &::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    top: 0;
                    display: block;
                    width: 100%;
                    height: 100%;
                    background-image: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 0) 100%);
                    pointer-events: none;
                }
            }
        }

        .comment-bottom {
            margin-top: 20px;
            text-align: center;
            font-size: 13px;
            color: #9499A0;
        }

        .login-view-more {
            margin-top: 22px;
            display: flex;
            justify-content: center;

            .login-view-more-btn {
                flex-grow: 1;
                max-width: 580px;
            }
        }
    }

    .ca-no-login {
        .main-comment:nth-last-child(2) {
            position: relative;

            &::after {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                display: block;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(to top, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 15%, rgba(255, 255, 255, 0) 100%);
                pointer-events: none;
            }
        }
    }

    .sub-comment-area {

        .sub-comment {
            padding: 10px 0;
            display: flex;

            .up-avatar {
                flex-shrink: 0;
                width: 24px;
                height: 24px;
                margin-right: 8px;

                .avatar {
                    width: 24px;
                    height: 24px;

                    img {
                        width: 24px;
                        height: 24px;
                        border-radius: 50%;
                        object-fit: cover;
                    }
                }
            }

            .s-c {
                flex-grow: 1;

                .up-name {
                    display: inline-flex;
                    margin: 0 0 0 0;

                    .u-n {
                        line-height: 24px;
                    }
                }

                .comment-info {
                    max-width: 95%;
                }
            }

            &:hover {
                .s-c {
                    .comment-info {
                        .s-opt {
                            opacity: 1;
                        }
                    }
                }
            }
        }
    }

    .up-name {
        margin-bottom: 8px;
        display: flex;
        align-items: center;

        .u-n {
            font-size: 14px;
            color: #61666D;
            cursor: pointer;

            &:hover {
                color: #00AEEC;
            }
        }

        .vip-u-n {
            color: #FB7299;

            &:hover {
                color: #FB7299;
            }
        }

        .icon {
            display: flex;
            margin-right: 8px;
        }
    }

    .comment-content,
    .sub-comment-content {
        color: #18191C;
        font-size: 15px;
        letter-spacing: 1px;
        word-break: break-all;
        white-space: pre-wrap;
        word-wrap: break-word;
        line-height: 24px;
    }

    .comment-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 4px;
        font-size: 13px;
        color: #9499A0;

        .c-i-left {
            display: flex;
        }

        .comment-time,
        .c-like,
        .c-dislike {
            margin-right: 20px;
        }

        .c-like,
        .c-dislike {
            display: flex;
            align-items: center;
            cursor: pointer;

            .icon,
            .a-icon {
                margin-right: 5px;
            }

            .icon {
                path {
                    fill: #9499a0
                }
            }

            &:hover {
                color: #00AEEC;

                .icon {
                    path {
                        fill: #00AEEC
                    }
                }
            }
        }

        .like-a {
            color: #00AEEC;
        }

        .reply {
            cursor: pointer;

            &:hover {
                color: #00AEEC;
            }
        }

        .comment-opt {
            font-size: 12px;
            cursor: pointer;
            opacity: 0;
            transition: .2s;

            &:hover {
                color: #00AEEC
            }
        }

        .comment-opt-box {
            min-width: 100px;
            border-radius: 6px;
            overflow: hidden;

            .c-opt-item {
                padding: 8px 15px;
                font-size: 14px;
                color: #18191C;
                cursor: pointer;
                transition: .1s;

                &:hover {
                    background-color: #F1F2F3;
                    color: #00AEEC;
                }
            }
        }
    }

    .split-line {
        margin-top: 16px;
        height: 1px;
        width: 100%;
        background-color: #e3e5e7;
    }

    .view-more {
        color: #9499A0;
        font-size: 13px;

        .more {
            cursor: pointer;

            &:hover {
                color: #00AEEC;
            }
        }
    }

    .fixed-send {
        width: 51.3%;
        min-width: 668px;
        box-sizing: border-box;
        position: fixed;
        bottom: 0;
        margin: 0;
        padding: 15px 20px 15px 0;
        // padding: 15px 0;
        background-color: #FFF;
        border-top: 1px solid #e3e5e7;
    }
}

.comment-send-area-enter-to,
.comment-send-area-leave,
.send-fixed-leave,
.send-fixed-enter-to {
    opacity: 1;
}

.comment-send-area-enter-active,
.send-fixed-enter-active,
.send-fixed-leave-active {
    transition: .5s;
}

.comment-send-area-leave-to,
.comment-send-area-enter,
.send-fixed-leave-to,
.send-fixed-enter {
    opacity: 0;
}

.comment-opt-box {
    min-width: 100px;
    border-radius: 6px;
    overflow: hidden;

    .c-opt-item {
        padding: 8px 15px;
        font-size: 14px;
        color: #18191C;
        cursor: pointer;
        transition: .1s;

        &:hover {
            background-color: #F1F2F3;
            color: #00AEEC;
        }
    }
}
</style>