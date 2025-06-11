<template>
  <div class="">
    <div
      id="header"
      class="d-flex justify-content-between flex-wrap m-2 my-3 w-100"
    >
      <div id="search-container" class="d-flex justify-content-end w-75">
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
      <div
        id="btn-create-container"
        class="d-flex justify-content-end w-25 px-3"
      >
        <Button
          label="Create"
          icon="pi pi-plus"
          class="custom-button"
          style="min-width: 6rem"
          @click="creatDialog = true"
        />
      </div>
    </div>
    <div id="body" class="d-flex justify-content-center">
      <DataTable
        :value="products"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        removableSort
        class="custom-datatable text-nowrap"
        :style="{width:'95%'}"
        
      >
        <Column header="ID">
          <template #body="slotProps">
            <span>#{{ slotProps.data.id }}</span>
          </template>
        </Column>
        <Column header="Name">
          <template #body="slotProps">
            <span v-if="1 == 1">{{ slotProps.data.enName }}</span>
            <span v-else>{{ slotProps.data.arName }}</span>
          </template>
        </Column>
        <Column header="Category">
          <template #body="slotProps">
            <span v-if="1 == 1">{{ slotProps.data.category.enName }}</span>
            <span v-else>{{ slotProps.data.category.arName }}</span>
          </template>
        </Column>
        <Column header="Company">
          <template #body="slotProps">
            <span
              v-if="slotProps.data.company || slotProps.data.company != null"
            >
              <span v-if="1 == 1">{{ slotProps.data.company.enName }}</span>
              <span v-else>{{ slotProps.data.company.arName }}</span>
            </span>
            <span
              v-else
              class="text-danger font-italic"
              :style="{ fontSize: '0.7rem' }"
            >
              NO-COMPANY
            </span>
          </template>
        </Column>
        <Column
          field="stockLevel"
          header="Stock Level"
          sortable
        ></Column>
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
              <Button icon="pi pi-eye" variant="text" class="mx-1"></Button>
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
              <Button
                icon="pi pi-plus"
                variant="text"
                class="mx-1"
                @click="openAddSizeDialog(slotProps.data)"
                
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
    <div
      class="d-flex justify-content-center align-items-center flex-wrap w-100 p-2 px-4"
    >
      <!-- Product Name -->
      <div
        id="name-container"
        class="d-flex flex-wrap align-content-center w-100 my-3"
      >
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
          <Select
            v-model="newProduct.category"
            :options="categories"
            optionLabel="enName"
            placeholder="Select a category"
            class="w-100"
          />
        </div>
        <div class="mt-3">
          <Select
            v-model="newProduct.company"
            :options="companies"
            optionLabel="enName"
            placeholder="Select a company"
            class="w-100"
          />
        </div>
        <div class="mt-3">
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-calculator text-main" />
              <InputNumber id="quantity" v-model="newProduct.quantity" fluid />
            </IconField>
            <label for="quantity">Quantity</label>
          </FloatLabel>
        </div>
      </div>
      <!-- Payment -->
      <div
        id="payment-container"
        class="d-flex flex-wrap align-content-center w-100 my-3"
      >
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-dollar text-main" />
              <InputNumber
                id="price"
                v-model="newProduct.price"
                fluid
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </IconField>
            <label for="price">Price</label>
          </FloatLabel>
        </div>
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-percentage text-main" />
              <InputNumber
                id="discount"
                v-model="newProduct.discount"
                fluid
                :max="100"
                :min="0"
                prefix="%"
              />
            </IconField>
            <label for="discount">Discount</label>
          </FloatLabel>
        </div>
      </div>
      <!-- Product Cover -->
      <div
        id="cover-container"
        class="d-flex flex-wrap justify-content-center align-content-center w-100 my-3"
      >
        <div class="w-100">
          <i class="pi pi-image mx-1" />
          <span class="mx-1 fs-5">Cover image</span>
        </div>
        <div class="d-flex justify-content-center align-items-center w-100 m-3">
          <input
            ref="inputCoverImage"
            type="file"
            accept="image/*"
            class="d-none"
            @change="createAddCoverImage"
          />
          <div
            class="cover-image relative"
            @mouseenter="isCoverImageHovered = true"
            @mouseleave="isCoverImageHovered = false"
            v-if="newProduct.coverImg != null"
          >
            <img
              :src="newProduct.coverImg"
              :style="{ width: '100%', height: '100%', borderRadius: '0.8rem' }"
              alt="cover-image"
            />
            <div
              v-show="isCoverImageHovered"
              class="cover-img-overlay d-flex justify-content-center align-items-center"
            >
              <i
                class="pi pi-eye mx-1 text-main fs-3 cursor-pointer"
                @click="viewCoverImage(newProduct.coverImg)"
              ></i>
              <i
                class="pi pi-pen-to-square mx-1 text-primary fs-3 cursor-pointer"
                @click="inputCoverImage.click()"
              ></i>
              <i
                class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer"
                @click="newProduct.coverImg = null"
              ></i>
            </div>
          </div>
          <div v-else>
            <Button
              icon="pi pi-plus"
              label="Add"
              variant="text"
              @click="inputCoverImage.click()"
            ></Button>
          </div>
        </div>
      </div>
      <!-- Product Images -->
    </div>
    <template #footer>
      <Button
        icon="pi pi-plus"
        label="Create"
        @click="console.log('Created!!')"
      ></Button>
    </template>
  </Dialog>

  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="editDialog"
    modal
    :header="'Edit #' + currentData.id + ' product'"
    :style="{ width: '60rem' }"
  >
    <div
      class="d-flex justify-content-center align-items-center flex-wrap w-100 p-2 px-4"
    >
      <!-- Product Name -->
      <div
        id="name-container"
        class="d-flex flex-wrap align-content-center w-100 my-3"
      >
        <div class="">
          <FloatLabel variant="on">
            <InputText
              id="name-in-english"
              v-model="currentData.enName"
              fluid
            />
            <label for="name-in-english">Name in english</label>
          </FloatLabel>
        </div>
        <div class="">
          <FloatLabel variant="on">
            <InputText id="name-in-arabic" v-model="currentData.arName" fluid />
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
              v-model="currentData.enVariant"
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
              v-model="currentData.arVariant"
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
              v-model="currentData.enDescription"
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
              v-model="currentData.arDescription"
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
          <Select
            v-model="currentData.category"
            :options="categories"
            optionLabel="enName"
            placeholder="Select a category"
            class="w-100"
          />
        </div>
        <div class="mt-3">
          <Select
            v-model="currentData.company"
            :options="companies"
            optionLabel="enName"
            placeholder="Select a company"
            class="w-100"
          />
        </div>
        <div class="mt-3">
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-calculator text-main" />
              <InputNumber id="quantity" v-model="currentData.quantity" fluid />
            </IconField>
            <label for="quantity">Quantity</label>
          </FloatLabel>
        </div>
      </div>
      <!-- Payment -->
      <div
        id="payment-container"
        class="d-flex flex-wrap align-content-center w-100 my-3"
      >
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-dollar text-main" />
              <InputNumber
                id="price"
                v-model="currentData.price"
                fluid
                mode="currency"
                currency="USD"
                locale="en-US"
              />
            </IconField>
            <label for="price">Price</label>
          </FloatLabel>
        </div>
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-percentage text-main" />
              <InputNumber
                id="discount"
                v-model="currentData.discount"
                fluid
                :max="100"
                :min="0"
                prefix="%"
              />
            </IconField>
            <label for="discount">Discount</label>
          </FloatLabel>
        </div>
      </div>
      <!-- Product Cover -->
      <div
        id="cover-container"
        class="d-flex flex-wrap justify-content-center align-content-center w-100 my-3"
      >
        <div class="w-100">
          <i class="pi pi-image mx-1" />
          <span class="mx-1 fs-5">Cover image</span>
        </div>
        <div class="d-flex justify-content-center align-items-center w-100 m-3">
          <input
            ref="inputCoverImage"
            type="file"
            accept="image/*"
            class="d-none"
            @change="editAddCoverImage"
          />
          <div
            class="cover-image relative"
            @mouseenter="isCoverImageHovered = true"
            @mouseleave="isCoverImageHovered = false"
            v-if="currentData.coverImg != null"
          >
            <img
              :src="currentData.coverImg"
              :style="{ width: '100%', height: '100%', borderRadius: '0.8rem' }"
              alt="cover-image"
            />
            <div
              v-show="isCoverImageHovered"
              class="cover-img-overlay d-flex justify-content-center align-items-center"
            >
              <i
                class="pi pi-eye mx-1 text-main fs-3 cursor-pointer"
                @click="viewCoverImage(currentData.coverImg)"
              ></i>
              <i
                class="pi pi-pen-to-square mx-1 text-primary fs-3 cursor-pointer"
                @click="inputCoverImage.click()"
              ></i>
              <i
                class="pi pi-trash mx-1 text-danger fs-3 cursor-pointer"
                @click="currentData.coverImg = null"
              ></i>
            </div>
          </div>
          <div v-else>
            <Button
              icon="pi pi-plus"
              label="Add"
              variant="text"
              @click="inputCoverImage.click()"
            ></Button>
          </div>
        </div>
      </div>
      <!-- Product Images -->
    </div>
    <template #footer>
      <Button
        icon="pi pi-file-arrow-up"
        label="Update"
        severity="info"
        @click="console.log('Update!!')"
      ></Button>
    </template>
  </Dialog>
  <!-- Delete Dialog -->
  <Dialog
    v-model:visible="deleteDialog"
    :modal="true"
    :closable="true"
    :header="'Delete #' + currentData.id + ' product'"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
    <span v-if="1 == 1">
      Are you sure you want to delete {{ currentData.enName }} product?</span
    >
    <span v-else>
      Are you sure you want to delete {{ currentData.arName }} product?</span
    >
    <template #footer>
      <Button
        icon="pi pi-trash"
        label="Delete"
        severity="danger"
        @click="console.log('DELETE!!!')"
      ></Button>
    </template>
  </Dialog>
  <!-- Show Image Dialog -->
  <Dialog
    v-model:visible="showImageDialog"
    modal
    :style="{ width: '70%', height: '80%' }"
    pt:header="p-0 pb-1 justify-content-end"
    pt:content="p-0"
    pt:pcclosebutton:severity="danger"
  >
    <img
      :src="currentImage"
      alt="Full Image"
      class="rounded-bottom-3"
      :style="{
        width: '100%',
        height: '100%',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }"
    />
  </Dialog>
  <!-- Add Size Dialog -->
  <Dialog
    v-model:visible="addSizeDialog"
    :modal="true"
    :closable="true"
    :header="'Add size #' + currentData.id + ' product'"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    pt:content="d-flex justify-content-center"
  >
    <div
      class="width-70 d-flex justify-content-center flex-wrap align-items-center"
    >
      <div class="w-100 d-flex justify-content-center m-3">
        <InputNumber
          ref="addSizeInput"
          :defaultValue="currentData.quantity"
          v-model="newProduct.quantity"
          showButtons
          buttonLayout="horizontal"
          :step="1"
          :min="0"
          fluid
        >
          <template #incrementbuttonicon>
            <span class="pi pi-plus" />
          </template>
          <template #decrementbuttonicon>
            <span class="pi pi-minus" />
          </template>
        </InputNumber>
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-plus" label="Add" @click="addSize"></Button>
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
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import InputNumber from "primevue/inputnumber";
import { Form } from "@primevue/forms";

import { ref } from "vue";

// Data
const currentData = ref({
  arName: "",
  enName: "",
  arVariant: "",
  enVariant: "",
  category: "",
  company: "",
  stockLevel: 0,
  brand: "",
  price: 0,
  discount: 0,
  availability: false,
  quantity: 0,
  coverImg: null,
  images: null,
});
const currentImage = ref(null);
const creatDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const addSizeDialog = ref(false);
const showImageDialog = ref(false);
const isCoverImageHovered = ref(false);
const inputCoverImage = ref(null);
const addSizeInput = ref(null);

const products = ref([
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
]);
const newProduct = ref({
  arName: "",
  enName: "",
  arVariant: "",
  enVariant: "",
  category: "",
  company: "",
  stockLevel: 0,
  brand: "",
  price: 0,
  discount: 0,
  availability: false,
  quantity: 0,
  coverImg: null,
  images: [],
});
const categories = ref([
  {
    id: 1,
    arName: "أجبان وألبان",
    enName: "Cheese and Dairy",
  },
  {
    id: 2,
    arName: "منظفات ",
    enName: "Detergents",
  },
  {
    id: 3,
    arName: "معلبات ",
    enName: "Canned Food",
  },
  {
    id: 4,
    arName: "حاسوب محمول",
    enName: "Laptop",
  },
  {
    id: 5,
    arName: " محلقات تقنية",
    enName: "Tech Accessorie",
  },
  {
    id: 6,
    arName: " هاتف محمول ",
    enName: " Mobile",
  },
]);
const companies = ref([
  {
    id: 1,
    arName: "المراعي",
    enName: "Al-Mara2e",
  },
  {
    id: 2,
    arName: "التغذية",
    enName: "Al-Taghzea",
  },
  {
    id: 3,
    arName: "برسيل",
    enName: "Barsel",
  },
  {
    id: 4,
    arName: "لينوفو",
    enName: "Lenovo",
  },
  {
    id: 5,
    arName: "أبل",
    enName: "Apple",
  },
  {
    id: 6,
    arName: "شاومي",
    enName: "Xaiome",
  },
  {
    id: 7,
    arName: "رايزير",
    enName: "Razer",
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
function openAddSizeDialog(data) {
  currentData.value = data;
  addSizeDialog.value = true;
}
function viewCoverImage(data) {
  currentImage.value = data;
  showImageDialog.value = true;
}
function createAddCoverImage(event) {
  const file = event.target.files?.[0];
  if (!file) {
    console.error("No file selected");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    newProduct.value.coverImg = e.target.result; // Add the image to the gallery
  };
  reader.readAsDataURL(file); // Read the file as a Data URL
}
function editAddCoverImage(event) {
  const file = event.target.files?.[0];
  if (!file) {
    console.error("No file selected");
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    currentData.value.coverImg = e.target.result; // Add the image to the gallery
  };
  reader.readAsDataURL(file); // Read the file as a Data URL
}
function addSize() {
  currentData.value.quantity = newProduct.value.quantity;
  newProduct.value.quantity = 0;
  addSizeDialog.value = false;
}
</script>

<style scoped>
.cover-image {
  width: 70%;
}

.cover-img-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 16rem;
  background: rgba(0, 0, 0, 0.5);
  gap: 10px;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: 0.8rem;
}

.cover-img-overlay div {
  border-radius: 0;
  height: fit-content;
  background: rgba(48, 48, 48, 0.5);
  color: white;
}

.cover-image:hover img {
  filter: blur(3px);
}

.cover-image:hover .cover-img-overlay {
  opacity: 1;
  pointer-events: auto;
}

::v-deep .p-datatable-sort-icon {
  color: var(--primary-text-color-500) !important;
}

@media (min-width: 768px) {
  #name-container,
  #variant-container,
  #description-container,
  #ccq-container,
  #payment-container {
    justify-content: space-between;
  }
  #name-container div,
  #variant-container div,
  #description-container div,
  #payment-container div {
    width: 40%;
  }
  #ccq-container div {
    width: 30%;
  }
  .cover-image {
    height: 16rem;
  }
}

@media (max-width: 768px) {
  #name-container,
  #variant-container,
  #description-container,
  #ccq-container,
  #payment-container {
    justify-content: center;
  }
  #name-container div,
  #variant-container div,
  #description-container div,
  #payment-container div {
    width: 80%;
    margin: 1rem 0;
  }
  #ccq-container div {
    width: 60%;
  }
  .cover-image {
    height: 10rem;
  }
}

@media (min-width: 1440px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 50%;
    justify-content: end;
  }
}
@media (max-width: 1440px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 60%;
    justify-content: end;
  }
}
@media (max-width: 1023px) {
  #search-container {
    width: 80%;
  }
  #header #search-container div {
    width: 70%;
    justify-content: end;
  }
}
@media (max-width: 768px) {
  #search-container {
    width: 100%;
  }
  #header #search-container div {
    width: 90%;
    justify-content: center;
  }
  #header {
    flex-wrap: wrap;
  }
  #btn-create-container {
    width: 90%;
    margin-top: 1rem;
    justify-content: center;
  }
}
</style>
