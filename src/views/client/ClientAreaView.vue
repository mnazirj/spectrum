<template>
  <div class="container">
    <h3 class="font-avg">{{ $t("client.area.day") }} {{ payload.firstName }} {{ payload.lastName }}</h3>
    <div class="row">
      <div class="col-lg-3 col-md-3 col-12">
        <div class="d-flex flex-column">
          <Menu :model="items" class="col-lg-10 col-md-10 col-12 rounded-0" />
        </div>
      </div>
      <div class="col-lg-9 col-md-9 col-12">
        <Tabs :value="panel">
          <TabPanels>
            <TabPanel value="0">
              <h4 class="font-avg">{{ $t("client.area.order") }}</h4>
              <DataTable :value="orders" stripedRows paginator :rows="5" removableSort>
                <Column header="#">
                  <template #body="slotProp">
                    <span class="font-avg">{{ slotProp.index + 1 }}</span>
                  </template>
                </Column>
                <Column :header="$t('client.area.status')">
                  <template #body="slotProp">
                    <Tag class="text-uppercase" :class="[{ 'text-success': slotProp.data.status == 'shipped' }, { 'text-warning': slotProp.data.status.toLowerCase() == 'pending' }, { 'text-dark': slotProp.data.status == 'refunded' }]">
                      {{ slotProp.data.status }}
                    </Tag>
                  </template>
                </Column>
                <Column :header="$t('client.area.payment')">
                  <template #body="slotProp">
                    <Tag class="text-uppercase" severity="info"> {{ slotProp.data.method }}</Tag>
                  </template>
                </Column>
                <Column :header="$t('client.area.total')">
                  <template #body="slotProp">
                    <Tag class="text-uppercase" severity="info"> {{ slotProp.data.total }} LYD </Tag>
                  </template>
                </Column>
                <Column field="date" :header="$t('client.area.date')" sortable>
                  <template #body="slotProp">
                    {{ new Date(slotProp.data.date).toLocaleDateString("en-UK") }}
                  </template>
                </Column>
                <Column :header="$t('client.area.action')">
                  <template #body="slotProp">
                    <Button :label="$t('client.area.show')" class="rounded-0" @click="showOrderDetails(slotProp.data)" />
                  </template>
                </Column>
              </DataTable>
            </TabPanel>
            <TabPanel value="1">
              <h4 class="font-avg">{{ $t("client.area.info") }}</h4>
              <Form v-slot="$form" :initialValues="payload" :resolver="resolver" @submit="onFormSubmit" class="w-100">
                <div class="d-flex flex-column gap-3">
                  <div>
                    <FloatLabel variant="on">
                      <InputText name="email" type="email" v-model="payload.email" class="rounded-0 w-100" />
                      <label for="email">{{ $t("client.area.email") }}</label>
                    </FloatLabel>
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                  </div>

                  <div>
                    <FloatLabel variant="on">
                      <InputText name="firstName" type="text" v-model="payload.firstName" class="rounded-0 w-100" />
                      <label for="firstName">{{ $t("client.area.fname") }}</label>
                    </FloatLabel>
                    <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error?.message }}</Message>
                  </div>

                  <div>
                    <FloatLabel variant="on">
                      <InputText name="lastName" type="text" v-model="payload.lastName" class="rounded-0 w-100" />
                      <label for="lastName">{{ $t("client.area.lname") }}</label>
                    </FloatLabel>
                    <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error?.message }}</Message>
                  </div>

                  <div>
                    <InputGroup>
                      <InputGroupAddon class="rounded-0">
                        <span class="font-avg text-black">+218</span>
                      </InputGroupAddon>
                      <FloatLabel variant="on">
                        <InputMask name="phone" type="phone" mask="9999999999" v-model="payload.phone" class="w-100" />
                        <label for="phone">{{ $t("client.area.phone") }}</label>
                      </FloatLabel>
                    </InputGroup>

                    <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error?.message }}</Message>
                  </div>

                  <Button :label="$t('client.area.save')" type="submit" :loading="isLoading" class="rounded-0" />

                  <Message v-if="success != null" severity="success" size="small" variant="simple">{{ success }}</Message>
                </div>
              </Form>
            </TabPanel>
            <TabPanel value="2">
              <h4 class="font-avg">{{ $t("client.area.book") }}</h4>
              <Button :label="$t('client.area.new')" class="rounded-0 w-100" icon="fas fa-plus" size="large" outlined @click="addressDialog = true" />
              <div class="d-flex flex-column gap-3 mt-3 border p-3 pb-2" v-for="item in payload.address" :key="item">
                <div class="d-flex align-items-center">
                  <div class="col-6">
                    <h6 class="font-avg">{{ item.firstName }} {{ item.lastName }}</h6>
                    <h6 class="font-avg">{{ item.address }} - {{ item.country }} - {{ item.city }}/{{ item.area }}</h6>
                    <small class="font-avg text-muted">{{ item.phone }}</small>
                  </div>
                  <div class="col-6">
                    <div class="d-flex justify-content-end align-items-center gap-2">
                      <Tag v-if="item.primary" value="Preferred" icon="fas fa-star" severity="info" class="h-25"></Tag>

                      <Button icon="fas fa-trash-can" variant="text" size="large" @click="showDeleteDialog(item.address, item.id)" />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="3">
              <Form v-slot="$form" :initialValues="payload" :resolver="resolver" @submit="onFormSubmit" class="w-100">
                <div class="d-flex flex-column gap-3">
                  <div>
                    <FloatLabel variant="on">
                      <Password name="npassword" type="password" v-model="payload.password" class="w-100" toggleMask :feedback="false" />
                      <label for="password">{{ $t("client.area.newpassword") }}</label>
                    </FloatLabel>
                    <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{ $form.password.error?.message }}</Message>
                  </div>

                  <div>
                    <FloatLabel variant="on">
                      <Password name="cpassword" type="password" v-model="confirmPassword" class="w-100" toggleMask :feedback="false" />
                      <label for="password">{{ $t("client.area.cpassword") }}</label>
                    </FloatLabel>
                    <Message v-if="$form.cpassword?.invalid" severity="error" size="small" variant="simple">{{ $form.cpassword.error?.message }}</Message>
                  </div>
                  <Button :label="$t('client.area.save')" type="submit" :loading="isLoading" class="rounded-0" />

                  <Message v-if="success != null" severity="success" size="small" variant="simple">{{ success }}</Message>
                </div>
              </Form>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
    <Dialog v-model:visible="orderInfoDialog" modal dismissableMask :closable="false" class="col-lg-6 col-md-6 col-12">
      <div class="d-flex flex-column">
        <h5 class="font-avg" :class="{ 'text-end': $i18n.locale == 'ar' }">{{ $t("client.area.otitle") }}</h5>
        <DataTable :value="currentShow.product" paginator :rows="5" removableSort>
          <Column header="#">
            <template #body="slotProp">
              <span class="font-avg">{{ slotProp.index + 1 }}</span>
            </template>
          </Column>
          <Column field="name" :header="$t('client.area.name')"> </Column>
          <Column field="brand" :header="$t('client.area.brand')"> </Column>
          <Column field="size" :header="$t('client.area.size')"> </Column>
          <Column field="qty" :header="$t('client.area.qty')"> </Column>
          <Column header="Image">
            <template #body="slotProp">
              <img :src="'http://publicws.spectrum.e-ibtikar.com/images/' + slotProp.data.images" class="img-fluid" width="128" />
            </template>
          </Column>
        </DataTable>
        <div class="d-flex gap-2 flex-column mt-5">
          <div class="text-end">
            <Tag class="text-uppercase" severity="info">{{ $t("client.area.total") }}: {{ currentShow.total }} {{ $t("client.shop.lyd") }} </Tag>
          </div>
          <div class="text-end">
            <Tag class="text-uppercase" :class="[{ 'text-success': currentShow.status == 'shipped' }, { 'text-warning': currentShow.status == 'pending' }, { 'text-dark': currentShow.status == 'refunded' }]">
              {{ currentShow.status }}
            </Tag>
          </div>
        </div>
      </div>
    </Dialog>

    <Dialog v-model:visible="addressDialog" modal dismissableMask :closable="false" class="col-lg-6 col-md-6 col-12 rounded-0">
      <div class="d-flex flex-column">
        <h5 class="font-avg">{{ $t("client.area.title") }}</h5>
        <Form v-slot="$form" :resolver="addressResolver" @submit="onNewAddressSubmit" class="w-100">
          <div class="d-flex flex-column gap-3">
            <div>
              <FloatLabel variant="on">
                <InputText name="firstName" type="text" v-model="addressPayload.firstName" class="rounded-0 w-100" />
                <label for="firstName">{{ $t("client.area.fname") }}</label>
              </FloatLabel>
              <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="lastName" type="text" v-model="addressPayload.lastName" class="rounded-0 w-100" />
                <label for="lastName">{{ $t("client.area.lname") }}</label>
              </FloatLabel>
              <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="country" type="text" v-model="addressPayload.country" class="rounded-0 w-100" />
                <label for="country">{{ $t("client.area.country") }}</label>
              </FloatLabel>
              <Message v-if="$form.country?.invalid" severity="error" size="small" variant="simple">{{ $form.country.error?.message }}</Message>
            </div>
            <div>
              <InputGroup>
                <InputGroupAddon class="rounded-0">
                  <span class="font-avg text-black">+218</span>
                </InputGroupAddon>
                <FloatLabel variant="on">
                  <InputMask name="phone" type="phone" mask="9999999999" v-model="addressPayload.phone" class="w-100" />
                  <label for="phone">{{ $t("client.area.phone") }}</label>
                </FloatLabel>
              </InputGroup>

              <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error?.message }}</Message>
            </div>
            <div>
              <FloatLabel variant="on">
                <InputText name="address" type="text" v-model="addressPayload.address" class="rounded-0 w-100" />
                <label for="address">{{ $t("client.area.address") }}</label>
              </FloatLabel>
              <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{ $form.address.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="additional_address" type="text" v-model="addressPayload.additional_address" class="rounded-0 w-100" />
                <label for="additional_address">{{ $t("client.area.more") }}</label>
              </FloatLabel>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="city" type="text" v-model="addressPayload.city" class="rounded-0 w-100" />
                <label for="city">{{ $t("client.area.city") }}</label>
              </FloatLabel>
              <Message v-if="$form.city?.invalid" severity="error" size="small" variant="simple">{{ $form.city.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="area" type="text" v-model="addressPayload.area" class="rounded-0 w-100" />
                <label for="area">{{ $t("client.area.area") }}</label>
              </FloatLabel>
              <Message v-if="$form.area?.invalid" severity="error" size="small" variant="simple">{{ $form.area.error?.message }}</Message>
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div class="d-flex gap-2">
                <ToggleSwitch v-model="addressPayload.primary" />
                <label>{{ $t("client.area.primary") }}</label>
              </div>

              <Button :label="$t('client.area.save')" type="submit" :loading="isLoading" class="rounded-0 w-50" />
            </div>

            <Message v-if="success != null" severity="success" size="small" variant="simple">{{ success }}</Message>
          </div>
        </Form>
      </div>
    </Dialog>

    <Dialog v-model:visible="deleteDialog" modal dismissableMask :closable="false" class="col-lg-6 col-md-6 col-12 rounded-0">
      <div>
        <h5 class="font-avg">{{ $t("client.area.delete") }}</h5>
        <p>{{ addressToRemove.title }}</p>
        <Button :label="$t('client.area.dbtn')" icon="fas fa-trash" severity="danger" class="rounded-0 float-end" @click="deleteAddress()" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import Menu from "primevue/menu";
import { onMounted, ref, watch } from "vue";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { Form } from "@primevue/forms";
import FloatLabel from "primevue/floatlabel";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import InputMask from "primevue/inputmask";
import InputGroup from "primevue/inputgroup";
import InputGroupAddon from "primevue/inputgroupaddon";
import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import Message from "primevue/message";
import ToggleSwitch from "primevue/toggleswitch";
import axios from "axios";
import router from "@/router";
import i18n from "@/i18n";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const { locale } = useI18n();

const items = ref([
  {
    label: t("client.area.order"),
    items: [
      {
        label: t("client.area.my"),
        icon: "fas fa-box",
        command: () => (panel.value = "0"),
      },
    ],
  },
  {
    label: t("client.area.account"),
    items: [
      {
        label: t("client.area.info"),
        icon: "fas fa-user-circle",
        command: () => (panel.value = "1"),
      },
      {
        label: t("client.area.book"),
        icon: "fas fa-book",
        command: () => (panel.value = "2"),
      },
      {
        label: t("client.area.password"),
        icon: "fas fa-key",
        command: () => (panel.value = "3"),
      },
      {
        label: t("client.area.logout"),
        icon: "pi pi-sign-out",
        command: () => logOut(),
      },
    ],
  },
]);

watch(locale, (newLocale, oldLocale) => {
  if (newLocale != oldLocale) {
    items.value = [
      {
        label: t("client.area.order"),
        items: [
          {
            label: t("client.area.my"),
            icon: "fas fa-box",
            command: () => (panel.value = "0"),
          },
        ],
      },
      {
        label: t("client.area.account"),
        items: [
          {
            label: t("client.area.info"),
            icon: "fas fa-user-circle",
            command: () => (panel.value = "1"),
          },
          {
            label: t("client.area.book"),
            icon: "fas fa-book",
            command: () => (panel.value = "2"),
          },
          {
            label: t("client.area.password"),
            icon: "fas fa-key",
            command: () => (panel.value = "3"),
          },
          {
            label: t("client.area.logout"),
            icon: "pi pi-sign-out",
            command: () => logOut(),
          },
        ],
      },
    ];
  }
});

const orders = ref([]);
const panel = ref("0");
const orderInfoDialog = ref(false);
const addressDialog = ref(false);
const deleteDialog = ref(false);
const addressToRemove = ref(null);
const currentShow = ref(null);
const isLoading = ref(false);
function showOrderDetails(payload) {
  currentShow.value = payload;
  orderInfoDialog.value = true;
}

//payload for account settings
const payload = ref({});
const addressPayload = ref({});
const success = ref(null);
const confirmPassword = ref(null);
const resolver = ({ values }) => {
  const errors = {};

  if (!payload.value.email) {
    errors.email = [{ message: "email is required." }];
  }
  if (!payload.value.firstName) {
    errors.firstName = [{ message: "First name is required." }];
  }
  if (!payload.value.lastName) {
    errors.lastName = [{ message: "Last name is required." }];
  }
  if (!payload.value.phone) {
    errors.phone = [{ message: "Phone number is required." }];
  }
  if (payload.value.password != confirmPassword.value) {
    errors.password = [{ message: "Password does not match." }];
  }

  return {
    values,
    errors,
  };
};

const addressResolver = ({ values }) => {
  const errors = {};

  if (!addressPayload.value.firstName) {
    errors.firstName = [{ message: "First name is required." }];
  }
  if (!addressPayload.value.lastName) {
    errors.lastName = [{ message: "Last name is required." }];
  }
  if (!addressPayload.value.phone) {
    errors.phone = [{ message: "Phone number is required." }];
  }

  if (!addressPayload.value.country) {
    errors.country = [{ message: "Country is required." }];
  }
  if (!addressPayload.value.address) {
    errors.address = [{ message: "Address is required." }];
  }
  if (!addressPayload.value.city) {
    errors.city = [{ message: "City is required." }];
  }
  if (!addressPayload.value.area) {
    errors.area = [{ message: "Area is required." }];
  }

  return {
    values,
    errors,
  };
};

const onFormSubmit = ({ valid }) => {
  if (valid) {
    updateAcconutInfo();
  }
};

const onNewAddressSubmit = ({ valid }) => {
  if (valid) {
    createNewAddress();
  }
};

function fetchOrders() {
  axios
    .get("/client/myorders", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 200) {
        orders.value = res.data;
      }
    });
}

function fetchAcconutInfo() {
  axios
    .get("/client/account", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 200) {
        payload.value = res.data;
      }
    });
}

function logOut() {
  axios
    .post("auth/logout", null, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 200) {
        localStorage.removeItem("_token");
        router.go(`/${i18n.locale}`);
      }
    });
}

function updateAcconutInfo() {
  isLoading.value = true;
  axios
    .put("client/updateInfo", payload.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 200) {
        isLoading.value = false;
        success.value = "Successfully changed your acconut information!";
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    });
}

function createNewAddress() {
  axios
    .post("client/createaddress", addressPayload.value, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 201) {
        window.location.reload();
      }
    });
}
function showDeleteDialog(payload, id) {
  deleteDialog.value = true;
  addressToRemove.value = { title: payload, id };
}
function deleteAddress() {
  axios
    .delete("client/deleteAddress/" + addressToRemove.value.id, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("_token"),
      },
    })
    .then((res) => {
      if (res.status == 200) {
        window.location.reload();
      }
    });
}

function formatDate(date) {}

onMounted(() => {
  fetchOrders();
  fetchAcconutInfo();
});
</script>
