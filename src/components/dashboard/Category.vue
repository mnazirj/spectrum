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
          @click="createDialog = true"
        />
      </div>
    </div>
    <div id="body" class="d-flex w-100 justify-content-center">
      <DataTable
        :value="filteredCategories"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        removableSort
        class="custom-datatable text-nowrap"
        :style="{ width: '95%' }"
      >
        <Column header="Id" class="width-10">
          <template #body="slotProps">
            <span>#{{ slotProps.data.id }}</span>
          </template>
        </Column>
        <Column header="Name">
          <template #body="slotProps">
            <div class="">
              <span v-if="1 == 1">{{ slotProps.data.enName }}</span>
              <span v-else>{{ slotProps.data.arName }}</span>
            </div>
          </template>
        </Column>
        <Column header="Actions" class="width-20">
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
    v-model:visible="createDialog"
    :modal="true"
    :closable="true"
    header="Create a category"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
    <div
      class="w-100 d-flex justify-content-center align-items-center flex-wrap"
    >
      <div class="name-section w-100 d-flex align-items-center flex-wrap m-3">
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="en-name"
                type="text"
                v-model="newCategory.enName"
                fluid
              />
            </IconField>
            <label for="en-name">Name in english</label>
          </FloatLabel>
        </div>
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="ar-name"
                type="text"
                v-model="newCategory.arName"
                fluid
              />
            </IconField>
            <label for="ar-name">Name in arabic</label>
          </FloatLabel>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="d-flex m-1 mt-3">
        <Button
          label="Create"
          icon="pi pi-plus"
          @click="createCategory"
        ></Button>
      </div>
    </template>
  </Dialog>
  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="editDialog"
    :modal="true"
    :closable="true"
    :header="'edit #' + currentData.id + ' category'"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
    <div
      class="w-100 d-flex justify-content-center align-items-center flex-wrap"
    >
      <div class="name-section w-100 d-flex align-items-center flex-wrap m-3">
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="en-name"
                type="text"
                v-model="currentData.enName"
                fluid
              />
            </IconField>
            <label for="en-name">Name in english</label>
          </FloatLabel>
        </div>
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="ar-name"
                type="text"
                v-model="currentData.arName"
                fluid
              />
            </IconField>
            <label for="ar-name">Name in arabic</label>
          </FloatLabel>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="d-flex m-1 mt-3">
        <Button
          label="Update"
          icon="pi pi-file-arrow-up"
          severity="info"
          @click="updateCategory"
        ></Button>
      </div>
    </template>
  </Dialog>
  <!-- Delete Dialog -->
  <Dialog
    v-model:visible="deleteDialog"
    :modal="true"
    :closable="true"
    :header="'Delete #' + currentData.id + ' category'"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
    <span v-if="1 == 1">
      Are you sure you want to delete {{ currentData.enName }} category ?</span
    >
    <span v-else>
      Are you sure you want to delete {{ currentData.arName }} category ?</span
    >
    <template #footer>
      <Button
        icon="pi pi-trash"
        label="Delete"
        severity="danger"
        @click="deleteCategory"
      ></Button>
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

import { ref, computed } from "vue";

// Data
const searchValue = ref(null);
const currentData = ref({ id: null, arName: null, enName: null });
const createDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

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
const newCategory = ref({
  enName: null,
  arName: null,
});

// Computed
const filteredCategories = computed(() => {
  if (!searchValue.value) {
    return categories.value;
  }
  return categories.value.filter(
    (item) =>
      item.enName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.id.toString().includes(searchValue.value)
  );
});

// Methods
function openEditDialog(data) {
  currentData.value = data;
  editDialog.value = true;
}
function openDeleteDialog(data) {
  currentData.value = data;
  deleteDialog.value = true;
}
function createCategory() {
  console.log("Created!@!!", newCategory.value);
  createDialog.value = false;
}
function updateCategory() {
  console.log("Updated!!", currentData.value);
  editDialog.value = false;
}
function deleteCategory() {
  console.log("Deleted!!!", currentData.value);
  deleteDialog.value = false;
}
</script>

<style scoped>
@media (min-width: 768px) {
  .name-section {
    justify-content: space-between;
  }
  .name-section div {
    width: 40%;
  }
}
@media (max-width: 768px) {
  .name-section {
    justify-content: center;
  }
  .name-section div {
    width: 80%;
    margin: 1rem 0;
  }
}
</style>
