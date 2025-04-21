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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
