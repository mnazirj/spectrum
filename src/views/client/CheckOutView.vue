<template>
  <div class="container">
    <h3 class="font-avg">{{ $t("client.shop.basket") }} ({{ $store.state.cart.length }})</h3>
    <hr />
    <div class="row">
      <div class="col-lg-8 col-md-8 col-12 pe-5">
        <div v-for="item in $store.state.cart" :key="item" class="d-flex mb-5">
          <div class="flex-grow-0">
            <img :src="`http://publicws.spectrum.e-ibtikar.com/images/${item.image}`" width="100" />
          </div>
          <div class="flex justify-content-between flex-grow-1">
            <div>
              <h5>{{ item.name }}</h5>
              <h5 v-if="item.size != null">{{ item.size }}{{ $t("client.checkout.mm") }}</h5>
              <h5 v-if="item.color != null">{{ $t("client.checkout.color") }}: {{ item.color }}</h5>
              <h5>{{ $t("client.checkout.qty") }}: {{ item.qty }}</h5>
            </div>
            <div>
              <h6 class="font-avg">{{ item.price.toFixed(2) }} {{ $t("client.shop.lyd") }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-4 col-12">
        <div>
          <h4 class="font-avg">{{ $t("client.checkout.summary") }}</h4>
          <div class="bg-body-secondary py-4 px-4 border-1 border-secondary">
            <div class="mb-2">
              <h4 class="mb-0 font-avg">{{ $t("client.checkout.promo") }}</h4>
              <small class="font-avg">{{ $t("client.checkout.title") }}</small>
            </div>
            <Form v-slot="$form" :resolver="resolver" @submit="onFormSubmit" class="w-100">
              <div>
                <FloatLabel variant="in">
                  <InputText name="code" type="text" class="w-100 rounded-0" v-model="code"> </InputText>
                  <label>{{ $t("client.checkout.enter") }}</label>
                </FloatLabel>
                <Message v-if="$form.code?.invalid" severity="error" size="small" variant="simple">{{ $form.code.error?.message }}</Message>
              </div>
              <Button :label="$t('client.checkout.apply')" class="w-100 rounded-0 mt-2" type="submit" :loading="isChecking" />
            </Form>

            <Message v-if="message" severity="success" size="small" class="mt-2 rounded-0">{{ message }}</Message>
            <Message v-if="hasError" severity="error" size="small" class="mt-2 rounded-0">{{ hasError }}</Message>
          </div>
          <hr />
          <div>
            <div class="d-flex font-avg justify-content-between">
              <h6>{{ $t("client.shop.total") }}</h6>
              <h6>{{ total.toFixed(2) }} {{ $t("client.shop.lyd") }}</h6>
            </div>

            <div class="d-flex font-avg justify-content-between">
              <h6>{{ $t("client.checkout.delivery") }}</h6>
              <h6>
                <span class="text-muted">{{ $t("client.checkout.free") }}</span>
              </h6>
            </div>

            <div class="d-flex font-avg justify-content-between">
              <h6>{{ $t("client.checkout.total") }}</h6>
              <h6>{{ total.toFixed(2) }}{{ $t("client.shop.lyd") }}</h6>
            </div>
          </div>
          <hr />
          <Button :label="$t('client.checkout.btn')" class="text-uppercase rounded-0 w-100" @click="createOrder()" :loading="isLoading" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Form } from "@primevue/forms";
import axios from "axios";
import Button from "primevue/button";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import { computed, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const code = ref(null);
const discount = ref(0);
const isChecking = ref(false);
const isLoading = ref(false);
const hasError = ref(null);
const message = ref(null);
const total = computed(() => {
  if (discount.value > 0) {
    var amount = store.getters.total;
    return amount - (store.getters.total * discount.value) / 100;
  } else {
    return store.getters.total;
  }
});

const resolver = ({ values }) => {
  const errors = {};

  if (!values.code) {
    errors.code = [{ message: "Code is required." }];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    checkCode();
  }
};

async function checkCode() {
  isChecking.value = true;
  axios
    .post(
      "client/code",
      { code: code.value },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("_token"),
        },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        discount.value = res.data;
        message.value = `Successfully used code ${code.value} and got ${discount.value}% OFF`;
        isChecking.value = false;
        hasError.value = null;
      }
    })
    .catch(() => {
      isChecking.value = false;
      hasError.value = "Code Expired";
    });
}

function createOrder() {
  isLoading.value = true;
  const payload = {
    items: store.state.cart.map((item) => {
      return {
        productId: item.id,
        quantity: item.qty,
        size: item.size,
        color: item.color,
      };
    }),
    code: code.value,
  };

  axios
    .post("client/order", payload, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 201) {
        isLoading.value = false;
        console.log(res.data);
        window.location = res.data.gateway;
      }
    });
}
</script>
