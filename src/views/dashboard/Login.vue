<template>
  <div class="container-fluid m-0 p-0">
    <div
      class="d-flex justify-content-center align-items-center w-100 px-4"
      :style="{ height: '100vh' }"
    >
      <div
        id="login-container"
        class="d-flex justify-content-center align-items-center rounded-3 shadow-3"
      >
        <div
          id="logo-container"
          class="d-flex flex-wrap justify-content-center align-items-center bg-grad h-100 rounded-start-3"
        >
          <div
            class="d-flex flex-wrap justify-content-center align-items-center w-100"
          >
            <div class="w-100 d-flex justify-content-center align-items-center">
              <img
                src="@/assets/images/dashboard/logo.svg"
              />
            </div>
            <div class="w-100 d-flex justify-content-center align-items-center">
              <span class="text-main fs-4" :style="{ fontFamily: 'Rokkitt' }"
                >Spectrum</span
              >
            </div>
          </div>
        </div>
        <div
          id="content-container"
          class="d-flex flex-wrap justify-content-center bg-white h-100 rounded-3 p-2 pt-4"
        >
          <div
            class="w-100 d-flex justify-content-center align-items-center h-fit"
          >
            <span class="fs-1 font-avg">Login</span>
          </div>
          <div
            class="width-80 d-flex flex-wrap justify-content-center align-items-center h-fit"
          >
            <div class="w-100">
              <FloatLabel variant="on">
                <InputText id="email" type="text" v-model="email" fluid />
                <label for="email">Email</label>
              </FloatLabel>
            </div>
            <div class="w-100 mt-4">
              <FloatLabel variant="on">
                <Password
                  id="password"
                  v-model="password"
                  :feedback="false"
                  toggleMask
                  fluid
                />
                <label for="password">Password</label>
              </FloatLabel>
            </div>
            <div
              class="w-100 mt-5 d-flex justify-content-center align-items-center"
            >
              <Button
                icon="pi pi-sign-in"
                label="Login"
                :loading="lodingData"
                @click="isAuth"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import Password from "primevue/password";
import { ref } from "vue";
import router from "@/router";
// Data
const email = ref(null);
const password = ref(null);
const lodingData = ref(false);

// Methods
const isAuth = () => {
  router.push({ name: "Overview" });
};
</script>

<style scoped>
#login-container {
  width: 48em;
  height: 25rem;
}
#logo-container {
  width: 40%;
}
#content-container {
  width: 60%;
}
.bg-grad {
  background: linear-gradient(
    45deg,
    var(--p-zinc-900),
    var(--p-zinc-900),
    var(--p-zinc-900),
    var(--p-zinc-800),
    var(--p-zinc-800),
    var(--p-zinc-700),
    var(--p-zinc-700),
    var(--p-zinc-600),
    var(--p-zinc-500),
    var(--p-zinc-400)
  );
}
@media (min-width: 687px) {
  #logo-container  img {
    width: 9rem;
    height: 9rem;
  }
}
@media (max-width: 686px){
 #logo-container  img {
    width:4.5rem;
    height:4.5rem;
  }
}
</style>
