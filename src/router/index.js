import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: function () {
      return import("../views/client/HomeView.vue");
    },
    beforeEnter: (to) => {
      if (to.path == "/") {
        localStorage.getItem("locale") == "en"
          ? router.push("/en")
          : router.push("/ar");
      }
    },
    children: [
      {
        path: ":lang",
        name: "land",
        component: function () {
          return import("../components/client/Home.vue");
        },
        children: [
          {
            path: "shop/:brand",
            name: "shopping",
            component: function () {
              return import("../views/client/ShopView.vue");
            },
          },
          {
            path: "shop/product/:product",
            name: "product.new",
            component: function () {
              return import("../views/client/ProductView.vue");
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/dashboard/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("@/views/dashboard/DashboardView.vue"),
    beforeEnter: (to, from, next) => {
      if (to.name == "Dashboard") {
        next({ name: "Overview" });
      } else {
        next();
      }
    },
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
      {
        path: "category",
        name: "Category",
        component: () => import("@/components/dashboard/Category.vue"),
      },
      {
        path: "company",
        name: "Company",
        component: () => import("@/components/dashboard/Company.vue"),
      },
      {
        path: "order",
        name: "Order",
        component: () => import("@/components/dashboard/Order.vue"),
      },
      {
        path: "sales",
        name: "Sales",
        component: () => import("@/components/dashboard/Sales.vue"),
      },
      {
        path: "payment",
        name: "Payment",
        component: () => import("@/components/dashboard/Payment.vue"),
      },
      {
        path: "website",
        name: "Website",
        component: () => import("@/components/dashboard/Website.vue"),
      },
      {
        path: "customer",
        name: "Customer",
        component: () => import("@/components/dashboard/Customer.vue"),
      },
      {
        path: "performance",
        name: "Performance",
        component: () => import("@/components/dashboard/Performance.vue"),
      },
      {
        path: "marketing&promotions",
        name: "Marketing&Promotions",
        component: () =>
          import("@/components/dashboard/Marketing&Promotions.vue"),
      },
      {
        path: "profile",
        name: "Profile",
        component: () => import("@/components/dashboard/Profile.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("@/components/dashboard/Settings.vue"),
      },
      {
        path: "notification",
        name: "Notification",
        component: () => import("@/components/dashboard/Notification.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
