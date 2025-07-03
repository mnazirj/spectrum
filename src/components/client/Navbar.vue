<template>
  <section>
    <div class="container mt-2">
      <div class="row align-items-center justify-content-between">
        <div class="col-12 col-lg-2">
          <h2 class="text-uppercase">Spectrum</h2>
        </div>

        <div class="col">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText v-model="value1" placeholder="Search" class="w-100 bg-body-secondary border-0 rounded-0" />
          </IconField>
        </div>

        <div class="col-12 col-lg-4">
          <div class="d-flex flex-row align-items-center justify-content-center gap-3">
            <div>
              <span><i class="fa-box fas me-2" />Store & Services</span>
            </div>
            <span>|</span>
            <div class="d-flex gap-1">
              <Button icon="fas fa-user-circle" rounded variant="text" size="large" v-if="!userLogged" />
              <Button icon="fas fa-user-circle" rounded variant="text" size="large" as="a" :href="'/' + $i18n.locale + '/client/home'" class="text-decoration-none" v-else />
              <Button icon="fas fa-heart" rounded variant="text" size="large" />
              <Button icon="fas fa-shopping-cart" rounded variant="text" size="large" />
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
          <ul class="navbar-nav gap-5">
            <div v-for="item in Menu" :key="item">
              <li class="dropdown nav-item has-megamenu" v-if="item.items != null">
                <a class="nav-link" :href="'/' + $i18n.locale + '/shop/' + item.slug">
                  {{ item.label }}
                </a>

                <div class="dropdown-menu border-0 megamenu" role="menu" data-bs-popper="none">
                  <div class="container">
                    <div class="g-3 row">
                      <div class="col-6 col-lg-3 px-3" v-for="sub in item.items" :key="sub">
                        <div class="col-megamenu">
                          <h6 class="title" v-if="item.label != 'Brands'">{{ sub.label }}</h6>
                          <h6 class="title" v-else>
                            <a :href="'/' + $i18n.locale + '/shop/' + sub.slug" class="menu-link">
                              {{ sub.label }}
                            </a>
                          </h6>
                          <hr class="mt-0" v-if="sub.items != null" />
                          <ul class="list-unstyled">
                            <li v-for="item in sub.items" :key="item">
                              <a :href="'/' + $i18n.locale + '/shop/' + item.slug" class="menu-link">{{ item.title }}</a>
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
import { onMounted, ref } from "vue";
import axios from "axios";

const Menu = ref(null);
const userLogged = ref(false);
function fetchMenu() {
  axios.get("/homepage/projects").then((res) => {
    Menu.value = res.data.menu;
  });
}

onMounted(() => {
  fetchMenu();
  if (localStorage.getItem("_token") != null) {
    userLogged.value = true;
  }
});
</script>
