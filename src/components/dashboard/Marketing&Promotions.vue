<template>
  <div class="d-flex flex-wrap w-100 justify-content-center">
    <div class="d-flex justify-content-between flex-wrap m-2 my-3 w-100">
      <div id="search-container" class="d-flex justify-content-end w-75">
        <div class="d-flex justify-content-center w-75">
          <IconField class="w-100">
            <InputIcon class="pi pi-search text-main-color" />
            <InputText v-model="searchDiscountValue" placeholder="Search" class="w-75" />
          </IconField>
        </div>
      </div>
      <div class="d-flex justify-content-end w-25 px-3">
        <Button :label="$t('dash.create')" icon="pi pi-plus" class="text-nowrap" style="min-width: 10rem" @click="createDialog = true" />
      </div>
    </div>
    <DataTable :value="filteredDiscountCodes" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :class="['custom-datatable text-nowrap', isEng ? 'ltr' : 'rtl']" :style="{ width: '95%' }">
      <Column field="code" :header="$t('dash.discountC')" />
      <Column field="capacity" :header="$t('dash.usage')" />
      <Column :header="$t('dash.expired')">
        <template #body="slotProps">
          <span>{{ new Date(slotProps.data.expiredAt).toLocaleDateString("en-uk") }}</span>
        </template>
      </Column>
      <Column field="value" header="%" />
      <Column :header="$t('dash.actions')">
        <template #body="slotProps">
          <Button icon="pi pi-trash" severity="danger" variant="text" class="mx-1" @click="openDeleteDialog(slotProps.data)"></Button>
        </template>
      </Column>
    </DataTable>
  </div>
  <!-- Create Dialog -->
  <Dialog v-model:visible="createDialog" dismissableMask :modal="true" :closable="true" :header="$t('dash.create') + ' ' + $t('dash.code')" :breakpoints="{ '1199px': '85vw', '575px': '95vw' }" :dir="isEng ? 'ltr' : 'rtl'">
    <div class="d-flex justify-content-center w-100 align-items-center flex-wrap">
      <!-- <div class="d-flex justify-content-center flex-wrap align-items-center w-100 m-3">
        <span class="mx-1"> Status : </span>
        <ToggleSwitch v-model="currentData.status" class="mx-1" />
      </div> -->
      <div class="d-flex">
        <div class="w-100 m-3">
          <FloatLabel variant="on" class="w-100">
            <IconField class="w-100">
              <InputIcon class="pi pi-barcode text-main" />
              <InputText id="code" type="text" v-model="currentData.code" fluid />
            </IconField>
            <label for="code">{{ $t("dash.discountC") }}</label>
          </FloatLabel>
        </div>

        <div class="w-100 m-3">
          <FloatLabel variant="on" class="w-100">
            <IconField class="w-100">
              <InputIcon class="pi pi-barcode text-main" />
              <InputText id="code" type="text" v-model="currentData.capacity" fluid />
            </IconField>
            <label for="code">{{ $t("dash.usage") }}</label>
          </FloatLabel>
        </div>

        <div class="w-100 m-3">
          <FloatLabel variant="on" class="w-100">
            <IconField class="w-100">
              <InputIcon class="pi pi-barcode text-main" />
              <InputText id="code" type="text" v-model="currentData.value" fluid />
            </IconField>
            <label for="code">%</label>
          </FloatLabel>
        </div>
      </div>
      <div class="m-3">
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-calendar-clock text-main" />
              <DatePicker id="startDate" v-model="currentData.expiredAt" fluid />
            </IconField>
            <label for="start-date">{{ $t("dash.expired") }}</label>
          </FloatLabel>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="d-flex m-1 mt-3">
        <Button :label="$t('dash.create')" icon="pi pi-save " @click="createDiscountCode"></Button>
      </div>
    </template>
  </Dialog>
  <!-- Edit Dialog -->
  <Dialog v-model:visible="editDialog" dismissableMask :modal="true" :closable="true" :header="'edit #' + currentData.id + ' discount code'" :breakpoints="{ '1199px': '85vw', '575px': '95vw' }" @hide="makeCurrentDataNull" :dir="isEng ? 'ltr' : 'rtl'">
    <div class="d-flex justify-content-center w-100 align-items-center flex-wrap">
      <div class="d-flex justify-content-center flex-wrap align-items-center w-100 m-3">
        <span class="mx-1"> Status : </span>
        <ToggleSwitch v-model="currentData.status" class="mx-1" />
      </div>
      <div class="d-flex flex-wrap justify-content-center align-items-center w-100 m-3">
        <FloatLabel variant="on" class="w-75">
          <IconField class="w-100">
            <InputIcon class="pi pi-barcode text-main" />
            <InputText id="code" type="text" v-model="currentData.code" fluid />
          </IconField>
          <label for="code">Discount code</label>
        </FloatLabel>
      </div>
      <div class="section d-flex flex-wrap align-items-center w-100 m-3">
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-calendar-clock text-main" />
              <DatePicker id="startDate" v-model="currentData.startDate" showTime hourFormat="12" fluid />
            </IconField>
            <label for="start-date">Start date</label>
          </FloatLabel>
        </div>
        <div>
          <FloatLabel variant="on">
            <IconField class="w-100">
              <InputIcon class="pi pi-calendar-times text-main" />
              <DatePicker id="end-date" v-model="currentData.endDate" showTime hourFormat="12" fluid />
            </IconField>
            <label for="end-date">End date</label>
          </FloatLabel>
        </div>
      </div>
    </div>
    <template #footer>
      <div class="d-flex m-1 mt-3">
        <Button label="Update" icon="pi pi-file-arrow-up" severity="info" @click="updatediscountCode"></Button>
      </div>
    </template>
  </Dialog>
  <!-- Delete Dialog -->
  <Dialog v-model:visible="deleteDialog" dismissableMask :modal="true" :closable="true" :header="$t('dash.delete')" :style="{ width: '35rem' }" :breakpoints="{ '1199px': '85vw', '575px': '95vw' }" @hide="makeCurrentDataNull" :dir="isEng ? 'ltr' : 'rtl'">
    <span> {{ $t("dash.delete_question1") }} {{ $t("dash.code") }} "{{ currentData.code }}" ?</span>
    <template #footer>
      <Button icon="pi pi-trash" :label="$t('dash.delete')" severity="danger" @click="deleteDiscountCode"></Button>
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
import Accordion from "primevue/accordion";
import AccordionPanel from "primevue/accordionpanel";
import AccordionHeader from "primevue/accordionheader";
import AccordionContent from "primevue/accordioncontent";
import ToggleSwitch from "primevue/toggleswitch";
import DatePicker from "primevue/datepicker";

import { ref, computed, onBeforeMount, onMounted } from "vue";
import axios from "axios";

// Hooks
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});

// Data
const searchCampaignsValue = ref(null);
const searchDiscountValue = ref(null);
const isEng = ref(false);
const createDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);
const discountCodes = ref([
  {
    id: 1,
    code: "GG12GG21",
    usageCount: 102,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    status: true,
  },
  {
    id: 2,
    code: "QWQW1212WQ",
    usageCount: 5,
    startDate: "2025-04-15",
    endDate: "2025-04-30",
    status: false,
  },
  {
    id: 3,
    code: "SS21EE12",
    usageCount: 1127,
    startDate: "2025-03-15",
    endDate: "2025-06-30",
    status: true,
  },
  {
    id: 4,
    code: "42WEqw2",
    usageCount: 0,
    startDate: "2025-06-01",
    endDate: "2025-06-31",
    status: false,
  },
  {
    id: 5,
    code: "23fwqvy5",
    usageCount: 12500,
    startDate: "2024-06-01",
    endDate: "2025-12-31",
    status: false,
  },
  {
    id: 6,
    code: "23fFW#$QS",
    usageCount: 32501,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: false,
  },
  {
    id: 6,
    code: "WEARE2332",
    usageCount: 30,
    startDate: "2025-05-01",
    endDate: "2025-05-31",
    status: true,
  },
]);
const currentData = ref({
  id: null,
  code: null,
  capacity: 0,
  value: null,
  expiredAt: null,
});

// Computed

const filteredDiscountCodes = computed(() => {
  if (!searchDiscountValue.value) {
    return discountCodes.value;
  }
  return discountCodes.value.filter((item) => item.code.toLowerCase().includes(searchDiscountValue.value.toLowerCase()) || item.capacity.toString().includes(searchDiscountValue.value) || item.expiredAt.toString().includes(searchDiscountValue.value));
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
function updatediscountCode() {
  console.log("Updated!!", currentData.value);
  editDialog.value = false;
}
function deleteDiscountCode() {
  axios
    .delete("control/delete/code/" + currentData.value.id, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        window.location.reload();
      }
    });
}
function createDiscountCode() {
  currentData.value.expiredAt = new Date(currentData.value.expiredAt).toISOString().slice(0, 19).replace("T", " ");
  axios
    .post("control/new/codes", currentData.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 201) {
        window.location.reload();
      }
    });
}
function makeCurrentDataNull() {
  currentData.value = {
    id: null,
    code: null,
    usageCount: 0,
    startDate: null,
    endDate: null,
    status: false,
  };
}

function fetchCodes() {
  axios
    .get("control/list/codes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        discountCodes.value = res.data;
      }
    });
}

onMounted(() => {
  fetchCodes();
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
