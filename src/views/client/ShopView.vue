<template>
  <div class="container">
    <div class="d-flex">
      <div class="col-3">
        <div class="d-flex flex-column gap-5">
          <div v-if="false">
            <Panel :header="$route.params.brand" toggleable>
              <ul class="list-unstyled">
                <li>
                  <div class="d-flex items-center gap-2 mt-2" v-for="item in items" :key="item">
                    <RadioButton v-model="ingredient" inputId="newarrival" :name="item.name" :value="item.name" />
                    <label for="newarrival">{{ item.label }} ({{ item.count }})</label>
                  </div>
                </li>
              </ul>
            </Panel>
          </div>
          <!-- Filter -->
          <div>
            <h5>Refine</h5>
            <Accordion class="border" value="0">
              <AccordionPanel value="0">
                <AccordionHeader class="text-black">Brands</AccordionHeader>
                <AccordionContent>
                  <div>
                    <div class="d-flex flex-column gap-2 mb-2" v-for="brand in Brands" :key="brand">
                      <h5 class="bg-body-secondary py-1 px-1">
                        {{ brand.group }}
                      </h5>
                      <div class="flex items-center gap-2" v-for="item in brand.list" :key="item">
                        <Checkbox v-model="selectedBrand" :name="item" :value="item" />
                        <label> {{ item }} </label>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="1">
                <AccordionHeader class="text-black">Size</AccordionHeader>
                <AccordionContent>
                  <div class="flex items-center gap-2" v-for="size in uniqueSizes" :key="size">
                    <Checkbox v-model="selectedSize" :name="item" :value="String(size)" />
                    <label> {{ size }}ml </label>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="2">
                <AccordionHeader class="text-black">Gender</AccordionHeader>
                <AccordionContent>
                  <div class="flex items-center gap-2">
                    <Checkbox v-model="selectedGender" :name="item" value="male" />
                    <label> Male </label>
                  </div>
                  <div class="flex items-center gap-2">
                    <Checkbox v-model="selectedGender" :name="item" value="female" />
                    <label> Female </label>
                  </div>
                </AccordionContent>
              </AccordionPanel>

              <AccordionPanel value="3">
                <AccordionHeader class="text-black">Price</AccordionHeader>
                <AccordionContent>
                  <div>
                    <h5 class="text-center">
                      {{ priceRange }}
                    </h5>
                    <Slider v-model="priceRange" range :max="500" />
                  </div>
                </AccordionContent>
              </AccordionPanel>

              <AccordionPanel value="4">
                <AccordionHeader class="text-black">Reviews</AccordionHeader>
                <AccordionContent>
                  <div class="d-flex flex-column gap-3">
                    <div v-for="item in ratingRange" :key="item">
                      <div class="d-flex gap-2">
                        <Checkbox v-model="selectedStars" :name="item" :value="item" />
                        <Rating v-model="ratingRange[item - 1]" readonly />
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
            </Accordion>
          </div>
        </div>
      </div>
      <!-- Product -->
      <div class="col">
        <div class="ms-3">
          <h1 class="font-avg text-uppercase">{{ $route.params.brand }}</h1>
          <h5 class="w-75">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error esse corporis at in, assumenda debitis architecto perferendis provident distinctio ipsam!</h5>
        </div>

        <ProductCard :products="filterProduct" :hasSlider="false" />
      </div>
    </div>
  </div>
</template>

<script setup>
import Panel from "primevue/panel";
import RadioButton from "primevue/radiobutton";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import Checkbox from "primevue/checkbox";
import Slider from "primevue/slider";
import ProductCard from "@/components/client/ProductCard.vue";
import useProductFilters from "@/composables/productFilter.js";
import Rating from "primevue/rating";

import { computed, onMounted, ref } from "vue";
import router from "@/router";
import axios from "axios";
const ingredient = ref("");
const items = ref([
  {
    label: "New Arrivals",
    count: 10,
    name: "new",
  },

  {
    label: "Bestsellers",
    count: 52,
    name: "best",
  },
  {
    label: "For Her",
    count: 60,
    name: "her",
  },
  {
    label: "For Him",
    count: 55,
    name: "him",
  },
  {
    label: "Travel Size",
    count: 70,
    name: "travel",
  },
]);
const selectedBrand = ref({});
const selectedSize = ref([]);
const priceRange = ref([0, 500]);
const selectedGender = ref([]);
const selectedStars = ref([]);

const filters = ref({
  brands: selectedBrand,
  sizes: selectedSize,
  genders: selectedGender,
  priceRange,
  minStars: selectedStars,
});

const Brands = ref(null);

const ratingRange = ref([1, 2, 3, 4, 5]);

const Products = ref([]);
const filterProduct = useProductFilters(Products, filters);

onMounted(() => {
  console.log(router.currentRoute.value.params.brand);
  axios.get("homepage/getProducts/" + router.currentRoute.value.params.brand).then((res) => {
    // Products.value = res.data;
    Products.value = res.data;
    axios.get("group").then((res) => {
      if (res.status == 200) {
        Brands.value = res.data;
      }
    });
  });
});
// Create unique size list
const uniqueSizes = computed(() => {
  const sizes = Products.value.flatMap((product) => product.propreties.map((p) => p.value));
  return [...new Set(sizes)];
});
</script>
