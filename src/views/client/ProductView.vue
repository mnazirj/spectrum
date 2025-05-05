<template>
  <div class="container">
    <div class="d-flex flex-column">
      <div class="row py-5">
        <div class="col-6">
          <Galleria
            :value="images"
            :responsiveOptions="responsiveOptions"
            :numVisible="5"
            containerStyle="max-width: 640px"
          >
            <template #item="slotProps">
              <img
                :src="slotProps.item.itemImageSrc"
                :alt="slotProps.item.alt"
                style="width: 100%"
              />
            </template>
            <template #thumbnail="slotProps">
              <img
                :src="slotProps.item.thumbnailImageSrc"
                :alt="slotProps.item.alt"
              />
            </template>
          </Galleria>
        </div>
        <!-- Product Details -->
        <div class="col-6">
          <div class="d-flex flex-column gap-3">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h5 class="text-uppercase">
                  <a href="#" class="text-black font-avg">KAYALI</a>
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
              <h3>Fleur Majesty Rose Royale | 31</h3>
            </div>
            <div>
              <p class="product-desc">
                Feel like the diamond that you are with our warm floral
                masterpiece, Fleur Majesty Rose Royale | 31. Timeless, romantic
                and sensual, this gem is a glorious symphony of juicy pear,
                sweet peach, enchanting rose, pink peony, violet wood and purple
                musk. Perfect for any season, wear alone or layer with your
                favorite fragrance to create your own unique mood.
              </p>

              <h5>
                <a href="#" class="text-black">Learn More</a>
              </h5>
            </div>
            <!-- Sizes -->
            <div class="d-flex gap-2" v-for="item in ProductInfo" :key="item">
              <div v-for="(size, index) in item.sizes" :key="size">
                <Button
                  :label="size.size + 'ml'"
                  outlined
                  severity="contrast"
                  class="rounded-0"
                  @click="selectSize(size)"
                  :disabled="selectedSize[index].active"
                />
              </div>
            </div>
            <hr />
            <!-- Price And Cart-->
            <div class="d-flex align-items-center justify-content-between">
              <div>
                <h5>LYD {{ priceOnSize.toFixed(2) }}</h5>
              </div>
              <div class="d-flex gap-2">
                <Button
                  label="Add to Basket"
                  severity="contrast"
                  class="text-uppercase rounded-0 px-5"
                />
                <Button
                  icon="fas fa-heart"
                  severity="contrast"
                  outlined
                  class="text-uppercase rounded-0"
                />
              </div>
            </div>
            <hr />
            <!-- Information -->
            <div>
              <Accordion>
                <AccordionPanel value="0">
                  <AccordionHeader class="text-black"
                    >Description</AccordionHeader
                  >
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      Feel like the diamond that you are with our warm floral
                      masterpiece, Fleur Majesty Rose Royale | 31. Timeless,
                      romantic and sensual, this gem is a glorious symphony of
                      juicy pear, sweet peach, enchanting rose, pink peony,
                      violet wood and purple musk. Perfect for any season, wear
                      alone or layer with your favorite fragrance to create your
                      own unique mood. "My inspiration for KAYALI has always
                      been to make people feel like royalty every time they wear
                      our fragrances. With Fleur Majesty Rose Royale | 31, I
                      wanted to create a warm floral scent that’s both strong
                      and soft—a fragrance that makes you feel elegant,
                      confident, and effortlessly unforgettable. To bring this
                      scent story to life, I chose the rose as the hero note as
                      it is often called the 'Queen of Flowers' and presents
                      such a romantic and timeless facet to the fragrance. We
                      layered in the juicy green pear and sweet peach, along
                      with delicate pink peony, violet wood, and purple musk, to
                      create a sensual yet powerful scent that lingers
                      beautifully everywhere you go!" - Mona Kattan
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="1">
                  <AccordionHeader class="text-black"
                    >Ingredients</AccordionHeader
                  >
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      SD ALCOHOL 40-B/ALCOHOL DENAT., FRAGRANCE/PARFUM,
                      WATER/AQUA/EAU, TETRAMETHYL ACETYLOCTAHYDRONAPHTHALENES,
                      HEXAMETHYLINDANOPYRAN, ETHYLHEXYL METHOXYCINNAMATE,
                      ETHYLHEXYL SALICYLATE, BUTYL METHOXYDIBENZOYLMETHANE,
                      ALPHA-ISOMETHYL IONONE, CINNAMYL ALCOHOL, CITRAL,
                      CITRONELLOL, COUMARIN, EUGENOL, FARNESOL, GERANIOL, BENZYL
                      ALCOHOL, LIMONENE, LINALOOL, ALPHA-TERPINENE,
                      BETA-CARYOPHYLLENE, CITRUS AURANTIUM PEEL OIL, GERANYL
                      ACETATE, LINALYL ACETATE, PELARGONIUM GRAVEOLENS FLOWER
                      OIL, PINENE, ROSE FLOWER OIL/EXTRACT, ROSE KETONES,
                      TERPINEOL, TERPINOLENE, VANILLIN. VOC: 70%
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="2">
                  <AccordionHeader class="text-black">Tips</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      Dab on your pulse points – inside of the wrists, behind
                      the knees, the center of the chest, nape of the neck,
                      behind the ears - and clothes for a more powerful scent
                      trail. For even longer wear, be sure to moisturize with
                      balm or lotion before spritzing on the body!
                    </p>
                  </AccordionContent>
                </AccordionPanel>
                <AccordionPanel value="3">
                  <AccordionHeader class="text-black">Notes</AccordionHeader>
                  <AccordionContent>
                    <p class="m-0 text-black font-medium">
                      Scent Type: Warm Floral Top Notes: Mandarin, Orange, Juicy
                      Pear, Sweet Peach Middle Notes: Magnolia, White Peony,
                      Rose Centifolia, Violet Wood Dry Notes: Vetiver, KAYALI
                      Signature Accord, Ambrox® Super, Vanilla, Praline, Musk
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
        <Banner
          title="Unbeatable Value Sets!"
          subtitle="Explore exclusive sets you won't find anywhere else!"
          src="https://picsum.photos/id/134/1024/1024"
          :isReversed="false"
        />
      </div>
      <!--Reviews -->
      <div>
        <h4>Reviews</h4>
        <div
          class="row justify-content-center align-items-center bg-body-tertiary py-5"
        >
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
              <Button
                label="Write a Review"
                class="rounded-0 px-5 text-uppercase font-avg"
              />
              <a href="#" class="text-black text-center"
                >TERMS AND CONDITIONS OF PUBLICATION</a
              >
            </div>
          </div>
        </div>

        <!-- Review List -->
        <div class="py-5">
          <h5 class="font-avg">Recent Reviews</h5>
          <DataView :value="Reviews">
            <template #list="slotProps">
              <div
                class="card rounded-0 my-3"
                v-for="(item, index) in 2"
                :key="index"
              >
                <div class="card-body px-5">
                  <div class="d-flex gap-2 justify-content-between">
                    <div class="d-flex align-items-center gap-1">
                      <Rating v-model="slotProps.items[index].stars" readonly />
                      <span class="font-avg">{{
                        slotProps.items[index].stars
                      }}</span>
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
            <Button
              label="See All Reviews"
              class="text-uppercase rounded-0 border-dark px-5"
              outlined
              @click="displayReivewsDialog = true"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Dialog Reivews -->
    <div>
      <Dialog
        v-model:visible="displayReivewsDialog"
        modal
        header="Product name Goes here"
        class="col-lg-6 col-md-6 col-12"
        :dismissableMask="true"
      >
        <DataView
          :value="Reviews"
          :paginator="true"
          :rows="10"
          :sortOrder="sortOrder"
          :sortField="sortField"
        >
          <template #list="slotProps">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="font-avg text-muted">{{ Reviews.length }} Reivews</h6>
              <Select
                v-model="sortKey"
                :options="sortOptions"
                optionLabel="label"
                placeholder="Sort By"
                class="border-dark font-avg border-0"
                @change="onSortChange($event)"
              />
            </div>
            <div
              class="card rounded-0 my-3"
              v-for="(item, index) in slotProps.items"
              :key="index"
            >
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
import { ref } from "vue";
const value = 4;

const images = ref([
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria1s.jpg",
    alt: "Description for Image 1",
    title: "Title 1",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria2.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria2s.jpg",
    alt: "Description for Image 1",
    title: "Title 2",
  },
  {
    itemImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria3.jpg",
    thumbnailImageSrc:
      "https://primefaces.org/cdn/primevue/images/galleria/galleria3s.jpg",
    alt: "Description for Image 1",
    title: "Title 3",
  },
]);
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
    review:
      "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
    date: "3/27/2025",
  },
  {
    id: 1,
    name: "Dummy User #2",
    stars: 3,
    title: "a must have perfume!",
    review:
      "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
    date: "07/04/2025",
  },
  {
    id: 1,
    name: "Dummy User #3",
    stars: 3,
    title: "a must have perfume!",
    review:
      "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
    date: "3/27/2025",
  },
  {
    id: 1,
    name: "Dummy User #4",
    stars: 2,
    title: "a must have perfume!",
    review:
      "[This review was collected as part of a promotion.] love the packaging! also the perfume smells absolutely amazing and so fresh! people always asks me how i smell so good! highly recommend if you want a light fresh scent!!",
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

const ProductInfo = ref([
  {
    title: "Fleur Majesty Rose Royale | 31",
    brand: "KAYALI",
    stars: 4.7,
    description:
      'Feel like the diamond that you are with our warm floral masterpiece, Fleur Majesty Rose Royale | 31. Timeless, romantic and sensual, this gem is a glorious symphony of juicy pear, sweet peach, enchanting rose, pink peony, violet wood and purple musk. Perfect for any season, wear alone or layer with your favorite fragrance to create your own unique mood. "My inspiration for KAYALI has always been to make people feel like royalty every time they wear our fragrances. With Fleur Majesty Rose Royale | 31, I wanted to create a warm floral scent that’s both strong and soft—a fragrance that makes you feel elegant, confident, and effortlessly unforgettable. To bring this scent story to life, I chose the rose as the hero note as it is often called the Queen of Flowers and presents such a romantic and timeless facet to the fragrance. We layered in the juicy green pear and sweet peach, along with delicate pink peony, violet wood, and purple musk, to create a sensual yet powerful scent that lingers beautifully everywhere you go!" - Mona Kattan',
    sizes: [
      { size: 100, name: null, price: 125 },
      { size: 200, name: null, price: 225 },
      { size: 250, name: null, price: 300 },
    ],
  },
]);
const priceOnSize = ref(125.0);
function selectSize(payload) {
  selectedSize.value.forEach((element) => {
    if (element.size == payload.size) {
      element.active = true;
      priceOnSize.value = element.price;
    } else {
      element.active = false;
    }
  });
}
const selectedSize = ref([
  { size: 100, name: null, active: true, price: 125 },
  { size: 200, name: null, active: false, price: 225 },
  { size: 250, name: null, active: false, price: 300 },
]);
</script>
