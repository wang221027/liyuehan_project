// 对外暴露常量路由
export const constantRoute = [
  // 首页
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/Home/index.vue"),
    meta: { title: "首页" },
  },
  {
    name: "forum",
    path: "/forum",
    component: () => import("@/views/Forum/index.vue"),
    meta: { title: "论坛" },
  },
  // 重定向，在项目跑起来的时候，访问/, 立马让他重定向到首页
  {
    path: "/",
    redirect: "/home",
  },
];
