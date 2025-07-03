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
        :value="filteredSubCategories"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        removableSort
        :class="['custom-datatable text-nowrap', isEng ? 'ltr' : 'rtl']"
        :style="{ width: '95%' }"
        :loading="subCategories == null"
      >
        <Column :header="$t('dash.id')" class="width-10">
          <template #body="slotProps">
            <span>#{{ slotProps.index + 1 }}</span>
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
        <Column :header="$t('dash.category.category')">
          <template #body="slotProps">
            <div class="">
              <span v-if="isEng">{{ slotProps.data.category.title }}</span>
              <span v-else>{{ slotProps.data.category.arName }}</span>
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
    :header="$t('dash.sub-category.create_a_sub-category')"
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
                type="text"
                name="title"
                v-model="newSubCategory.title"
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
                type="text"
                name="arName"
                v-model="newSubCategory.arName"
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
        <!-- category -->
        <div
          class="w-100 d-flex justify-content-center flex-wrap align-items-center mt-2"
        >
          <Select
            v-model="newSubCategory.categoryId"
            name="category"
            optionValue="id"
            :options="categories"
            :optionLabel="isEng ? 'title' : 'arName'"
            :placeholder="$t('dash.sub-category.select_a_category')"
            class="w-50"
          />
          <Message
            v-if="$form.category?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="w-100 d-flex justify-content-center"
            >{{ $t($form.category.error?.message) }}</Message
          >
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="d-flex m-1 mt-3">
          <Button
            :label="$t('dash.create')"
            icon="pi pi-plus"
            :loading="loadingData"
            type="submit"
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
    :header="`${$t('dash.edit')} ${$t('dash.sub-category.sub-category')} ' ${isEng? currentData.title : currentData.arName}'`"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <Form v-slot="$form" :resolver="editResolver" @submit="onFormSubmitEdit">
      <div
        class="w-100 d-flex justify-content-center align-items-center flex-wrap"
      >
        <div class="section w-100 d-flex align-items-center flex-wrap m-3">
          <div>
            <FloatLabel variant="on">
              <InputText
                id="en-name"
                type="text"
                name="title"
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
              <IconField class="w-100">
                <InputIcon class="pi pi-pencil text-main" />
                <InputText
                  id="ar-name"
                  type="text"
                  name="arName"
                  v-model="currentData.arName"
                  fluid
                />
              </IconField>
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
              name="category"
              class="w-100"
              >{{ $t($form.arName.error?.message) }}</Message
            >
          </div>
        </div>
        <!-- category -->
        <div
          class="w-100 d-flex justify-content-center align-items-center mt-2"
        >
          <Select
            v-model="currentData.categoryId"
            optionValue="id"
            :options="categories"
            :optionLabel="isEng ? 'title' : 'arName'"
            :placeholder="$t('dash.sub-category.select_a_category')"
            class="w-50"
          />
          <Message
            v-if="$form.category?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="w-100 d-flex justify-content-center"
            >{{ $t($form.category.error?.message) }}</Message
          >
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="d-flex m-1 mt-3">
          <Button
            :label="$t('dash.update')"
            icon="pi pi-file-arrow-up"
            severity="info"
            :loading="loadingData"
            type="submit"
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
    :header="`${$t('dash.delete')} ${$t('dash.sub-category.sub-category')} '${isEng? currentData.title : currentData.arName}'`"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <span v-if="isEng">
      {{ $t("dash.delete_question1") }} "{{ currentData.title }}"
      {{ $t("dash.from") }} {{ $t("dash.sub-category.sub-category") }}
      {{ $t("dash.?") }}</span
    >
    <span v-else>
      {{ $t("dash.delete_question1") }} "{{ currentData.arName }}"
      {{ $t("dash.from") }} {{ $t("dash.sub-category.sub-category") }}
      {{ $t("dash.?") }}</span
    >
    <template #footer>
      <Button
        icon="pi pi-trash"
        :label="$t('dash.delete')"
        severity="danger"
        @click="deleteSubCategory"
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
import Select from "primevue/select";
import { Form } from "@primevue/forms";
import Message from "primevue/message";
import axios from "axios";

import { ref, computed, onMounted, onBeforeMount } from "vue";

// Hooks
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});
onMounted(() => {
  getSubCategories();
  getCategories();
});

// Data
const searchValue = ref(null);
const isEng = ref(false);
const loadingData = ref(false);
const currentData = ref({
  id: null,
  title: null,
  arName: null,
  category: null,
  categoryId: null,
});
const createDialog = ref(false);
const editDialog = ref(false);
const deleteDialog = ref(false);

const subCategories = ref([
  {
    id: 1,
    title: "laptop",
    arName: "حاسب محمول",
    category: {
      id: 1,
      title: "Electronic",
      arName: "إلكترونيات",
      description: "all of electronic device",
      arDescription: "جميع الأجهزة الإلكترونية",
    },
  },
  {
    id: 2,
    title: "knife",
    arName: "سكين",
    category: {
      id: 2,
      title: "Kitchen",
      arName: "مطبخ",
      description: "all of kitchen tools",
      arDescription: "جميع  أدوات المطبخ",
    },
  },
  {
    id: 3,
    title: "Mobile",
    arName: "هاتف محمول",
    category: {
      id: 1,
      title: "Electronic",
      arName: "إلكترونيات",
      description: "all of electronic device",
      arDescription: "جميع الأجهزة الإلكترونية",
    },
  },
]);
const categories = ref([
  {
    id: 1,
    title: "Electronic",
    arName: "إلكترونيات",
    description: "all of electronic device",
    arDescription: "جميع الأجهزة الإلكترونية",
  },
  {
    id: 2,
    title: "Kitchen",
    arName: "مطبخ",
    description: "all of kitchen tools",
    arDescription: "جميع  أدوات المطبخ",
  },
  {
    id: 3,
    title: "test",
    arName: "اختبار",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quod aliquid magnam quam quia nemo suscipit mollitia quasi, rem eius pariatur cumque quo unde temporibus perspiciatis consequatur nam harum tenetur.",
    arDescription:
      "أكره شيئًا أعظم من الذي لا يتقبله أحد، كأنه وليد اللحظة، ومنه تُرى الأزمنة تتوالى، لأن هذه الأزمنة قد اخترقت.",
  },
]);
const newSubCategory = ref({
  title: null,
  arName: null,
  category: {
    id: null,
    title: null,
    arName: null,
  },
  categoryId: null,
});

// Computed
const filteredSubCategories = computed(() => {
  if (!searchValue.value) {
    return subCategories.value;
  }
  return subCategories.value.filter(
    (item) =>
      item.title.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.arName.toLowerCase().includes(searchValue.value.toLowerCase()) ||
      item.category.title
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      item.category.arName
        .toLowerCase()
        .includes(searchValue.value.toLowerCase()) ||
      item.id.toString().includes(searchValue.value)
  );
});

// Methods
function openEditDialog(data) {
  currentData.value = data;
  currentData.value.categoryId = data.category.id;
  editDialog.value = true;
}
function openDeleteDialog(data) {
  currentData.value = data;
  deleteDialog.value = true;
}
function createSubCategory() {
  loadingData.value = true;
  axios
    .post("/control/new/subcategory", newSubCategory.value, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 201) {
        loadingData.value = false;
        window.location.reload();
      }
      // if id exist  400
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function updateSubCategory() {
  loadingData.value = true;
  axios
    .put(
      `/control/modify/subcategory/${currentData.value.id}`,
      currentData.value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("_token")}`,
        },
      }
    )
    .then((res) => {
      if (res.status == 200) {
        loadingData.value = false;
        window.location.reload();
      }
      // if 400
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function deleteSubCategory() {
  loadingData.value = true;
  axios
    .delete(`/control/delete/subcategory/${currentData.value.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        loadingData.value = false;
        window.location.reload();
      }
    })
    .catch((e) => {
      loadingData.value = false;
      console.log(e);
    });
}
function getCategories() {
  axios
    .get("/control/list/category", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status === 200) {
        categories.value = res.data;
      }
    })
    .catch((e) => {
      console.log(e);
    });
}
function getSubCategories() {
  axios
    .get("control/list/subcategory", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("_token")}`,
      },
    })
    .then((res) => {
      if (res.status == 200) {
        subCategories.value = res.data;
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
  if (!values.category) {
    errors.category = [
      { message: "dash.sub-category.you_must_select_one_of_cateogries" },
    ];
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
  if (!currentData.value.categoryId) {
    errors.category = [
      { message: "dash.sub-category.you_must_select_one_of_cateogries" },
    ];
  }
  return { errors };
};
const onFormSubmitCreate = ({ valid }) => {
  if (valid) {
    createSubCategory();
    console.log("created!!");
  }
};
const onFormSubmitEdit = ({ valid }) => {
  if (valid) {
    updateSubCategory();
    console.log("Updated!!! ");
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
