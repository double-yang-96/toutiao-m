import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/search"),
  },
  {
    path: "/article/:articleId",
    name: "article",
    component: () => import("@/views/article"),
    props: true, // 开启Props传参，把路由参数映射到组件的props数据中
  },
  {
    path: "/user/profile",
    name: "user-profile",
    component: () => import("@/views/user-profile"),
  },
  {
    path: "/",
    name: "layout",
    redirect: "/home",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/home"),
      },
      {
        path: "/qa",
        name: "qa",
        component: () => import("@/views/qa"),
      },
      {
        path: "/video",
        name: "video",
        component: () => import("@/views/video"),
      },
      {
        path: "/my",
        name: "my",
        component: () => import("@/views/my"),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
