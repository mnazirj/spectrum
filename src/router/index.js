import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: function () {
      return import("../views/HomeView.vue");
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/DashboardView.vue"),
    children: [
      {
        path: "overview",
        name: "Overview",
        component: () => import("@/components/dashboard/Overview.vue"),
      },
      {
        path: "storage",
        name: "Storage",
        component: () => import("@/components/dashboard/Storage.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
