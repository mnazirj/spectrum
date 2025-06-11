<template>
  <div class="d-flex">
    <div class="d-flex flex-wrap justify-content-center align-items-center">
      <div
        class="d-flex flex-wrap justify-content-center align-items-center w-75 rounded-2"
      >
        <div
          id="notification"
          class="d-flex align-content-center flex-wrap w-100 font-monospace m-1 p-2 rounded-2 cursor-pointer"
          v-for="(notification, i) in notifications"
          :key="i"
          @click="openShowDialog(notifications[i])"
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
              <span :style="{ fontSize: '0.8rem' }" class="capitalize">{{
                notification.status
              }}</span>
            </div>
          </div>
          <div id="body" class="w-100 fs-6">
            <span>{{ notification.description }}</span>
          </div>
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
        </div>
      </div>
    </div>
  </div>
  <!-- Show Dialog -->
  <Dialog
    v-model:visible="showDialog"
    :modal="true"
    :closable="true"
    :header="`Show ${currentData.id} notification`"
    :style="{ width: '30rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
  </Dialog>
</template>

<script setup>
import Dialog from "primevue/dialog";
import Paginator from "primevue/paginator";
import { ref } from "vue";

// Data
const showDialog = ref(false);
const currentData = ref({
  id: null,
  from: {
    id: null,
    email: null,
    username: null,
  },
  title: null,
  description: null,
  date: null,
  status: null,
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

// Methods
function openShowDialog(data) {
  console.log(`Open ShowDialog Clicked!!!`);

  currentData.value = data;
  console.log(currentData.value);
  showDialog.value = true;
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
#notification:hover{
  background: #ededed;
}
</style>
