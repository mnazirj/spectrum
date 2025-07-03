<template>
  <div class="container">
    <div class="d-flex flex-column">
      <div class="row py-5">
        <div class="col-6">
          <Galleria :value="ProductInfo.images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
            <template #item="slotProps">
              <img :src="`http://26.77.145.88:3333/images/${slotProps.item.image}`" style="width: 100%; height: 512px" />
            </template>
            <template #thumbnail="slotProps">
              <img :src="`http://26.77.145.88:3333/images/${slotProps.item.image}`" width="80" height="60" />
            </template>
          </Galleria>
        </div>
        <!-- Product Details -->
        <div class="col-6">
          <div class="d-flex flex-column gap-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="text-uppercase">
                  <a :href="`/en/shop/${ProductInfo.brand?.slug}`" class="text-black font-avg">{{ ProductInfo.brand?.title }}</a>
                </h5>
              </div>
              <div class="d-flex gap-1">
                <Rating v-model="value" readonly />
                <span class="font-avg">4.7</span>
                <span class="text-muted">(512)</span>
              </div>
            </div>
            <!-- Name & Description -->
            <div>
              <h3>{{ ProductInfo.name }}</h3>
            </div>
            <div>
              <p class="product-desc">{{ ProductInfo.description }}</p>

              <h5>
                <a href="#" class="text-black">Learn More</a>
              </h5>
            </div>
            <!-- Sizes -->
            <div class="d-flex gap-2">
              <div v-for="(size, index) in ProductInfo.propreties" :key="index">
                <Button :label="size.value + 'ml'" outlined severity="contrast" class="rounded-0" @click="selectSize(size)" :disabled="selectedSize[index]?.active" />
              </div>
            </div>
            <hr />
            <!-- Price And Cart-->
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h5 v-if="ProductInfo.propreties">LYD {{ priceOnSize.toFixed(2) }}</h5>
                <h5 v-else>LYD {{ ProductInfo.price?.toFixed(2) }}</h5>
              </div>
              <div class="d-flex gap-2">
                <Button label="Add to Basket" severity="contrast" class="text-uppercase rounded-0 px-5" />
                <Button icon="fas fa-heart" severity="contrast" outlined class="text-uppercase rounded-0" />
              </div>
            </div>
            <hr />
            <!-- Information -->
            <div>
              <Accordion>
                <AccordionPanel value="0">
                  <AccordionHeader class="text-black">Description</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      {{ ProductInfo.description }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1">
                  <AccordionHeader class="text-black">Ingredients</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      {{ ProductInfo.ingredients }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="2">
                  <AccordionHeader class="text-black">Tips</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      {{ ProductInfo.tips }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="3">
                  <AccordionHeader class="text-black">Notes</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      {{ ProductInfo.notes }}
                    </p>
                  </AccordionContent>
                </AccordionPanel>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <!--Suggest product -->
      <div>
        <ProductCard title="Complete Your Look" :products="Products" />
      </div>
      <!--Banner -->
      <div class="mt-3">
        <Banner title="Unbeatable Value Sets!" subtitle="Explore exclusive sets you won't find anywhere else!" src="https://picsum.photos/id/134/1024/1024" :isReversed="false" />
      </div>
      <!--Reviews -->
      <div>
        <h4>Reviews</h4>
        <div class="row justify-content-center align-items-center bg-body-tertiary py-5">
          <div class="col-4">
            <div class="d-flex flex-column align-items-center">
              <h2 class="font-avg">4.6</h2>
              <div>
                <i class="fas fa-star" v-for="item in 5" :key="item" />
              </div>
              <small class="text-muted">520 Reviews</small>
            </div>
          </div>

          <div class="col-4">
            <div class="d-flex flex-column gap-2">
              <Button label="Write a Review" class="rounded-0 px-5 text-uppercase font-avg" />
              <a href="#" class="text-black text-center">TERMS AND CONDITIONS OF PUBLICATION</a>
            </div>
          </div>
        </div>

        <!-- Review List -->
        <div class="py-5">
          <h5 class="font-avg">Recent Reviews</h5>
          <DataView :value="Reviews">
            <template #list="slotProps">
              <div class="card rounded-0 my-3" v-for="(item, index) in 2" :key="index">
                <div class="card-body px-5">
                  <div class="d-flex gap-2 justify-content-between">
                    <div class="d-flex align-items-center gap-1">
                      <Rating v-model="slotProps.items[index].stars" readonly />
                      <span class="font-avg">{{ slotProps.items[index].stars }}</span>
                    </div>
                    <div>
                      <span class="text-muted">{{ item.date }}</span>
                    </div>
                  </div>
                  <div>
                    <h6 class="font-avg">{{ slotProps.items[index].title }}</h6>
                    <p>{{ slotProps.items[index].review }}</p>
                  </div>
                  <div class="d-flex justify-content-start">
                    <h6 class="font-avg text-muted">
                      {{ slotProps.items[index].name }}
                    </h6>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
          <div class="d-flex justify-content-center align-items-center">
            <Button label="See All Reviews" class="text-uppercase rounded-0 border-dark px-5" outlined @click="displayReivewsDialog = true" />
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog Reivews -->
    <div>
      <Dialog v-model:visible="displayReivewsDialog" modal header="Product name Goes here" class="col-lg-6 col-md-6 col-12" :dismissableMask="true">
        <DataView :value="Reviews" :paginator="true" :rows="10" :sortOrder="sortOrder" :sortField="sortField">
          <template #list="slotProps">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="font-avg text-muted">{{ Reviews.length }} Reivews</h6>
              <Select v-model="sortKey" :options="sortOptions" optionLabel="label" placeholder="Sort By" class="border-dark font-avg border-0" @change="onSortChange($event)" />
            </div>
            <div class="card rounded-0 my-3" v-for="(item, index) in slotProps.items" :key="index">
              <div class="card-body px-5">
                <div class="d-flex gap-2 justify-content-between">
                  <div class="d-flex align-items-center gap-1">
                    <Rating v-model="item.stars" readonly />
                    <span class="font-avg">{{ item.stars }}</span>
                  </div>
                  <div>
                    <span class="text-muted">{{ item.date }}</span>
                  </div>
                </div>
                <div>
                  <h6 class="font-avg">{{ item.title }}</h6>
                  <p>{{ item.review }}</p>
                </div>
                <div class="d-flex justify-content-start">
                  <h6 class="font-avg text-muted">
                    {{ item.name }}
                  </h6>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </Dialog>
    </div>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import Galleria from "primevue/galleria";
import Rating from "primevue/rating";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import ProductCard from "@/components/client/ProductCard.vue";
import Banner from "@/components/client/BannerNew.vue";
import MeterGroup from "primevue/metergroup";
import DataView from "primevue/dataview";
import Dialog from "primevue/dialog";
import Select from "primevue/select";
import { onBeforeMount, onMounted, ref } from "vue";
import axios from "axios";
import router from "@/router";
const value = 4;

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
const Reviews = ref([
  {
    id: 1,
    name: "Dummy User #1",
    stars: 3,
    title: "a must have perfume!",
    review: "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
    date: "3/27/2025",
  },
  {
    id: 1,
    name: "Dummy User #2",
    stars: 3,
    title: "a must have perfume!",
    review: "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
    date: "07/04/2025",
  },
  {
    id: 1,
    name: "Dummy User #3",
    stars: 3,
    title: "a must have perfume!",
    review: "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
    date: "3/27/2025",
  },
  {
    id: 1,
    name: "Dummy User #4",
    stars: 2,
    title: "a must have perfume!",
    review: "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
    date: "08/04/2025",
  },
]);

const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
  { label: "Newest", value: "!date" },
  { label: "Oldest", value: "date" },
  { label: "Highest to lowest rating", value: "!stars" },
  { label: "Lowest to highest rating", value: "stars" },
]);
const onSortChange = (event) => {
  const value = event.value.value;
  const sortValue = event.value;

  if (value.indexOf("!") === 0) {
    sortOrder.value = -1;
    sortField.value = value.substring(1, value.length);
    sortKey.value = sortValue;
  } else {
    sortOrder.value = 1;
    sortField.value = value;
    sortKey.value = sortValue;
  }
};
const displayReivewsDialog = ref(false);

const ProductInfo = ref({});
const priceOnSize = ref(0.0);

function selectSize(payload) {
  selectedSize.value.forEach((element) => {
    if (element.value == payload.value) {
      element.active = true;
      priceOnSize.value = element.price;
    } else {
      element.active = false;
    }
  });
}

const selectedSize = ref([]);

async function fetchProductInfo() {
  await axios.get(`/homepage/product/${router.currentRoute.value.params.product}`).then((res) => {
    if (res.status == 200) {
      ProductInfo.value = res.data;
    }
  });
}

function prepareProductProps() {
  for (let index = 0; index < ProductInfo.value.propreties.length; index++) {
    const element = ProductInfo.value.propreties[index];
    selectedSize.value.push({
      value: element.value,
      price: element.price,
      active: index == 0,
    });
  }
  priceOnSize.value = selectedSize.value[0].price;
}

onMounted(async () => {
  await fetchProductInfo();
  await prepareProductProps();
});
</script>
