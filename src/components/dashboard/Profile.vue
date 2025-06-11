<template>
  <div class="w-100 d-flex justify-content-center pt-4 mt-5 rounded-2">
    <div id="container" class="w-100 d-flex flex-wrap">
      <!-- start -->
      <div id="img-container" class="d-flex justify-content-center">
        <img
          :src="user.img"
          class="rounded-circle user-img"
          v-if="user.img != null"
        />
        <i class="pi pi-user rounded-circle" v-else />
      </div>
      <div
        id="info-container"
        class="d-flex align-items-center justify-content-center"
      >
        <div
          id="info"
          class="d-flex flex-wrap justify-content-center overflow-x-auto align-items-center h-100 text-nowrap"
        >
          <div class="w-100">
            <span class="fs-5 text-muted mx-1">Username : </span>
            <span class="mx-1">{{ user.username }}</span>
          </div>
          <div class="w-100">
            <span class="fs-5 text-muted mx-1">Email : </span>
            <span class="mx-1">{{ user.email }}</span>
          </div>
          <div class="w-100">
            <span class="fs-5 text-muted mx-1">Birthday : </span>
            <span class="mx-1">{{ user.birthday }}</span>
          </div>
        </div>
        <div id="btns" class="text-center h-100 d-flex justify-content-center">
          <Button
            icon=" fa-solid fa-key"
            class="mx-2 h-fit"
            :style="{ minWidth: '2.5rem' }"
            @click="changePasswordDialog = true"
          />
          <Button
            icon=" pi pi-pen-to-square"
            class="mx-2 h-fit"
            :style="{ minWidth: '2.5rem' }"
            @click="editDialog = true"
          />
        </div>
      </div>
    </div>
  </div>
  <!-- Change Password Dialog -->
  <Dialog
    v-model:visible="changePasswordDialog"
    :modal="true"
    :closable="true"
    header="Change Password"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
    <div
      class="d-flex flex-wrap justify-content-center align-items-center w-100"
    >
      <div
        class="width-90 d-flex justify-content-center align-items-center py-2"
      >
        <Password
          name="current-password"
          placeholder="Current Password"
          fluid
          :feedback="false"
          class="w-100"
          toggleMask
        />
      </div>
      <div
        class="width-90 d-flex justify-content-center align-items-center py-2"
      >
        <Password
          name="new-password"
          placeholder="New Password"
          fluid
          class="w-100"
          toggleMask
        />
      </div>
      <div
        class="width-90 d-flex justify-content-center align-items-center py-2"
      >
        <Password
          name="confirm-new-password"
          placeholder="Confirm New Password"
          fluid
          :feedback="false"
          class="w-100"
          toggleMask
        />
      </div>
    </div>
    <template #footer>
      <Button label="Comfirm" icon="pi pi-save" />
    </template>
  </Dialog>
  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="editDialog"
    :modal="true"
    :closable="true"
    header="Edit information"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
    <div
      class="d-flex flex-wrap justify-content-center align-items-center w-100"
    >
      <div
        class="width-90 d-flex justify-content-center align-items-center py-2"
      >
        <FloatLabel variant="on" class="w-100">
          <InputText id="username" fluid v-model="user.username" />
          <label for="username">Username</label>
        </FloatLabel>
      </div>
      <div
        class="width-90 d-flex justify-content-center align-items-center py-2"
      >
        <FloatLabel variant="on" class="w-100">
          <InputText id="email" fluid v-model="user.email" />
          <label for="email">Email</label>
        </FloatLabel>
      </div>
      <div
        class="width-90 d-flex justify-content-center align-items-center py-2"
      >
        <FloatLabel variant="on" class="w-100">
          <DatePicker id="birthday" v-model="user.birthday" fluid />
          <label for="birthday">Birthday</label>
        </FloatLabel>
      </div>
    </div>
    <template #footer>
      <Button label="Update" icon="pi pi-save" />
    </template>
  </Dialog>
</template>

<script setup>
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import DatePicker from "primevue/datepicker";
import { ref, defineProps } from "vue";

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
// Data
const changePasswordDialog = ref(false);
const editDialog = ref(false);

// Methods
</script>

<style scoped>
@media (min-width: 768px) {
  #img-container {
    width: 25%;
  }
  #info-container {
    width: 65%;
  }
  #container {
    justify-content: space-between;
  }
}
@media (max-width: 950px) {
  #img-container,
  #info-container {
    width: 100%;
  }
  #info-container {
    padding: 1rem;
  }
  #container {
    justify-content: center;
  }
}
@media (min-width: 686px) {
  .user-img {
    width: 10rem;
    height: 10rem;
  }
  #info {
    width: 70%;
  }
  #btns {
    width: 30%;
  }
}
@media (max-width: 686px) {
  .user-img {
    width: 7rem;
    height: 7rem;
  }
  #info-container {
    flex-direction: column-reverse;
  }
  #info,
  #btns {
    width: 100%;
    padding-top: 1rem;
  }
  #info {
    min-height: 15rem;
  }
  #info div {
    text-align: center;
  }
}
</style>
