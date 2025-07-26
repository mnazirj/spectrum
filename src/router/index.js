import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "notFound",
    component: function () {
      return import("@/views/errors/404.vue");
    },
  },
  {
    path: "/",
    name: "home",
    component: function () {
      return import("../views/client/HomeView.vue");
    },
    beforeEnter: (to) => {
      if (to.path == "/") {
        router.push("/home");
      }
    },
    children: [
      {
        path: "home",
        name: "landing",

        component: function () {
          return import("../components/client/Home.vue");
        },
      },

      {
        path: "signup",
        name: "auth.signup",
        beforeEnter: () => {
          if (localStorage.getItem("_token") != null) {
            router.push("/home");
          }
        },
        component: function () {
          return import("../views/client/auth/SignupView.vue");
        },
      },
      {
        path: "signin",
        name: "auth.signin",
        beforeEnter: () => {
          if (localStorage.getItem("_token") != null) {
            router.push("/home");
          }
        },
        component: function () {
          return import("../views/client/auth/SignInView.vue");
        },
      },
      {
        path: "shop/:type/:slug",
        name: "shopping",
        component: function () {
          return import("../views/client/ShopView.vue");
        },
      },
      {
        path: "shop/product/:product",
        name: "product.view",
        component: function () {
          return import("../views/client/ProductView.vue");
        },
      },
      {
        path: "client",
        name: "clientarea",
        beforeEnter: () => {
          if (localStorage.getItem("_token") == null) {
            router.push("/home");
          }
        },
        children: [
          {
            path: "home",
            name: "clientarea.home",
            component: function () {
              return import("../views/client/ClientAreaView.vue");
            },
          },
        ],
      },
      {
        path: "checkout",
        name: "checkout",
        component: function () {
          return import("../views/client/CheckOutView.vue");
        },
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
        if (localStorage.getItem("_token")) {
          next({ name: "Overview" });
        } else {
        }
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
        path: "sub-category",
        name: "Subcategory",
        component: () => import("@/components/dashboard/SubCategory.vue"),
      },
      {
        path: "item",
        name: "Item",
        component: () => import("@/components/dashboard/Item.vue"),
      },
      {
        path: "brand",
        name: "Brand",
        component: () => import("@/components/dashboard/Brand.vue"),
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
        component: () => import("@/components/dashboard/Marketing&Promotions.vue"),
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
