<template>
  <div>
    <div
      class="d-flex justify-content-evenly align-items-center p-2 px-4 my-1 mt-2 w-100"
    >
      <div class="d-flex justify-content-center align-items-center w-50">
        <DataTable
          :value="views"
          class="custom-datatable text-nowrap"
          :style="{ width: '98%' }"
        >
          <Column field="pageName" header="Page Name" />
          <Column header="Views Count">
            <template #body="slotProps">
              <span>{{
                Intl.NumberFormat("en-US").format(slotProps.data.viewsCount)
              }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
      <div class="d-flex justify-content-center align-items-center width-40">
        <Card
          :value="{
            value: '30%',
            fontSize: '2.5rem',
            textWrap: false,
            bold: true,
          }"
          :label="{
            value: 'Bounce Rate',
            fontSize: '1.7rem',
            textWrap: false,
            bold: false,
          }"
          :icon="{ value: 'fa-solid fa-money-bill-trend-up', size: '7rem' }"
          :style="{ width: '22rem', height: '12rem' }"
        />
      </div>
    </div>
    <div
      class="d-flex justify-content-center align-items-center p-2 px-4 my-1 mt-2 w-100"
    >
      <Chart
        type="bar"
        :data="chartData"
        :options="chartOptions"
        class="bar-chart"
      />
    </div>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "./Card.vue";
import Chart from "primevue/chart";
import { ref, onMounted } from "vue";

// Data
const views = ref([
  {
    id: 1,
    pageName: "Makeup",
    viewsCount: 2500,
  },
  {
    id: 2,
    pageName: "Perfume",
    viewsCount: 1500,
  },
  {
    id: 3,
    pageName: "Tech Accessories",
    viewsCount: 8500,
  },
  {
    id: 4,
    pageName: "Mobile",
    viewsCount: 6500,
  },
  {
    id: 5,
    pageName: "Laptop",
    viewsCount: 3500,
  },
]);
const chartData = ref();
const chartOptions = ref();

// Hooks
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

// Methods
const setChartData = () => {
  return {
    labels: ["Makeup", "Mobile", "Perfume", "Tech Accessories", "Laptop"],
    datasets: [
      {
        label: "Most Pages Views",
        data: [2500, 3650, 2975, 3840, 3150],
        backgroundColor: [
          "rgba(250, 80, 22, 0.2)",
          "rgba(6, 182, 212, 0.2)",
          "rgb(107, 114, 128, 0.2)",
          "rgba(139, 92, 246, 0.2)",
          "rgba(90 , 210 , 100, 0.2)",
        ],
        borderColor: [
          "rgb(249, 115, 22)",
          "rgb(6, 182, 212)",
          "rgb(107, 114, 128)",
          "rgb(139, 92, 246)",
          "rgb(40 , 210 , 35)",
        ],
        borderWidth: 1,
      },
    ],
  };
};
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--p-text-muted-color"
  );
  const surfaceBorder = documentStyle.getPropertyValue(
    "--p-content-border-color"
  );

  return {
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
        beginAtZero: true,
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
</script>

<style scoped>
.bar-chart {
  height: 25rem;
}

@media (min-width: 1024px) {
  .bar-chart {
    width: 80%;
  }
}
@media (max-width: 1024px) {
  .bar-chart {
    width: 85%;
  }
}
@media (max-width: 768px) {
  .bar-chart {
    width: 90%;
  }
}
@media (max-width: 576px) {
  .bar-chart {
    width: 95%;
  }
}
</style>
