<template>
  <div class="container" v-if="isFetching">
    <Skeleton />
  </div>
  <div class="container" v-if="!isFetching">
    <div class="d-flex flex-column">
      <div class="row py-5">
        <div class="col-lg-6 col-md-6 col-12">
          <Galleria :value="ProductInfo.images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
            <template #item="slotProps">
              <img :src="`http://publicws.spectrum.e-ibtikar.com/images/${slotProps.item.image}`" style="width: 100%; height: auto" />
            </template>
            <template #thumbnail="slotProps">
              <img :src="`http://publicws.spectrum.e-ibtikar.com/images/${slotProps.item.image}`" width="64" height="64" />
            </template>
          </Galleria>
        </div>
        <!-- Product Details -->
        <div class="col-lg-6 col-md-6 col-12">
          <div class="d-flex flex-column gap-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="text-uppercase">
                  <a :href="`/en/shop/${ProductInfo.brand?.slug}`" class="text-black font-avg">{{ ProductInfo.brand?.title }}</a>
                </h5>
              </div>
              <div class="d-flex gap-1">
                <Rating v-model="stars" readonly />
                <span class="font-avg">{{ stars }}</span>
                <span class="text-muted">({{ ProductInfo.review?.length }})</span>
              </div>
            </div>
            <!-- Name & Description -->
            <div>
              <h3>
                <span v-if="$i18n.locale == 'en'">{{ ProductInfo.name }}</span>
                <span v-else>{{ ProductInfo.arName }}</span>
              </h3>
            </div>
            <div>
              <p class="product-desc">
                <span v-if="$i18n.locale == 'en'">{{ ProductInfo.description }}</span>
                <span>{{ ProductInfo.arDescription }}</span>
              </p>

              <h5>
                <a href="#" class="text-black">Learn More</a>
              </h5>
            </div>
            <!-- Sizes -->
            <div class="d-flex gap-2">
              <div v-for="(size, index) in ProductInfo.propreties" :key="index">
                <Button v-if="size.type == 'color'" :label="size.value" outlined severity="contrast" class="rounded-0" @click="selectSize(size)" :disabled="selectedSize[index]?.active" />
                <Button v-else :label="`${size.value} ${$t('client.product.mm')}`" outlined severity="contrast" class="rounded-0" @click="selectSize(size)" :disabled="selectedSize[index]?.active" />
              </div>
            </div>
            <hr />
            <!-- Price And Cart-->
            <div class="d-flex align-items-center justify-content-between" :class="{ 'flex-row-reverse': $i18n.locale == 'ar' }">
              <div>
                <h5 v-if="ProductInfo.propreties?.length > 0">{{ $t("client.product.lyd") }} {{ priceOnSize.toFixed(2) }}</h5>
                <h5 v-else>{{ $t("client.product.lyd") }} {{ ProductInfo.price?.toFixed(2) }}</h5>
              </div>
              <div class="d-flex gap-2">
                <Button :label="$t('client.product.add')" severity="contrast" :loading="isAdding" class="text-uppercase rounded-0 px-5" @click="addtoBasket()" />
                <Button icon="fas fa-heart" severity="contrast" outlined class="text-uppercase rounded-0" />
              </div>
            </div>
            <hr />
            <!-- Information -->
            <div>
              <Accordion>
                <AccordionPanel value="0">
                  <AccordionHeader class="text-black">{{ $t("client.product.desc") }}</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      <span v-if="$i18n.locale == 'en'"> {{ ProductInfo.description }}</span>
                      <span> {{ ProductInfo.arDescription }}</span>
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1">
                  <AccordionHeader class="text-black">{{ $t("client.product.ing") }}</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      <span v-if="$i18n.locale == 'en'"> {{ ProductInfo.ingredients }}</span>
                      <span> {{ ProductInfo.arIngredients }}</span>
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="2">
                  <AccordionHeader class="text-black">{{ $t("client.product.tips") }}</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      <span v-if="$i18n.locale == 'en'"> {{ ProductInfo.tips }}</span>
                      <span> {{ ProductInfo.arTips }}</span>
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="3">
                  <AccordionHeader class="text-black">{{ $t("client.product.notes") }}</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      <span v-if="$i18n.locale == 'en'"> {{ ProductInfo.notes }}</span>
                      <span> {{ ProductInfo.arNotes }}</span>
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
        <ProductCard title="Complete Your Look" :products="Products" v-if="Products.length > 0" />
      </div>
      <!--Banner -->
      <div class="mt-3">
        <Banner title="Unbeatable Value Sets!" subtitle="Explore exclusive sets you won't find anywhere else!" src="https://picsum.photos/id/134/1024/1024" :isReversed="false" />
      </div>
      <!--Reviews -->
      <div>
        <h4>{{ $t("client.product.review") }}</h4>
        <div class="row justify-content-center align-items-center bg-body-tertiary py-5">
          <div class="col-lg-4 col-md-4 col-12">
            <div class="d-flex flex-column align-items-center">
              <h2 class="font-avg">{{ stars ?? "No reviews yet" }}</h2>
              <div>
                <i class="fa-regular fa-star" v-for="item in 5" :key="item" :class="{ 'fas fa-star': item <= parseInt(stars) }" />
              </div>
              <small class="text-muted">{{ ProductInfo.review?.length }} {{ $t("client.product.review") }}</small>
            </div>
          </div>

          <div class="col-lg-4 col-md-4 col-12">
            <div class="d-flex flex-column gap-2">
              <Button :label="$t('client.product.write')" class="rounded-0 px-5 text-uppercase font-avg" @click="displayWriteReview = true" />
              <a href="#" class="text-black text-center">{{ $t("client.product.tos") }}</a>
            </div>
          </div>
        </div>

        <!-- Review List -->
        <div class="py-5">
          <h5 class="font-avg">{{ $t("client.product.recent") }}</h5>
          <DataView :value="ProductInfo.review">
            <template #list="slotProps">
              <div class="card rounded-0 my-3" v-for="(item, index) in ProductInfo.review" :key="index">
                <div class="card-body px-5">
                  <div class="d-flex gap-2 justify-content-between">
                    <div class="d-flex align-items-center gap-1">
                      <Rating v-model="slotProps.items[index].stars" readonly />
                      <span class="font-avg">{{ slotProps.items[index].stars }}</span>
                    </div>
                    <div>
                      <span class="text-muted">{{ formatDate(item.createdAt) }}</span>
                    </div>
                  </div>
                  <div>
                    <h6 class="font-avg">{{ slotProps.items[index].title }}</h6>
                    <p>{{ slotProps.items[index].content }}</p>
                  </div>
                  <div class="d-flex justify-content-start">
                    <h6 class="font-avg text-muted">
                      {{ `${slotProps.items[index].user.firstName} ${slotProps.items[index].user.lastName} ` }}
                    </h6>
                  </div>
                </div>
              </div>
            </template>
          </DataView>
          <div class="d-flex justify-content-center align-items-center">
            <Button :label="$t('client.product.seeall')" class="text-uppercase rounded-0 border-dark px-5" outlined @click="displayReivewsDialog = true" />
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog Reivews -->
    <div>
      <Dialog v-model:visible="displayReivewsDialog" modal :header="ProductInfo.name" class="col-lg-6 col-md-6 col-12" :dismissableMask="true">
        <DataView :value="Reviews" :paginator="true" :rows="10" :sortOrder="sortOrder" :sortField="sortField">
          <template #list="slotProps">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="font-avg text-muted">{{ Reviews.length }} {{ $t("client.product.review") }}</h6>
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
                    <span class="text-muted">{{ formatDate(item.createdAt) }}</span>
                  </div>
                </div>
                <div>
                  <h6 class="font-avg">{{ item.title }}</h6>
                  <p>{{ item.content }}</p>
                </div>
                <div class="d-flex justify-content-start">
                  <h6 class="font-avg text-muted">
                    {{ `${item.user.firstName} ${item.user.lastName}` }}
                  </h6>
                </div>
              </div>
            </div>
          </template>
        </DataView>
      </Dialog>
    </div>

    <Dialog v-model:visible="displayWriteReview" modal header="Write a review" class="col-lg-6 col-md-6 col-12" :dismissableMask="true">
      <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit" class="w-100">
        <div class="d-flex flex-column gap-4">
          <div>
            <FloatLabel variant="on">
              <InputText name="title" type="text" v-model="reviewPayload.title" class="rounded-0 w-100" />
              <label for="title">Title</label>
            </FloatLabel>
            <Message v-if="$form.title?.invalid" severity="error" size="small" variant="simple">{{ $form.title.error?.message }}</Message>
          </div>
          <div>
            <FloatLabel variant="on">
              <Textarea name="content" rows="3" v-model="reviewPayload.content" class="rounded-0 w-100" />
              <label for="content">Content</label>
            </FloatLabel>
            <Message v-if="$form.content?.invalid" severity="error" size="small" variant="simple">{{ $form.content.error?.message }}</Message>
          </div>

          <div>
            <h6>How was your experience?</h6>
            <Rating v-model="reviewPayload.stars" name="stars" />
            <Message v-if="$form.stars?.invalid" severity="error" size="small" variant="simple">{{ $form.stars.error?.message }}</Message>
          </div>
          <Button label="Review" type="submit" class="rounded-0" :loading="isLoading" />

          <Message v-if="success" severity="success" size="small" variant="simple">Successfully saved your review!</Message>
          <Message v-if="hasError" severity="error" size="small" variant="simple">{{ hasError }}</Message>
        </div>
      </Form>
    </Dialog>
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
import { Form } from "@primevue/forms";
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import Textarea from "primevue/textarea";
import Skeleton from "@/components/loader/skeleton.vue";
import { onBeforeMount, onMounted, ref, watch } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import store from "@/store";
const route = useRoute();
const router = useRouter();
const stars = ref(0);
const isFetching = ref(false);
const isLoading = ref(false);
const Products = ref([]);

const Reviews = ref([]);
const success = ref(false);
const hasError = ref(null);
const sortKey = ref();
const sortOrder = ref();
const sortField = ref();
const sortOptions = ref([
  { label: "Newest", value: "!createdAt" },
  { label: "Oldest", value: "createdAt" },
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
const displayWriteReview = ref(false);

const ProductInfo = ref({});
const priceOnSize = ref(0.0);
const isAdding = ref(false);
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
const reviewPayload = ref({
  title: "",
  content: "",
  stars: "",
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.title) {
    errors.title = [{ message: "title is required" }];
  }

  if (!values.content) {
    errors.content = [{ message: "content is required." }];
  }
  if (!values.stars) {
    errors.stars = [{ message: "rating is required." }];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    createReview();
  }
};

async function fetchProductInfo() {
  isFetching.value = true;
  await axios.get(`/homepage/product/${route.params.product}`).then((res) => {
    if (res.status == 200) {
      ProductInfo.value = res.data.product;
      Products.value = res.data.simillarProduct;
      stars.value = res.data.stars;
      Reviews.value = res.data.product.review;
      isFetching.value = false;
    }
  });
}

function createReview() {
  isLoading.value = true;
  axios
    .post(`/client/review/${route.params.product}`, reviewPayload.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 201) {
        success.value = true;
        isLoading.value = false;
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })
    .catch((err) => {
      hasError.value = err.response.data.message;
      isLoading.value = false;
    });
}

function prepareProductProps() {
  if (ProductInfo.value.propreties.length <= 0) {
    selectedSize.value = [];
    return;
  }
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

watch(
  () => route.params.product,
  async (newSlug, oldSlug) => {
    if (newSlug !== oldSlug) {
      selectedSize.value = [];
      await fetchProductInfo();
      await prepareProductProps();
    }
  }
);

function addtoBasket() {
  isAdding.value = true;
  var index = selectedSize.value.indexOf(selectedSize.value.find((p) => p.active));
  store.dispatch("addToCart", { product: ProductInfo.value, selectedProp: index });
  setTimeout(() => {
    isAdding.value = false;
  }, 500);
}

function formatDate(date) {
  const formatted = new Date(date);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return formatted.toLocaleDateString("en-US", options);
}

onMounted(async () => {
  await fetchProductInfo();
  await prepareProductProps();
});
</script>
