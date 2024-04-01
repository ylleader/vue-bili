import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "",
    component: () => import("@/views/Home"),
  },
  {
    path: "/channel",
    redirect: "/",
    component: () => import("@/views/Channel"),
    children: [
      {
        path: "anime",
        component: () => import("@/views/Channel/SpringHeader"),
        meta: {
          title: "番剧",
        },
      },
      {
        path: "guochuang",
        component: () => import("@/views/Channel/AutumnHeader"),
        meta: {
          title: "国创",
        },
      },
      {
        path: "donhua",
        component: () => import("@/views/Channel/VideoHeader"),
        meta: {
          title: "动画",
        },
      },
      {
        path: "documentary",
        component: () => import("@/views/Channel/CloudHeader"),
        meta: {
          title: "纪录片",
        },
      },
      {
        path: "guichu",
        component: () => import("@/views/Channel/EyesHeader"),
        meta: {
          title: "鬼畜",
        },
      },
      {
        path: "variety",
        component: () => import("@/views/Channel/VideoHeader"),
        meta: {
          title: "综艺",
          vsrc: require("@/assets/videos/banner/2xv.mp4"),
        },
      },
      {
        path: "entertainment",
        component: () => import("@/views/Channel/PapercranelHeader"),
        meta: {
          title: "娱乐",
        },
      },
      {
        path: "tech",
        component: () => import("@/views/Channel/DayAndNightHeader"),
        meta: {
          title: "科技",
        },
      },
      {
        path: "food",
        component: () => import("@/views/Channel/WinterHeader"),
        meta: {
          title: "美食",
        },
      },
    ],
  },
  {
    path: "/video",
    component: () => import("@/views/Video"),
  },
  {
    path: "/up/:upId?",
    component: () => import("@/views/Up"),
    children: [
      {
        path: "",
        component: () => import("@/views/Up/UIndex"),
      },
      {
        name: "up-dynamic",
        path: "dynamic",
        component: () => import("@/views/Up/Dynamic"),
      },
      {
        path: "video",
        component: () => import("@/views/Up/Video"),
      },
      {
        path: "collections",
        component: () => import("@/views/Up/Collections"),
      },
      {
        path: "collectionsdetail",
        component: () => import("@/views/Up/Collectionsdetail"),
      },
      {
        path: "setting",
        component: () => import("@/views/Up/Collections"),
      },
    ],
  },
  {
    path: "/upcenter",
    component: () => import("@/views/UpCenter"),
  },
  {
    path: "/works",
    redirect: "/works/home",
    component: () => import("@/views/Works"),
    children: [
      {
        path: "upload",
        component: () => import("@/views/Works/Upload"),
      },
      {
        path: "home",
        component: () => import("@/views/Works/Home"),
      },
      {
        path: "manager",
        component: () => import("@/views/Works/Manager"),
      },
      {
        path: "datacenter",
        component: () => import("@/views/Works/DataCenter"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/Error/404"),
  },
  {
    path: "*",
    component: () => import("@/views/Error/404"),
    meta: {
      title: "找不到页面啦",
    },
  },
];

export default new VueRouter({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes,
});
