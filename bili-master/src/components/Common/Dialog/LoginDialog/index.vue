<template>
    <Dialog :width="'650px'" :height="'350px'" :visible.sync="loginDialogShow">
        <div class="login-dialog" ref="loginDialog">
            <div class="login-method">
                <span @click="loginMethodsChange('accPwd')" class="active" ref="accPwd">密码登录</span>
                <span class="div-line"></span>
                <span @click="loginMethodsChange('phoneCode')" ref="phoneCode">短信登录</span>
            </div>
            <div class="acc-pwd-box" v-if="loginMethods === 'accPwd'">
                <div class="acc-pwd-account">
                    <span class="acc-pwd-lable">
                        账号
                    </span>
                    <input type="text" class="acc-pwd-input" placeholder="请输入账号" v-model="username">
                </div>
                <div class="acc-pwd-password">
                    <span class="acc-pwd-lable">
                        密码
                    </span>
                    <input :type="pwdState" :style="pwdInputStyle" class="acc-pwd-input" placeholder="请输入密码"
                        v-model="password" @focus="closeeyes" @blur="openeyes">
                    <div class="pwd-hide-show" v-if="pwdHS" @click="pwdHS = !pwdHS">
                        <svg data-v-362304c0="" width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path data-v-362304c0="" fill-rule="evenodd" clip-rule="evenodd" class="eyes"
                                d="M17.5753 6.85456C17.7122 6.71896 17.8939 6.63806 18.0866 6.63806C18.7321 6.63806 19.0436 7.42626 18.5748 7.87006C18.1144 8.30554 17.457 8.69885 16.6478 9.03168L18.1457 10.5296C18.2101 10.5941 18.2613 10.6706 18.2962 10.7548C18.331 10.839 18.349 10.9293 18.349 11.0204C18.349 11.1116 18.331 11.2019 18.2962 11.2861C18.2613 11.3703 18.2101 11.4468 18.1457 11.5113C18.0812 11.5757 18.0047 11.6269 17.9205 11.6618C17.8363 11.6967 17.746 11.7146 17.6548 11.7146C17.5637 11.7146 17.4734 11.6967 17.3892 11.6618C17.305 11.6269 17.2284 11.5757 17.164 11.5113L15.3409 9.68819C15.2898 9.63708 15.247 9.57838 15.2141 9.51428C14.4874 9.71293 13.6876 9.87122 12.8344 9.98119C12.8363 9.99011 12.8381 9.99908 12.8397 10.0081L13.2874 12.5472C13.315 12.7266 13.2713 12.9098 13.1656 13.0573C13.0598 13.2049 12.9005 13.3052 12.7217 13.3367C12.5429 13.3683 12.3589 13.3285 12.2091 13.2259C12.0592 13.1234 11.9555 12.9663 11.9202 12.7882L11.4725 10.2491C11.4645 10.2039 11.4611 10.1581 11.4621 10.1125C10.9858 10.1428 10.4976 10.1586 10.0002 10.1586C9.57059 10.1586 9.14778 10.1468 8.73362 10.1241C8.73477 10.1656 8.7322 10.2074 8.72578 10.249L8.27808 12.7881C8.24612 12.9694 8.14345 13.1306 7.99265 13.2362C7.84186 13.3418 7.65528 13.3831 7.47398 13.3512C7.29268 13.3192 7.1315 13.2166 7.0259 13.0658C6.9203 12.915 6.87892 12.7284 6.91088 12.5471L7.35858 10.008C7.35877 10.007 7.35896 10.0061 7.35915 10.0052C6.50085 9.90284 5.6941 9.75191 4.95838 9.56025C4.93012 9.60634 4.89634 9.64933 4.85748 9.68819L3.03438 11.5113C2.96992 11.5757 2.8934 11.6269 2.80918 11.6618C2.72496 11.6967 2.63469 11.7146 2.54353 11.7146C2.45237 11.7146 2.36211 11.6967 2.27789 11.6618C2.19367 11.6269 2.11714 11.5757 2.05268 11.5113C1.98822 11.4468 1.93709 11.3703 1.90221 11.2861C1.86732 11.2019 1.84937 11.1116 1.84937 11.0204C1.84937 10.9293 1.86732 10.839 1.90221 10.7548C1.93709 10.6706 1.98822 10.5941 2.05268 10.5296L3.49373 9.08855C2.6197 8.744 1.91247 8.33062 1.42559 7.87006C0.956591 7.42636 1.26799 6.63816 1.91359 6.63816C2.10629 6.63816 2.28789 6.71896 2.42489 6.85456C2.70009 7.12696 3.19529 7.45886 3.98459 7.77796C5.54429 8.40856 7.73699 8.77016 10.0001 8.77016C12.2632 8.77016 14.4558 8.40856 16.0156 7.77796C16.8049 7.45886 17.3001 7.12696 17.5753 6.85456Z"
                                fill="#9499A0"></path>
                        </svg>
                    </div>
                    <div class="pwd-hide-show" v-if="!pwdHS" @click="pwdHS = !pwdHS">
                        <svg data-v-362304c0="" width="20" height="20" viewBox="0 0 20 20" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path data-v-362304c0="" fill-rule="evenodd" clip-rule="evenodd" class="eyes"
                                d="M2.11069 9.43732C3.21647 7.77542 5.87904 4.58331 9.89458 4.58331C13.8801 4.58331 16.6483 7.72502 17.8345 9.4049C18.0905 9.76747 18.0905 10.2325 17.8345 10.5951C16.6483 12.2749 13.8801 15.4166 9.89458 15.4166C5.87904 15.4166 3.21647 12.2245 2.11069 10.5626C1.88009 10.2161 1.88009 9.7839 2.11069 9.43732ZM9.89458 3.33331C5.19832 3.33331 2.20919 7.03277 1.07001 8.74489C0.560324 9.51091 0.560323 10.4891 1.07001 11.2551C2.20919 12.9672 5.19832 16.6666 9.89458 16.6666C14.5412 16.6666 17.6368 13.0422 18.8556 11.3161C19.4168 10.5213 19.4168 9.4787 18.8556 8.68391C17.6368 6.95774 14.5412 3.33331 9.89458 3.33331ZM7.29165 9.99998C7.29165 8.50421 8.50421 7.29165 9.99998 7.29165C11.4958 7.29165 12.7083 8.50421 12.7083 9.99998C12.7083 11.4958 11.4958 12.7083 9.99998 12.7083C8.50421 12.7083 7.29165 11.4958 7.29165 9.99998ZM9.99998 6.04165C7.81385 6.04165 6.04165 7.81385 6.04165 9.99998C6.04165 12.1861 7.81385 13.9583 9.99998 13.9583C12.1861 13.9583 13.9583 12.1861 13.9583 9.99998C13.9583 7.81385 12.1861 6.04165 9.99998 6.04165Z"
                                fill="#9499A0"></path>
                        </svg>
                    </div>
                    <span class="pwd-forget">
                        忘记密码？
                    </span>
                </div>
            </div>
            <div class="acc-pwd-box" v-if="loginMethods === 'phoneCode'">
                <div class="p-c-phone">
                    <span class="p-c-lable">
                        +86
                    </span>
                    <input type="text" class="p-c-input" placeholder="请输入手机号" v-model="phone">
                    <span class="div-line"></span>
                    <span class="get-code" @click="getCode" :style="getCodeTitleStyle">
                        {{ getCodeTitle }}
                    </span>
                </div>
                <div class="p-c-code">
                    <span class="p-c-lable">
                        验证码
                    </span>
                    <input type="text" class="p-c-input" placeholder="请输入验证码" v-model="code" @focus="closeeyes"
                        @blur="openeyes">
                </div>
            </div>
            <div class="acc-pwd-btn-box" v-if="loginMethods === 'accPwd'">
                <div class="reg-btn" @click="loginMethodsChange('phoneCode')">
                    注册
                </div>
                <div class="log-btn" @click="accPwdLogin">
                    登录
                </div>
            </div>
            <div class="p-c-btn-box " v-if="loginMethods === 'phoneCode'">
                <div class="log-btn" @click="phoneCodeLogin">
                    登录 / 注册
                </div>
            </div>
            <div class="agree-content" v-if="loginMethods === 'phoneCode'">
                未注册过bili的手机号，我们将自动帮你注册账号
            </div>
        </div>
    </Dialog>
</template>

<script>
import Dialog from '../index.vue';
export default {
    name: "LoginDialog",
    components: { Dialog },
    emits: ['close'],
    data() {
        return {
            loginDialogShow: false,

            pwdInputStyle: {
                letterSpacing: '3px'
            },
            pwdHS: true,
            pwdState: 'password',
            loginMethods: 'accPwd',

            username: '',
            password: '',
            phone: '',
            code: '6666',
            isGetCode: false,
            codeCountdown: 0
        }
    },
    computed: {
        getCodeTitle() {
            return this.codeCountdown === 0 ? '获取验证码' : `${this.codeCountdown}s后重试`
        },
        getCodeTitleStyle() {
            return this.codeCountdown === 0 ? '' : { color: 'silver', cursor: 'default' }
        }
    },
    watch: {
        pwdHS(val) {
            if (val) {
                this.pwdState = 'password'
                this.pwdInputStyle.letterSpacing = '3px'
            } else {
                this.pwdState = 'text'
                this.pwdInputStyle.letterSpacing = '0px'
            }
        },
        loginDialogShow(val) {
            if (!val) {
                this.$nextTick(() => {
                    this.$destroy()
                })
            }
        }
    },
    methods: {
        closeeyes() {
            this.$refs.loginDialog.classList.add('close-eyes')
        },
        openeyes() {
            this.$refs.loginDialog.classList.remove('close-eyes')
        },
        loginMethodsChange(val) {
            this.loginMethods = val
            if (val === 'accPwd') {
                this.$refs.accPwd.classList.add('active')
                this.$refs.phoneCode.classList.remove('active')
            } else if (val === 'phoneCode') {
                this.$refs.accPwd.classList.remove('active')
                this.$refs.phoneCode.classList.add('active')
            }
        },
        // dialogMouseWheel(event) {
        //     if (this.lockScroll) {
        //         event.stopPropagation();
        //         event.preventDefault();
        //     }
        // },
        phoneCodeLogin() {
            if (!this.phone) {
                return this.$msg({
                    msg: '请输入手机号',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }
            if (!this.isGetCode) {
                return this.$msg({
                    msg: '请先获取短信验证码',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }
            if (!this.code) {
                return this.$msg({
                    msg: '请输入短信验证码',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }
        },
        getCode() {

            if (this.codeCountdown) {
                return
            }

            if (!this.phone) {
                return this.$msg({
                    msg: '请输入手机号',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }
            let phoneRE = /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/
            if (!phoneRE.test(this.phone)) {
                return this.$msg({
                    msg: '请输入正确的手机号',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }

            this.isGetCode = true
            this.codeCountdown = 60
            this.codeCountdownInterval = setInterval(() => {
                this.codeCountdown--
                if (this.codeCountdown === 0) {
                    clearInterval(this.codeCountdownInterval)
                }
            }, 1000)
            let now = Date.now()
            localStorage.setItem('getCodeTime', JSON.stringify(now))

        },
        setCodeCountdown() {

            let time = JSON.parse(localStorage.getItem('getCodeTime'))
            let now = Date.now()
            let countdown = Math.floor((now - time) / 1000)
            if (time && countdown < 60) {
                this.codeCountdown = 60 - countdown
                this.codeCountdownInterval = setInterval(() => {
                    this.codeCountdown--
                    if (this.codeCountdown === 0) {
                        clearInterval(this.codeCountdownInterval)
                    }
                }, 1000)
            }
        },
        accPwdLogin() {
            if (!this.username && !this.password) {
                return this.$msg({
                    msg: '请输入账号和密码',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }
            if (!this.username) {
                return this.$msg({
                    msg: '请输入账号',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }
            if (!this.password) {
                return this.$msg({
                    msg: '请输入密码',
                    container: this.$refs.loginDialog,
                    top: 125,
                })
            }

            this.$store.dispatch('user/login', { username: this.username, password: this.password }).then(res => {
                return this.$msg({
                    msg: '登录成功',
                    top: 325,
                })
            })

        }
    },
    mounted() {
        this.setCodeCountdown()
    },
    beforeDestroy() {
        this.codeCountdownInterval && clearInterval(this.codeCountdownInterval)
    }
}
</script>

<style lang="scss" scoped>
.login-dialog {

    width: 100%;
    height: 100%;
    border-radius: 8px;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    padding: 73px 0 40px 0;

    background-image: url('@/assets/images/login/pwd-open1.png'), url('@/assets/images/login/pwd-open2.png');
    background-repeat: no-repeat, no-repeat;
    background-position: 0 100%, 100% 100%;
    background-size: 18%;

    display: flex;
    flex-direction: column;
    align-items: center;

    .dialog-close {
        position: absolute;
        top: 10px;
        right: 10px;

        i {
            font-size: 18px;
            font-weight: bold;
            color: #AEB3B9;
            cursor: pointer;

            &:hover {
                color: #00AEEC;
            }
        }
    }

    .login-method {
        display: flex;
        justify-content: center;
        height: 24px;
        margin-bottom: 24px;
        color: #505050;
        letter-spacing: 1px;
        cursor: pointer;

        .div-line {
            height: 100%;
            width: 1px;
            background-color: #e7e7e7;
            margin: 0 20px;
        }

        span {
            font-size: 18px;
        }

        .active {
            color: #00a1d6;
        }
    }

    .acc-pwd-box {
        width: 400px;

        .acc-pwd-account,
        .acc-pwd-password,
        .p-c-phone,
        .p-c-code {
            height: 43px;
            border: 1px solid #e7e7e7;
            padding: 0 20px;
            display: flex;
            align-items: center;
        }

        .acc-pwd-account,
        .acc-pwd-password {

            .acc-pwd-lable {
                letter-spacing: 1px;
                font-size: 14px;
                color: #212121;
                margin-right: 12px;
            }

            .acc-pwd-input {
                width: 202px;
                outline: none;
                border: none;
                font-size: 14px;
                color: #212121;

                &::placeholder {
                    color: #999999;
                    font-size: 13px;
                    letter-spacing: 1px;
                }
            }
        }

        .p-c-phone,
        .p-c-code {
            .p-c-lable {
                width: 56px;
            }

            .p-c-input {
                width: 202px;
                outline: none;
                border: none;
                font-size: 14px;
                color: #212121;

                &::placeholder {
                    color: #999999;
                    font-size: 13px;
                    letter-spacing: 1px;
                }
            }
        }

        .acc-pwd-account,
        .p-c-phone {
            border-radius: 8px 8px 0 0;
            border-bottom: none;
        }

        .acc-pwd-password,
        .p-c-code {
            border-radius: 0 0 8px 8px;
        }

        .p-c-phone {

            .div-line {
                height: 60%;
                width: 1px;
                background-color: #e7e7e7;
                margin-right: 20px;
                // margin-right: auto;
            }

            .get-code {
                flex-grow: 1;
                text-align: center;
                font-size: 13px;
                color: #00a1d6;
                cursor: pointer;
            }
        }

        .acc-pwd-password {

            .pwd-hide-show {
                cursor: pointer;

                &:hover .eyes {
                    fill: #00AEEC;
                }

                margin-top: 4px;
                margin-left: auto;
            }

            .pwd-forget {
                font-size: 13px;
                line-height: 25px;
                color: #00AEEC;
                margin-left: 8px;
                cursor: pointer;
            }
        }
    }

    .acc-pwd-btn-box,
    .p-c-btn-box {
        width: 400px;
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .reg-btn,
        .log-btn {
            box-sizing: border-box;
            width: 194px;
            height: 40px;
            border-radius: 8px;
            line-height: 40px;
            text-align: center;
            font-size: 14px;
            letter-spacing: 2px;
            cursor: pointer;

            border: 1px solid #e7e7e7;
            color: #000;
        }

        .reg-btn:hover {
            color: #00a1d6;
            border-color: #00a1d6;
        }

        .log-btn {
            background-color: #00a1d6;
            color: #fff;

            &:hover {
                background-color: #33b4de;
            }
        }
    }

    .p-c-btn-box {
        justify-content: center;
    }

    .agree-content {
        width: 400px;
        line-height: 20px;
        text-align: center;
        font-size: 12px;
        color: #999;
        margin-top: 40px;
    }
}

.close-eyes {
    background-image: url('@/assets/images/login/pwd-close1.png'), url('@/assets/images/login/pwd-close2.png');
}
</style>