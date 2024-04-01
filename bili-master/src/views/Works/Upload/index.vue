<template>
    <div class="upload">
        <div class="ud-rl">
            <!-- 视频发布头部 -->
            <div class="rl-header" v-if="file">
                <h3>发布视频</h3>
            </div>
            <!-- 视频上传头部 -->
            <div class="ud-header" v-else>
                <Tabs type="line" fontSize="16px" line v-model="tabActive">
                    <TabPanel lable="视频投稿" name="video"></TabPanel>
                </Tabs>
            </div>
            <!-- 视频发布区 -->
            <div class="rl-body" v-if="file">
                <!-- 文件上传列表 -->
                <div class="file-list">
                    <div class="file-item" :class="{ active: file.id === f.id }" :title="'v0003'" v-for="f in files"
                        :key="f.id" @click="changeFile(f.id)">
                        <span class="file-name">
                            {{ f.name }}
                        </span>
                        <span class="ud-pgs-text">
                            <i class="iconfont icon-wancheng"></i>
                            上传完成
                        </span>
                        <div class="file-delete" @click.stop="deleteFile(f.id)">
                            <i class="iconfont icon-guanbi"></i>
                        </div>
                    </div>
                    <div class="file-item file-add" @click="chooseFile">
                        <span class="file-name">
                            添加视频
                        </span>
                        <span class="ud-pgs-text">
                            <i class="iconfont icon-jiahao"></i>
                        </span>
                    </div>
                </div>
                <!-- 发布信息 -->
                <div class="file-basic-info">
                    <h4>{{ file.name }}</h4>
                    <!-- 视频上传进度信息 -->
                    <div class="ud-pgs-box">
                        <div class="file-icon">
                            <svg width="40" height="40">
                                <use xlink:href="#icon-wenjianleixing-biaozhuntu-shipinwenjian"></use>
                            </svg>
                        </div>
                        <div class="ud-detail">
                            <div class="ud-status">
                                <div class="ud-data">
                                    <span>已经上传：1.8MB/23.5MB</span>
                                    <!-- <span>123</span> -->
                                </div>
                                <div class="ud-opt">
                                    <span>7%</span>
                                    <div class="opt-icon" title="暂停上传">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                                            height="28" preserveAspectRatio="xMidYMid meet"
                                            style="width: 100%; height: 100%;">
                                            <defs>
                                                <clipPath id="__lottie_element_425">
                                                    <rect width="28" height="28" x="0" y="0"></rect>
                                                </clipPath>
                                            </defs>
                                            <g clip-path="url(#__lottie_element_425)">
                                                <g transform="matrix(1,0,0,1,14,14)" opacity="1"
                                                    style="display: block;">
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path fill-opacity="1"
                                                            d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z">
                                                        </path>
                                                        <path stroke-linecap="butt" stroke-linejoin="miter"
                                                            fill-opacity="0" stroke-miterlimit="4" stroke="#999"
                                                            stroke-opacity="1" stroke-width="0"
                                                            d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,24.812000274658203,14)" opacity="1"
                                                    style="display: block;">
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path fill-opacity="1"
                                                            d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z">
                                                        </path>
                                                        <path stroke-linecap="butt" stroke-linejoin="miter"
                                                            fill-opacity="0" stroke-miterlimit="4" stroke="#999"
                                                            stroke-opacity="1" stroke-width="0"
                                                            d=" M-5.484000205993652,-10 C-7.953000068664551,-10 -8,-7.984000205993652 -8,-7.984000205993652 C-8,-7.984000205993652 -8.008000373840332,7.984000205993652 -8.008000373840332,7.984000205993652 C-8.008000373840332,7.984000205993652 -7.984000205993652,9.991999626159668 -5.5,9.991999626159668 C-3.0160000324249268,9.991999626159668 -3.003999948501587,7.995999813079834 -3.003999948501587,7.995999813079834 C-3.003999948501587,7.995999813079834 -2.9839999675750732,-8 -2.9839999675750732,-8 C-2.9839999675750732,-8 -3.015000104904175,-10 -5.484000205993652,-10z">
                                                        </path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,4,14)" opacity="3.2922582931860234e-7"
                                                    style="display: block;">
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path fill-opacity="1" d="M0 0"></path>
                                                        <path stroke-linecap="butt" stroke-linejoin="miter"
                                                            fill-opacity="0" stroke-miterlimit="4" stroke="#999"
                                                            stroke-opacity="1" stroke-width="0" d="M0 0"></path>
                                                    </g>
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path fill-opacity="1"
                                                            d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z">
                                                        </path>
                                                        <path stroke-linecap="butt" stroke-linejoin="miter"
                                                            fill-opacity="0" stroke-miterlimit="4" stroke="#999"
                                                            stroke-opacity="1" stroke-width="0"
                                                            d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                    <!-- <div class="opt-icon">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                                            height="28" preserveAspectRatio="xMidYMid meet"
                                            style="width: 100%; height: 100%;">
                                            <g clip-path="url(#__lottie_element_234)">
                                                <g style="display: block;" transform="matrix(1,0,0,1,14,14)"
                                                    opacity="1">
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path  fill-opacity="1"
                                                            d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z">
                                                        </path>
                                                        <path stroke-linecap="butt" stroke-linejoin="miter"
                                                            fill-opacity="0" stroke-miterlimit="4"
                                                            stroke="#999" stroke-opacity="1"
                                                            stroke-width="0"
                                                            d=" M-7.031000137329102,-10.875 C-7.031000137329102,-10.875 -8.32800006866455,-11.25 -9.42199993133545,-10.468999862670898 C-10.109999656677246,-9.906999588012695 -10,-7.992000102996826 -10,-7.992000102996826 C-10,-7.992000102996826 -10,8.015999794006348 -10,8.015999794006348 C-10,8.015999794006348 -10.125,10.241999626159668 -9,10.991999626159668 C-7.875,11.741999626159668 -5,10.031000137329102 -5,10.031000137329102 C-5,10.031000137329102 7.968999862670898,1.875 7.968999862670898,1.875 C7.968999862670898,1.875 9,1.062000036239624 9,0 C9,-1.062000036239624 7.968999862670898,-1.937999963760376 7.968999862670898,-1.937999963760376 C7.968999862670898,-1.937999963760376 -7.031000137329102,-10.875 -7.031000137329102,-10.875z">
                                                        </path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                    </div> -->
                                    <div class="opt-icon" title="重新选择" @click="chooseFile($event, true)">
                                        <svg data-v-1d9b105c="" data-v-0b1c01f8="" width="15" height="15"
                                            viewBox="0 0 12 12" class="loop">
                                            <path data-v-1d9b105c="" data-v-0b1c01f8="" fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 6.002C12 3.142 10.205.664 7.683.024a.75.75 0 0 0-.369 1.454C9.15 1.943 10.5 3.807 10.5 6c0 1.8-.908 3.38-2.25 4.144V8.25a.75.75 0 0 0-1.499 0v2.796c0 .045.004.089.013.132a.75.75 0 0 0 .932.798c2.516-.643 4.304-3.118 4.304-5.973ZM4.524.005H4.49a.757.757 0 0 0-.172.022C1.797.658 0 3.14 0 6.004c0 2.86 1.788 5.337 4.304 5.974a.75.75 0 0 0 .367-1.454C2.846 10.062 1.5 8.198 1.5 6.004c0-1.805.91-3.385 2.25-4.147V3.55a.75.75 0 0 0 1.5 0V.745a.75.75 0 0 0-.023-.173l-.01-.04A.654.654 0 0 0 5.155.39.756.756 0 0 0 4.58.01h.001a.665.665 0 0 0-.056-.004Z">
                                            </path>
                                        </svg>
                                    </div>
                                </div>
                                <!-- <div class="ud-opt ud-error">
                                    <div>
                                        <svg data-v-83bdd12c="" width="17" height="17" viewBox="0 0 18 18" fill="none"
                                            xmlns="http://www.w3.org/2000/svg" class="header-upload-entry__icon">
                                            <path data-v-83bdd12c=""
                                                d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
                                                stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </path>
                                            <path data-v-83bdd12c="" d="M8.99413 11.2353L8.99413 3.82353"
                                                stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                            <path data-v-83bdd12c="" d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413"
                                                stroke="currentColor" stroke-width="1.7" stroke-linecap="round"
                                                stroke-linejoin="round">
                                            </path>
                                        </svg>
                                        <span>
                                            重选视频
                                        </span>
                                    </div>
                                    <div>
                                        <svg data-v-1d9b105c="" data-v-0b1c01f8="" width="13" height="13"
                                            viewBox="0 0 12 12" class="loop">
                                            <path data-v-1d9b105c="" data-v-0b1c01f8="" fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 6.002C12 3.142 10.205.664 7.683.024a.75.75 0 0 0-.369 1.454C9.15 1.943 10.5 3.807 10.5 6c0 1.8-.908 3.38-2.25 4.144V8.25a.75.75 0 0 0-1.499 0v2.796c0 .045.004.089.013.132a.75.75 0 0 0 .932.798c2.516-.643 4.304-3.118 4.304-5.973ZM4.524.005H4.49a.757.757 0 0 0-.172.022C1.797.658 0 3.14 0 6.004c0 2.86 1.788 5.337 4.304 5.974a.75.75 0 0 0 .367-1.454C2.846 10.062 1.5 8.198 1.5 6.004c0-1.805.91-3.385 2.25-4.147V3.55a.75.75 0 0 0 1.5 0V.745a.75.75 0 0 0-.023-.173l-.01-.04A.654.654 0 0 0 5.155.39.756.756 0 0 0 4.58.01h.001a.665.665 0 0 0-.056-.004Z">
                                            </path>
                                        </svg>
                                        <span>
                                            继续上传
                                        </span>

                                    </div>
                                </div> -->
                            </div>
                            <div class="ud-pgs-bar">
                                <Slider :thumb="false" disabled height="3px" :sliderStyle="{ padding: '2px 0' }"
                                    :min="0" :max="1000" v-model="file.progress"></Slider>
                            </div>
                        </div>
                    </div>
                    <!-- 视频发布信息表单 -->
                    <div class="rl-form">
                        <h4>基本设置</h4>
                        <!-- 视频封面选择 -->
                        <div class="form-item">
                            <div class="lable">
                                封面
                            </div>
                            <div class="cover">
                                <div class="cover-img">
                                    <Card mask width="230px" height="138px"
                                        :backgroundImage="file.cover ? `url(${file.cover})` : ''">
                                        <div slot="mask" class="cover-choose">
                                            <span @click="coverCutVisible = true" v-if="file.covers.length">更换封面</span>
                                            <span v-if="file.covers.length">|</span>
                                            <span @click="chooseCover">本地上传</span>
                                        </div>
                                    </Card>
                                    <input type="file" style="display:none" accept=".jpg,.png,.webp,.jepg,.gif"
                                        @change="chooseLocalCover" ref="coverInput">
                                </div>
                                <div class="cover-preview">
                                    <div class="preview-text">
                                        以下为智能推荐封面
                                        <span @click="coverCutVisible = true" v-if="file.covers.length">，查看更多封面</span>
                                    </div>
                                    <div class="preview-list">
                                        <div class="preview-img"
                                            v-for="(c, i) in file.covers.slice(1, file.covers.length - 1)" :key="i"
                                            @click="file.cover = c">
                                            <Card mask width="100%" height="100%"
                                                :backgroundImage="c ? `url(${c})` : ''">
                                                <div slot="mask" class="preview-choose">
                                                    <i class="iconfont icon-dui" v-if="file.cover === c"></i>
                                                    <span v-else>选择图片</span>
                                                </div>
                                            </Card>
                                        </div>
                                        <div class="preview-loading" v-if="!file.covers.length">
                                            <span v-if="file.coverCutError">您的浏览器可能不支持该视频格式，导致封面无法生成，您可以选择本图片作为封面，<span
                                                    class="choose-local" @click="chooseCover">选择本地图片</span></span>
                                            <span v-else>生成封面中<i class="iconfont icon-loading"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <Dialog :visible.sync="coverCutVisible" title="视频截取封面" @open="coverCutDialogOpen">
                                    <div class="cover-cut">
                                        <div class="cover-cut-img">
                                            <div class="cut-img">
                                                <Card width="480px" height="288px"
                                                    :backgroundImage="`url(${coverCut})`"></Card>
                                            </div>
                                            <div class="design-sketch">
                                                <div class="d-s-text">效果预览</div>
                                                <VideoPreviewCard width="218px" :videoSrc="file.boldurl" play="---"
                                                    dm="---" :seeLaterIcon="false" :imgSrc="coverCut" :title="file.name"
                                                    up="---">
                                                </VideoPreviewCard>
                                            </div>
                                        </div>
                                        <div class="cover-cut-bar">
                                            <Popover :pvisible="cutPopVisible" backgroundColor="rgba(0,0,0,.7)"
                                                placement="top-start" :top="-5"
                                                :pstyle="{ transform: `translateX(-50%)` }" :left="cutPopLeft">
                                                <div slot="reference" class="cover-list"
                                                    @mousemove="coverCutBarMousemove" @mousedown="coverCutBarMousedown"
                                                    ref="cutBar">
                                                    <div class="cover-thumb" :style="{ left: cutThumbLeft + 'px' }">
                                                    </div>
                                                    <div class="c-i" v-for="(c, i) in file.covers" :key="i"
                                                        :style="{ backgroundImage: `url(${c})` }"></div>
                                                </div>
                                                <div class="cut-time">
                                                    {{ cutTime }}
                                                </div>
                                            </Popover>
                                        </div>
                                    </div>
                                    <div slot="footer" class="cover-cut-footer">
                                        <BButton type="white" width="110px" height="38px"
                                            @click="coverCutVisible = false">返回</BButton>
                                        <BButton width="110px" height="38px" style="margin-left:30px"
                                            @click="chooseCoverCut">完成</BButton>
                                    </div>
                                </Dialog>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lable">
                                标题
                            </div>
                            <div class="rl-from-input" :subscript="`${file.title.length}/80`">
                                <input style="padding: 0 48px 0 8px" type="text" maxlength="80" placeholder="【剪辑类型】+ 主要标题" v-model.trim="file.title">
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lable">
                                类型
                            </div>
                            <div class="rl-from-radio">
                                <input type="radio" name="vtype" value="0" v-model="file.type">自制
                            </div>
                            <div class="rl-from-radio">
                                <input type="radio" name="vtype" value="1" v-model="file.type">转载
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lable">
                                分区
                            </div>
                            <Popover trigger="click" placement="bottom-start" :top="10" :pvisible="subareaPopVisible">
                                <div slot="reference" class="rl-from-select" @click="subareaPopShowHide">
                                    <div class="select">
                                        <div class="s-option">
                                            <span v-if="file.subarea.subareaTitle && file.subarea.detailTitle">
                                                {{ file.subarea.subareaTitle }}
                                                <i class="iconfont icon-jiantou_xiangyou"></i>
                                                {{ file.subarea.detailTitle }}
                                            </span>
                                            <span v-else>请选择分区</span>
                                        </div>
                                        <div class="s-icon">
                                            <i class="iconfont icon-xiangxia2"></i>
                                        </div>
                                    </div>
                                </div>
                                <div class="select-options-card">
                                    <div class="subarea" ref="subarea">
                                        <div class="sub-item" :class="{ active: s.id === tempSubareaId }"
                                            v-for="s in subareaList" :key="s.id" @click="selectSubarea($event, s)">
                                            {{ s.title }}
                                        </div>
                                    </div>
                                    <div class="subarea-detail" ref="subareaDetail">
                                        <div class="sub-d-item" :class="{ active: d.id === file.subarea.detailId }"
                                            v-for="d in subareaDetailList" :key="d.title"
                                            @click="selectSubareaDetail($event, d)">
                                            <span>
                                                {{ d.title }}
                                            </span>
                                            <span class="d-desc">
                                                {{ d.desc }}
                                            </span>
                                        </div>
                                        <div class="sub-d-item" v-for="i in 20" :key="i">
                                            1
                                        </div>
                                    </div>
                                </div>
                            </Popover>
                        </div>
                        <div class="form-item">
                            <div class="lable">
                                标签
                            </div>
                            <div class="lable-box">
                                <div class="v-lable" v-for="(l, i) in file.lables" :key="i" @click="deleteLable(i)">
                                    {{ l }}
                                    <i class="iconfont icon-guanbi"></i>
                                </div>
                                <div class="rl-from-input" :subscript="`还可以添加${10 - file.lables.length}个标签`">
                                    <input type="text" maxlength="20" v-model.trim="lable" placeholder="按回车键Enter创建标签"
                                        @keydown.enter="addLable">
                                </div>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lable">
                                简介
                            </div>
                            <div class="rl-from-textarea" :subscript="`${file.desc.length}/250`">
                                <div>
                                    <textarea maxlength="250" placeholder="填写更全面的相关信息，让更多的人能找到你的视频吧"
                                        v-model.trim="file.desc"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="form-item">
                            <div class="lable"></div>
                            <div class="rl-btn">
                                <BButton width="120px" height="40px" @click="release">立即发布</BButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 视频上传区 -->
            <div class="ud-body" v-else>
                <div class="adv">
                    <Adv></Adv>
                </div>
                <div class="ud-box" @click="chooseFile" @drop="dragFile" @dragover="dragover">
                    <svg data-v-83bdd12c="" width="40" height="40" viewBox="0 0 18 18" fill="none"
                        xmlns="http://www.w3.org/2000/svg" class="header-upload-entry__icon">
                        <path data-v-83bdd12c=""
                            d="M12.0824 10H14.1412C15.0508 10 15.7882 10.7374 15.7882 11.6471V12.8824C15.7882 13.792 15.0508 14.5294 14.1412 14.5294H3.84707C2.93743 14.5294 2.20001 13.792 2.20001 12.8824V11.6471C2.20001 10.7374 2.93743 10 3.84707 10H5.90589"
                            stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path data-v-83bdd12c="" d="M8.99413 11.2353L8.99413 3.82353" stroke="currentColor"
                            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path data-v-83bdd12c="" d="M12.0823 6.29413L8.9941 3.20589L5.90587 6.29413"
                            stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                    <span class="ud-text">拖拽到此处上传</span>
                    <BButton class="ud-btn" width="200px" height="45px">上传视频</BButton>
                </div>

                <div class="explain">
                    <Popover placement="top" mode="to-top" :top="-5">
                        <a slot="reference" class="exp"
                            href="https://www.bilibili.com/blackboard/blackroom.html">禁止发布的视频内容</a>
                        <div class="exp-card">点击查看</div>
                    </Popover>
                    <Popover placement="top" mode="to-top" :top="-5">
                        <div slot="reference" class="exp">视频大小</div>
                        <div class="exp-card">
                            网页端上传的文件大小上限为8G
                            <br />
                            视频内容时长最大10小时
                            <br />
                            (提升电磁力，即可体验32G超大文件上限哦！前往创作实验室了解更多)
                        </div>
                    </Popover>
                    <Popover placement="top" mode="to-top" :top="-5">
                        <div slot="reference" class="exp">视频格式</div>
                        <div class="exp-card">
                            推荐上传的格式为：mp4, mkv
                            <br />
                            (推荐上传的格式在转码过程更有优势，审核过程更快哦！)
                        </div>
                    </Popover>
                    <Popover placement="top" mode="to-top" :top="-5">
                        <div slot="reference" class="exp">视频码率</div>
                        <div class="exp-card">
                            分辨率最大支持 8192*4320
                            <br />
                            推荐视频分辨率：1920*1080 或者 3840*2160
                            <br />
                            推荐视频码率：1080p大于6000kbps；4k大于20000kbps；8k大于40000kbps
                            <br />
                            音频采样率48000Hz
                            <br />
                            推荐音频码率：320kbps
                        </div>
                    </Popover>
                </div>
            </div>
        </div>
        <!-- 文件上传input -->
        <input type="file" class="up-input" accept=".mp4,.mkv,.webm" @change="chooseLocalVideo" ref="uploadInput">
    </div>
</template>


<script>

import Tabs from '@/components/Tabs'
import TabPanel from '@/components/Tabs/TabPanel'
import BButton from '@/components/Common/Button'
import Slider from '@/components/Common/Slider'
import Card from '@/components/Common/Card/Card'
import Popover from '@/components/Common/Popover'
import Dialog from '@/components/Common/Dialog'
import VideoPreviewCard from '@/components/Common/Card/VideoPreviewCard'
import Adv from '@/components/Adv'

import videoScreenshot from '@/utils/videoScreenshot'
import getTime from '@/utils/timeFormat'

export default {
    name: 'Upload',
    components: { Tabs, TabPanel, BButton, Slider, Card, Popover, Dialog, VideoPreviewCard, Adv },
    data() {
        return {
            tabActive: 'video',

            //文件，文件列表
            file: null,
            files: [],

            //分区变量
            subareaList: [
                {
                    id: 1,
                    title: "番剧",
                    detail: [{
                        pid: 1,
                        id: 11,
                        title: '动画资讯',
                        desc: '以动画/轻小说/漫画/杂志为主的资讯内容，PV/CM/特报/冒头/映像/预告'
                    },
                    {
                        pid: 1,
                        id: 12,
                        title: '官方延伸',
                        desc: '以动画番剧及声优为主的EVENT/生放送/DRAMA/RADIO/LIVE/特典/冒头等'
                    }],
                    link: '/channel/anime',
                },
                {
                    id: 2,
                    title: "国创",
                    detail: [{
                        pid: 2,
                        id: 21,
                        title: '国产动画',
                        desc: '国产连载动画，国产完结动画'
                    },
                    {
                        pid: 2,
                        id: 22,
                        title: '国产原创相关',
                        desc: '以国产动画、漫画、小说为素材的二次创作'
                    },
                    {
                        pid: 2,
                        id: 23,
                        title: '资讯',
                        desc: '原创国产动画、漫画的相关资讯、宣传节目等'
                    }],
                    link: '/channel/guochuang',
                }, {
                    pid: 4,
                    id: 4,
                    title: "综艺",
                    detail: [{
                        id: 41,
                        title: '综艺',
                        desc: '所有综艺相关，全部一手掌握！'
                    }],
                    link: '/channel/variety',
                }, {
                    id: 5,
                    title: "动画",
                    link: '/channel/donhua',
                }, {
                    id: 6,
                    title: "鬼畜",
                    link: '/channel/guichu',
                }, {
                    id: 7,
                    title: "娱乐",
                    link: '/channel/entertainment',
                }, {
                    id: 8,
                    title: "科技",
                    link: '/channel/tech',
                }, {
                    id: 9,
                    title: "美食",
                    link: '2',
                }, {
                    id: 10,
                    title: "电影",
                    link: '3',
                }, {
                    id: 11,
                    title: "电视剧",
                    link: '4',
                }, {
                    id: 12,
                    title: "纪录片",
                    link: '/channel/documentary',
                }, {
                    id: 13,
                    title: "游戏",
                    link: '6',
                }, {
                    id: 14,
                    title: "音乐",
                    link: '7',
                }, {
                    id: 15,
                    title: "影视",
                    link: '8',
                }, {
                    id: 16,
                    title: "知识",
                    link: '9',
                }, {
                    id: 17,
                    title: "资讯",
                    link: '10',
                }, {
                    id: 18,
                    title: "生活",
                    link: '2',
                }, {
                    id: 19,
                    title: "时尚",
                    link: '2',
                }, {
                    title: "汽车",
                    link: '2',
                }, {
                    id: 20,
                    title: "运动",
                    link: '2',
                }, {
                    id: 21,
                    title: "舞蹈",
                    link: '2',
                }, {
                    id: 22,
                    title: "更多",
                    icon: ["iconfont", "icon-changyongicon-"],
                    link: '2',
                },
            ],
            subareaDetailList: [],
            tempSubareaId: '',
            subareaPopVisible: false,

            //视频标签，标签列表
            lable: '',
            lableList: [],

            //视频截图数据
            coverCutVisible: false,
            coverCut: '',
            coverCutList: [],
            cutPopVisible: undefined,
            cutPopLeft: 0,
            cutThumbLeft: 0,
            cutTime: '00:00',

            //视频简介
            desc: '',
            //视频类型
            type: '1',
        }
    },
    watch: {
        file(val) {
            if (val) {
                window.onbeforeunload = function () {
                    return "你的设置将不会被保存！";
                }
            }
        }
    },
    methods: {
        chooseFile(e, rechoose) {
            this.rechoosefile = rechoose
            this.$refs.uploadInput.click()
        },
        chooseLocalVideo(e, file) {
            const f = file || this.$refs.uploadInput.files[0]

            if (this.rechoosefile) this.rechooseFile(f)
            else this.addFile(f)

            this.$refs.uploadInput.value = null
            this.cutThumbLeft = 0
        },
        addFile(f) {
            !this.fileId && (this.fileId = 1)
            this.file = {
                id: this.fileId++,
                file: f,
                progress: 0,
                boldurl: URL.createObjectURL(f),
                name: f.name.slice(0, f.name.lastIndexOf('.')),
                coverCutError: false,
                covers: [],
                cover: '',
                title: '',
                type: 0,
                subarea: {
                    id: '',
                    detailId: '',
                    subareaTitle: '',
                    detailTitle: ''
                },
                lables: [],
                desc: ''
            }
            this.files.push(this.file)
            videoScreenshot({
                file: this.file.file,
                sub: 5,
                duration: true
            }).then(res => {
                this.file.duration = Math.floor(res.duration)
                this.file.covers = res.imgs
                this.file.cover = this.file.cover || this.file.covers[1]
            }).catch(() => {
                this.file.coverCutError = true
            })
        },
        rechooseFile(f) {
            this.file.file = f
            this.file.progress = 0
            this.file.boldurl = URL.createObjectURL(f)
            this.file.name = f.name.slice(0, f.name.lastIndexOf('.'))
            this.file.coverCutError = false
            this.file.covers = []
            this.file.cover = ''

            videoScreenshot({
                file: this.file.file,
                sub: 5,
                duration: true
            }).then(res => {
                this.file.duration = Math.floor(res.duration)
                this.file.covers = res.imgs
                this.file.cover = this.file.cover || this.file.covers[1]
            }).catch(() => {
                this.file.coverCutError = true
            })
        },
        dragover(e) {
            e.stopPropagation();
            e.preventDefault();
        },
        dragFile(e) {
            e.stopPropagation();
            e.preventDefault();
            this.chooseLocalVideo('', e.dataTransfer.files[0])
        },
        changeFile(fid) {
            this.files.some((f) => {
                if (f.id === fid) {
                    this.file = f
                    return true
                }
            })
            this.cutThumbLeft = 0
        },
        deleteFile(fid) {
            if (this.files.length === 1) return this.$msg.warn('至少存在一个任务')
            this.files.some((f, i) => {
                if (f.id === fid) {
                    this.files.splice(i, 1)
                }
            })
            this.file = this.files[0]
        },
        chooseCover() {
            this.$refs.coverInput.click()
        },
        chooseLocalCover() {
            const reader = new FileReader()
            reader.onload = () => {
                this.file.cover = reader.result
            }
            reader.readAsDataURL(this.$refs.coverInput.files[0])
            this.$refs.coverInput.value = null
        },
        subareaPopShow() {
            this.subareaPopVisible = true
            setTimeout(() => {
                this.$refs.subarea.scrollTop = this.subareascrolltop
                this.$refs.subareaDetail.scrollTop = this.subareadetailscrolltop
            }, 50)
            if (this.tempSubareaId === this.file.subarea.id) return
            this.tempSubareaId = this.file.subarea.id
            this.subareaList.some((item) => {
                if (item.id === this.tempSubareaId) {
                    this.subareaDetailList = item.detail
                    return true
                }
            })
        },
        subareaPopHide() {
            this.subareaPopVisible = false
            window.removeEventListener('click', this.subareaPopHide)
        },
        subareaPopShowHide() {
            if (this.subareaPopVisible) {
                this.subareaPopHide()
            } else {
                this.subareaPopShow()
                setImmediate(()=>{
                    window.addEventListener('click', this.subareaPopHide)
                })
                
            }
        },
        selectSubarea(e, s) {
            this.subareaDetailList = s.detail
            this.tempSubareaId = s.id
            this.tempSubareaTitle = s.title
            e.target.scrollIntoView({
                behavior: 'smooth'
            })
        },
        selectSubareaDetail(e, d) {
            this.file.subarea.id = this.tempSubareaId
            this.file.subarea.subareaTitle = this.tempSubareaTitle
            this.file.subarea.detailId = d.id
            this.file.subarea.detailTitle = d.title
            this.subareascrolltop = this.$refs.subarea.scrollTop
            this.subareadetailscrolltop = this.$refs.subareaDetail.scrollTop
            this.subareaPopHide()
        },
        addLable() {
            if (!this.lable) return
            let add = true
            this.file.lables.some((item) => {
                if (item === this.lable) {
                    add = false
                    return add
                }
            })
            if (add) {
                if (this.file.lables.length >= 10) return this.$msg.warn('只能添加10个标签！')
                this.file.lables.push(this.lable)
                this.lable = ''
            } else {
                this.$msg.warn('该标签已经存在！')
            }

        },
        deleteLable(index) {
            this.lableList.splice(index, 1)
        },
        coverCutDialogOpen() {
            this.coverCut = this.file.cover
        },
        coverCutBarMousemove(e) {
            if (this.covercutbarmousedown) return
            this.cutPopLeft = e.offsetX
            const t = Math.floor(e.offsetX / this.$refs.cutBar.clientWidth * this.file.duration)
            this.cutTime = getTime(t, 'random')
        },
        coverCutBarMousedown(e) {
            this.covercutbarmousedown = true
            this.cutPopVisible = true
            this.cutThumbLeft = e.offsetX
            const cutBarRect = this.$refs.cutBar.getBoundingClientRect()
            const t = Math.floor(e.offsetX / cutBarRect.width * this.file.duration)
            this.cutTime = getTime(t, 'random')
            this.videoscreenshottimeout && clearTimeout(this.videoscreenshottimeout)
            this.videoscreenshottimeout = setTimeout(() => {
                videoScreenshot({ file: this.file.file, time: t }).then(res => {                    
                    this.coverCut = res[0]
                })
            }, 100)
            const mv = (e) => {
                if (this.covercutbarmousedown) {
                    let x = e.clientX - cutBarRect.left
                    if (x < 0) x = 0
                    else if (x > cutBarRect.width) x = cutBarRect.width
                    this.cutPopLeft = x
                    this.cutThumbLeft = x
                    const mt = Math.floor(x / cutBarRect.width * this.file.duration)
                    this.cutTime = getTime(mt, 'random')
                    setImmediate(() => {
                        this.videoscreenshottimeout && clearTimeout(this.videoscreenshottimeout)
                        this.videoscreenshottimeout = setTimeout(() => {
                            videoScreenshot({ file: this.file.file, time: mt }).then(res => this.coverCut = res[0])
                        }, 100)
                    })
                }
            }
            const mu = () => {
                this.covercutbarmousedown = false
                this.cutPopVisible = void 0
                window.removeEventListener('mousemove', mv)
                window.removeEventListener('mouseup', mu)
            }
            window.addEventListener('mousemove', mv)
            window.addEventListener('mouseup', mu)
        },
        chooseCoverCut() {
            this.file.cover = this.coverCut
            this.coverCutVisible = false
        },
        release() {
            if (!this.file.cover) return this.$msg.warn('请选择视频封面')
            if (!this.file.title) return this.$msg.warn('请输入视频标题')
            if (!this.file.subarea.id && !this.file.subarea.detailId) return this.$msg.warn('请选择视频分区')
            if (!this.file.lables.length) return this.$msg.warn('请至少输入一个视频标签')

            this.files.some((f, i) => {
                if (f.id === this.file.id) {
                    this.files.splice(i, 1)
                    return true
                }
            })
            this.file = this.files[0]
            this.$msg.success('发布成功')
        }
    },
    beforeRouteLeave(to, from, next) {        
        if (this.file) {
            this.$confirm('系统可能不会保存填写的稿件信息噢...', '确定要离开吗？', {lock:false}).then(() => {
                next()
            }).catch(() => {
                next(from.fullPath)
            })
        } else {
            next()
        }
    },
    beforeDestroy() {
        window.onbeforeunload = null
    }
}
</script>

<style lang="scss" scoped>
.upload {
    height: 100%;
    padding: 20px;
    box-sizing: border-box;

    .ud-rl {
        margin: 0 auto;
        // min-width: 1000px;
        max-width: 1100px;
        min-height: 100%;
        box-sizing: border-box;
        border-radius: 8px;
        background-color: white;
        background-clip: content-box;

        .ud-header {
            // height: 64px;
            padding: 15px 35px 5px 35px;
        }

        .ud-body {
            padding: 0 0 40px 0;

            .adv {
                margin: 20px auto;
                max-width: 830px;
            }

            .ud-box {
                margin: 0 auto;
                height: 285px;
                max-width: 830px;
                border: 3px dashed #ccc;
                box-sizing: border-box;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                color: #999;
                cursor: pointer;
                transition: .3s;

                &:hover {
                    color: #00a1d6;
                    border-color: #00a1d6;
                }

                svg {
                    margin-top: -16px;
                }

                .ud-text {
                    margin-top: 10px;
                    margin-bottom: 20px;
                    font-size: 13px;
                }



            }

            .explain {
                margin-top: 80px;
                display: flex;
                justify-content: center;
                // align-items: center;

                .exp {
                    padding: 0 10px;
                    color: #999;
                    font-size: 12px;
                    display: flex;
                    align-items: center;
                    cursor: pointer;

                    &:hover {
                        color: #00aeec;
                    }
                }
            }
        }

        .rl-header {
            padding: 20px 35px;
        }

        .rl-body {
            padding: 0 35px;

            .file-list {
                border-radius: 10px;
                background-color: #eeeeef;
                padding: 12px 2px 2px 12px;
                display: flex;
                flex-wrap: wrap;

                .file-item {
                    position: relative;
                    flex: 1;
                    margin: 0 10px 10px 0;
                    height: 60px;
                    min-width: 100px;
                    max-width: 218px;
                    border-radius: 10px;
                    background-color: white;
                    color: #18191c;
                    padding: 10px 12px;
                    box-sizing: border-box;

                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    cursor: pointer;

                    &:hover {

                        .file-delete {
                            opacity: 1;
                        }
                    }

                    .file-name {
                        font-size: 14px;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        transition: .2s;
                    }

                    .ud-pgs-text {
                        font-size: 12px;
                        color: #43ce5b;
                        transition: .2s;

                        i {
                            font-size: 12px;
                        }
                    }

                    .file-delete {
                        position: absolute;
                        right: 8px;
                        top: 4px;
                        opacity: 0;
                        transition: .2s;

                        i {
                            font-size: 13px;
                        }
                    }
                }

                .active {
                    background-color: #00aeec;
                    color: #fff;

                    .ud-pgs-text {
                        color: #fff;
                    }

                    .file-delete {
                        opacity: 1;
                    }
                }

                .file-add {
                    flex: 0;
                    align-items: center;

                    .ud-pgs-text {
                        color: #18191c;

                        i {
                            font-size: 14px;
                        }
                    }
                }
            }

            .file-basic-info {
                padding: 20px 0;

                .ud-pgs-box {
                    padding: 15px 0 25px 0;
                    display: flex;

                    .file-icon {
                        svg {
                            display: block;
                        }
                    }

                    .ud-detail {
                        flex-grow: 1;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;

                        .ud-status {
                            display: flex;
                            justify-content: space-between;
                            color: #999;
                            font-size: 13px;

                            .ud-data {}

                            .ud-opt {
                                display: flex;
                                align-items: center;
                                height: 20px;

                                .opt-icon {
                                    display: flex;
                                    align-items: center;
                                    width: 20px;
                                    height: 20px;
                                    cursor: pointer;
                                    transition: .2s;
                                    fill: #999;

                                    &:hover {
                                        // color: #00aeec;
                                        fill: #00aeec;
                                    }
                                }

                                &>* {
                                    margin-left: 15px;
                                }

                            }

                            .ud-error {
                                >div {
                                    display: flex;
                                    align-items: center;
                                    cursor: pointer;
                                    transition: .2s;
                                    fill: #999;

                                    &:hover {
                                        color: #00aeec;
                                        fill: #00aeec;
                                    }
                                }
                            }
                        }

                        .ud-pgs-bar {}
                    }
                }

                .rl-form {

                    .form-item {
                        margin-top: 24px;
                        display: flex;

                        .lable {
                            flex-shrink: 0;
                            width: 135px;
                            display: flex;
                            align-items: center;
                            color: #212121;
                        }

                        .rl-from-input,
                        .rl-from-textarea {
                            position: relative;
                            width: 70%;
                            height: 40px;
                            font-size: 14px;

                            &::after {
                                content: attr(subscript);
                                display: block;
                                position: absolute;
                                right: 5px;
                                bottom: 10px;
                                font-size: 13px;
                                color: #999;
                            }

                            input,
                            textarea {
                                display: block;
                                width: 100%;
                                height: 100%;
                                outline: none;
                                border: 1px solid #ccd0d7;
                                border-radius: 6px;
                                box-sizing: border-box;
                                padding: 0 8px;
                                transition: .25s;

                                &:hover,
                                &:focus {
                                    border-color: #00aeec;
                                }

                                &::placeholder {
                                    color: #ccd0d7;
                                }
                            }

                        }

                        .rl-from-radio {
                            margin-right: 10px;
                            display: flex;
                            align-items: center;
                            font-size: 14px;
                            color: #61666d;

                            input {
                                margin: 0;
                                width: 14px;
                                height: 14px;
                                margin-right: 5px;
                            }
                        }

                        .rl-from-select {
                            width: 225px;
                            height: 40px;
                            padding: 6px 12px;
                            box-sizing: border-box;
                            border: 1px solid #ccd0d7;
                            border-radius: 6px;
                            cursor: pointer;
                            font-size: 14px;
                            color: #18191c;

                            .select {
                                height: 100%;
                                display: flex;
                                justify-content: space-between;
                                align-items: center;

                                .s-icon {
                                    i {
                                        font-size: 14px;
                                    }
                                }
                            }
                        }

                        .rl-from-textarea {
                            height: auto;

                            textarea {
                                width: 100%;
                                height: 125px;
                                resize: none;
                                padding: 8px;
                            }
                        }

                        .cover {
                            display: flex;

                            .cover-img {

                                img {
                                    width: 100%;
                                    height: 100%;
                                    object-fit: cover;
                                }

                                .cover-choose {
                                    width: 100%;
                                    position: absolute;
                                    left: 0;
                                    bottom: 0;
                                    padding: 8px 0;
                                    display: flex;
                                    align-items: center;
                                    font-size: 13px;

                                    span {
                                        flex-grow: 1;
                                        text-align: center;
                                        font-size: 14px;
                                        cursor: pointer;
                                    }
                                }
                            }

                            .cover-preview {
                                padding-left: 20px;
                                display: flex;
                                flex-direction: column;
                                justify-content: flex-end;

                                .preview-text {
                                    margin-bottom: 6px;
                                    font-size: 13px;
                                    color: #999;

                                    span {
                                        color: #00a1d6;
                                        cursor: pointer;
                                    }
                                }

                                .preview-list {
                                    height: 84px;
                                    display: flex;
                                    // justify-content: space-between;
                                    flex-wrap: wrap;
                                    overflow: hidden;

                                    .preview-img {
                                        margin-right: 13px;
                                        width: 140px;
                                        height: 84px;

                                        .preview-choose {
                                            width: 100%;
                                            height: 100%;
                                            display: flex;
                                            justify-content: center;
                                            align-items: center;
                                            cursor: pointer;

                                            span {
                                                font-size: 14px;
                                            }

                                            i {
                                                font-size: 24px;
                                                font-weight: bold;
                                                color: #00a1d6;
                                            }
                                        }
                                    }

                                    .preview-loading {
                                        font-size: 13px;
                                        color: #999;
                                        display: flex;
                                        align-items: center;

                                        i {
                                            margin-left: 4px;
                                            display: inline-block;
                                            font-size: 14px;
                                            animation: pre-load 2s infinite linear;
                                        }

                                        @keyframes pre-load {
                                            0% {
                                                transform: rotateZ(0deg);
                                            }

                                            100% {
                                                transform: rotateZ(360deg);
                                            }
                                        }

                                        .choose-local {
                                            color: #00a1d6;
                                            cursor: pointer;
                                        }
                                    }
                                }
                            }

                            .cover-cut {
                                width: 100%;
                                padding: 15px;
                                box-sizing: border-box;

                                .cover-cut-img {
                                    display: flex;

                                    .design-sketch {
                                        margin-left: 15px;
                                        display: flex;
                                        flex-direction: column;
                                        align-items: center;
                                        justify-content: space-evenly;

                                        .d-s-text {
                                            font-size: 14px;
                                            color: #999;
                                        }
                                    }
                                }

                                .cover-cut-bar {

                                    margin: 35px 0 15px 0;
                                    width: 100%;
                                    display: flex;
                                    justify-content: center;

                                    .cover-list {
                                        position: relative;
                                        display: flex;
                                        cursor: pointer;

                                        .c-i {
                                            width: 100px;
                                            height: 60px;

                                            background-size: cover;
                                            background-repeat: no-repeat;
                                            background-position: 50%;

                                            pointer-events: none;
                                        }

                                        .cover-thumb {
                                            position: absolute;
                                            left: 0;
                                            top: 0;
                                            width: 12px;
                                            height: 64px;
                                            background-image: url('@/assets/images/works/thumb.png');
                                            background-size: contain;
                                            background-repeat: no-repeat;
                                            background-position: 50%;
                                            transform: translate(-6px, -2px);
                                            pointer-events: none;
                                        }
                                    }
                                }
                            }

                            .cover-cut-footer {
                                display: flex;
                                justify-content: center;
                            }
                        }

                        .lable-box {
                            width: 70%;
                            display: flex;
                            flex-wrap: wrap;
                            align-items: center;

                            .v-lable {
                                margin-right: 5px;
                                margin-bottom: 10px;
                                border-radius: 6px;
                                background-color: #00a1d6;
                                padding: 5px 9px 5px 10px;
                                font-size: 13px;
                                color: white;
                                cursor: pointer;

                                i {
                                    font-size: 12px;
                                }
                            }

                            .rl-from-input {
                                flex: 1;
                                min-width: 440px;
                            }
                        }
                    }

                    .rl-btn {
                        margin: 20px 0;
                    }
                }
            }
        }
    }

    .up-input {
        display: none;
    }
}

.select-options-card {
    height: 238px;
    display: flex;
    font-size: 14px;
    color: #18191c;

    .subarea {
        width: 128px;
        border-right: 1px solid #eee;
        overflow-y: auto;
        overflow-y: overlay;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #e3e5e7;
            border-radius: 4px;
        }

        .sub-item {
            padding: 12px 24px;
            cursor: pointer;

            &:hover {
                background-color: #f1f2f3;
            }
        }
    }

    .subarea-detail {
        min-width: 128px;

        overflow-y: auto;
        overflow-y: overlay;

        &::-webkit-scrollbar {
            width: 4px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #e3e5e7;
            border-radius: 4px;
        }

        .sub-d-item {
            padding: 12px 24px;
            cursor: pointer;

            &:hover {
                background-color: #f1f2f3;
            }

            * {
                pointer-events: none;
            }

            .d-desc {
                margin-right: 5px;
                font-size: 12px;
                color: #999;
            }
        }
    }

    .active {
        color: #00aeec;
    }
}

.cut-time {
    padding: 3px 8px;
    color: #fff;
    font-size: 12px;
    font-family: Menlo;
}

.exp-card {
    padding: 8px 12px;
    font-size: 12px;
    line-height: 20px;
    color: #999;
}
</style>