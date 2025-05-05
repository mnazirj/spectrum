<!-- <template>
  <Toolbar
    class="nav"
    pt:root="flex-nowrap bg-primary rounded-0 border-0 gap-0 p-0 border-bottom-1"
    pt:start="w-25"
    pt:center="w-50"
    pt:end="w-25"
  >
    <template #start>
      <div
        class="w-100 h-100 d-flex align-items-center flex-wrap ps-4"
        :style="{ backgroundColor: 'red' }"
      >
        <div class="w-100 d-flex align-item-center">
          <img src="@/assets/images/dashboard/logo.svg" :style="{width:'5rem' , height:'4rem'}" />
        </div>
        <div class="w-100 d-flex align-item-center">
          <p :style="{fontSize:'20px'}">Spectrum</p>
        </div>
      </div>
    </template>
    <template #center>
      <div
        class="w-100 d-flex flex-wrap align-items-center"
        :style="{ 'background-color': 'green' }"
      >
        <div class="w-100 d-flex justify-content-end">
          <div class="w-75 d-flex justify-content-end">
            <div class="d-flex align-items-center w-75">Data</div>
            <div class="d-flex justify-content-end align-items-center w-25">
              Language
            </div>
          </div>
        </div>
        <div class="w-100 d-flex justify-content-center align-items-center">
          Search
        </div>
      </div>
    </template>
    <template #end>
      <div
        class="w-100 d-flex justify-content-center align-items-center border-left-1"
        :style="{ 'background-color': 'blue' }"
      >
        <div
          class="w-75 d-flex justify-content-center align-content-center flex-wrap"
        >
          <div class="w-100 d-flex justify-content-center">User-img</div>
          <div class="w-100 d-flex justify-content-center">username</div>
        </div>
      </div>
    </template>
  </Toolbar>
</template> -->
<template>
  <nav id="nav" class="navbar navbar-expand-lg bg-main text-white pb-0">
    <div class="container-fluid p-0" >
      <div class="w-100 d-flex justify-content-center border-bottom-3">
        <!-- Start -->
        <div class="width-20 d-flex">
          <div
            class="w-100 h-100 d-flex align-items-center flex-wrap ps-4"
            :style="{}"
          >
            <div class="w-50 d-flex align-item-center pt-2 ms-4">
              <img
                src="@/assets/images/dashboard/logo.svg"
                :style="{ width: '5rem', height: '4rem' }"
              />
            </div>
            <div class="w-100 d-flex align-item-center">
              <p :style="{ fontSize: '35px', fontFamily: 'Rokkitt' }">
                Spectrum
              </p>
            </div>
          </div>
        </div>

        <!-- Center -->
        <div class="width-60 d-flex">
          <div class="w-100 d-flex flex-wrap align-items-center" :style="{}">
            <div class="w-100 d-flex justify-content-end">
              <div class="width-80 d-flex justify-content-end">
                <div
                  class="d-flex flex-wrap align-items-center w-75 text-nowrap"
                >
                  <div class="mx-2 fs-4">
                    <i class="pi pi-calendar mx-1 fs-4"></i>
                    {{ currentDate }}
                  </div>
                  <div class="mx-2 fs-4">
                    <i class="pi pi-clock mx-1 fs-4"></i>
                    {{ currentTime }}
                  </div>
                </div>
                <div
                  class="d-flex justify-content-end align-items-center w-25 pe-4"
                  :style="{ minWidth: '9rem' }"
                >
                  <Select
                    v-model="languageSelected"
                    placeholder="Language"
                    :options="languages"
                    optionLabel="name"
                    fluid
                    @change="test()"
                  >
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex items-center">
                        <img
                          :alt="slotProps.value.label"
                          :src="slotProps.value.flag"
                          :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                          style="width: 18px"
                        />
                        <div>{{ slotProps.value.name }}</div>
                      </div>
                      <span v-else>
                        {{ slotProps.placeholder }}
                      </span>
                    </template>
                    <template #option="slotProps">
                      <div class="flex items-center">
                        <img
                          :alt="slotProps.option.label"
                          :src="slotProps.option.flag"
                          :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                          style="width: 18px"
                        />
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
            <div class="w-100 d-flex justify-content-center align-items-center">
              <IconField class="width-60">
                <InputIcon class="pi pi-search" />
                <InputText
                  v-model="searchValue"
                  placeholder="Search"
                  class="w-100"
                />
              </IconField>
            </div>
          </div>
        </div>

        <!-- End -->
        <div class="width-20 d-flex">
          <div
            class="w-100 d-flex justify-content-center align-items-center border-left-2"
            :style="{}"
          >
            <div
              class="w-75 d-flex justify-content-center align-content-center flex-wrap"
            >
              <div class="w-100 d-flex justify-content-center">
                <img
                  :src="user.img"
                  :style="{ width: '5rem', height: '5rem' }"
                  class="rounded-circle cursor-pointer"
                  @click="toggle"
                />
              </div>
              <div class="w-100 d-flex justify-content-center">
                <span class="fs-5 w-100 text-center cursor-pointer" @click="toggle">{{
                  user.username
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <Popover
          ref="op"
          pt:root="border-3 rounded-2 text-white"
          pt:content="p-0 bg-main-700 "
        >
          <div
            class="d-flex justify-content-center align-items-center flex-wrap"
            :style="{ width: '14rem' }"
          >
            <div
              class="w-75 d-flex flex-wrap justify-content-center border-bottom-1 my-3"
            >
              <div class="w-100 d-flex justify-content-center">
                <img
                  :src="user.img"
                  :style="{ width: '5rem', height: '5rem' }"
                  class="rounded-circle"
                />
              </div>
              <div class="w-100 text-center my-2">
                <span class="">{{ user.username }}</span>
              </div>
            </div>
            <div class="width-60 d-flex justify-content-center">
              <ul class="list-group w-100">
                <li class="list-group-item my-2 rounded-2 bg-main-700 text-white border-0  text-nowrap p-0 cursor-pointer p-1">
                  <i class="pi pi-user mx-2" />
                  <span>My Account</span>
                </li>
                <li class="list-group-item my-2 rounded-2 bg-main-700 text-white border-0  text-nowrap p-0 cursor-pointer p-1">
                  <i class="pi pi-cog mx-2" />
                  <span>Settings</span>
                </li>
              </ul>
            </div>
            <div class="width-60 d-flex justify-content-center my-2">
              <Button
                pt:root="bg-main border-0"
                label="Logout"
                icon="pi pi-sign-out"
                fluid
              />
            </div>
          </div>
        </Popover>
        <!--  -->
      </div>
    </div>
  </nav>
</template>

<script setup>
// import Toolbar from "primevue/toolbar";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Popover from "primevue/popover";
import Button from "primevue/button";

import { computed, onBeforeUnmount, onMounted, ref } from "vue";
// Data
const searchValue = ref(null);
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
const languageSelected = ref({
  name: "English",
  code: "EN",
  flag: require("@/assets/images/dashboard/us.svg"),
});
const op = ref();

const user = ref({
  id: 1,
  username: "Mohammad Mahmoud",
  email: "mohammad@test.com",
  img: require("@/assets/images/dashboard/user-img.jpeg"),
});

// Computed
/*const getCurrentDate = computed(() => {
  let myTime = new Date();
  myTime = myTime.toISOString().split("T")[0];
  return myTime;
});
const getCurrentHour = computed(() => {
  let myTime = new Date();
  myTime = myTime.toISOString().split("T")[1].split(".")[0];
  return myTime;
});*/

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
function test() {
  console.log(languageSelected.value);
}
const toggle = (event) => {
  op.value.toggle(event);
};

onMounted(() => {
  updateTime();
  intervalId = setInterval(updateTime, 1000);
});
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style scoped>
#nav {
  width: 100%;
  height: 9rem;
  max-height: 9rem;
}
.list-group-item:hover{
  background:#fff !important;
  color:#1D3223 !important;

}
</style>
