<template>
  <div class="container-fluid px-0">
    <div class="row m-0">
      <div id="navbar-container" class="p-0 m-0 col-12">
        <Navbar />
      </div>
      <div class="col-12 row flex-nowrap m-0 p-0">
        <div
          id="sidebar-container"
          :class="['p-0  col-auto', isShow ? 'shown' : '']"
        >
          <Sidebar @handel-side-toggle-show="sideToggleShow" />
        </div>
        <main class="col">
          <div v-if="!isShow" class="fixed z-5">
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
          <router-view :user="user" />
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
const user = ref({
  id: 1,
  username: "Mohammad Mahmoud",
  email: "mohammad@test.com",
  img: require("@/assets/images/dashboard/user-img.jpeg"),
  birthday: "1919-7-25",
  password: "mohammad123",
});
function sideToggleShow() {
  isShow.value = !isShow.value;
}
</script>

<style scoped>

main {
  transition: all 0.3s ease;
  /* max-width: calc(100% - 15rem); */
}
#sidebar-container:is(.shown) + main {
  max-width: calc(100% - 15rem);
}
#sidebar-container:not(.shown) + main {
  max-width: 100%;
}
/* Tables */
::v-deep .custom-datatable .p-datatable-thead > tr:first-child > th {
  background-color: var(--primary-color-500) !important;
  color: var(--primary-text-color-500) !important;
}

::v-deep
  .custom-datatable
  .p-datatable-thead
  > tr:first-child
  > th:first-child {
  border-top-left-radius: 0.5rem;
}
::v-deep .custom-datatable .p-datatable-thead > tr:first-child > th:last-child {
  border-top-right-radius: 0.5rem;
}
/* Buttons */
::v-deep .p-button:is(.custom-button) {
  background: var(--primary-color-500);
}
::v-deep .p-button:is(.custom-button):not(:disabled):hover {
  background: var(--primary-color-600);
}
/*  */
</style>
