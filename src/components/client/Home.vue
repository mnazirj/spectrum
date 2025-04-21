<template>
  <router-view />

  <div v-if="$route.path == '/en' || $route.path == '/ar'">
    <Ads :bannerItems="bannerProduct" :sliderItems="sliderProduct" />
    <ProductCard title="New. Need. Now" :products="Products" class="py-5" />
    <Banner
      :isReversed="false"
      title="Unbeatable Value Sets!"
      subtitle="Explore exclusive sets you won't find anywhere else!"
      src="https://picsum.photos/id/35/1024/1024"
    />
    <ProductCard title="Bestsellers" :products="Products" class="py-5" />
    <Ads :hasBanner="false" :sliderItems="sliderProduct" />
    <Brands class="py-5" />
  </div>
</template>

<script setup>
import Ads from "@/components/client/Ads.vue";
import ProductCard from "@/components/client/ProductCard.vue";
import Banner from "@/components/client/BannerNew.vue";
import Brands from "@/components/client/Brands.vue";
import Button from "primevue/button";
import { ref } from "vue";

const Products = ref([
  {
    company: "Kayali",
    name: "Fleu Majesty Rose Royale | 31",
    stars: 4,
    rate: 200,
    sizes: [50, 500, 1000],
    price: 125.0,
    image: "https://picsum.photos/id/80/1024/1024",
    tags: ["Exclusive", "New"],
  },
  {
    company: "Milk Makeup",
    name: "Hydro Grip Gel Tint – 12-Hour Hydrating Gel Skin Tint",
    stars: 4,
    rate: 1024,
    sizes: [500, 1000],
    price: 125.0,
    image: "https://picsum.photos/id/70/1024/1024",
    tags: ["New"],
  },
  {
    company: "LANCÔME",
    name: "Rénergie H.C.F. Triple Serum Eye Set",
    stars: 4,
    rate: 50,
    sizes: [500, 1000],
    price: 125.0,
    image: "https://picsum.photos/id/60/1024/1024",
    tags: ["Exclusive", "New"],
  },
  {
    company: "LANCÔME",
    name: "Rénergie H.C.F. Triple Serum Eye Set",
    stars: 4,
    rate: 500,
    sizes: [500, 1000],
    price: 125.0,
    image: "https://picsum.photos/id/50/1024/1024",
    tags: ["Exclusive", "New"],
  },
]);

const bannerProduct = ref([
  {
    title: "New Supershine Lip Gloss",
    subtitle: "Glass-like shine. Lasting comfort",
    img: "https://picsum.photos/id/26/1024/1024",
  },
  {
    title: "Limited-Editon Value Sets",
    subtitle: "Get your beauty must-haves in unbeartable exclusive sets",
    img: "https://picsum.photos/id/75/1024/1024",
  },
]);

const sliderProduct = ref([
  {
    title: "New Supershine Lip Gloss",
    subtitle: "Glass-like shine. Lasting comfort",
    img: "https://picsum.photos/id/26/1024/1024",
  },
  {
    title: "Limited-Editon Value Sets",
    subtitle: "Get your beauty must-haves in unbeartable exclusive sets",
    img: "https://picsum.photos/id/75/1024/1024",
  },
  {
    title: "Limited-Editon Value Sets",
    subtitle: "Get your beauty must-haves in unbeartable exclusive sets",
    img: "https://picsum.photos/id/69/1024/1024",
  },
  {
    title: "Limited-Editon Value Sets",
    subtitle: "Get your beauty must-haves in unbeartable exclusive sets",
    img: "https://picsum.photos/id/100/1024/1024",
  },
  {
    title: "Limited-Editon Value Sets",
    subtitle: "Get your beauty must-haves in unbeartable exclusive sets",
    img: "https://picsum.photos/id/80/1024/1024",
  },
  {
    title: "Limited-Editon Value Sets",
    subtitle: "Get your beauty must-haves in unbeartable exclusive sets",
    img: "https://picsum.photos/id/75/1024/1024",
  },
]);
</script>
