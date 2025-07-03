<template>
  <div class="container">
    <h3 class="font-avg">Good day, {{ payload.firstName }} {{ payload.lastName }}</h3>
    <div class="row">
      <div class="col-3">
        <div class="d-flex flex-column">
          <Menu :model="items" class="w-75 rounded-0" />
        </div>
      </div>
      <div class="col-9">
        <Tabs :value="panel">
          <TabPanels>
            <TabPanel value="0">
              <h4 class="font-avg">Orders</h4>
              <DataTable :value="orders" stripedRows paginator :rows="5" removableSort>
                <Column header="#">
                  <template #body="slotProp">
                    <span class="font-avg">{{ slotProp.index + 1 }}</span>
                  </template>
                </Column>
                <Column header="Status">
                  <template #body="slotProp">
                    <Tag class="text-uppercase" :class="[{ 'text-success': slotProp.data.status == 'shipped' }, { 'text-warning': slotProp.data.status == 'pending' }, { 'text-dark': slotProp.data.status == 'refunded' }]">
                      {{ slotProp.data.status }}
                    </Tag>
                  </template>
                </Column>
                <Column header="Payment">
                  <template #body="slotProp">
                    <Tag class="text-uppercase" severity="info"> {{ slotProp.data.method }}</Tag>
                  </template>
                </Column>
                <Column header="Total">
                  <template #body="slotProp">
                    <Tag class="text-uppercase" severity="info"> {{ slotProp.data.total }} LYD </Tag>
                  </template>
                </Column>
                <Column field="date" header="Date" sortable></Column>
                <Column header="Action">
                  <template #body="slotProp">
                    <Button label="Show Details" class="rounded-0" @click="showOrderDetails(slotProp.data)" />
                  </template>
                </Column>
              </DataTable>
            </TabPanel>
            <TabPanel value="1">
              <h4 class="font-avg">Personal Information</h4>
              <Form v-slot="$form" :initialValues="payload" :resolver="resolver" @submit="onFormSubmit" class="w-100">
                <div class="d-flex flex-column gap-3">
                  <div>
                    <FloatLabel variant="on">
                      <InputText name="email" type="email" v-model="payload.email" class="rounded-0 w-100" />
                      <label for="email">Email address</label>
                    </FloatLabel>
                    <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{ $form.email.error?.message }}</Message>
                  </div>

                  <div>
                    <FloatLabel variant="on">
                      <InputText name="firstName" type="text" v-model="payload.firstName" class="rounded-0 w-100" />
                      <label for="firstName">First Name</label>
                    </FloatLabel>
                    <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error?.message }}</Message>
                  </div>

                  <div>
                    <FloatLabel variant="on">
                      <InputText name="lastName" type="text" v-model="payload.lastName" class="rounded-0 w-100" />
                      <label for="lastName">Last Name</label>
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
                        <label for="phone">Phone Number</label>
                      </FloatLabel>
                    </InputGroup>

                    <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error?.message }}</Message>
                  </div>

                  <Button label="Save" type="submit" :loading="isLoading" class="rounded-0" />

                  <Message v-if="success != null" severity="success" size="small" variant="simple">{{ success }}</Message>
                </div>
              </Form>
            </TabPanel>
            <TabPanel value="2">
              <h4 class="font-avg">Address Book</h4>
              <Button label="Add a new address" class="rounded-0 w-100" icon="fas fa-plus" size="large" outlined @click="addressDialog = true" />
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

                      <Button icon="fas fa-edit" variant="text" size="large" />
                      <Button icon="fas fa-trash-can" variant="text" size="large" @click="showDeleteDialog(item.address, item.id)" />
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
    <Dialog v-model:visible="orderInfoDialog" modal dismissableMask :closable="false" class="col-lg-6">
      <div class="d-flex flex-column">
        <h5 class="font-avg">Showing Order information</h5>
        <DataTable :value="currentShow.product" stripedRows paginator :rows="5" removableSort>
          <Column header="#">
            <template #body="slotProp">
              <span class="font-avg">{{ slotProp.index + 1 }}</span>
            </template>
          </Column>
          <Column field="name" header="Name"> </Column>
          <Column field="brand" header="Brand"> </Column>
          <Column field="size" header="Size"> </Column>
          <Column header="Image">
            <template #body="slotProp">
              <img :src="'http://26.77.145.88:3333/images/' + slotProp.data.images" class="img-fluid" width="128" />
            </template>
          </Column>
        </DataTable>
        <div class="d-flex gap-2 flex-column mt-5">
          <div class="text-end">
            <Tag class="text-uppercase" severity="info">Total: {{ currentShow.total }} LYD </Tag>
          </div>
          <div class="text-end">
            <Tag class="text-uppercase" :class="[{ 'text-success': currentShow.status == 'shipped' }, { 'text-warning': currentShow.status == 'pending' }, { 'text-dark': currentShow.status == 'refunded' }]">
              {{ currentShow.status }}
            </Tag>
          </div>
        </div>
      </div>
    </Dialog>

    <Dialog v-model:visible="addressDialog" modal dismissableMask :closable="false" class="col-lg-6 rounded-0">
      <div class="d-flex flex-column">
        <h5 class="font-avg">Add new address to your acconut</h5>
        <Form v-slot="$form" :resolver="addressResolver" @submit="onNewAddressSubmit" class="w-100">
          <div class="d-flex flex-column gap-3">
            <div>
              <FloatLabel variant="on">
                <InputText name="firstName" type="text" v-model="addressPayload.firstName" class="rounded-0 w-100" />
                <label for="firstName">First Name</label>
              </FloatLabel>
              <Message v-if="$form.firstName?.invalid" severity="error" size="small" variant="simple">{{ $form.firstName.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="lastName" type="text" v-model="addressPayload.lastName" class="rounded-0 w-100" />
                <label for="lastName">Last Name</label>
              </FloatLabel>
              <Message v-if="$form.lastName?.invalid" severity="error" size="small" variant="simple">{{ $form.lastName.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="country" type="text" v-model="addressPayload.country" class="rounded-0 w-100" />
                <label for="country">Country</label>
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
                  <label for="phone">Phone Number</label>
                </FloatLabel>
              </InputGroup>

              <Message v-if="$form.phone?.invalid" severity="error" size="small" variant="simple">{{ $form.phone.error?.message }}</Message>
            </div>
            <div>
              <FloatLabel variant="on">
                <InputText name="address" type="text" v-model="addressPayload.address" class="rounded-0 w-100" />
                <label for="address">Delivery Address (Building/ Street)</label>
              </FloatLabel>
              <Message v-if="$form.address?.invalid" severity="error" size="small" variant="simple">{{ $form.address.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="additional_address" type="text" v-model="addressPayload.additional_address" class="rounded-0 w-100" />
                <label for="additional_address">Additional Address</label>
              </FloatLabel>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="city" type="text" v-model="addressPayload.city" class="rounded-0 w-100" />
                <label for="city">City</label>
              </FloatLabel>
              <Message v-if="$form.city?.invalid" severity="error" size="small" variant="simple">{{ $form.city.error?.message }}</Message>
            </div>

            <div>
              <FloatLabel variant="on">
                <InputText name="area" type="text" v-model="addressPayload.area" class="rounded-0 w-100" />
                <label for="area">Area</label>
              </FloatLabel>
              <Message v-if="$form.area?.invalid" severity="error" size="small" variant="simple">{{ $form.area.error?.message }}</Message>
            </div>
            <div class="d-flex flex-row justify-content-between align-items-center">
              <div class="d-flex gap-2">
                <ToggleSwitch v-model="addressPayload.primary" />
                <label>Set as preferred address</label>
              </div>

              <Button label="Save" type="submit" :loading="isLoading" class="rounded-0 w-50" />
            </div>

            <Message v-if="success != null" severity="success" size="small" variant="simple">{{ success }}</Message>
          </div>
        </Form>
      </div>
    </Dialog>

    <Dialog v-model:visible="deleteDialog" modal dismissableMask :closable="false" class="col-lg-6 rounded-0">
      <div>
        <h5 class="font-avg">Are you sure you want to delete this address?</h5>
        <p>{{ addressToRemove.title }}</p>
        <Button label="Delete" icon="fas fa-trash" severity="danger" class="rounded-0 float-end" @click="deleteAddress()" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import Menu from "primevue/menu";
import { onMounted, ref } from "vue";
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

const items = ref([
  {
    label: "Orders",
    items: [
      {
        label: "My Orders",
        icon: "fas fa-box",
        command: () => (panel.value = "0"),
      },
    ],
  },
  {
    label: "Account Settings",
    items: [
      {
        label: "Personal Information",
        icon: "fas fa-user-circle",
        command: () => (panel.value = "1"),
      },
      {
        label: "Address Book",
        icon: "fas fa-book",
        command: () => (panel.value = "2"),
      },
      {
        label: "Change Password",
        icon: "fas fa-key",
        command: () => (panel.value = "3"),
      },
      {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: () => logOut(),
      },
    ],
  },
]);

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

onMounted(() => {
  fetchOrders();
  fetchAcconutInfo();
});
</script>
