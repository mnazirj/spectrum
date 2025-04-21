<template>
  <section class="border-top-2 pt-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-3 col-md-3 col-6" v-for="item in Items" :key="item">
          <div class="d-flex flex-column align-items-center">
            <div>
              <i
                :class="'text-black fas ' + item.icon"
                style="font-size: 30px"
              />
            </div>

            <div class="d-flex flex-column mt-2 text-black text-center">
              <span class="font-medium">{{ item.title }}</span>
              <span>{{ item.subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer>
    <section class="bg-black text-white py-5">
      <div class="container py-3">
        <h4 class="text-center text-uppercase font-avg">
          Follow us on soical media
        </h4>
        <div class="social d-flex justify-content-center gap-5">
          <a href="#">
            <i class="fab fa-facebook-f" />
          </a>
          <a href="#">
            <i class="fab fa-youtube" />
          </a>
          <a href="#">
            <i class="fab fa-instagram" />
          </a>
          <a href="#">
            <i class="fab fa-tiktok" />
          </a>
          <a href="#">
            <i class="fab fa-x-twitter" />
          </a>
        </div>
        <hr />
        <div class="row px-lg-0 px-md-0 px-4">
          <div
            class="col-lg-3 col-md-3 col-6"
            v-for="item in footerLinks"
            :key="item"
          >
            <h6>{{ item.title }}</h6>
            <div class="d-flex flex-column gap-1">
              <a
                :href="subitem.link"
                class="nav-link w-75"
                v-for="subitem in item.links"
                :key="subitem"
                >{{ subitem.title }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script setup>
import { ref } from "vue";

const Items = ref([
  {
    icon: "fas fa-truck-fast",
    title: "Free Delivery",
    subtitle: "Over 250 LYD",
  },
  {
    icon: "fas fa-credit-card",
    title: "Secure Payment",
    subtitle: null,
  },
  {
    icon: "fas fa-rotate-left",
    title: "Easy Returns",
    subtitle: "In any Libya store",
  },
  {
    icon: "fas fa-headset",
    title: "Customer Service",
    subtitle: "Questions?",
  },
]);

const footerLinks = ref([
  {
    title: "Top Categories",
    links: [
      {
        title: "Makeup",
        link: "#",
      },
      {
        title: "Fragrance",
        link: "#",
      },
      {
        title: "Skincare",
        link: "#",
      },
      {
        title: "Hair",
        link: "#",
      },
    ],
  },
  {
    title: "Top Brands",
    links: [
      {
        title: "Fenty Beauty",
        link: "#",
      },
      {
        title: "Chanel",
        link: "#",
      },
      {
        title: "Kerastase",
        link: "#",
      },
      {
        title: "Glow Recipe",
        link: "#",
      },
    ],
  },
  {
    title: "Help & FAQs",
    links: [
      {
        title: "Contact Us",
        link: "#",
      },
      {
        title: "Stores",
        link: "#",
      },
      {
        title: "Delivery",
        link: "#",
      },
      {
        title: "Returns",
        link: "#",
      },
      {
        title: "FAQ",
        link: "#",
      },
    ],
  },
  {
    title: "About Spectrum",
    links: [
      {
        title: "Careers",
        link: "#",
      },
      {
        title: "International",
        link: "#",
      },
      {
        title: "Privacy & Cookies",
        link: "#",
      },
      {
        title: "Trems & Conditions",
        link: "#",
      },
      {
        title: "Terms and conditions for the publication of reviews",
        link: "#",
      },
      {
        title: "Terms and Conditions for Beauty Pass",
        link: "#",
      },
    ],
  },
]);
</script>
