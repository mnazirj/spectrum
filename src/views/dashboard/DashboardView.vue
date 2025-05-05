<template>
  <div class="container-fluid">
    <div class="row">
      <div id="navbar-container" class="p-0 m-0 col-12">
        <Navbar />
      </div>
      <div class="col-12 row flex-nowrap p-0">
        <div
          id="sidebar-container"
          :class="['p-0 col-auto', isShow ? 'shown' : '']"
        >
          <Sidebar @handel-side-toggle-show="sideToggleShow" />
        </div>
        <main class="col">
          <div v-if="!isShow" class="fixed z-3">
            <button
              type="button"
              class="btn bg-main text-white"
              data-bs-toggle="collapse"
              data-bs-target="#sidebar"
              @click="isShow = !isShow"
            >
              <i class="pi pi-align-justify"></i>
            </button>
          </div>
          <router-view />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from "@/components/dashboard/Navbar.vue";
import Sidebar from "@/components/dashboard/Sidebar.vue";
import { ref } from "vue";

const isShow = ref(true);

function sideToggleShow() {
  isShow.value = !isShow.value;
}
</script>

<style scoped>
/* Tables */
::v-deep .custom-datatable .p-datatable-thead > tr > th {
  background-color: var(--primary-color-500) !important;
  color: var(--primary-text-color-500) !important;
}

::v-deep .custom-datatable .p-datatable-thead > tr > th:first-child {
  border-top-left-radius: 0.5rem;
}
::v-deep .custom-datatable .p-datatable-thead > tr > th:last-child {
  border-top-right-radius: 0.5rem;
}
/* Buttons */
::v-deep   .p-button:is(.custom-button){
  background: var(--primary-color-500);
}
::v-deep .p-button:is(.custom-button):not(:disabled):hover {
  background: var(--primary-color-600);
}
</style>
