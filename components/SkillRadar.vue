<script lang="ts" setup>
import colors from "#tailwind-config/theme/colors";

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
  type ChartOptions,
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
const prepareChartData = (category: string, skills: Skill[]) => {
  const group = skills
    ?.filter((s: Skill) => s.category === category)
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
  const labels = Object.keys(group);
  const data = Object.values(group);
  return {
    labels: labels,
    datasets: [
      {
        label: category,
        // @ts-ignore
        backgroundColor: labels.map((k) => `${colors[k]}95`),
        data: data,
      },
    ],
  };
};

const engineeringData = ref(
  prepareChartData("engineering", statistics.value.skills),
);
const entrepreneurshipData = ref(
  prepareChartData("entrepreneurship", statistics.value.skills),
);
const chartOptions = ref<ChartOptions<any>>({
  elements: {
    arc: {
      borderWidth: 2,
      borderColor: colors.white,
    },
  },
  scales: {
    r: {
      grid: {
        color: colors.zinc["300"],
      },
      ticks: {
        color: colors.black,
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
  <div class="mx-auto flex max-w-[972px] flex-col gap-14 md:flex-row">
    <div class="w-full">
      <div class="mb-6 text-center text-gray-600">Engineering</div>
      <PolarArea
        id="engineeringChart"
        :data="engineeringData"
        :options="chartOptions"
      />
    </div>
    <div class="w-full">
      <div class="mb-6 text-center text-gray-600">Entrepreneurship</div>
      <PolarArea
        id="entrepreneurshipData"
        :data="entrepreneurshipData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
