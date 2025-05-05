<template>
  <div>
    <div id="header" class="d-flex justify-content-between m-2 my-3">
      <div class="d-flex justify-content-end w-75">
        <div class="d-flex justify-content-center w-75">
          <IconField class="w-100">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText
              v-model="searchValue"
              placeholder="Search"
              class="w-75"
            />
          </IconField>
        </div>
      </div>
      <div class="d-flex justify-content-end w-25 px-3">
        <Button
          label="Create"
          icon="pi pi-plus"
          class="custom-button"
          style="min-width: 6rem"
          @click="creatDialog = true"
        />
      </div>
    </div>
    <div id="body" class="p-2 m-1">
      <DataTable
        :value="products"
        paginator
        :rows="5"
        class="custom-datatable text-nowrap"
      >
        <Column header="ID">
          <template #body="slotProps">
            <span>#{{ slotProps.data.id }}</span>
          </template>
        </Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column header="Brand">
          <template #body="slotProps">
            <span v-if="slotProps.data.brand || slotProps.data.brand != null">{{
              slotProps.data.brand
            }}</span>
            <span
              v-else
              class="text-danger font-italic"
              :style="{ fontSize: '0.7rem' }"
            >
              NO-BRAND
            </span>
          </template>
        </Column>
        <Column field="stockLevel" header="Stock Level"></Column>
        <Column header="Price">
          <template #body="slotProps">
            <span>{{ slotProps.data.price }} $</span>
          </template>
        </Column>
        <Column header="Availability">
          <template #body="slotProps">
            <i
              v-if="slotProps.data.availability"
              class="pi pi-check-circle text-success"
            />
            <i v-else class="pi pi-ban text-danger" />
          </template>
        </Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column header="Actions">
          <template #body="slotProps">
            <div class="d-flex">
              <Button
                icon="pi pi-pen-to-square"
                severity="info"
                variant="text"
                class="mx-1"
                @click="openEditDialog(slotProps.data)"
              ></Button>
              <Button
                icon="pi pi-trash"
                severity="danger"
                variant="text"
                class="mx-1"
                @click="openDeleteDialog(slotProps.data)"
              ></Button>
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <!-- Create Dialog -->

  <Dialog
    v-model:visible="creatDialog"
    modal
    header="Create a product"
    :style="{ width: '60rem' }"
  >
    <div class="d-flex justify-content-center align-items-center flex-wrap w-100 p-2 px-4">
      <!-- Product Name -->
      <div id="name-container" class="d-flex flex-wrap align-content-center w-100 my-3">
        <div class="">
          <FloatLabel variant="on">
            <InputText id="name-in-english" fluid />
            <label for="name-in-english">Name in english</label>
          </FloatLabel>
        </div>
        <div class="">
          <FloatLabel variant="on">
            <InputText id="name-in-arabic" fluid />
            <label for="name-in-arabic">Name in arabic</label>
          </FloatLabel>
        </div>
      </div>
      <!-- Product variant -->
      <div
        id="variant-container"
        class="d-flex flex-wrap align-content-center w-100 my-3"
      >
        <div class="">
          <FloatLabel variant="on">
            <Textarea
              id="variant-in-english"
              rows="5"
              cols="30"
              style="resize: none"
              fluid
            />
            <label for="variant-in-english">Variant in english</label>
          </FloatLabel>
        </div>
        <div class="">
          <FloatLabel variant="on">
            <Textarea
              id="variant-in-arabic"
              rows="5"
              cols="30"
              style="resize: none"
              fluid
            />
            <label for="variant-in-arabic">Variant in arabic</label>
          </FloatLabel>
        </div>
      </div>
      <!-- description -->
      <div
        id="description-container"
        class="d-flex flex-wrap align-content-center w-100 my-3"
      >
        <div class="">
          <FloatLabel variant="on">
            <Textarea
              id="description-in-english"
              rows="5"
              cols="30"
              style="resize: none"
              fluid
            />
            <label for="description-in-english">Description in english</label>
          </FloatLabel>
        </div>
        <div class="">
          <FloatLabel variant="on">
            <Textarea
              id="description-in-arabic"
              rows="5"
              cols="30"
              style="resize: none"
              fluid
            />
            <label for="description-in-arabic">Description in arabic</label>
          </FloatLabel>
        </div>
      </div>
      <!-- Category & Company & Quantity -->
      <div
        id="ccq-container"
        class="d-flex flex-wrap align-content-center w-100 my-3"
      >
        <div class="mt-3">
          <Select v-model="newProduct.category" :options="categories" optionLabel="enName" placeholder="Select a category" class="w-100" />
        </div>
        <div class="mt-3">
          <Select v-model="newProduct.company" :options="companies" optionLabel="enName" placeholder="Select a company" class="w-100" />
        </div>
        <div class=" mt-3">
          <IconField class="w-100">
            <InputIcon class="pi pi-calculator text-main" />
            <InputNumber v-model="newProduct.quantity" fluid />
          </IconField>
        </div>
      </div>
    </div>
  </Dialog>

  <!-- Edit Dialog -->

  <!-- Delete Dialog -->
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
import Textarea from "primevue/textarea";
import Select from 'primevue/select';
import InputNumber from 'primevue/inputnumber';
import { Form } from "@primevue/forms";

import { ref } from "vue";

// Data
const currentData = ref(null);
const creatDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const products = ref([
  {
    id: 1,
    name: "Lenovo idea P3 L15313",
    category: "Laptop",
    stockLevel: 20,
    brand: "Lenovo",
    price: 600,
    avilabilty: true,
    quantity: 13,
  },
  {
    id: 2,
    name: "Ridme 12C",
    category: "Mobile",
    stockLevel: 21,
    brand: "Xaiome",
    price: 150,
    avilabilty: false,
    quantity: 0,
  },
  {
    id: 3,
    name: "Headphones ipod 3",
    category: "Tech Accessorie",
    stockLevel: 19,
    price: 230,
    brand: "Apple",
    avilabilty: true,
    quantity: 3,
  },
  {
    id: 4,
    name: "Headphones H12L5",
    category: "Tech Accessorie",
    stockLevel: 19,
    price: 230,
    avilabilty: true,
    quantity: 3,
  },
  {
    id: 5,
    name: "Keyboard VS1456",
    category: "Tech Accessorie",
    stockLevel: 22,
    price: 50,
    avilabilty: true,
    quantity: 20,
  },
  {
    id: 6,
    name: "Keyboard QWE54",
    category: "Tech Accessorie",
    stockLevel: 22,
    price: 50,
    avilabilty: true,
    quantity: 20,
  },
  {
    id: 6,
    name: "Mouse RL23",
    category: "Tech Accessorie",
    stockLevel: 22,
    price: 50,
    brand: "Razer",
    avilabilty: true,
    quantity: 20,
  },
]);
const newProduct = ref({
  arName: "",
  enName: "",
  arVariant:"",
  enVariant:"",
  category: "",
  company:"",
  stockLevel: 0,
  brand: "",
  price: 0,
  availability: false,
  quantity:0,
});
const categories = ref([

  {
    id:1,
    arName:'أجبان وألبان',
    enName:'Cheese and Dairy'
  },
  {
    id:2,
    arName:'منظفات ',
    enName:'Detergents'
  },
  {
    id:3,
    arName:'معلبات ',
    enName:'Canned Food'
  },
]);
const companies = ref([
  {
    id:1,
    arName:"المراعي",
    enName:"Al-Mara2e"
  },
  {
    id:2,
    arName:"التغذية",
    enName:"Al-Taghzea"
  },
  {
    id:3,
    arName:"برسيل",
    enName:"Barsel"
  },
]);



// Methods
function openEditDialog(data) {
  currentData.value = data;
  editDialog.value = true;
}
function openDeleteDialog(data) {
  currentData.value = data;
  deleteDialog.value = true;
}
</script>

<style scoped>
@media (min-width: 768px) {
  #name-container,
  #variant-container,
  #description-container,
  #ccq-container {
    justify-content: space-between;
  }
  #name-container div,
  #variant-container div,
  #description-container div {
    width: 40%;
  }
  #ccq-container div{
    width: 30%;
  }

}

@media (max-width: 768px) {
  #name-container,
  #variant-container,
  #description-container,
  #ccq-container {
    justify-content: center;
  }
  #name-container div,
  #variant-container div,
  #description-container div {
    width: 80%;
    margin: 1rem 0;
  }
  #ccq-container div {
    width: 60% ;
  }
}
</style>
