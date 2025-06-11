<template>
  <div>
    <div
      class="d-flex justify-content-evenly flex-wrap w-100"
      id="card-container"
    >
      <!-- Card 1 -->
      <Card
        :value="{
          value: 5000,
          fontSize: '2rem',
          textWrap: false,
          bold: true,
          withComma: true,
        }"
        :label="{
          value: 'Session',
          fontSize: '1.5rem',
          textWrap: false,
          bold: false,
        }"
        :icon="{ value: 'fa-solid fa-network-wired', size: '5rem' }"
        :style="{ width: '18rem', height: '10rem' }"
      />
      <!-- Card 2 -->
      <Card
        :value="{
          value: 30,
          fontSize: '2rem',
          textWrap: false,
          bold: true,
          symbol: '%',
        }"
        :label="{
          value: 'Bounce Rate',
          fontSize: '1.5rem',
          textWrap: false,
          bold: false,
        }"
        :icon="{ value: 'fa-solid fa-money-bill-trend-up', size: '5rem' }"
        :style="{ width: '18rem', height: '10rem' }"
      />
      <!-- Card 3 -->
      <Card
        :value="{
          value: 5,
          fontSize: '1.5rem',
          textWrap: false,
          bold: true,
          symbol: ' Minutes',
        }"
        :label="{
          value: 'Avg.Duation',
          fontSize: '1.5rem',
          textWrap: false,
          bold: false,
        }"
        :icon="{ value: 'fa-solid fa-stopwatch', size: '5rem' }"
        :style="{ width: '18rem', height: '10rem' }"
      />
      <!-- Card 4 -->
      <Card
        :value="{
          value: 1.2,
          fontSize: '2rem',
          textWrap: false,
          bold: true,
          symbol:' sec',
        }"
        :label="{
          value: 'Site Speed',
          fontSize: '1.5rem',
          textWrap: false,
          bold: false,
        }"
        :icon="{ value: 'fa-solid fa-gauge-simple-high', size: '5rem' }"
        :style="{ width: '18rem', height: '10rem' }"
      />
      <!-- Card 5 -->
      <Card
        :value="{
          value: 4.8,
          fontSize: '2rem',
          textWrap: false,
          bold: true,
        }"
        :label="{
          value: 'Responsiveness Rating',
          fontSize: '1.2rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{ value: 'pi pi-star-fill', size: '5rem' }"
        :style="{ width: '18rem', height: '10rem' }"
      />
    </div>
    <div class="section flex-wrap d-flex w-100 align-items-md-center mt-4">
      <div class="d-flex justify-content-center align-items-center">
        <DataTable :value="topSellingProduct" class="custom-datatable w-100">
          <template #header>
            <div class="d-flex justify-content-center align-items-center w-100">
              <span class="fs-3 font-bold font-monospace"
                >Top Selling Products</span
              >
            </div>
          </template>
          <Column header="Name">
            <template #body="slotProps">
              <span v-if="1 === 1">{{ slotProps.data.enName }}</span>
              <span v-else>{{ slotProps.data.arName }}</span>
            </template>
          </Column>
          <Column header="Category">
            <template #body="slotProps">
              <span v-if="1 === 1">{{ slotProps.data.category.enName }}</span>
              <span v-else>{{ slotProps.data.category.arName }}</span>
            </template>
          </Column>
          <Column header="Company">
            <template #body="slotProps">
              <div v-if="slotProps.data.company != null">
                <span v-if="1 === 1">{{ slotProps.data.company.enName }}</span>
                <span v-else>{{ slotProps.data.company.arName }}</span>
              </div>
              <div v-else>
                <span
                  class="text-danger font-italic text-nowrap"
                  :style="{ fontSize: '0.7rem' }"
                >
                  NO-COMPANY
                </span>
              </div>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="d-flex justify-content-center align-items-center">
        <Chart
          type="pie"
          :data="chartData"
          :options="chartOptions"
          class="pie-chart w-100"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/dashboard/Card.vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";

// Data
const chartData = ref();
const chartOptions = ref();
const topSellingProduct = ref([
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
]);

// Hooks
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

// Methods
const setChartData = () => {
  const documentStyle = getComputedStyle(document.body);

  return {
    labels: ["Tech Accessorie", "Mobile", "Laptop", "Other"],
    datasets: [
      {
        data: [540, 325, 285, 702],
        backgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-500"),
          documentStyle.getPropertyValue("--p-orange-500"),
          documentStyle.getPropertyValue("--p-green-500"),
          documentStyle.getPropertyValue("--p-gray-500"),
        ],
        hoverBackgroundColor: [
          documentStyle.getPropertyValue("--p-cyan-400"),
          documentStyle.getPropertyValue("--p-orange-400"),
          documentStyle.getPropertyValue("--p-green-400"),
          documentStyle.getPropertyValue("--p-gray-400"),
        ],
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");

  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: textColor,
        },
      },
    },
  };
};
</script>

<style scoped>
.pie-chart {
  height: 23rem;
}
@media (min-width: 768px) {
  .section {
    justify-content: space-between;
  }
  .section div {
    width: 46%;
  }
}
@media (max-width: 768px) {
  .section {
    justify-content: center;
  }
  .section div {
    width: 95%;
    margin: 1rem 0;
  }
}
</style>
