<template>
  <div>
    <!-- <div id="header" class="d-flex justify-content-between flex-wrap m-2 my-3 w-100">
      <div id="search-container" class="d-flex justify-content-end w-75">
        <div class="d-flex justify-content-center w-75">
          <IconField class="w-100">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText v-model="searchValue" placeholder="Search" class="w-75" />
          </IconField>
        </div>
      </div>
      <div id="btn-create-container" class="d-flex justify-content-end w-25 px-3"></div>
    </div> -->
    <div id="body" class="d-flex w-100 justify-content-center">
      <DataTable :value="orderList" v-model:filters="filters" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" removableSort dataKey="id" filterDisplay="row" :class="['custom-datatable', isEng ? 'ltr' : 'rtl']" :style="{ width: '95%' }">
        <Column header="Id" class="width-10">
          <template #body="slotProps">
            <span>#{{ slotProps.index + 1 }}</span>
          </template>
        </Column>
        <Column header="Customer">
          <template #body="slotProps">
            <div class="">
              <span>{{ slotProps.data.first_name }} {{ slotProps.data.last_name }}</span>
            </div>
          </template>
        </Column>
        <Column header="Status" :showFilterMenu="false" :filter="true" filterField="status" style="min-width: 12rem">
          <template #body="{ data }">
            <span>{{ data.status }}</span>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <Select v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" style="min-width: 12rem" :showClear="true"> </Select>
          </template>
        </Column>
        <Column header="Actions" class="width-20">
          <template #body="slotProps">
            <div class="d-flex">
              <Button icon="pi pi-pen-to-square" severity="info" variant="text" class="mx-1" @click="openEditDialog(slotProps.data)"></Button>
              <Button icon="pi pi-trash" severity="danger" variant="text" class="mx-1" @click="openDeleteDialog(slotProps.data)"></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <!-- Edit Dialog -->
  <Dialog v-model:visible="editDialog" :modal="true" :closable="true" :header="$t('dash.edit')" :breakpoints="{ '1199px': '85vw', '575px': '95vw' }" :dir="isEng ? 'ltr' : 'rtl'" dismissableMask>
    <div class="w-100 d-flex justify-content-center align-items-center flex-wrap">
      <div class="w-100 d-flex mt-2 mb-3">
        <div class="d-flex align-items-center">
          <span>{{ $t("client.area.status") }}</span>
        </div>
        <Select v-model="tempOrder.status" :options="statuses" class="mx-3" fluid />
      </div>
      <div class="section w-100 d-flex align-items-center flex-wrap m-3">
        <div class="mt-2 mb-3 w-100">
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-dollar text-main" />
              <InputNumber id="total-price" v-model="tempOrder.total" :defaultValue="currentData.totalPrice" fluid mode="currency" currency="LYD" locale="en-US" readonly />
            </IconField>
            <label for="total-price">{{ $t("client.checkout.total") }}</label>
          </FloatLabel>
        </div>
      </div>
      <Divider />
      <div class="w-100 mt-2 mb-3 px-1">
        <div v-if="currentData.product.length > 0">
          <DataTable :value="currentData.product" class="w-100">
            <Column header="#">
              <template #body="slotProps">
                <span>#{{ slotProps.index + 1 }}</span>
              </template>
            </Column>
            <Column :header="$t('client.area.name')">
              <template #body="slotProps">
                <span v-if="1 === 1">{{ slotProps.data.name }}</span>
                <span v-else>{{ slotProps.data.arName }}</span>
              </template>
            </Column>

            <Column :header="$t('client.checkout.qty')" field="qty">
              <!-- <template #body="slotProps">
                <div class="w-50">
                  <InputNumber v-model="tempOrder.product[slotProps.index].qty" showButtons buttonLayout="horizontal" :step="1" :min="0" fluid>
                    <template #incrementbuttonicon>
                      <span class="pi pi-plus" />
                    </template>
                    <template #decrementbuttonicon>
                      <span class="pi pi-minus" />
                    </template>
                  </InputNumber>
                </div>
              </template> -->
            </Column>
            <!-- <Column>
              <template #body="slotProps">
                <Button icon="pi pi-trash" severity="danger" variant="text" class="mx-1" @click="deleteProduct(slotProps.index)"></Button>
              </template>
            </Column> -->
          </DataTable>
        </div>
        <div v-else class="text-capitalize text-danger font-italic fs-4 d-flex justify-content-center">no product</div>
      </div>
    </div>
    <template #footer>
      <div class="d-flex m-1 mt-3">
        <Button label="Update" icon="pi pi-file-arrow-up" severity="info" @click="updateOrder"></Button>
      </div>
    </template>
  </Dialog>
  <!-- Delete Dialog -->
  <Dialog v-model:visible="deleteDialog" :modal="true" :closable="true" :header="$t('dash.delete')" :style="{ width: '35rem' }" :breakpoints="{ '1199px': '85vw', '575px': '95vw' }" :dir="isEng ? 'ltr' : 'rtl'" dismissableMask>
    <span v-if="1 == 1"> {{ $t("dash.delete_question1") }} {{ currentData.first_name }} {{ $t("dash.order") }} ?</span>
    <span v-else>{{ $t("dash.delete_question1") }} {{ currentData.first_name }} {{ $t("dash.order") }}?</span>
    <template #footer>
      <Button icon="pi pi-trash" :label="$t('dash.delete')" severity="danger" @click="deleteOrder"></Button>
    </template>
  </Dialog>
</template>

<script setup>
import Dialog from "primevue/dialog";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import FloatLabel from "primevue/floatlabel";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import Divider from "primevue/divider";

import { FilterMatchMode } from "@primevue/core/api";

import { ref, computed, onBeforeMount, onMounted } from "vue";
import axios from "axios";

// Hooks
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});

// Data
const isEng = ref(false);
const searchValue = ref(null);
const statuses = ref(["shipped", "pending", "refunded"]);
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  status: { value: null, matchMode: FilterMatchMode.EQUALS },
});
const tempOrder = ref({
  id: null,
  products: [],
  totalPrice: 0,
  discount: 0,
  status: null,
});
const currentData = ref({
  id: null,
  customer: {
    id: null,
    name: null,
    email: null,
    gender: null,
    birthday: null,
  },
  products: [],
  totalPrice: 0,
  status: null,
});
const orderList = ref([]);
const editDialog = ref(false);
const deleteDialog = ref(false);

const orders = ref([
  {
    id: 1,
    customer: {
      id: 4,
      name: "Ahmed",
      email: "ahmed@test.com",
      gender: "Male",
      birthday: "1998-5-12",
    },
    products: [
      {
        product: {
          id: 1,
          arName: "لينوفو ايداباد 3 أل 15313",
          enName: "Lenovo idea P3 L15313",
          arVariant: "",
          enVariant: "",
          stockLevel: 20,
          category: {
            id: 4,
            arName: "حاسوب محمول",
            enName: "Laptop",
          },
          company: {
            id: 4,
            arName: "لينوفو",
            enName: "Lenovo",
          },
          price: 600,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 2,
          arName: "ريد مي 12 سي",
          enName: "Ridme 12C",
          arVariant: "",
          enVariant: "",
          stockLevel: 21,
          category: {
            id: 6,
            arName: " هاتف محمول ",
            enName: " Mobile",
          },
          company: {
            id: 6,
            arName: "شاومي",
            enName: "Xaiome",
          },
          price: 150,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 2,
      },
      {
        product: {
          id: 3,
          arName: "سماعات ايبود 3",
          enName: "Headphones ipod 3",
          arVariant: "",
          enVariant: "",
          stockLevel: 19,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 5,
            arName: "أبل",
            enName: "Apple",
          },
          price: 230,
          discount: 0,
          availability: true,
          quantity: 3,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
    ],
    totalPrice: 970,
    discount: 0,
    discountCode: null,
    status: "Delivered",
  },
  {
    id: 2,
    customer: {
      id: 67,
      name: "mohammad",
      email: "mohammad@test.com",
      gender: "Male",
      birthday: "1999-9-21",
    },
    products: [
      {
        product: {
          id: 1,
          arName: "لينوفو ايداباد 3 أل 15313",
          enName: "Lenovo idea P3 L15313",
          arVariant: "",
          enVariant: "",
          stockLevel: 20,
          category: {
            id: 4,
            arName: "حاسوب محمول",
            enName: "Laptop",
          },
          company: {
            id: 4,
            arName: "لينوفو",
            enName: "Lenovo",
          },
          price: 600,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 6,
          arName: "فأرة أر إل 23",
          enName: "Mouse RL23",
          arVariant: "",
          enVariant: "",
          stockLevel: 18,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 7,
            arName: "رايزير",
            enName: "Razer",
          },
          price: 85,
          discount: 10,
          availability: true,
          quantity: 50,
          coverImg: null,
          images: [],
        },
        quantity: 4,
      },
      {
        product: {
          id: 3,
          arName: "سماعات ايبود 3",
          enName: "Headphones ipod 3",
          arVariant: "",
          enVariant: "",
          stockLevel: 19,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 5,
            arName: "أبل",
            enName: "Apple",
          },
          price: 230,
          discount: 0,
          availability: true,
          quantity: 3,
          coverImg: null,
          images: [],
        },
        quantity: 3,
      },
    ],
    totalPrice: 915,
    discount: 0,
    discountCode: null,
    status: "Returned",
  },
  {
    id: 3,
    customer: {
      id: 4,
      name: "Lanaya",
      email: "lanaya@test.com",
      gender: "Female",
      birthday: "2002-08-12",
    },
    products: [
      {
        product: {
          id: 1,
          arName: "لينوفو ايداباد 3 أل 15313",
          enName: "Lenovo idea P3 L15313",
          arVariant: "",
          enVariant: "",
          stockLevel: 20,
          category: {
            id: 4,
            arName: "حاسوب محمول",
            enName: "Laptop",
          },
          company: {
            id: 4,
            arName: "لينوفو",
            enName: "Lenovo",
          },
          price: 600,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 6,
          arName: "فأرة أر إل 23",
          enName: "Mouse RL23",
          arVariant: "",
          enVariant: "",
          stockLevel: 18,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 7,
            arName: "رايزير",
            enName: "Razer",
          },
          price: 85,
          discount: 10,
          availability: true,
          quantity: 50,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 3,
          arName: "سماعات ايبود 3",
          enName: "Headphones ipod 3",
          arVariant: "",
          enVariant: "",
          stockLevel: 19,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 5,
            arName: "أبل",
            enName: "Apple",
          },
          price: 230,
          discount: 0,
          availability: true,
          quantity: 3,
          coverImg: null,
          images: [],
        },
        quantity: 7,
      },
      {
        product: {
          id: 2,
          arName: "ريد مي 12 سي",
          enName: "Ridme 12C",
          arVariant: "",
          enVariant: "",
          stockLevel: 21,
          category: {
            id: 6,
            arName: " هاتف محمول ",
            enName: " Mobile",
          },
          company: {
            id: 6,
            arName: "شاومي",
            enName: "Xaiome",
          },
          price: 150,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 2,
      },
    ],
    totalPrice: 1480,
    discount: 0,
    discountCode: null,
    status: "Completed",
  },
  {
    id: 10,
    customer: {
      id: 1,
      name: "Omar",
      email: "omar@test.com",
      gender: "Male",
      birthday: "1992-1-1",
    },
    products: [
      {
        product: {
          id: 6,
          arName: "فأرة أر إل 23",
          enName: "Mouse RL23",
          arVariant: "",
          enVariant: "",
          stockLevel: 18,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 7,
            arName: "رايزير",
            enName: "Razer",
          },
          price: 85,
          discount: 10,
          availability: true,
          quantity: 50,
          coverImg: null,
          images: [],
        },
        quantity: 20,
      },
      {
        product: {
          id: 4,
          arName: "  سماعات إتش 12 إل 5",
          enName: "Headphones H12L5",
          arVariant: "",
          enVariant: "",
          stockLevel: 19,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: null,
          price: 42,
          discount: 10,
          availability: false,
          quantity: 0,
          coverImg: null,
          images: [],
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          arName: "ريد مي 12 سي",
          enName: "Ridme 12C",
          arVariant: "",
          enVariant: "",
          stockLevel: 21,
          category: {
            id: 6,
            arName: " هاتف محمول ",
            enName: " Mobile",
          },
          company: {
            id: 6,
            arName: "شاومي",
            enName: "Xaiome",
          },
          price: 150,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
    ],
    totalPrice: 1210,
    discountCode: null,
    discount: 0,

    status: "Delivered",
  },
  {
    id: 5,
    customer: {
      id: 4,
      name: "Lina",
      email: "lina@test.com",
      gender: "Female",
      birthday: "2005-9-12",
    },
    products: [
      {
        product: {
          id: 1,
          arName: "لينوفو ايداباد 3 أل 15313",
          enName: "Lenovo idea P3 L15313",
          arVariant: "",
          enVariant: "",
          stockLevel: 20,
          category: {
            id: 4,
            arName: "حاسوب محمول",
            enName: "Laptop",
          },
          company: {
            id: 4,
            arName: "لينوفو",
            enName: "Lenovo",
          },
          price: 600,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 3,
          arName: "سماعات ايبود 3",
          enName: "Headphones ipod 3",
          arVariant: "",
          enVariant: "",
          stockLevel: 19,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 5,
            arName: "أبل",
            enName: "Apple",
          },
          price: 230,
          discount: 0,
          availability: true,
          quantity: 3,
          coverImg: null,
          images: [],
        },
        quantity: 4,
      },
      {
        product: {
          id: 5,
          arName: "لوحة مفاتيح في أس 1456",
          enName: "Keyboard VS1456",
          arVariant: "",
          enVariant: "",
          stockLevel: 22,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: null,
          price: 50,
          discount: 2,
          avilabilty: true,
          quantity: 20,
          coverImg: null,
          images: [],
        },
        quantity: 3,
      },
    ],
    totalPrice: 2400,
    discount: 0,
    discountCode: null,
    status: "Completed",
  },
  {
    id: 6,
    customer: {
      id: 4,
      name: "Yousef",
      email: "yousef@test.com",
      gender: "Male",
      birthday: "1999-2-29",
    },
    products: [
      {
        product: {
          id: 1,
          arName: "لينوفو ايداباد 3 أل 15313",
          enName: "Lenovo idea P3 L15313",
          arVariant: "",
          enVariant: "",
          stockLevel: 20,
          category: {
            id: 4,
            arName: "حاسوب محمول",
            enName: "Laptop",
          },
          company: {
            id: 4,
            arName: "لينوفو",
            enName: "Lenovo",
          },
          price: 600,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 2,
          arName: "ريد مي 12 سي",
          enName: "Ridme 12C",
          arVariant: "",
          enVariant: "",
          stockLevel: 21,
          category: {
            id: 6,
            arName: " هاتف محمول ",
            enName: " Mobile",
          },
          company: {
            id: 6,
            arName: "شاومي",
            enName: "Xaiome",
          },
          price: 150,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 3,
          arName: "سماعات ايبود 3",
          enName: "Headphones ipod 3",
          arVariant: "",
          enVariant: "",
          stockLevel: 19,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 5,
            arName: "أبل",
            enName: "Apple",
          },
          price: 230,
          discount: 0,
          availability: true,
          quantity: 3,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 4,
          arName: "  سماعات إتش 12 إل 5",
          enName: "Headphones H12L5",
          arVariant: "",
          enVariant: "",
          stockLevel: 19,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: null,
          price: 42,
          discount: 10,
          availability: false,
          quantity: 0,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 5,
          arName: "لوحة مفاتيح في أس 1456",
          enName: "Keyboard VS1456",
          arVariant: "",
          enVariant: "",
          stockLevel: 22,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: null,
          price: 50,
          discount: 2,
          avilabilty: true,
          quantity: 20,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
      {
        product: {
          id: 6,
          arName: "فأرة أر إل 23",
          enName: "Mouse RL23",
          arVariant: "",
          enVariant: "",
          stockLevel: 18,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 7,
            arName: "رايزير",
            enName: "Razer",
          },
          price: 85,
          discount: 10,
          availability: true,
          quantity: 50,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
    ],
    totalPrice: 3800,
    discount: 0,
    discountCode: null,
    status: "Returned",
  },
  {
    id: 7,
    customer: {
      id: 4,
      name: "Akasha",
      email: "akasha@test.com",
      gender: "Female",
      birthday: "1995-10-17",
    },
    products: [
      {
        product: {
          id: 2,
          arName: "ريد مي 12 سي",
          enName: "Ridme 12C",
          arVariant: "",
          enVariant: "",
          stockLevel: 21,
          category: {
            id: 6,
            arName: " هاتف محمول ",
            enName: " Mobile",
          },
          company: {
            id: 6,
            arName: "شاومي",
            enName: "Xaiome",
          },
          price: 150,
          discount: 0,
          availability: true,
          quantity: 13,
          coverImg: null,
          images: [],
        },
        quantity: 3,
      },
      {
        product: {
          id: 6,
          arName: "فأرة أر إل 23",
          enName: "Mouse RL23",
          arVariant: "",
          enVariant: "",
          stockLevel: 18,
          category: {
            id: 5,
            arName: " محلقات تقنية",
            enName: "Tech Accessorie",
          },
          company: {
            id: 7,
            arName: "رايزير",
            enName: "Razer",
          },
          price: 85,
          discount: 10,
          availability: true,
          quantity: 50,
          coverImg: null,
          images: [],
        },
        quantity: 1,
      },
    ],
    totalPrice: 2150,
    discount: 0,
    discountCode: null,
    status: "Delivered",
  },
]);

// Computed
const filteredProducts = computed(() => {
  if (!searchValue.value) {
    return orders.value;
  }
  return orders.value.filter(
    (item) =>
      item.products
        .filter((productItem) => productItem.product.enName)
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      item.arName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.id.toString().includes(searchValue.value)
  );
});

// Methods
function openEditDialog(data) {
  currentData.value = data;
  tempOrder.value = currentData.value;
  editDialog.value = true;
}
function openDeleteDialog(data) {
  currentData.value = data;
  deleteDialog.value = true;
}
function updateOrder() {
  axios
    .put("control/modify/order/" + currentData.value.id, currentData.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        editDialog.value = false;
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
}
function deleteOrder() {
  axios
    .delete("control/delete/order/" + currentData.value.id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    });
}
function deleteProduct(index) {
  currentData.value.products.pop(index);
}

function fetchOrders() {
  axios
    .get("control/list/order", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        orderList.value = res.data;
      }
    });
}
onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
@media (min-width: 768px) {
  .section {
    justify-content: space-between;
  }
  .section div {
    width: 40%;
  }
}
@media (max-width: 768px) {
  .section {
    justify-content: center;
  }
  .section div {
    width: 80%;
    margin: 1rem 0;
  }
}
</style>
