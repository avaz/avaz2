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
import { Expertise } from "~/models/models";

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
const database = useDatabase();
const fetchExpertiseByKind = async (kind: string) => {
  return await database.query(
    Expertise,
    `
      select distinct e.uid, e.name, e.type, e.kind
      from (select unnest(a.expertises, recursive:=true), a.start
            from (select unnest(e.activities, recursive:=true)
                  from (select unnest(experiences, recursive:=true)
                        from read_parquet('cv.parquet')) as e) as a) as ex
             join read_parquet('expertises.parquet') as e on ex.uid = e.uid
      where e.kind = '${kind}'
      order by start desc limit 5
    `,
  );
};
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
const definitions = ref({
  data: {
    icon: "carbon:data-blob",
    text: "Everything related to data including retrieval, analytics, wrangling, and visualization falls withing this category. Examples: SQL, databases, Kafka, Databricks.",
  },
  backend: {
    icon: "tdesign:server",
    text: "Everything that needs compute but not necessarily needs to provide a visual output. Things like Spring, Flask or libraries like Jackson, Pydantic.",
  },
  frontend: {
    icon: "material-symbols:laptop-windows-outline",
    text: "All frameworks and libraries related to the frontend like Vue, Tailwind, NuxtJS, and others.",
  },
  operations: {
    icon: "clarity:ci-cd-line",
    text: "Everything related to DevOps, CI/CD, Docker, Kubernetes, AWS, GCP, Azure, Github Actions, Jenkins, and others.",
  },
  quality_assurance: {
    icon: "carbon:test-tool",
    text: "Everything related to testing, like JUnit, Pytest, Locust, JMeter, etc.",
  },
  tool: {
    icon: "codicon:tools",
    text: "All essential and base tooling to employ software engineering, including programming languages like Java, Python, JavaScript, and others. Also, Git, IDE's like IntelliJ, PyCharm, WebStorm, and others.",
  },
});
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
        display: false,
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
      display: false,
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
  <div class="mx-auto flex max-w-6xl flex-col items-center gap-14">
    <div>
      <div class="m-6">
        <p class="text-xl font-bold">Engineering</p>
        <p class="text-md">
          Overview of the accumulated hours applied in software engineering.
        </p>
      </div>
      <div class="mx-auto flex">
        <div class="w-full self-center">
          <PolarArea
            id="engineeringChart"
            :data="engineeringData"
            :options="chartOptions"
          />
        </div>
        <div class="text-md m-4 w-fit">
          <div
            v-for="label in engineeringData.labels"
            :key="label"
            class="mb-2"
          >
            <div class="flex flex-row gap-2">
              <div
                class="flex w-28 flex-col items-center justify-center p-4 text-center"
              >
                <Icon
                  :name="definitions[label].icon"
                  class="text-md inline-block text-4xl"
                  :class="`text-${label}`"
                />
                <div :class="`text-${label}`">
                  {{ label.split("_").join(" ") }}
                </div>
              </div>
              <p class="flex-1 self-center">
                {{ definitions[label].text }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="mb-6 text-center text-xl font-bold">Entrepreneurship</div>
      <div class="mx-auto flex">
        <div class="text-md m-4 w-fit">
          <p class="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at atque
            autem dolores eaque eligendi est et, hic illum magnam modi,
            molestias natus odio pariatur quia, quidem quisquam ullam velit.
          </p>
          <p class="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at atque
            autem dolores eaque eligendi est et, hic illum magnam modi,
            molestias natus odio pariatur quia, quidem quisquam ullam velit.
          </p>
          <p class="mb-2">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A at atque
            autem dolores eaque eligendi est et, hic illum magnam modi,
            molestias natus odio pariatur quia, quidem quisquam ullam velit.
          </p>
        </div>
        <div class="w-full self-center">
          <PolarArea
            id="entrepreneurshipData"
            :data="entrepreneurshipData"
            :options="chartOptions"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped></style>
