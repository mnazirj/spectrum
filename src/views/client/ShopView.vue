<template>
  <div class="container">
    <div class="d-flex flex-lg-row flex-md-row flex-column">
      <div class="col-lg-3 col-md-3 col-12">
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
            <h5>{{ $t("client.shop.refine") }}</h5>
            <Accordion class="border" :value="route.params.type == 'brand' ? '1' : '0'">
              <AccordionPanel value="0" v-if="route.params.type != 'brand'">
                <AccordionHeader class="text-black">{{ $t("client.shop.brands") }}</AccordionHeader>
                <AccordionContent>
                  <div>
                    <div class="d-flex flex-column gap-2 mb-2" v-for="brand in Brands" :key="brand">
                      <h5 class="bg-body-secondary py-1 px-1">
                        {{ brand.group }}
                      </h5>
                      <div class="flex items-center gap-2" v-for="item in brand.list" :key="item">
                        <Checkbox v-model="selectedBrand" :value="item" />
                        <label> {{ item }} </label>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="1">
                <AccordionHeader class="text-black">{{ $t("client.shop.size") }}</AccordionHeader>
                <AccordionContent>
                  <div class="flex items-center gap-2" v-for="size in uniqueSizes" :key="size">
                    <Checkbox v-model="selectedSize" :value="String(size)" />
                    <label v-if="size >= 0"> {{ size }}ml </label>
                    <label v-else> {{ size }} </label>
                  </div>
                </AccordionContent>
              </AccordionPanel>
              <AccordionPanel value="2">
                <AccordionHeader class="text-black">{{ $t("client.shop.gender") }}</AccordionHeader>
                <AccordionContent>
                  <div class="flex items-center gap-2">
                    <Checkbox v-model="selectedGender" value="male" />
                    <label> {{ $t("client.shop.male") }} </label>
                  </div>
                  <div class="flex items-center gap-2">
                    <Checkbox v-model="selectedGender" value="female" />
                    <label> {{ $t("client.shop.female") }} </label>
                  </div>
                </AccordionContent>
              </AccordionPanel>

              <AccordionPanel value="3">
                <AccordionHeader class="text-black">{{ $t("client.shop.price") }}</AccordionHeader>
                <AccordionContent>
                  <div>
                    <h5 class="text-center">
                      {{ priceRange }}
                    </h5>
                    <Slider v-model="priceRange" range :max="maxPrice" />
                  </div>
                </AccordionContent>
              </AccordionPanel>

              <AccordionPanel value="4">
                <AccordionHeader class="text-black">{{ $t("client.shop.review") }}</AccordionHeader>
                <AccordionContent>
                  <div class="d-flex flex-column gap-3">
                    <div v-for="item in ratingRange" :key="item">
                      <div class="d-flex gap-2">
                        <Checkbox v-model="selectedStars" :value="item" />
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
      <div class="col-lg-9 col-md-9 col-12">
        <div class="ms-3">
          <h1 class="font-avg text-uppercase" v-if="$i18n.locale == 'en'">{{ Products?.[0]?.category?.title }}</h1>
          <h1 class="font-avg text-uppercase" v-else>{{ Products?.[0]?.category?.arName }}</h1>
          <h5 class="w-75 product-desc" id="categorydesc" v-if="$i18n.locale == 'en'">{{ Products?.[0]?.category?.description }}</h5>
          <h5 class="w-75 product-desc" id="categorydesc" v-else>{{ Products?.[0]?.category?.arDescription }}</h5>
          <a v-if="Products?.[0]?.category?.description" href="#" id="readmore" class="font-avg text-decoration-none text-black text-uppercase" @click="readMore()">{{ $t("client.shop.seemore") }}</a>
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
import { computed, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import axios from "axios";
const route = useRoute();
const router = useRouter();
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
const priceRange = ref([]);
const maxPrice = ref(0);
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

watch(
  () => route.params.slug,
  (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      priceRange.value = [];
      fetchData();
    }
  }
);

onBeforeMount(() => {
  fetchData();
});

function readMore() {
  document.getElementById("categorydesc").classList.remove("product-desc");
  document.getElementById("readmore").classList.toggle("hidden");
}

function fetchData() {
  axios
    .get("homepage/getProducts/" + route.params.type + "/" + route.params.slug)
    .then((res) => {
      Products.value = res.data.products;
      if (Products.value.length <= 0) {
        maxPrice.value = 0;
        priceRange.value.push(0, 0);
      } else {
        priceRange.value.push(res.data.minPrice, res.data.maxPrice);
        maxPrice.value = res.data.maxPrice;
        axios.get("group").then((res) => {
          if (res.status == 200) {
            Brands.value = res.data;
          }
        });
      }
    })
    .catch((err) => {
      router.push({ name: "notFound" });
    });
}
// Create unique size list
const uniqueSizes = computed(() => {
  const sizes = Products.value?.flatMap((product) => product.propreties.map((p) => p.value));
  const unique = [...new Set(sizes)];
  return unique.sort((a, b) => a - b);
});
</script>
