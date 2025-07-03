<template>
  <section>
    <div class="container">
      <h2 class="text-uppercase font-avg" v-if="title">{{ title }}</h2>
      <Carousel :value="products" :numVisible="6" circular :showIndicators="false" :responsiveOptions="responsiveOptions" v-if="hasSlider">
        <template #item="slotProps">
          <div class="col h-100">
            <div class="card w-100 h-100">
              <div class="position-absolute right-0 mt-2 me-2">
                <Button icon="pi pi-heart" variant="text" rounded size="small" />
              </div>
              <div class="position-absolute mt-3">
                <div class="d-flex flex-column gap-1">
                  <Tag v-for="tag in slotProps.data.tags" :key="tag" severity="contrast" :value="tag" class="rounded-0"></Tag>
                </div>
              </div>
              <div class="card-img-top">
                <img :src="slotProps.data.image" class="img-fluid" />
              </div>
              <div class="card-body">
                <div>
                  <h5>{{ slotProps.data.company }}</h5>
                  <h6 class="product-name">{{ slotProps.data.name }}</h6>
                </div>
                <div class="d-flex gap-1 align-items-center">
                  <Rating v-model="slotProps.data.stars" readonly />
                  <h6 class="mb-0">{{ slotProps.data.stars }}</h6>
                  <small class="text-muted">({{ slotProps.data.rate }})</small>
                </div>
                <div>
                  <small class="text-muted">3 Sizes</small>
                </div>
              </div>
              <div class="card-footer border-0 bg-transparent">
                <h4>LYD {{ formatPrice(slotProps.data.price) }}</h4>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
      <DataView :value="products" paginator :rows="12" v-if="!hasSlider">
        <template #empty>
          <div class="text-center col-lg-6 col-md-6 col-12 mx-auto">
            <Message severity="contrast">There is no product matching the selected filter</Message>
          </div>
        </template>
        <template #list="slotProps">
          <div class="row">
            <div class="col-lg-4 col-md-4 col-12 h-100" v-for="item in slotProps.items" :key="item">
              <div class="card w-100 h-100">
                <div class="position-absolute right-0 mt-2 me-2">
                  <Button icon="pi pi-heart" variant="text" rounded size="small" />
                </div>
                <div class="position-absolute mt-3">
                  <div class="d-flex flex-column gap-1">
                    <Tag v-for="tag in item.tags" :key="tag" severity="contrast" :value="tag" class="rounded-0"></Tag>
                  </div>
                </div>
                <div class="card-img-top">
                  <img :src="'http://26.77.145.88:3333/images/' + item.images[0]?.image" class="img-fluid" />
                </div>
                <div class="card-body">
                  <div>
                    <h5>{{ item.company }}</h5>
                    <h6 class="product-name">{{ item.name }}</h6>
                  </div>
                  <div class="d-flex gap-1 align-items-center">
                    <Rating v-model="item.stars" readonly />
                    <h6 class="mb-0">{{ item.stars }}</h6>
                    <small class="text-muted">({{ item.rate }})</small>
                  </div>
                  <div>
                    <small class="text-muted">{{ item.propreties?.length }} Sizes</small>
                  </div>
                </div>
                <div class="card-footer border-0 bg-transparent">
                  <h4 v-if="item.propreties?.length">LYD {{ formatPrice(item.propreties[0].price) }}</h4>
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
</script>
