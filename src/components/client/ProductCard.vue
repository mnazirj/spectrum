<template>
  <section>
    <div class="container">
      <h2 class="text-uppercase font-avg" v-if="title">{{ title }}</h2>
      <Carousel :value="products" :numVisible="4" circular :showIndicators="false" :responsiveOptions="responsiveOptions" v-if="hasSlider">
        <template #item="slotProps">
          <div class="col h-100">
            <div class="card w-100 h-100 cursor-pointer">
              <div class="position-absolute right-0 mt-2 me-2">
                <Button icon="pi pi-heart" :severity="$store.state.wishlist.find((p) => p.name == slotProps.data.name) ? 'primary' : 'secondary'" rounded size="small" @click="addToWishlist(slotProps.data)" />
              </div>
              <div class="position-absolute mt-3" :class="{ 'left-0': $i18n.locale == 'ar' }">
                <div class="d-flex flex-column gap-1">
                  <Tag v-for="tag in slotProps.data.tags" :key="tag" severity="contrast" :value="tag" class="rounded-0"></Tag>
                  <Tag v-if="slotProps.data.exclusive" severity="contrast" value="Exclusive" class="rounded-0"></Tag>
                </div>
              </div>
              <div @click="viewProduct(slotProps.data.slug)">
                <div class="card-img-top">
                  <img :src="`http://publicws.spectrum.e-ibtikar.com/images/${slotProps.data.image}`" class="img-fluid" />
                </div>
                <div class="card-body">
                  <div>
                    <h5>{{ slotProps.data.company }}</h5>
                    <h6 class="product-name" v-if="$i18n.locale == 'en'">{{ slotProps.data.name }}</h6>
                    <h6 class="product-name" v-else>{{ slotProps.data.arName }}</h6>
                  </div>
                  <div class="d-flex gap-1 align-items-center">
                    <Rating v-model="slotProps.data.stars" readonly />
                    <h6 class="mb-0">{{ slotProps.data.stars ?? 0 }}</h6>
                    <small class="text-muted">({{ slotProps.data.review?.length }})</small>
                  </div>
                  <div>
                    <small class="text-muted" v-if="slotProps.data.sizes?.length > 0">{{ slotProps.data.sizes?.length }} {{ $t("client.shop.size") }}</small>
                    <small v-else> &nbsp;</small>
                  </div>
                </div>
                <div class="card-footer border-0 bg-transparent">
                  <h4 v-if="slotProps.data.propreties?.length">{{ formatPrice(slotProps.data.propreties[0]?.price) }} {{ $t("client.shop.lyd") }}</h4>
                  <h4 v-else>{{ formatPrice(slotProps.data.price) }} {{ $t("client.shop.lyd") }}</h4>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <DataView :value="products" paginator :rows="12" v-if="!hasSlider">
        <template #empty>
          <div class="text-center col-lg-6 col-md-6 col-12 w-100">
            <Message severity="contrast" class="rounded-0">{{ $t("client.shop.emptyproduct") }}</Message>
          </div>
        </template>
        <template #list="slotProps">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-12 h-100" v-for="item in slotProps.items" :key="item">
              <div class="card w-100 h-100 cursor-pointer" @click="viewProduct(item.slug)">
                <div class="position-absolute right-0 mt-2 me-2">
                  <Button icon="pi pi-heart" variant="text" rounded size="small" />
                </div>
                <div class="position-absolute mt-3">
                  <div class="d-flex flex-column gap-1">
                    <Tag v-for="tag in item.tags" :key="tag" severity="contrast" :value="tag" class="rounded-0"></Tag>
                  </div>
                </div>
                <div class="card-img-top">
                  <img :src="'http://publicws.spectrum.e-ibtikar.com/images/' + item.images[0]?.image" class="img-fluid" />
                </div>
                <div class="card-body">
                  <div>
                    <h5 v-if="$i18n.locale == 'en'">{{ item.brand.title }}</h5>
                    <h5 v-else>{{ item.brand.arName }}</h5>
                    <h6 class="product-name" v-if="$i18n.locale == 'en'">{{ item.name }}</h6>
                    <h6 class="product-name" v-else>{{ item.arName }}</h6>
                  </div>
                  <div class="d-flex gap-1 align-items-center">
                    <Rating v-model="item.stars" readonly />
                    <h6 class="mb-0">{{ item.stars }}</h6>
                    <small class="text-muted">({{ item.rate }})</small>
                  </div>
                  <div>
                    <small class="text-muted">{{ item.propreties?.length }} {{ $t("client.shop.size") }}</small>
                  </div>
                </div>
                <div class="card-footer border-0 bg-transparent">
                  <h4 v-if="item.propreties?.length">{{ formatPrice(item.propreties[0].price) }} {{ $t("client.shop.lyd") }}</h4>
                  <h4 v-else>LYD {{ formatPrice(item.price) }}</h4>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>
  </section>
</template>

<script setup>
import Rating from "primevue/rating";
import Carousel from "primevue/carousel";
import Tag from "primevue/tag";
import DataView from "primevue/dataview";
import Message from "primevue/message";
import Button from "primevue/button";

import { ref } from "vue";
import router from "@/router";
import store from "@/store";

const { hasSlider = true } = defineProps({
  title: String,
  products: Array,
  hasSlider: Boolean,
});

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 6,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 6,
    numScroll: 1,
  },
  {
    breakpoint: "767px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "575px",
    numVisible: 1,
    numScroll: 1,
  },
]);

function formatPrice(price) {
  return price.toFixed(2);
}

function viewProduct(payload) {
  router.push({ name: "product.view", params: { product: payload } });
}

function addToWishlist(product) {
  var item = store.state.wishlist.find((p) => p.name === product.name);
  if (item) {
    console.log(true);
    store.dispatch("removeFromWishlist", { item: product });
  } else {
    store.dispatch("addToWishlist", { item: product });
  }
}
</script>
