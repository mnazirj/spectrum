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
      <div class="d-flex justify-content-end w-25 px-3"></div>
    </div>
    <div id="body" class="d-flex w-100 justify-content-center">
      <DataTable
        :value="payments"
        ref="dt"
        paginator
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        removableSort
        :class="['custom-datatable text-nowrap', isEng ? 'ltr' : 'rtl']"
        :style="{ width: '95%' }"
      >
        <template #paginatorstart> </template>
        <template #paginatorend>
          <Button
            type="button"
            icon="pi pi-download"
            label="Export"
            variant="text"
            @click="exportDialog = true"
          />
        </template>
        <Column header="Id" class="width-10">
          <template #body="slotProps">
            <span>#{{ slotProps.data.id }}</span>
          </template>
        </Column>
        <Column header="Prodcut">
          <template #body="slotProps">
            <div class="">
              <span v-if="1 == 1">{{ slotProps.data.product.enName }}</span>
              <span v-else>{{ slotProps.data.product.arName }}</span>
            </div>
          </template>
        </Column>
        <Column header="Revenue">
          <template #body="slotProps">
            <span>{{ formatNumber(slotProps.data.revenue) }} $</span>
          </template>
        </Column>
        <Column header="Profit Margin">
          <template #body="slotProps">
            <span>{{ slotProps.data.profitMargin }}%</span>
          </template>
        </Column>
        <Column header="Cost">
          <template #body="slotProps">
            <span>{{ formatNumber(slotProps.data.cost) }} $</span>
          </template>
        </Column>
        <Column header="Shipping">
          <template #body="slotProps">
            <span>{{ formatNumber(slotProps.data.shipping) }} $</span>
          </template>
        </Column>
        <Column header="Marketing">
          <template #body="slotProps">
            <span>{{ formatNumber(slotProps.data.marketing) }} $</span>
          </template>
        </Column>
        <Column header="operationalCosts">
          <template #body="slotProps">
            <span>{{ formatNumber(slotProps.data.operationalCosts) }} $</span>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <!-- Export Dialog -->
  <Dialog
    v-model:visible="exportDialog"
    :modal="true"
    :closable="true"
    header="Export payment data"
    :style="{ width: '35rem' }"
    :breakpoints="{ '1199px': '85vw', '575px': '95vw' }"
    data-pc-section="export"
    :dir="isEng ? 'ltr' : 'rtl'"
  >
    <div
      class="d-flex justify-content-center align-items-center w-100 flex-wrap"
    >
      <div class="d-flex justify-content-center align-items-center width-90">
        <SelectButton
          v-model="exportWayValue"
          :options="exportWays"
          size="large"
        >
          <template #option="slotProps">
            <i class="fa-solid fa-file-csv" v-if="slotProps.option == 'CSV'" />
            <i class="fa-regular fa-file-excel" v-else />
            <span>{{ slotProps.option }}</span>
          </template>
        </SelectButton>
      </div>
      <div
        v-if="exportWayValue == 'CSV'"
        class="d-flex justify-content-center align-items-center width-90 mt-4"
      >
        <FloatLabel variant="on" class="w-100">
          <DatePicker id="end-date" v-model="endDate" fluid />
          <label for="end-date">End date</label>
        </FloatLabel>
      </div>
    </div>
    <template #footer>
      <Button icon="pi pi-download" label="Export" @click="exportFile" />
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
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";
import SelectButton from "primevue/selectbutton";
import * as XLSX from "xlsx";

import { ref, onBeforeMount } from "vue";

// Hooks

onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});

// Data
const searchValue = ref(null);
const isEng = ref(false);
const exportDialog = ref(false);
const exportWays = ref(["Excel", "CSV"]);
const exportWayValue = ref("Excel");
const endDate = ref(null);
const dt = ref(null);
const payments = ref([
  {
    id: 1,
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
    revenue: 10000,
    profitMargin: 30,
    cost: 7000,
    shipping: 2500,
    marketing: 5000,
    operationalCosts: 3500,
  },
  {
    id: 2,
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
    revenue: 12000,
    profitMargin: 35,
    cost: 8500,
    shipping: 3840,
    marketing: 5504,
    operationalCosts: 1520,
  },
  {
    id: 3,
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
    revenue: 21000,
    profitMargin: 41,
    cost: 35000,
    shipping: 1200,
    marketing: 1000,
    operationalCosts: 2500,
  },
  {
    id: 4,
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
    revenue: 560000,
    profitMargin: 49,
    cost: 15000,
    shipping: 1050,
    marketing: 1300,
    operationalCosts: 4500,
  },
  {
    id: 5,
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
    revenue: 35000,
    profitMargin: 11,
    cost: 8000,
    shipping: 800,
    marketing: 1500,
    operationalCosts: 200,
  },
  {
    id: 6,
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
    revenue: 15000,
    profitMargin: 8,
    cost: 5500,
    shipping: 750,
    marketing: 200,
    operationalCosts: 200,
  },
]);

// Methods
const formatNumber = (value) => {
  return new Intl.NumberFormat("en-US").format(value);
};
const exportFile = () => {
  if (exportWayValue.value === "Excel") {
    console.log("Excel Method fired");
    exportToExcel();
  } else {
    console.log("CSV Method fired");
    exportToCSV();
  }
};
const exportToCSV = () => {
  const date = new Date();
  const dateTimeStr = date.toLocaleString();
  const filename = `payments-${
    date.toISOString().replace(/[:.]/g, "-").split("T")[0]
  }.csv`;

  let csvContent = "";
  // Add a header row with the export time
  if (endDate.value != null) {
    csvContent = `Exported at: ${dateTimeStr}\nEnd Date at: ${
      endDate.value.toISOString().replace(/[:.]/g, "-").split("T")[0]
    }\n`;
  } else {
    csvContent = `Exported at: ${dateTimeStr}\nEnd Date at: NONE\n`;
  }

  // Extract headers from first object
  const headers = Object.keys(payments.value[0]);
  csvContent += headers.join(",") + "\n";

  // Add each row
  payments.value.forEach((item) => {
    const row = headers.map(
      (header) => `"${(item[header] ?? "").toString().replace(/"/g, '""')}"`
    );
    csvContent += row.join(",") + "\n";
  });

  // Trigger download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", filename);
  link.click();

  console.log("Export by CSV");
};
const exportToExcel = () => {
  const date = new Date().toISOString().replace(/[:.]/g, "-").split("T")[0];
  const filename = `payments-${date}.xlsx`;

  const worksheet = XLSX.utils.json_to_sheet(payments.value);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

  XLSX.writeFile(workbook, filename);
};
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
