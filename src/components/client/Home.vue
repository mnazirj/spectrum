<template>
  <router-view />
  <div v-if="$route.path == '/home'">
    <Ads :bannerItems="bannerProduct" :sliderItems="sliderProduct" />
    <ProductCard :title="$t('client.new')" :products="newProduct" class="py-5" v-if="newProduct.length > 0" />
    <Banner :isReversed="isEnglish" title="Unbeatable Value Sets!" subtitle="Explore exclusive sets you won't find anywhere else!" src="https://picsum.photos/id/35/1024/1024" />
    <ProductCard :title="$t('client.best')" :products="bestSeller" class="py-5" />
    <Ads :hasBanner="false" :sliderItems="sliderProduct" />
    <Brands class="py-5" :brands="brands" />
  </div>
</template>

<script setup>
import Ads from "@/components/client/Ads.vue";
import ProductCard from "@/components/client/ProductCard.vue";
import Banner from "@/components/client/BannerNew.vue";
import Brands from "@/components/client/Brands.vue";
import Button from "primevue/button";
import { onMounted, ref, watch } from "vue";
import axios from "axios";
import { useI18n } from "vue-i18n";
const { locale } = useI18n();
const newProduct = ref([]);
const bestSeller = ref([]);
const brands = ref([]);
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

const isEnglish = ref(true);
watch(locale, (newLocale) => {
  if (newLocale == "en") {
    isEnglish.value = true;
  } else {
    isEnglish.value = false;
  }
});
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

function fetchNewProduct() {
  axios.get("homepage/getNewProduct").then((res) => {
    if (res.status == 200) {
      newProduct.value = res.data.new;
      bestSeller.value = res.data.top;
      brands.value = res.data.brands;
    }
  });
}

onMounted(() => {
  fetchNewProduct();
});
</script>
