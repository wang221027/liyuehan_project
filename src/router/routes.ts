// 对外暴露常量路由
export const constantRoute = [
  // 首页
  {
    name: "home",
    path: "/home",
    component: () => import("@/views/Home/index.vue"),
  },
  {
    name: "forum",
    path: "/forum",
    component: () => import("@/views/Forum/index.vue"),
  },
  {
    name: "news",
    path: "/news",
    component: () => import("@/views/News/index.vue"),
  },
  {
    name: "PublishArticle",
    path: "/PublishArticle",
    component: () => import("@/views/PublishArticle/index.vue"),
  },
  {
    name: "ArticleCover",
    path: "/ArticleCover",
    component: () => import("@/views/ArticleCover/index.vue"),
  },
  // 重定向，在项目跑起来的时候，访问/, 立马让他重定向到首页
  {
    path: "/",
    redirect: "/home",
  },
];
