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
    component: ()=>import("@/components/page/GridStackPageList.vue"),
  },  
  {
    path: "/page/w/:id?",
    name: "createpage",
    component: ()=>import("@/components/layout/GridStackCreate.vue"),
  },
  {
    path: "/page/r/:id",
    name: "page",
    component: ()=>import("@/components/page/GridStackPage.vue"),
  },
  {
    path: "/page/p/:id",
    name: "preview",
    component: ()=>import("@/components/page/GridStackPage.vue"),
  },
  {
    path: "/test",
    name: "test",
    component: ()=>import("@/components/layout/GridStackCreate.vue"),
  },
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
