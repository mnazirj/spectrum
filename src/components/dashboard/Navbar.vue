<template>
  <div>
    <nav id="nav" class="navbar bg-main text-white border-bottom-3 pb-0" :style="{ maxWidth: '100%' }">
      <div class="container-fluid px-2 m-0">
        <div id="content-container" class="w-100 d-flex justify-content-center">
          <!-- Start -->
          <div id="start" class="width-20 d-flex">
            <div :class="['w-100 h-100 d-flex align-items-center flex-wrap', isEng ? 'ps-4' : 'pe-4']" :style="{}">
              <div :class="['w-50 d-flex align-item-center pt-1', isEng ? 'ms-4' : 'me-4']">
                <img src="@/assets/images/dashboard/logo.svg" :style="{ width: '5rem', height: '4rem' }" />
              </div>
              <div class="w-100 d-flex align-item-center">
                <p :style="{ fontSize: '35px', fontFamily: 'Rokkitt' }">Spectrum</p>
              </div>
            </div>
          </div>

          <!-- Center -->
          <div id="center" class="width-60 d-flex">
            <div class="w-100 d-flex flex-wrap align-items-center" :style="{}">
              <div class="w-100 d-flex justify-content-end">
                <div class="width-80 d-flex justify-content-end">
                  <div class="d-flex flex-wrap align-items-center w-75 text-nowrap">
                    <div class="mx-2 fs-4">
                      <i class="pi pi-calendar mx-1 fs-4"></i>
                      {{ currentDate }}
                    </div>
                    <div class="mx-2 fs-4">
                      <i class="pi pi-clock mx-1 fs-4"></i>
                      {{ currentTime }}
                    </div>
                  </div>
                  <div id="language" :class="['d-flex justify-content-end align-items-center', isEng ? 'pe-4' : 'ps-4']" :style="{ minWidth: '10rem' }">
                    <Select v-model="languageSelected" placeholder="Language" :options="languages" optionLabel="name" fluid @change="changeLocation">
                      <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">
                          <img :alt="slotProps.value.label" :src="slotProps.value.flag" :class="[`flag flag-${slotProps.value.code.toLowerCase()} mx-2`]" style="width: 18px" />
                          <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                          {{ slotProps.placeholder }}
                        </span>
                      </template>
                      <template #option="slotProps">
                        <div :class="['flex items-center w-100', isEng ? 'me-2' : 'ms-2']" :dir="isEng ? 'ltr' : 'rtl'">
                          <img :alt="slotProps.option.label" :src="slotProps.option.flag" :class="[`flag flag-${slotProps.option.code.toLowerCase()} mx-2`]" style="width: 18px" />
                          <div>{{ slotProps.option.name }}</div>
                        </div>
                      </template>
                      <template #dropdownicon>
                        <i class="pi pi-globe" />
                      </template>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- End -->
          <div id="end" :class="['width-20 d-flex', isEng ? 'ltr' : 'rtl']">
            <div class="w-100 d-flex justify-content-center align-items-center" :style="{}">
              <div class="width-60 d-flex justify-content-center flex-wrap relative">
                <div class="w-100 d-flex justify-content-center">
                  <span class="fs-5 w-100 text-center cursor-pointer" @click="visibleDrawer = true">{{ user.firstName }} {{ user.lastName }}</span>
                </div>
              </div>
              <div id="notification-container" class="d-flex justify-content-center h-100">
                <div
                  class="relative mt-2"
                  :style="{
                    width: '2.5rem',
                    height: '2.5rem',
                    minWidth: '2.5rem',
                    minHeight: '2.5rem',
                    right: '0px',
                    top: '0px',
                  }"
                  @click="toggleNotification"></div>
              </div>
            </div>
          </div>
          <Drawer v-model:visible="visibleDrawer" header="My Account" :position="isEng ? 'right' : 'left'">
            <div class="d-flex flex-column justify-content-between h-100">
              <div class="d-flex flex-wrap justify-content-center align-items-center w-100">
                <div class="w-100 d-flex flex-wrap justify-content-center align-items-center">
                  <div class="w-100 text-center my-2">
                    <span class="fs-4 font-bold font-monospace">{{ user.firstName }} {{ user.lastName }}</span>
                  </div>
                </div>
                <div class="w-100 d-flex flex-wrap justify-content-center align-items-center mt-3">
                  <!-- <ul class="list-group w-100">
                    <router-link class="list-group-item my-2 rounded-2 border-0 text-nowrap cursor-pointer p-1 py-2 text-center fs-5" :to="{ name: 'Profile' }">
                      <i class="pi pi-user mx-2" />
                      <span>My Account</span>
                    </router-link>

                    <router-link class="list-group-item my-2 rounded-2 border-0 text-nowrap cursor-pointer p-1 py-2 text-center fs-5" :to="{ name: 'Settings' }">
                      <i class="pi pi-cog mx-2" />
                      <span>Settings</span>
                    </router-link>
                  </ul> -->
                </div>
              </div>
              <div class="d-flex flex-wrap justify-content-center align-items-center w-100">
                <Button icon="pi pi-sign-out" class="fs-5" label="Logout" fluid @click="logout" />
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
// import Toolbar from "primevue/toolbar";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Popover from "primevue/popover";
import Button from "primevue/button";
import Drawer from "primevue/drawer";
import axios from "axios";

import { computed, onBeforeUnmount, onMounted, onBeforeMount, ref, defineProps } from "vue";
import router from "@/router";

// Props

const props = defineProps({
  user: {
    Type: Object,
    required: true,
    default: {
      username: "Default Name",
      email: "Default@default.com",
      birthday: null,
      img: null,
      password: null,
    },
  },
});

// Hooks
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});
onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
  if (localStorage.getItem("locale") == "en") {
    languageSelected.value = {
      name: "English",
      code: "EN",
      flag: require("@/assets/images/dashboard/us.svg"),
    };
  } else {
    languageSelected.value = {
      name: "Arabic",
      code: "AR",
      flag: require("@/assets/images/dashboard/sa.svg"),
    };
  }
});
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

// Data
const searchValue = ref(null);
const isEng = ref(false);
const currentDate = ref(new Date().toISOString().split("T")[0]);
const currentTime = ref(null);
let intervalId;
const languages = ref([
  {
    name: "English",
    code: "EN",
    flag: require("@/assets/images/dashboard/us.svg"),
  },
  {
    name: "Arabic",
    code: "AR",
    flag: require("@/assets/images/dashboard/sa.svg"),
  },
]);
const languageSelected = ref(null);
const op = ref();
const visibleDrawer = ref(false);
const user = ref({
  id: 1,
  username: "Mohammad",
  email: "mohammad@test.com",
  img: require("@/assets/images/dashboard/user-img.jpeg"),
  birthday: "1919-7-25",
});

// Methods
function updateTime() {
  const now = new Date();
  currentTime.value = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

function logout() {
  try {
    axios
      .post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("_token")}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          router.push({ name: "Login" });
          localStorage.removeItem("_token");
        }
      });
  } catch (e) {
    console.log(e);
  }
}

function changeLocation() {
  localStorage.setItem("locale", languageSelected.value.code.toLowerCase());
  window.location.reload();
}

onMounted(() => {
  axios
    .post(
      "auth/getUser",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_token")}`,
        },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        user.value = res.data.user;
        console.log(res.data);
      }
    });
});
</script>

<style scoped>
::v-deep a {
  color: inherit !important;
  text-decoration: none !important;
}
#nav {
  width: 100%;
}
.list-group-item:hover {
  background: var(--primary-color-500) !important;
  color: var(--primary-text-color-500) !important;
}
#notification:hover {
  background: rgb(236, 236, 236);
}
#show-more-container a:hover {
  color: rgb(0, 0, 0) !important;
  font-size: 1.3rem !important;
}
#show-more-container:has(a:hover) {
  background: #f2f2f2 !important;
}
@media (min-width: 686px) {
  #nav {
    height: 9.5rem;
    max-height: 9.5rem;
  }
  #end:is(.ltr) > div {
    border-left: 3px solid #fff;
  }
  #end:is(.rtl) > div {
    border-right: 3px solid #fff;
  }
  #language {
    width: 25%;
  }
}
@media (max-width: 687px) {
  #content-container {
    flex-wrap: wrap;
    justify-content: center;
  }
  #content-container div:not(#start) {
    width: 100%;
    padding: 4px 4px 0px;
  }
  #nav {
    height: 27rem;
    max-height: 27rem;
  }
  #language {
    padding: 1rem;
  }
}
</style>
