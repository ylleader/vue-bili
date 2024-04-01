import { setToken, removeToken } from "@/utils/auth";
import { SMSCodeLogin, passwordLogin } from "@/api/login";
import { getUpInfo, getUserInfo } from "@/api/user";

export default {
  namespaced: true,
  state: {
    userInfo: {},
    upInfo: {},
    isLogin: false,
    loginDialogShow: false,
  },
  actions: {
    async login(
      { commit, dispatch },
      { username, password, SMSCode, code, mode = "password" } = {}
    ) {
      let result;
      if (mode === "password") {
        result = await passwordLogin({ username, password, code });
      } else if (mode === "SMS") {
        result = await SMSCodeLogin({ username, SMSCode, code });
      }
      if (result?.code !== 200) return Promise.reject(result);
      setToken(result.data, 10);
      commit("SET_TOKEN", result.data);
      dispatch("getUserInfo");
      localStorage.setItem("login-state", "1");
      return result;
    },
    logout({ commit, state }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        localStorage.setItem("login-state", "0");
        commit("SET_TOKEN", "");
        commit("DELETE_INFO");
        removeToken();
        resolve();
        // }).catch(error => {
        //     reject(error)
        // })
      });
    },
    async getUserInfo({ commit, dispatch }) {
      //do...
      try {
        const { data } = await getUserInfo();
        commit("SET_INFO", { userInfo: data, isLogin: true });
      } catch (error) {
        dispatch("logout");
      }
    },
    async getUpInfo({ commit }, upId) {
      try {
        const { data } = await getUpInfo({ id: upId });
        commit("SET_UP_INFO", data);
      } catch (error) {
        commit("SET_UP_INFO", {});
      }
    },
    deleteInfo({ commit }) {
      commit("DELETE_INFO");
    },
    setLoginDialogShow({ commit }, val) {
      commit("SET_LOGIN_DIALOG_SHOW", val);
    },
    setPersonalSignature({ commit }, val) {
      //...
      commit("SET_PERSONAL_SIGNATURE", val);
    },
    tSetAvatar({ commit, state }, val) {
      state.avatar = val;
    },
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_LOGIN_DIALOG_SHOW(state, val) {
      state.loginDialogShow = val;
    },
    SET_PERSONAL_SIGNATURE(state, val) {
      state.personalSignature = val;
    },
    SET_INFO(state, { userInfo, isLogin }) {
      state.userInfo = userInfo;
      state.isLogin = isLogin;
    },
    DELETE_INFO(state) {
      state.userInfo = {
        avatar: require("@/assets/images/up/noface.webp"),
      };
      state.isLogin = false;
    },
    SET_UP_INFO(state, upInfo) {
      state.upInfo = upInfo;
    },
  },
};
