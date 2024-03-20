<script lang="ts" setup>
import { Skill, useCv } from "#imports";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
} from "chart.js";
import { PolarArea } from "vue-chartjs";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
);

const cv = useCv();
const statistics = await cv.getStatistics();
// group statistics by kind and sum of total hours
const engineering = statistics.value.skills
  ?.filter((s: Skill) => s.category === "engineering")
  .reduce(
    (acc, skill) => {
      if (!acc[skill.kind]) {
        acc[skill.kind] = 0;
      }
      acc[skill.kind] += skill.totalHours;
      return acc;
    },
    {} as Record<string, number>,
  );
const entrepreneurship = statistics.value.skills
  ?.filter((s: Skill) => s.category === "entrepreneurship")
  .reduce(
    (acc, skill) => {
      if (!acc[skill.kind]) {
        acc[skill.kind] = 0;
      }
      acc[skill.kind] += skill.totalHours;
      return acc;
    },
    {} as Record<string, number>,
  );
const engineeringData = ref({
  labels: Object.keys(engineering),
  datasets: [
    {
      label: "Engineering",
      // backgroundColor: "rgba(255,99,132,0.2)",
      // backgroundColor: "rgba(255,99,132,0.2)",
      // borderColor: "rgb(203,12,54)",
      // pointBackgroundColor: "rgba(255,99,132,1)",
      // pointBorderColor: "#fff",
      // pointHoverBackgroundColor: "#fff",
      // pointHoverBorderColor: "rgba(255,99,132,1)",
      data: Object.values(engineering),
    },
  ],
});
const entrepreneurshipData = ref({
  labels: Object.keys(entrepreneurship),
  datasets: [
    {
      label: "Entrepreneurship",
      // backgroundColor: "rgba(255,99,132,0.2)",
      // borderColor: "rgb(99,125,255)",
      // pointBackgroundColor: "rgb(35,48,194)",
      // pointBorderColor: "#fff",
      // pointHoverBackgroundColor: "#fff",
      // pointHoverBorderColor: "rgb(6,24,112)",
      data: Object.values(entrepreneurship),
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    r: {
      ticks: {
        color: "black",
        font: {
          size: 14,
        },
      },
    },
  },
  plugins: {
    legend: {
      align: "start",
      position: "bottom",
      labels: {
        // This more specific font property overrides the global property
        font: {
          size: 14,
        },
        boxWidth: 15,
      },
    },
  },
});
</script>

<template>
  <div class="flex flex-col md:flex-row mx-auto gap-14 max-w-[972px]">
    <div class="w-full">
      <div class="text-center mb-6 text-gray-600">Engineering</div>
      <PolarArea
        id="engineeringChart"
        :data="engineeringData"
        :options="chartOptions"
      />
    </div>
    <div class="w-full">
      <div class="text-center mb-6 text-gray-600">Entrepreneurship</div>
      <PolarArea
        id="entrepreneurshipData"
        :data="entrepreneurshipData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
