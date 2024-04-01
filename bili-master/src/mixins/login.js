import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("user", ["isLogin", "loginDialogShow", "userInfo"]),
  },
  methods: {
    ...mapActions("user", ["setLoginDialogShow", "getUserInfo"]),
    loginJudge(callback) {
      if (!callback || typeof callback != "function") {
        callback = () => {
          this.$msg({
            msg: "功能还在努力开发中。。。",
            top: 80,
          });
        };
      }
      if (!this.isLogin) {
        this.$login()
          .then((res) => {
            callback();
          })
          .catch((err) => {});
      } else {
        callback();
      }
    },
  },
};
