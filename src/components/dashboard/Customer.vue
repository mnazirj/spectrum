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
      ></div>
    </div>
    <div id="body" class="d-flex flex-wrap w-100 justify-content-center">
      <Accordion class="w-100" :value="['0']" multiple>
        <AccordionPanel value="0">
          <AccordionHeader class="fs-3">Customers</AccordionHeader>
          <AccordionContent>
            <DataTable
              :value="filteredCustomers"
              paginator
              :rows="5"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              class="custom-datatable text-nowrap"
              :style="{ width: '95%' }"
            >
              <Column field="name" header="Name"></Column>
              <Column field="email" header="Email"></Column>
              <Column field="purchase" header="Purchase"></Column>
              <Column field="clv" header="CLV"></Column>
            </DataTable>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel value="1">
          <AccordionHeader class="fs-3">Loyalty Programs</AccordionHeader>
          <AccordionContent>
            <div
              class="d-flex justify-content-between flex-wrap m-2 my-3 w-100"
            >
              <div
                id="search-container"
                class="d-flex justify-content-end w-75"
              ></div>
              <div
                id="btn-create-container"
                class="d-flex justify-content-end w-25 px-3"
              >
                <Button
                  label="Create program"
                  icon="pi pi-plus"
                  class="text-nowrap"
                  style="min-width: 10rem"
                  @click="createDialog = true"
                />
              </div>
            </div>
            <DataTable
              :value="filteredLoyaltyPrograms"
              paginator
              :rows="5"
              :rowsPerPageOptions="[5, 10, 20, 50]"
              class="custom-datatable text-nowrap"
              :style="{ width: '95%' }"
            >
              <Column header="Loyalty Program Name">
                <template #body="slotProps">
                  <span v-if="1 === 1">{{ slotProps.data.enName }}</span>
                  <span v-else>{{ slotProps.data.arName }}</span>
                </template>
              </Column>
              <Column header="Description">
                <template #body="slotProps">
                  <span v-if="1 === 1">{{ slotProps.data.enDescription }}</span>
                  <span v-else>{{ slotProps.data.arDescription }}</span>
                </template>
              </Column>
              <Column header="Actions">
                <template #body="slotProps">
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
                </template>
              </Column>
            </DataTable>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  </div>
  <!-- Create Dialog -->
  <Dialog
    v-model:visible="createDialog"
    :modal="true"
    :closable="true"
    header="Create a loyalty program"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
  >
    <div
      class="d-flex justify-content-center w-100 align-items-center flex-wrap"
    >
      <div class="section d-flex flex-wrap align-items-center w-100 m-3">
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
            <label for="en-name">Loyalty program name in english</label>
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
            <label for="ar-name">Loyalty program name in arabic</label>
          </FloatLabel>
        </div>
      </div>
      <div class="section d-flex flex-wrap align-items-center w-100 m-3">
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="en-description"
                type="text"
                v-model="currentData.enDescription"
                fluid
              />
            </IconField>
            <label for="en-description"
              >Loyalty program description in english</label
            >
          </FloatLabel>
        </div>
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="ar-description"
                type="text"
                v-model="currentData.arDescription"
                fluid
              />
            </IconField>
            <label for="ar-description"
              >Loyalty program description in arabic</label
            >
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
          @click="createLoyaltyProgram"
        ></Button>
      </div>
    </template>
  </Dialog>
  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="editDialog"
    :modal="true"
    :closable="true"
    :header="'edit #' + currentData.id + ' Loyalty program'"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    @hide="makeCurrentDataNull"
  >
    <div
      class="d-flex justify-content-center w-100 align-items-center flex-wrap"
    >
      <div class="section d-flex flex-wrap align-items-center w-100 m-3">
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
            <label for="en-name">Loyalty program name in english</label>
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
            <label for="ar-name">Loyalty program name in arabic</label>
          </FloatLabel>
        </div>
      </div>
      <div class="section d-flex flex-wrap align-items-center w-100 m-3">
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="en-description"
                type="text"
                v-model="currentData.enDescription"
                fluid
              />
            </IconField>
            <label for="en-description"
              >Loyalty program description in english</label
            >
          </FloatLabel>
        </div>
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-pencil text-main" />
              <InputText
                id="ar-description"
                type="text"
                v-model="currentData.arDescription"
                fluid
              />
            </IconField>
            <label for="ar-description"
              >Loyalty program description in arabic</label
            >
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
          @click="updateLoyaltyProgram"
        ></Button>
      </div>
    </template>
  </Dialog>
  <!-- Delete Dialog -->
  <Dialog
    v-model:visible="deleteDialog"
    :modal="true"
    :closable="true"
    :header="'Delete #' + currentData.id + ' loyalty program'"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    @hide="makeCurrentDataNull"
  >
    <span v-if="1 == 1">
      Are you sure you want to delete {{ currentData.enName }} loyalty program
      ?</span
    >
    <span v-else>
      Are you sure you want to delete {{ currentData.arName }} loyalty program
      ?</span
    >
    <template #footer>
      <Button
        icon="pi pi-trash"
        label="Delete"
        severity="danger"
        @click="deleteLoyaltyProgram"
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
import Divider from "primevue/divider";
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";

import { ref , computed } from "vue";

// Data
const searchValue = ref(null);
const createDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const customers = ref([
  {
    id: 1,
    name: "Mohammad",
    email: "mohammads@test.com",
    gender: "Male",
    birthday: "1998-2-21",
    clv: 0,
    purchase: 0,
  },
  {
    id: 2,
    name: "Lanaya",
    email: "lanaya@test.com",
    gender: "Female",
    birthday: "2000-12-12",
    clv: 9999,
    purchase: 99,
  },
  {
    id: 3,
    name: "Mohammad",
    email: "mohammad@test.com",
    gender: "Male",
    birthday: "1993-11-12",
    clv: 1200,
    purchase: 7,
  },
  {
    id: 4,
    name: "Ahmed",
    email: "ahmed@test.com",
    gender: "Male",
    birthday: "1998-5-12",
    clv: 1000,
    purchase: 6,
  },
  {
    id: 5,
    name: "Lina",
    email: "lina@test.com",
    gender: "Female",
    birthday: "1865-01-01",
    clv: 200,
    purchase: 1,
  },
  {
    id: 6,
    name: "John Sina",
    email: "john@test.com",
    gender: "Male",
    birthday: "2015-01-06",
    clv: 16000,
    purchase: 14,
  },
]);
const loyaltyPrograms = ref([
  {
    id: 1,
    enName: "White",
    arName: "أبيض",
    enDescription: "After 5 puarchases , 5 point per puarchase",
    arDescription: "بعد 5 مشتريات , 5 نقاط لكل عملية شراء ",
  },
  {
    id: 2,
    enName: "black",
    arName: "أسود",
    enDescription: "After 15 puarchases , 15 point per puarchase",
    arDescription: "بعد 15 مشتريات , 15 نقاط لكل عملية شراء ",
  },
  {
    id: 3,
    enName: "Bronze",
    arName: "برونز",
    enDescription: "After 4 puarchases , 4 point per puarchase",
    arDescription: "بعد 4 مشتريات , 4 نقاط لكل عملية شراء ",
  },
  {
    id: 4,
    enName: "Silver",
    arName: "فضي",
    enDescription: "After 3 puarchases , 3 point per puarchase",
    arDescription: "بعد 3 مشتريات , 3 نقاط لكل عملية شراء ",
  },
  {
    id: 5,
    enName: "Golden",
    arName: "ذهبي",
    enDescription: "After 2 puarchases , 2 point per puarchase",
    arDescription: "بعد 2 مشتريات , 2 نقاط لكل عملية شراء ",
  },
]);
const currentData = ref({
  enName: null,
  arName: null,
  enDescription: null,
  arDescription: null,
});

// Computed
const filteredCustomers = computed(() => {
  if (!searchValue.value) {
    return customers.value;
  }
  return customers.value.filter(
    (item) =>
      item.name.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.email
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      item.gender.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.birthday.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.id.toString().includes(searchValue.value) ||
      item.clv.toString().includes(searchValue.value) ||
      item.purchase.toString().includes(searchValue.value)
  );
});
const filteredLoyaltyPrograms = computed(() => {
  if (!searchValue.value) {
    return loyaltyPrograms.value;
  }
  return loyaltyPrograms.value.filter(
    (item) =>
      item.enName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.enDescription
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      item.arDescription
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
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
function updateLoyaltyProgram() {
  console.log("Updated!!", currentData.value);
  editDialog.value = false;
}
function deleteLoyaltyProgram() {
  console.log("Deleted!!!!", currentData.value);
  deleteDialog.value = false;
}
function createLoyaltyProgram() {
  console.log("Created !!! ", currentData.value);
  createDialog.value = false;
}
function makeCurrentDataNull() {
  currentData.value = {
    enName: null,
    arName: null,
    enDescription: null,
    arDescription: null,
  };
}
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
