<template>
  <div id="sidebar" class="collapse collapse-horizontal h-100 show">
    <div id="sidebar-nav" class="h-100">
      <div class="d-flex flex-column p-2 h-100 bg-main text-white">
        <div id="header" class="ps-2 d-flex flex-wrap align-items-center">
          <span class="fs-2 w-75 ps-2" :style="{ fontFamily: 'Rokkitt' }">MENU</span>
          <div class="w-25 d-flex justify-content-end">
            <i
              class="pi pi-angle-double-left cursor-pointer"
              data-bs-toggle="collapse"
              data-bs-target="#sidebar"
              @click="emits('handelSideToggleShow')"
            />
          </div>
        </div>
        <div
          id="body"
          class="d-flex justify-content-center align-items-center mt-3 p-1 ps-3"
        >
          <ul class="list-group m-2 w-100 text-nowrap">
            <router-link
              :class="[
                'list-group-item prim-list-item bg-main text-white border-0 p-1 my-2 rounded-2',
                isActive('Overview') ? 'active' : '',
              ]"
              :to="{ name: 'Overview' }"
            >
              <i class="pi pi-objects-column mx-2" />
              <span class="mx-1">Overview</span>
            </router-link>
            <li
              class="list-group-item bg-main text-white border-0 p-0 rounded-2 my-2"
              id="list1"
            >
              <div
                class="w-100 d-flex prim-list-item cursor-pointer justify-content-between p-1 rounded-2 align-items-center"
                data-bs-target="#second-list1"
                data-bs-toggle="collapse"
                @click="changeIcon('list1Icon', 'list1')"
              >
                <div>
                  <i class="pi pi-shop mx-2" />
                  <span class="mx-1">Invontry Mangment</span>
                </div>
                <i id="list1Icon" class="pi pi-chevron-right text-end" />
              </div>

              <ul
                id="second-list1"
                class="list-group m-2 ms-3 width-90 collapse"
              >
                <router-link
                  :class="[
                    'list-group-item prim-list-item bg-main text-white border-0 p-1  my-2 rounded-2',
                    isActive('Storage') ? 'active' : '',
                  ]"
                  :to="{ name : 'Storage'}"
                >
                  <i class="pi pi-warehouse mx-2" />
                  <span class="mx-1">Storage</span>
                </router-link>
                <router-link
                  :class="[
                    'list-group-item prim-list-item bg-main text-white border-0 p-1  my-2 rounded-2',
                    isActive('') ? 'active' : '',
                  ]"
                >
                  <i class="pi pi-filter-fill mx-2" />
                  <span class="mx-1">Categories</span>
                </router-link>
                <router-link
                  :class="[
                    'list-group-item prim-list-item bg-main text-white border-0 p-1  my-2 rounded-2',
                    isActive('') ? 'active' : '',
                  ]"
                >
                  <i class="pi pi-building mx-2" />
                  <span class="mx-1">Companies</span>
                </router-link>
              </ul>
            </li>
            <router-link
              :class="[
                'list-group-item prim-list-item bg-main text-white border-0 p-1 my-2 rounded-2',
                isActive('') ? 'active' : '',
              ]"
            >
              <i class="pi pi-shopping-cart mx-2" />
              <span class="mx-1">Order Mangment</span>
            </router-link>
            <router-link
              :class="[
                'list-group-item prim-list-item bg-main text-white border-0 p-1 my-2 rounded-2',
                isActive('') ? 'active' : '',
              ]"
            >
              <i class="pi pi-users mx-2" />
              <span class="mx-1">Customer Mangment</span>
            </router-link>
            <router-link
              :class="[
                'list-group-item prim-list-item bg-main text-white border-0 p-1 my-2 rounded-2',
                isActive('') ? 'active' : '',
              ]"
            >
              <i class="pi pi-chart-line mx-2" />
              <span class="mx-1">Sales Analytics</span>
            </router-link>
            <router-link
              :class="[
                'list-group-item prim-list-item bg-main text-white border-0 p-1 my-2 rounded-2',
                isActive('') ? 'active' : '',
              ]"
            >
              <i class="pi pi-wallet mx-2" />
              <span class="mx-1">Payment Analytics</span>
            </router-link>
            <router-link
              :class="[
                'list-group-item prim-list-item bg-main text-white border-0 p-1 my-2 rounded-2',
                isActive('') ? 'active' : '',
              ]"
            >
              <i class="pi pi-gauge mx-2" />
              <span class="mx-1">Performance Indictors</span>
            </router-link>
            <router-link
              :class="[
                'list-group-item prim-list-item bg-main text-white border-0 p-1 my-2 rounded-2',
                isActive('') ? 'active' : '',
              ]"
            >
              <i class="pi pi-exclamation-triangle mx-2" />
              <span class="mx-1">Custome Reports</span>
            </router-link>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

import { ref, defineEmits, onMounted } from "vue";
import { useRoute } from "vue-router";

// Data
// const isShow = ref(true);
const emits = defineEmits(["handelSideToggleShow"]);
const route = useRoute();
// Methods

function changeIcon(iconId) {
  if (document.getElementById(iconId).classList.contains("pi-chevron-right")) {
    document.getElementById(iconId).classList.remove("pi-chevron-right");
    document.getElementById(iconId).classList.add("pi-chevron-down");
  } else if (
    document.getElementById(iconId).classList.contains("pi-chevron-down")
  ) {
    document.getElementById(iconId).classList.remove("pi-chevron-down");
    document.getElementById(iconId).classList.add("pi-chevron-right");
  }
}
function isActive(routeName) {
  return route.name === routeName;
}
</script>

<style scoped>
#sidebar-nav {
  height: calc(100vh - 9rem);
  min-height: calc(100vh - 9rem);
  width: 15rem;
  transition: width 0.3s ease;
  /* color:inherit */
}
/* ::v-deep .ah:hover {
  background: #fff !important;
  color: #1d3223 !important;
}
::v-deep .text-inherit {
  color: inherit !important;
}
::v-deep .ac:hover {
  background: #fff !important;
  color: #1d3223 !important;
} */
.prim-list-item:hover {
  color: #284530 !important;
  background: #e4e4e4 !important;
}
.prim-list-item:is(.active) {
  color: #0f2312 !important;
  background: #ffffff !important;
}
</style>
