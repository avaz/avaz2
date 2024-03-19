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
} from "chart.js";
import { Radar } from "vue-chartjs";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
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
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: Object.values(engineering),
    },
  ],
});
const entrepreneurshipData = ref({
  labels: Object.keys(entrepreneurship),
  datasets: [
    {
      label: "Entrepreneurship",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgb(99,125,255)",
      pointBackgroundColor: "rgb(35,48,194)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgb(6,24,112)",
      data: Object.values(entrepreneurship),
    },
  ],
});
const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
});
</script>

<template>
  <div class="flex justify-center">
    <div>
      <Radar
        id="engineeringChart"
        :data="engineeringData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
