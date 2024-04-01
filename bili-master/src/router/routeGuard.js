import router from "./index";
import loading from "@/utils/loading";

import store from "@/store";
import { getToken } from "@/utils/auth";

function clearLoading(obj) {
  obj.loadingTimer && clearTimeout(obj.loadingTimer);
  obj.loading && obj.loading.close();
  delete obj.loadingTimer;
  delete obj.loading;
}

router.beforeEach((to, from, next) => {
  clearLoading(from.meta);
  from.meta.loadingTimer = setTimeout(() => {
    from.meta.loading = loading({
      text: "页面加载中...",
      textAnima: "beat",
    });
  }, 500);

  if (getToken()) {
    if (!store.state.user.upId) {
      store.dispatch("user/getUserInfo");
    }
  }

  next();
});

router.afterEach((to, from, next) => {
  document.title = to.query.title || to.meta.title || "Bili";
  document.title += "_Bili";
  clearLoading(from.meta);
});
