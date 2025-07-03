<template>
  <div>
    <div
      class="d-flex justify-content-evenly flex-wrap w-100"
      id="card-container"
    >
      <!-- Card 1 -->
      <Card
        :value="{
          value: 100,
          fontSize: '1.8rem',
          textWrap: false,
          bold: true,
          withComma: true,
        }"
        :label="{
          value: 'New Customers',
          fontSize: '1rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{
          value: 'pi pi-user',
          size: '6rem',
        }"
        :style="{ width: '14rem', height: '10rem' }"
      />
      <!-- Card 2 -->
      <Card
        :value="{
          value: 3000,
          fontSize: '1.8rem',
          textWrap: false,
          bold: true,
          withComma: true,
        }"
        :label="{
          value: 'Total User',
          fontSize: '1.2rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{ value: 'pi pi-users', size: '6rem' }"
        :style="{ width: '14rem', height: '10rem' }"
      />
      <!-- Card 3 -->
      <Card
        :value="{
          value: 250,
          fontSize: '1.8rem',
          textWrap: false,
          bold: true,
        }"
        :label="{
          value: 'Orders Count',
          fontSize: '1.2rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{ value: 'pi pi-box', size: '5rem' }"
        :style="{ width: '14rem', height: '10rem' }"
      />
      <!-- Card 4 -->
      <Card
        :value="{
          value: '50',
          fontSize: '2rem',
          textWrap: false,
          bold: true,
          withComma: true,
          symbol: '$',
        }"
        :label="{
          value: 'AVO',
          fontSize: '1.5rem',
          textWrap: false,
          bold: false,
        }"
        :icon="{ value: 'pi pi-dollar', size: '5rem' }"
        :style="{ width: '14rem', height: '10rem' }"
      />
    </div>
    <div class="px-2">
      <div
        class="d-flex flex-wrap justify-content-center align-items-center mt-5 mb-1"
      >
        <div class="line-chart-container p-2 px-4 my-1 mt-2">
          <Chart
            type="line"
            :data="chartLineData"
            :options="chartLineOptions"
            class="line-chart"
          />
        </div>
        <div class="table-chart-container p-2 px-4 my-1 mt-2">
          <DataTable
            :value="Lastpurchase"
            :class="['custom-datatable', isEng ? 'ltr' : 'rtl']"
          >
            <Column field="name" header="Name"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="total" header="Total"></Column>
          </DataTable>
        </div>
      </div>
      <div
        class="d-flex flex-wrap justify-content-center align-items-center mt-5 mb-1"
      >
        <div class="bar-chart-container p-2 px-4 my-1 mt-2">
          <Chart
            type="bar"
            :data="chartBarData"
            :options="chartBarOptions"
            class="bar-chart"
          />
        </div>

        <div class="table-chart-container p-2 px-4 my-1 mt-2">
          <DataTable
            :value="Lastpurchase"
            :class="['custom-datatable', isEng ? 'ltr' : 'rtl']"
          >
            <Column field="name" header="Name"></Column>
            <Column field="quantity" header="Quantity"></Column>
            <Column field="total" header="Total"></Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from "@/components/dashboard/Card.vue";
import Chart from "primevue/chart";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { ref, onBeforeMount, onMounted } from "vue";

// Hooks
onBeforeMount(() => {
  if (localStorage.getItem("locale") === "en") {
    isEng.value = true;
  }
});
onMounted(() => {
  chartLineData.value = setChartLineData();
  chartLineOptions.value = setChartLineOptions();
  chartBarData.value = setChartBarData();
  chartBarOptions.value = setChartBarOptions();
});

// Data
const isEng = ref(false);
const chartLineData = ref();
const chartLineOptions = ref();
const chartBarData = ref();
const chartBarOptions = ref();
const Lastpurchase = ref([
  {
    id: 1,
    name: "Tomato",
    quantity: 2,
    total: 120,
  },
  {
    id: 2,
    name: "PS4",
    quantity: 2,
    total: 120,
  },
  {
    id: 3,
    name: "Lenovo",
    quantity: 2,
    total: 120,
  },
]);

// Methods
const setChartLineData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40, 35, 20, 12, 25, 50],
        fill: false,
        borderColor: documentStyle.getPropertyValue("--primary-color-500"),
        tension: 0.4,
      },
    ],
  };
};
const setChartLineOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.6,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

const setChartBarData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["Sun", "Mon", "Tus", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: documentStyle.getPropertyValue("--primary-color-500"),
        borderColor: documentStyle.getPropertyValue("--p-gray-800"),
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };
};
const setChartBarOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };
};
</script>

<style scoped>
.bar-chart {
  height: 15rem;
}
.line-chart {
  height: 15rem;
}

@media (min-width: 1024px) {
  .bar-chart-container {
    width: 60%;
  }
  .line-chart-container {
    width: 60%;
  }
  .table-chart-container {
    width: 38%;
  }
}
@media (max-width: 1024px) {
}
@media (max-width: 768px) {
}
@media (max-width: 576px) {
}
</style>
