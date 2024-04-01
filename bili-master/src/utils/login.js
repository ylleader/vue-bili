import Vue from "vue";
import Login from "@/components/Common/Dialog/LoginDialog";
import store from "@/store";

const LoginConstructor = Vue.extend(Login);

const login = () => {
  return new Promise((resolve, reject) => {
    const instant = new LoginConstructor();

    instant.accPwdLogin = function () {
      if (!instant.username && !instant.password) {
        return instant.$msg({
          msg: "请输入账号和密码",
          container: instant.$refs.loginDialog,
          top: 125,
        });
      }
      if (!instant.username) {
        return instant.$msg({
          msg: "请输入账号",
          container: instant.$refs.loginDialog,
          top: 125,
        });
      }
      if (!instant.password) {
        return instant.$msg({
          msg: "请输入密码",
          container: instant.$refs.loginDialog,
          top: 125,
        });
      }

      store
        .dispatch("user/login", {
          username: instant.username,
          password: instant.password,
        })
        .then((res) => {
          resolve(res);
          instant.loginDialogShow = false;
          return instant.$msg({
            msg: "登录成功",
            top: 325,
            type: "success",
          });
        })
        .catch((err) => {
          if (!err?.msg) return;
          instant.$msg.error({
            msg: err.msg,
            container: instant.$refs.loginDialog,
            top: 125,
          });
          reject(err);
        });
    };

    instant.phoneCodeLogin = function () {
      if (!instant.phone) {
        return instant.$msg({
          msg: "请输入手机号",
          container: instant.$refs.loginDialog,
          top: 125,
        });
      }
      let phoneRE =
        /^((\+|00)86)?1((3[\d])|(4[5,6,7,9])|(5[0-3,5-9])|(6[5-7])|(7[0-8])|(8[\d])|(9[1,8,9]))\d{8}$/;
      if (!phoneRE.test(instant.phone)) {
        return instant.$msg({
          msg: "请输入正确的手机号",
          container: instant.$refs.loginDialog,
          top: 125,
        });
      }
      // if (!instant.isGetCode) {
      //   return instant.$msg({
      //     msg: "请先获取短信验证码",
      //     container: instant.$refs.loginDialog,
      //     top: 125,
      //   });
      // }
      if (!instant.code) {
        return instant.$msg({
          msg: "请输入短信验证码",
          container: instant.$refs.loginDialog,
          top: 125,
        });
      }

      store
        .dispatch("user/login", {
          username: instant.phone,
          SMSCode: instant.code,
          mode: "SMS",
        })
        .then((res) => {
          resolve(res);
          instant.loginDialogShow = false;
          return instant.$msg.success({
            msg: "登录成功",
            top: 325,
          });
        })
        .catch((err) => {
          if (!err?.msg) return;
          instant.$msg.error({
            msg: err.msg,
            container: instant.$refs.loginDialog,
            top: 125,
          });
          reject(err);
        });
    };

    instant.$mount();
    document.body.appendChild(instant.$el);

    instant.loginDialogShow = true;
  });
};

export default login;
