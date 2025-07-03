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
              :placeholder="$t('dash.search')"
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
          :label="$t('dash.create')"
          icon="pi pi-plus"
          class="custom-button"
          style="min-width: 6rem"
          @click="createDialog = true"
        />
      </div>
    </div>
    <div id="body" class="d-flex w-100 justify-content-center">
      <DataTable
        :value="filteredBrands"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        :class="['custom-datatable text-nowrap', isEng ? 'ltr' : 'rtl']"
        :style="{ width: '95%' }"
        :loading="brands == null"
      >
        <Column :header="$t('dash.id')" class="width-10">
          <template #body="slotProps">
            <span>#{{ slotProps.data.id }}</span>
          </template>
        </Column>
        <Column :header="$t('dash.name')">
          <template #body="slotProps">
            <div class="">
              <span v-if="isEng">{{ slotProps.data.title }}</span>
              <span v-else>{{ slotProps.data.arName }}</span>
            </div>
          </template>
        </Column>
        <Column :header="$t('dash.actions')" class="width-20">
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
    :header="$t('dash.brand.create_a_brand')"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <Form
      v-slot="$form"
      :resolver="createResolver"
      @submit="onFormSubmitCreate"
    >
      <div
        class="w-100 d-flex justify-content-center align-items-center flex-wrap"
      >
        <div class="section w-100 d-flex align-items-center flex-wrap m-3">
          <div>
            <FloatLabel variant="on">
              <InputText
                id="en-name"
                name="title"
                type="text"
                v-model="newBrands.title"
                fluid
              />
              <label for="en-name"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{
                  $t("dash.name_in_english")
                }}</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.title?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $t($form.title.error?.message) }}</Message
            >
          </div>
          <div>
            <FloatLabel variant="on">
              <InputText
                id="ar-name"
                name="arName"
                type="text"
                v-model="newBrands.arName"
                fluid
              />
              <label for="ar-name"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{
                  $t("dash.name_in_arabic")
                }}</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.arName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $t($form.arName.error?.message) }}</Message
            >
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="d-flex m-1 mt-3">
          <Button
            :label="$t('dash.create')"
            icon="pi pi-plus"
            type="submit"
            :loading="loadingData"
          ></Button>
        </div>
      </div>
    </Form>
  </Dialog>
  <!-- Edit Dialog -->
  <Dialog
    v-model:visible="editDialog"
    :modal="true"
    :closable="true"
    :header="`${$t('dash.edit')}  ${$t('dash.brand.brand')} '${isEng? currentData.title : currentData.arName}'`"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <Form v-slot="$form" :resolver="editResolver" @submit="onFormSubmitEdit">
      <div
        class="w-100 d-flex justify-content-center align-items-center flex-wrap"
      >
        <div class="section w-100 d-flex align-items-center flex-wrap m-3">
          <div>
            <FloatLabel>
              <InputText
                id="en-name"
                name="title"
                type="text"
                v-model="currentData.title"
                fluid
              />
              <label for="en-name"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{
                  $t("dash.name_in_english")
                }}</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.title?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $t($form.title.error?.message) }}</Message
            >
          </div>
          <div>
            <FloatLabel variant="on">
              <InputText
                id="ar-name"
                name="arName"
                type="text"
                v-model="currentData.arName"
                fluid
              />
              <label for="ar-name"
                ><i class="fa-solid fa-heading mx-1" /><span class="mx-1">{{
                  $t("dash.name_in_arabic")
                }}</span></label
              >
            </FloatLabel>
            <Message
              v-if="$form.arName?.invalid"
              severity="error"
              size="small"
              variant="simple"
              class="w-100"
              >{{ $t($form.arName.error?.message) }}</Message
            >
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="d-flex m-1 mt-3">
          <Button
            :label="$t('dash.update')"
            icon="pi pi-file-arrow-up"
            severity="info"
            type="submit"
            :loading="loadingData"
          ></Button>
        </div>
      </div>
    </Form>
  </Dialog>
  <!-- Delete Dialog -->
  <Dialog
    v-model:visible="deleteDialog"
    :modal="true"
    :closable="true"
    :header="`${$t('dash.delete')}  ${$t('dash.brand.brand')}  '${isEng? currentData.title : currentData.arName}'`"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <span v-if="isEng">
      {{ $t("dash.delete_question1") }} {{ $t("dash.brand.brand") }} "{{
        currentData.enName
      }}" {{ $t("dash.?") }}</span
    >
    <span v-else>
      {{ $t("dash.delete_question1") }} {{ $t("dash.brand.brand") }} "{{
        currentData.arName
      }}" {{ $t("dash.?") }}</span
    >
    <template #footer>
      <Button
        icon="pi pi-trash"
        :label="$t('dash.delete')"
        severity="danger"
        @click="deleteBrand"
        :loading="loadingData"
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
import { Form } from "@primevue/forms";
import Message from "primevue/message";

import { ref, computed, onMounted, onBeforeMount } from "vue";
import axios from "axios";

// Hooks
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});
onMounted(() => {
  getBrands();
});

// Data
const searchValue = ref(null);
const isEng = ref(false);
const loadingData = ref(false);
const currentData = ref({ id: null, arName: null, title: null });
const createDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

const brands = ref([
  {
    id: 1,
    arName: "المراعي",
    title: "Al-Mara2e",
  },
  {
    id: 2,
    arName: "التغذية",
    title: "Al-Taghzea",
  },
  {
    id: 3,
    arName: "برسيل",
    title: "Barsel",
  },
  {
    id: 4,
    arName: "لينوفو",
    title: "Lenovo",
  },
  {
    id: 5,
    arName: "أبل",
    title: "Apple",
  },
  {
    id: 6,
    arName: "شاومي",
    title: "Xaiome",
  },
  {
    id: 7,
    arName: "رايزير",
    title: "Razer",
  },
]);

const newBrands = ref({
  title: null,
  arName: null,
});

// Computed
const filteredBrands = computed(() => {
  if (!searchValue.value) {
    return brands.value;
  }
  return brands.value.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
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
function createBrand() {
  loadingData.value = true;
  axios
    .post("/control/new/brand", newBrands.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 201) {
        loadingData.value = false;
        window.location.reload();
      }
      // if exit 400
      //
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function updateBrand() {
  loadingData.value = true;
  axios
    .put(`/control/modify/brand/${currentData.value.id}`, currentData.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        loadingData.value = false;
        window.location.reload();
      }
      // if id not exit 400
      //
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function deleteBrand() {
  loadingData.value = true;
  axios
    .delete(`/control/delete/brand/${currentData.value.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        loadingData.value = false;
        window.location.reload();
      }
      // if id not exit 400
      //
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function getBrands() {
  axios
    .get("/control/list/brand", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        brands.value = res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
const createResolver = ({ values }) => {
  const errors = {};

  if (!values.title) {
    errors.title = [{ message: "dash.name_in_english_is_required" }];
  }
  if (!values.arName) {
    errors.arName = [{ message: "dash.name_in_arabic_is_required" }];
  }
  return { errors };
};
const editResolver = () => {
  const errors = {};

  if (!currentData.value.title) {
    errors.title = [{ message: "dash.name_in_english_is_required" }];
  }
  if (!currentData.value.arName) {
    errors.arName = [{ message: "dash.name_in_arabic_is_required" }];
  }
  return { errors };
};
const onFormSubmitCreate = ({ valid }) => {
  if (valid) {
    createBrand();
    console.log("created!!");
  }
};
const onFormSubmitEdit = ({ valid }) => {
  if (valid) {
    updateBrand();
    console.log("updated!!");
  }
};
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
