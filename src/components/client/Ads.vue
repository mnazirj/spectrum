<template>
  <section id="ads">
    <div class="container">
      <Carousel
        v-if="hasBanner"
        :value="bannerItems"
        circular
        :numScroll="1"
        :showIndicators="false"
        :showNavigators="false"
        :autoplayInterval="3000"
      >
        <template #item="slotProps">
          <div class="card border-0">
            <div class="card-body">
              <div class="row">
                <div class="col-lg-6 col-md-6 col-12">
                  <img
                    :src="slotProps.data.img"
                    width="650"
                    height="512"
                    class="img-fluid d-lg-none d-md-none"
                  />
                  <img
                    :src="slotProps.data.img"
                    width="650"
                    height="512"
                    class="d-lg-block d-md-block d-none"
                  />
                </div>
                <div class="col-lg-6 col-md-6 col-12">
                  <div
                    class="d-flex justify-content-center align-items-center bg-body-secondary h-100"
                  >
                    <div class="ms-lg-auto ms-md-auto ms-5 py-5">
                      <h1 class="w-75 font-avg">{{ slotProps.data.title }}</h1>
                      <h6 class="w-75">{{ slotProps.data.subtitle }}</h6>
                      <div class="mt-5">
                        <Button label="Shop now" class="px-5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>

      <Carousel
        v-if="hasSlider"
        :value="sliderItems"
        circular
        :numVisible="3"
        :showIndicators="false"
        :responsiveOptions="responsiveOptions"
      >
        <template #item="slotProps">
          <div class="col h-100">
            <div class="card text-white h-100">
              <div class="card-img-top">
                <img
                  :src="slotProps.data.img"
                  width="424"
                  height="344"
                  class="img-fluid"
                />
              </div>
              <div class="card-body bg-zinc">
                <div>
                  <h3 class="font-avg">{{ slotProps.data.title }}</h3>
                  <h6>
                    {{ slotProps.data.subtitle }}
                  </h6>
                  <a href="#" class="nav-link underline">Shop Now</a>
                </div>
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </section>
</template>

<script setup>
const { hasBanner = true, hasSlider = true } = defineProps({
  hasBanner: Boolean,
  bannerItems: Array,
  hasSlider: Boolean,
  sliderItems: Array,
});

import Carousel from "primevue/carousel";
import { ref } from "vue";
import Button from "primevue/button";

const responsiveOptions = ref([
  {
    breakpoint: "1400px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "1199px",
    numVisible: 3,
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
</script>
