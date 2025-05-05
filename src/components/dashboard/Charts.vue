<template>
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
      <DataTable :value="Lastpurchase" class="custom-datatable">
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
      <DataTable :value="Lastpurchase" class="custom-datatable">
        <Column field="name" header="Name"></Column>
        <Column field="quantity" header="Quantity"></Column>
        <Column field="total" header="Total"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import Chart from "primevue/chart";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

import { ref, onMounted } from "vue";

onMounted(() => {
  chartLineData.value = setChartLineData();
  chartLineOptions.value = setChartLineOptions();
  chartBarData.value = setChartBarData();
  chartBarOptions.value = setChartBarOptions();
});

// Data
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
const table2Data = ref([
  {
    id: 1,
    name: "USA",
  },
  {
    id: 1,
    name: "SYR",
  },
  {
    id: 1,
    name: "",
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
