import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "top",
    component: () => import("@/components/page/Top.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("@/components/page/Top.vue"),
  },
  {
    path: "/mypage",
    name: "mypage",
    component: ()=>import("@/components/page/MyPage.vue"),
  },
  {
    path: "/pagelist",
    name: "pagelist",
    component: ()=>import("@/components/page/DefaultStackPageList.vue"),
  },  
  {
    path: "/page/w/:id?",
    name: "createpage",
    component: ()=>import("@/components/page/DefaultStackPageCreate.vue"),
  },
  {
    path: "/page/b/w/:id",
    name: "createpageback",
    component: ()=>import("@/components/page/DefaultStackPageCreate.vue"),
  },
  {
    path: "/page/r/:id",
    name: "page",
    component: ()=>import("@/components/page/DefaultStackPage.vue"),
  },
  {
    path: "/page/p/:id",
    name: "preview",
    component: ()=>import("@/components/page/DefaultStackPage.vue"),
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   component: ()=>import("@/components/test/TestConfig.vue"),
  // },
  {
    path: "/:cacheAll(.*)*",
    redirect: { name: "top" },
  },
];

const router = createRouter({
  // mode: 'history',
  history: createWebHistory(),
  //createWebHashHistory(),
  routes,
  // force: true,
  linkExactActiveClass: "text-yellow-500",
});

export default router;
