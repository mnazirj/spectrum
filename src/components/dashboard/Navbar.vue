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
  <div>
    <nav
      id="nav"
      class="navbar bg-main text-white border-bottom-3 pb-0"
      :style="{ maxWidth: '100%' }"
    >
      <div class="container-fluid px-2 m-0">
        <div id="content-container" class="w-100 d-flex justify-content-center">
          <!-- Start -->
          <div id="start" class="width-20 d-flex">
            <div
              class="w-100 h-100 d-flex align-items-center flex-wrap ps-4"
              :style="{}"
            >
              <div class="w-50 d-flex align-item-center pt-1 ms-4">
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
          <div id="center" class="width-60 d-flex">
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
                    id="language"
                    class="d-flex justify-content-end align-items-center pe-4"
                    :style="{ minWidth: '10rem' }"
                  >
                    <Select
                      v-model="languageSelected"
                      placeholder="Language"
                      :options="languages"
                      optionLabel="name"
                      fluid
                      @change="changeLocation"
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
              <div
                class="w-100 d-flex justify-content-center align-items-center"
              >
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
          <div id="end" class="width-20 d-flex">
            <div
              class="w-100 d-flex justify-content-center align-items-center"
              :style="{}"
            >
              <div
                class="width-60 d-flex justify-content-center flex-wrap relative"
              >
                <div class="w-100 d-flex justify-content-center">
                  <img
                    :src="user.img"
                    :style="{ width: '5rem', height: '5rem' }"
                    class="rounded-circle cursor-pointer"
                    @click="visibleDrawer = true"
                  />
                </div>
                <div class="w-100 d-flex justify-content-center">
                  <span
                    class="fs-5 w-100 text-center cursor-pointer"
                    @click="visibleDrawer = true"
                    >{{ user.username }}</span
                  >
                </div>
              </div>
              <div
                id="notification-container"
                class="d-flex justify-content-center h-100"
              >
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
                  @click="toggleNotification"
                >
                  <Button
                    severity="secondary"
                    icon="pi pi-bell"
                    rounded
                    raised
                    class="rounded-circle"
                  />
                  <span
                    class="bg-danger rounded-circle d-flex justify-content-center align-items-center cursor-pointer"
                    :style="{
                      position: 'absolute',
                      right: '-7px',
                      top: '-7px',
                      width: '1.55rem',
                      height: '1.5rem',
                    }"
                    >{{ unreadedNotifi.length }}</span
                  >
                </div>
              </div>
            </div>
          </div>
          <Drawer
            v-model:visible="visibleDrawer"
            header="My Account"
            position="right"
          >
            <div class="d-flex flex-column justify-content-between h-100">
              <div
                class="d-flex flex-wrap justify-content-center align-items-center w-100"
              >
                <div
                  class="w-100 d-flex flex-wrap justify-content-center align-items-center"
                >
                  <div class="w-100 d-flex justify-content-center">
                    <img
                      :src="user.img"
                      :style="{ width: '8rem', height: '8rem' }"
                      class="rounded-circle"
                    />
                  </div>
                  <div class="w-100 text-center my-2">
                    <span class="fs-4 font-bold font-monospace">{{
                      user.username
                    }}</span>
                  </div>
                </div>
                <div
                  class="w-100 d-flex flex-wrap justify-content-center align-items-center mt-3"
                >
                  <ul class="list-group w-100">
                    <router-link
                      class="list-group-item my-2 rounded-2 border-0 text-nowrap cursor-pointer p-1 py-2 text-center fs-5"
                      :to="{ name: 'Profile' }"
                    >
                      <i class="pi pi-user mx-2" />
                      <span>My Account</span>
                    </router-link>
                    <router-link
                      class="list-group-item my-2 rounded-2 border-0 text-nowrap cursor-pointer p-1 py-2 text-center fs-5"
                      :to="{ name: 'Notification' }"
                    >
                      <i class="pi pi-bell mx-2" />
                      <span>Notifications</span>
                    </router-link>
                    <router-link
                      class="list-group-item my-2 rounded-2 border-0 text-nowrap cursor-pointer p-1 py-2 text-center fs-5"
                      :to="{ name: 'Settings' }"
                    >
                      <i class="pi pi-cog mx-2" />
                      <span>Settings</span>
                    </router-link>
                  </ul>
                </div>
              </div>
              <div
                class="d-flex flex-wrap justify-content-center align-items-center w-100"
              >
                <Button
                  icon="pi pi-sign-out"
                  class="fs-5"
                  label="Logout"
                  fluid
                />
              </div>
            </div>
          </Drawer>

          <Popover
            ref="op"
            pt:root="border-3 rounded-2 text-white"
            pt:content="p-0 text-dark"
          >
            <div
              class="d-flex justify-content-center align-items-center flex-wrap"
              :style="{ width: '25rem', height: '30rem' }"
            >
              <div
                class="d-flex flex-wrap justify-content-center align-items-center w-100 overflow-y-auto"
                :style="{ height: '90%' }"
              >
                <router-link
                  id="notification"
                  class="d-flex align-content-center flex-wrap w-100 font-monospace m-1 p-1 rounded-2 cursor-pointer"
                  v-for="notification in lastNotifi"
                  :key="notification.id"
                  :to="{ name: 'Notification' }"
                >
                  <div
                    id="header"
                    class="w-100 d-flex justify-content-between align-items-center"
                  >
                    <span class="font-bold fs-5">{{ notification.title }}</span>
                    <div>
                      <i
                        :class="[
                          'pi pi-circle-fill mx-1',
                          notification.status == 'unreaded'
                            ? 'text-danger'
                            : 'text-success',
                        ]"
                        :style="{ fontSize: '0.8rem' }"
                      />
                      <span
                        :style="{ fontSize: '0.8rem' }"
                        class="capitalize"
                        >{{ notification.status }}</span
                      >
                    </div>
                  </div>
                  <!-- <div id="body" class="w-100 fs-6">
                    <span>{{ notification.description }}</span>
                  </div> -->
                  <div
                    id="footer"
                    class="w-100 font-bold d-flex justify-content-between text-muted"
                  >
                    <span :style="{ fontSize: '0.9rem' }"
                      >From: {{ notification.from.username }}</span
                    >
                    <span :style="{ fontSize: '0.9rem' }">{{
                      timeAgo(notification.date)
                    }}</span>
                  </div>
                </router-link>
              </div>
              <div
                id="show-more-container"
                class="d-flex justify-content-center align-items-center w-100 border-top-1 text-decoration-underline fs-5"
                :style="{ height: '10%' ,background:'#f9f9f9' , color:'#222' }"
              >
                <router-link  :to="{ name: 'Notification' }"
                  >Show More</router-link
                >
              </div>
            </div>
          </Popover>
          <!--  -->
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

import { computed, onBeforeUnmount, onMounted, ref, defineProps } from "vue";

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

  console.log(notifications.value[0].date);
  console.log(unreadedNotifi.value);
  console.log(lastNotifi.value);
});
onBeforeUnmount(() => {
  clearInterval(intervalId);
});

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
const languageSelected = ref(null);
const op = ref();
const visibleDrawer = ref(false);
const user = ref({
  id: 1,
  username: "Mohammad Mahmoud",
  email: "mohammad@test.com",
  img: require("@/assets/images/dashboard/user-img.jpeg"),
  birthday: "1919-7-25",
});
const notifications = ref([
  {
    id: 1,
    from: {
      id: 1,
      email: "Mohammad GG",
      username: "Mohammad",
    },
    title: "About dashboard",
    description: "You should Doing some Edit on Comanies data",
    date: new Date(2025, 5, 12, 10, 0, 0),
    status: "unreaded",
  },
  {
    id: 2,
    from: {
      id: 1,
      email: "Mohammad GG",
      username: "Mohammad",
    },
    title: "About dashboard",
    description: "You should Doing some Edit on Comanies data",
    date: new Date(2025, 4, 12, 10, 0, 0),
    status: "unreaded",
  },
  {
    id: 3,
    from: {
      id: 1,
      email: "Mohammad GG",
      username: "Mohammad",
    },
    title: "About dashboard",
    description: "You should Doing some Edit on Comanies data",
    date: new Date(2025, 3, 12, 10, 0, 0),
    status: "readed",
  },
  {
    id: 4,
    from: {
      id: 1,
      email: "Mohammad GG",
      username: "Mohammad",
    },
    title: "About dashboard",
    description: "You should Doing some Edit on Comanies data",
    date: new Date(2025, 1, 12, 10, 0, 0),
    status: "unreaded",
  },
  {
    id: 5,
    from: {
      id: 1,
      email: "Mohammad GG",
      username: "Mohammad",
    },
    title: "About dashboard",
    description: "You should Doing some Edit on Comanies data",
    date: new Date(2025, 0, 12, 10, 0, 0),
    status: "unreaded",
  },
  {
    id: 6,
    from: {
      id: 1,
      email: "Mohammad GG",
      username: "Mohammad",
    },
    title: "About dashboard",
    description: "You should Doing some Edit on Comanies data",
    date: new Date(2025, 5, 3, 9, 0, 0),
    status: "unreaded",
  },
  {
    id: 7,
    from: {
      id: 1,
      email: "Mohammad GG",
      username: "Mohammad",
    },
    title: "About dashboard",
    description: "You should Doing some Edit on Comanies data",
    date: new Date(2025, 5, 12, 10, 0, 0),
    status: "unreaded",
  },
]);

// Computed
const unreadedNotifi = computed(() => {
  return notifications.value.filter(
    (notification) => notification.status == "unreaded"
  );
});
const lastNotifi = computed(() => {
  if (notifications.value.length > 5) {
    let last5Noti = notifications.value.slice(
      notifications.value.length - 5,
      notifications.value.length
    );
    return last5Noti;
  }
  return notifications;
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
const toggleNotification = (event) => {
  op.value.toggle(event);
};

function changeLocation() {
  localStorage.setItem("locale", languageSelected.value.code.toLowerCase());
  window.location.reload();
}
function timeAgo(notificationDate) {
  const now = new Date();
  const date = new Date(notificationDate);
  const diffMs = date - now; // note: future date = positive
  const diffSec = Math.floor(Math.abs(diffMs) / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  let result = "";
  if (diffSec < 60) result = `${diffSec} seconds`;
  else if (diffMin < 60) result = `${diffMin} minutes`;
  else if (diffHour < 24) result = `${diffHour} hours`;
  else result = `${diffDay} days`;

  return diffMs < 0 ? `${result} ago` : `in ${result}`;
}
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
#show-more-container a:hover{
  color: rgb(0, 0, 0) !important;
  font-size: 1.3rem !important;
}
#show-more-container:has(a:hover){
  background: #f2f2f2 !important;
}
@media (min-width: 686px) {
  #nav {
    height: 9.5rem;
    max-height: 9.5rem;
  }
  #end > div {
    border-left: 3px solid #fff;
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
