<template>
  <div
    v-for="(row, i) in rows"
    :key="i"
    class="d-flex flex-wrap justify-content-center align-items-center mt-5 mb-1"
  >
    <div v-for="(chart, j) in row" :key="j">
      <div v-if="chart.type == 'line'">
        <!-- <Chart
          type="line"
          :data="chartLineData"
          :options="chartLineOptions"
          class="line-chart"
        /> -->
      </div>
      <div v-if="chart.type == 'table'"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const lineLabels = ref(null);
const lineDatasets = ref(null);

const chartLineData = ref(null);
const chartLineOptions = ref({
  label: "",
  data: [],
  fill: false,
  borderColor: "",
  tension: 0,
});

onMounted(() => {
  for (let i = 0; i < rows.value.length - 1; i++) {
    for (let j = 0; j < rows.value[i].length; j++) {
      let temp = rows.value[i][j].type;
      switch (temp) {
        case "line":
          console.log("line is online");
          break;
        case "table":
          console.log("table is online");
          break;
        case "donat":
          console.log("donat is online");
          break;
        case "bar":
          console.log("bar is online");
          break;
      }
    }
  }
  chartLineData.value = setChartLineData;
  chartLineOptions.value = setChartLineOptions;
});

const rows = ref([
  [
    {
      type: "line",
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
      datasets: {
        lable: "test1",
        data: [45, 45, 46, 75, 87, 91, 85, 65, 45, 55, 65, 75],
        fill: false,
        borderColor: "--p-cyan-500",
        tension: 0.1,
      },
    },
    {
      type: "table",
    },
  ],
]);

// Methods
// line chart
const setChartLineData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: lineLabels,
    datasets: [
      {
        label: lineDatasets.value.label,
        data: lineDatasets.value.data,
        fill: lineDatasets.value.fill,
        borderColor: documentStyle.getPropertyValue(
          lineDatasets.value.borderColor
        ),
        tension: lineDatasets.value.tension,
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
// donat
</script>

<style scoped></style>
