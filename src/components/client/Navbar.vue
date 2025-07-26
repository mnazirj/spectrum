<template>
  <section>
    <div class="container mt-2">
      <div class="row align-items-center justify-content-between">
        <div class="col-12 col-lg-2">
          <h2 class="text-uppercase">
            <a href="/home" class="text-decoration-none text-dark">Spectrum</a>
          </h2>
        </div>

        <div class="col">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText placeholder="Search" class="w-100 bg-body-secondary border-0 rounded-0" />
          </IconField>
        </div>

        <div class="col-12 col-lg-4">
          <div class="d-flex flex-row align-items-center justify-content-center gap-3">
            <div>
              <SelectButton v-model="selectedLang" :options="options" size="small" :allowEmpty="false" />
            </div>
            <span>|</span>
            <div class="d-flex gap-1">
              <Button icon="fas fa-user-circle" rounded variant="text" size="large" v-if="!userLogged" as="a" :href="'/signin'" class="text-decoration-none" />
              <Button icon="fas fa-user-circle" rounded variant="text" size="large" as="a" :href="'/client/home'" class="text-decoration-none" v-else />
              <Button name="wish" icon="fas fa-heart" :badge="$store.state.wishlist.length > 0 ? String($store.state.wishlist.length) : '0'" rounded variant="text" size="large" @click="wishlist = true" />
              <Button icon="fas fa-shopping-cart" :badge="$store.state.cart.length > 0 ? String($store.state.cart.length) : '0'" rounded variant="text" size="large" @click="cartVisible = true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr class="mb-0" />
    <nav class="navbar navbar-expand-lg">
      <div class="container">
        <button class="navbar-toggler bg-dark w-100 text-white" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" aria-expanded="false" aria-label="Toggle navigation"><i class="text-white fas fa-shopping-cart" /> Shop</button>
        <div class="collapse navbar-collapse" id="main_nav">
          <ul class="navbar-nav gap-2">
            <div v-for="item in Menu" :key="item">
              <li class="dropdown nav-item has-megamenu" v-if="item.items != null">
                <a v-if="item.label != 'Brands'" class="nav-link cursor-pointer" @click="viewByType(item.slug, 'category')">
                  <span v-if="$i18n.locale == 'en'"> {{ item.label }}</span>
                  <span v-else class="font-bold text-black"> {{ item.arLabel }}</span>
                </a>
                <a v-else class="nav-link cursor-pointer">
                  <span v-if="$i18n.locale == 'en'">
                    {{ item.label }}
                  </span>
                  <span v-else class="fw-bold text-black">
                    {{ item.arLabel }}
                  </span>
                </a>

                <div class="dropdown-menu border-0 megamenu" role="menu" data-bs-popper="none">
                  <div class="container">
                    <div class="g-3 row">
                      <div class="col-6 col-lg-3 px-3" v-for="sub in item.items" :key="sub">
                        <div>
                          <h6 class="title" v-if="item.label != 'Brands'" @click="viewByType(item.slug, 'sub')">
                            <span v-if="$i18n.locale == 'en'">
                              {{ sub.label }}
                            </span>
                            <span v-else>
                              {{ sub.arLabel }}
                            </span>
                          </h6>
                          <h6 class="title cursor-pointer" v-else>
                            <a class="menu-link" @click="viewByType(sub.slug, 'brand')">
                              <span v-if="$i18n.locale == 'en'">{{ sub.label }}</span>
                              <span v-else>{{ sub.arLabel }}</span>
                            </a>
                          </h6>
                          <hr class="mt-0" v-if="sub.items != null" />
                          <ul class="list-unstyled">
                            <li v-for="item in sub.items" :key="item">
                              <a @click="viewByType(item.slug, 'items')" class="menu-link cursor-pointer">
                                <span v-if="$i18n.locale == 'en'">{{ item.title }}</span>
                                <span v-else>{{ item.arName }}</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li class="nav-item font-avg" v-else>
                <a class="nav-link" data-bs-toggle="dropdown" href="#">
                  {{ item.label }}
                </a>
              </li>
            </div>
          </ul>
        </div>
        <!-- navbar-collapse.// -->
      </div>
      <!-- container-fluid.// -->
    </nav>
    <hr class="mt-0" />
    <Drawer v-model:visible="cartVisible" :position="$i18n.locale == 'ar' ? 'left' : 'right'" style="width: 25rem">
      <template #header>
        <h4 class="font-avg"><i class="fas fa-shopping-cart text-dark"></i> {{ $t("client.shop.basket") }}</h4>
      </template>
      <hr class="w-100 mt-0" />
      <div v-if="$store.state.cart.length > 0">
        <div class="card border-0" v-for="(item, index) in $store.state.cart" :key="item">
          <div class="card-body">
            <div class="d-flex gap-2">
              <div>
                <img :src="`http://publicws.spectrum.e-ibtikar.com/images/${item.image}`" width="128" height="128" :alt="item.name" />
              </div>
              <div>
                <h6>{{ item.name }}</h6>
                <div class="d-flex flex-row gap-2 align-items-center mb-1">
                  <h6>{{ $t("client.checkout.qty") }}:</h6>
                  <Button icon="fas fa-plus" size="small" class="rounded-0" @click="INCREMENT_QTY(index)" />
                  <h6 class="mt-2 me-1">{{ item.qty }}</h6>
                  <Button icon="fas fa-minus" size="small" class="rounded-0" @click="DECREMENT_QTY(index)" />
                </div>

                <h6 v-if="item.size">{{ $t("client.shop.size") }}: {{ item.size }} {{ $t("client.checkout.mm") }}</h6>
                <h6 v-if="item.color">{{ $t("client.shop.color") }}: {{ item.color.toUpperCase() }}</h6>
                <h6>{{ $t("client.shop.price") }}: {{ item.price.toFixed(2) }} {{ $t("client.shop.lyd") }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h5 v-else class="text-center">{{ $t("client.shop.empty") }}</h5>
      <template #footer>
        <div class="d-flex flex-column align-items-end">
          <h5 class="font-avg">
            {{ $t("client.shop.total") }}: <span class="text-muted">{{ total.toFixed(2) }}</span> {{ $t("client.shop.lyd") }}
          </h5>
          <hr class="w-100" />
          <Button :label="$t('client.shop.checkout')" icon="fas fa-credit-card" class="w-100 rounded-0 text-decoration-none" as="a" href="/checkout" />
        </div>
      </template>
    </Drawer>

    <Dialog v-model:visible="wishlist" modal dismissableMask :position="$i18n.locale == 'ar' ? 'left' : 'right'" style="width: 30rem">
      <template #header>
        <h4 class="font-avg"><i class="fas fa-heart text-dark"></i> {{ $t("client.shop.wishlist") }}</h4>
      </template>
      <hr class="w-100 mt-0" />
      <div v-if="$store.state.wishlist.length > 0">
        <div class="card border-0" v-for="item in $store.state.wishlist" :key="item">
          <div class="card-body">
            <div class="d-flex gap-2">
              <div>
                <img :src="`http://publicws.spectrum.e-ibtikar.com/images/${item.image}`" width="128" height="128" :alt="item.name" />
              </div>
              <div>
                <h6>{{ item.name }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h4 class="text-center">{{ $t("client.shop.wempty") }}</h4>
      </div>
    </Dialog>
  </section>
</template>

<style scoped>
.dropdown:hover .dropdown-menu {
  display: block;
  margin-top: -10px !important;
}

/* ============ desktop view ============ */
@media all and (min-width: 992px) {
  .navbar .has-megamenu {
    position: static !important;
  }

  .navbar .megamenu {
    left: 0;
    right: 0;
    width: 100%;
    margin-top: 0;
  }
}

/* ============ desktop view .end// ============ */

/* ============ mobile view ============ */
@media (max-width: 991px) {
  .navbar.fixed-top .navbar-collapse,
  .navbar.sticky-top .navbar-collapse {
    overflow-y: auto;
    max-height: 90vh;
    margin-top: 10px;
  }
}
</style>

<script setup>
import Button from "primevue/button";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Carousel from "primevue/carousel";
import { onMounted, ref, watch, computed } from "vue";
import SelectButton from "primevue/selectbutton";
import Drawer from "primevue/drawer";
import axios from "axios";
import router from "@/router";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import Dialog from "primevue/dialog";

const store = useStore();
const { locale } = useI18n();
const Menu = ref(null);
const selectedLang = ref("EN");
const userLogged = ref(false);
const options = ref(["AR", "EN"]);
const cartVisible = ref(false);
const total = computed(() => store.getters.total);
const wishlist = ref(false);
function fetchMenu() {
  axios.get("/homepage/projects").then((res) => {
    Menu.value = res.data.menu;
  });
}

function viewByType(slug, type) {
  router.push({ name: "shopping", params: { type, slug } });
}

watch(selectedLang, (newLang, oldLang) => {
  if (oldLang !== newLang) {
    locale.value = newLang.toLocaleLowerCase();
    localStorage.setItem("locale", newLang.toLocaleLowerCase());
  }
});

function INCREMENT_QTY(index) {
  store.commit("INCREMENT_QTY", index);
  store.commit("STORE_CART", total);
}
function DECREMENT_QTY(index) {
  store.commit("DECREMENT_QTY", index);
  store.commit("STORE_CART", total);
}

onMounted(() => {
  fetchMenu();
  if (localStorage.getItem("_token") != null) {
    userLogged.value = true;
  }
  selectedLang.value = locale.value.toUpperCase();
});
</script>
