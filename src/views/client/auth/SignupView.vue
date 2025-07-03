<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <div class="col-lg-6 col-md-8 col-12">
        <div class="card">
          <div class="card-body">
            <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit" class="w-100">
              <Message v-if="$form.username?.invalid" severity="error" size="small" variant="simple">{{ $form.username.error?.message }}</Message>

              <Stepper value="1">
                <StepPanels>
                  <StepPanel v-slot="{ activateCallback }" value="1">
                    <div>
                      <FloatLabel variant="on">
                        <InputText name="email" type="email" v-model="payload.email" class="rounded-0 w-100" />
                        <label for="email">Email address</label>
                      </FloatLabel>
                      <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                    </div>
                    <div class="d-flex pt-4">
                      <Button label="Continue" severity="secondary" class="w-100 text-uppercase" :disabled="payload.email == ''" @click="activateCallback('2')" />
                    </div>
                  </StepPanel>
                  <StepPanel v-slot="{ activateCallback }" value="2">
                    <div class="d-flex flex-column gap-3">
                      <div>
                        <FloatLabel variant="on">
                          <InputText name="first_name" type="text" v-model="payload.firstName" class="rounded-0 w-100" />
                          <label for="first_name">First Name</label>
                        </FloatLabel>
                        <Message v-if="$form.firstname?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                      </div>
                      <div>
                        <FloatLabel variant="on">
                          <InputText name="last_name" type="text" v-model="payload.lastName" class="rounded-0 w-100" />
                          <label for="last_name">Last Name</label>
                        </FloatLabel>
                        <Message v-if="$form.lastname?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                      </div>

                      <div>
                        <InputGroup>
                          <InputGroupAddon class="rounded-0">
                            <span class="font-avg text-black">+218</span>
                          </InputGroupAddon>
                          <FloatLabel variant="on">
                            <InputNumber name="phone" type="phone" :min="0" v-model="payload.phone" :useGrouping="false" class="w-100" />
                            <label for="phone">Phone Number</label>
                          </FloatLabel>
                        </InputGroup>

                        <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                      </div>
                    </div>
                    <div class="flex pt-4 justify-between">
                      <Button label="Continue" severity="secondary" class="w-100 text-uppercase" :disabled="payload.firstName == '' || payload.lastName == '' || payload.phone == ''" @click="activateCallback('3')" />
                    </div>
                  </StepPanel>
                  <StepPanel value="3">
                    <div class="d-flex flex-column gap-3 w-100">
                      <div>
                        <FloatLabel variant="on">
                          <Password name="password" type="password" v-model="payload.password" class="w-100" toggleMask :feedback="false" />
                          <label for="password">Password</label>
                        </FloatLabel>
                        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                      </div>
                      <div>
                        <FloatLabel variant="on">
                          <Password name="password_confirm" type="password" class="w-100" toggleMask :feedback="false" />
                          <label for="password_confirm">Confirm Password</label>
                        </FloatLabel>
                        <Message v-if="$form.password_confirm?.invalid" severity="error" size="small" variant="simple">{{ $form.password_confirm.error?.message }}</Message>
                      </div>
                    </div>
                    <div class="pt-4">
                      <Button label="Continue" type="submit" severity="secondary" :loading="isLoading" class="w-100 text-uppercase" :disabled="payload.password == '' || isLoading" />
                    </div>
                  </StepPanel>
                </StepPanels>
              </Stepper>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <Dialog v-model:visible="visible" modal>
      <div class="container">
        <div class="d-flex flex-column gap-3" v-if="!hasError">
          <img :src="successImg" width="128" height="128" class="mx-auto" />
          <h4>Successfully created new account!</h4>
          <Button label="Sign In" class="w-100 rounded-0 mt-2" />
        </div>
        <div class="d-flex flex-column gap-3" v-else>
          <img :src="successImg" width="128" height="128" class="mx-auto" />
          <h4>Something went wrong !</h4>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Stepper from "primevue/stepper";
import StepPanels from "primevue/steppanels";
import StepItem from "primevue/stepitem";
import Step from "primevue/step";
import StepPanel from "primevue/steppanel";
import StepList from "primevue/steplist";
import Button from "primevue/button";
import { Form } from "@primevue/forms";
import Message from "primevue/message";
import InputText from "primevue/inputtext";
import FloatLabel from "primevue/floatlabel";
import { ref } from "vue";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import InputNumber from "primevue/inputnumber";
import Password from "primevue/password";
import axios from "axios";
import Dialog from "primevue/dialog";
const visible = ref(false);
const successImg = require("@/assets/images/global/success.png");
const isLoading = ref(false);
const hasError = ref(false);
const payload = ref({
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  password: "",
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.email) {
    errors.email = [{ message: "email is required." }];
  }
  if (!values.first_name) {
    errors.first_name = [{ message: "First name is required." }];
  }
  if (!values.last_name) {
    errors.last_name = [{ message: "Last name is required." }];
  }
  if (!values.phone) {
    errors.phone = [{ message: "phone is required." }];
  }
  if (!values.password) {
    errors.password = [{ message: "password is required." }];
  }
  if (values.password != values.password_confirm) {
    errors.password_confirm = [{ message: "password does not match" }];
  }
  return {
    values,
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    console.log(valid);
    createAccount();
  }
};

function createAccount() {
  try {
    isLoading.value = true;
    axios.post("/auth/signup", payload.value).then((res) => {
      if (res.status == 201) {
        visible.value = true;
      } else {
        hasError.value = true;
      }
      isLoading.value = false;
    });
  } catch (e) {
    console.log(e);
    isLoading.value = false;
    hasError.value = true;
    visible.value = true;
  }
}
</script>
