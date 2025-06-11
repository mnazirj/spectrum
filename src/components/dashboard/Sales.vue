<template>
  <div>
    <div
      class="d-flex justify-content-evenly flex-wrap w-100"
      id="card-container"
    >
      <!-- Card 1 -->
      <Card
        :value="{
          value: 50,
          fontSize: '2.5rem',
          textWrap: false,
          bold: true,
          withComma: true,
          symbol: '$',
        }"
        :label="{
          value: 'AVO',
          fontSize: '2rem',
          textWrap: false,
          bold: false,
        }"
        :icon="{ value: 'pi pi-dollar', size: '6rem' }"
        :style="{ width: '20rem', height: '11rem' }"
      />
      <Card
        :value="{
          value: 2.34,
          fontSize: '2rem',
          textWrap: false,
          bold: true,
          symbol: '%',
        }"
        :label="{
          value: 'Conversion Rate',
          fontSize: '1.7rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{ value: 'fa-solid fa-money-bill-transfer', size: '6rem' }"
        :style="{ width: '20rem', height: '11rem' }"
      />
      <Card
        :value="{
          value: 34456,
          fontSize: '2rem',
          textWrap: false,
          bold: true,
          withComma: true,
          symobl: '$',
        }"
        :label="{
          value: 'Total Revenue',
          fontSize: '1.7rem',
          textWrap: true,
          bold: false,
        }"
        :icon="{ value: 'fa-solid fa-sack-dollar', size: '6rem' }"
        :style="{ width: '20rem', height: '11rem' }"
      />
    </div>
    <div id="charts-container" class="">
      <div
        class="d-flex justify-content-center align-items-center p-2 px-4 my-1 mt-2 w-100"
      ></div>
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
  </div>
</template>

<script setup>
import Card from "@/components/dashboard/Card.vue";
import Chart from "primevue/chart";
import { onMounted, ref } from "vue";

// Data
const chartData = ref(null);
const chartOptions = ref(null);

// Hooks
onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});

// Methods
const setChartData = () => {
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
        label: "Product Purchased",
        backgroundColor: documentStyle.getPropertyValue("--primary-color-500"),
        borderColor: documentStyle.getPropertyValue("--primary-color-600"),
        data: [
          2000, 3000, 4550, 1200, 5500, 3500, 1900, 2600, 2700, 2100, 2900,
          3200, 1800,
        ],
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
  height: 20rem;
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
