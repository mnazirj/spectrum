<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="col-lg-6 col-md-6 col-12">
        <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit" class="w-100">
          <div class="d-flex flex-column gap-4">
            <div>
              <FloatLabel variant="on">
                <InputText name="email" type="email" v-model="payload.email" class="rounded-0 w-100" />
                <label for="email">Email address</label>
              </FloatLabel>
              <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
            </div>
            <div>
              <FloatLabel variant="on">
                <Password name="password" type="password" v-model="payload.password" class="w-100" toggleMask :feedback="false" />
                <label for="email">Password</label>
              </FloatLabel>
              <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
            </div>
            <Button label="Sign In" type="submit" class="rounded-0" :loading="isLoading" />

            <Message v-if="hasError" severity="error" size="small" variant="simple">Email or password is incorrect!</Message>
          </div>
        </Form>
        <div class="mt-2">
          No acconut yet?
          <a href="/signup" class="text-dark font-avg">Create one</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from "@primevue/forms";
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import FloatLabel from "primevue/floatlabel";
import Button from "primevue/button";

import { ref } from "vue";
import axios from "axios";
import router from "@/router";
const hasError = ref(false);
const isLoading = ref(false);

const payload = ref({
  email: "",
  password: "",
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.email) {
    errors.email = [{ message: "email is required." }];
  }

  if (!values.password) {
    errors.password = [{ message: "password is required." }];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    signin();
  }
};

function signin() {
  isLoading.value = true;
  axios
    .post("/auth/signin", payload.value)
    .then((res) => {
      if (res.status == 200) {
        console.log(res.data);
        localStorage.setItem("_token", res.data.access);
        setTimeout(() => {
          router.go("/home");
          isLoading.value = false;
        }, 1000);
      } else {
        hasError.value = true;
      }
    })
    .catch((e) => {
      hasError.value = true;
      isLoading.value = false;
    });
}
</script>
