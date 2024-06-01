<script lang="ts" setup>
import { useCv } from "#imports";
import TextGradient from "~/components/TextGradient.vue";
import LayoutStack from "~/components/LayoutStack.vue";
import { TransitionPresets, useTransition } from "@vueuse/core";
import type { ComputedRef } from "vue";
import FeaturePanel from "~/components/FeaturePanel.vue";

const cv = useCv();
const contact = await cv.getContact();

const yearsOfExperience = ref(0);
const projectsCompleted = ref(0);
const maxTeamSize = ref(0);
const locWritten = ref(0);

const counters: ComputedRef<Array<number>> = useTransition(
  [yearsOfExperience, projectsCompleted, maxTeamSize, locWritten],
  {
    duration: 300,
    transition: TransitionPresets.easeInSine,
  },
);

const statistics = await cv.getStatistics();
onMounted(() => {
  yearsOfExperience.value = statistics?.value.yearsOfExperience;
  projectsCompleted.value = statistics?.value.projectsCompleted;
  maxTeamSize.value = statistics?.value.maxTeamSize;
  locWritten.value = statistics?.value.locWritten;
});

const formatter = Intl.NumberFormat("en", { notation: "compact" });
const statisticsMap = computed(() => {
  return [
    {
      label: "years of experience",
      value: counters.value[0].toFixed(0),
      icon: "heroicons:clock",
    },
    {
      label: "production projects",
      value: counters.value[1].toFixed(0),
      icon: "heroicons:check",
    },
    {
      label: "people managed",
      value: counters.value[2].toFixed(0),
      icon: "heroicons:user-group",
    },
    {
      label: "LoC written",
      value: formatter.format(counters.value[3]).toLocaleLowerCase(),
      icon: "heroicons:code-bracket",
    },
  ];
});
</script>

<template>
  <article class="mx-auto w-full">
    <Title>{{ contact?.name }} - Software Engineer</Title>
    <section class="flex justify-center">
      <div class="m-6 flex max-w-screen-lg">
        <div class="my-8 flex flex-col">
          <TextGradient :title="contact?.name" class="md:text-8xl" />
          <div class="my-16 flex gap-2">
            <NuxtLink class="rounded bg-red-400 p-2 text-white drop-shadow">
              1 Page CV
              <Icon name="ic:baseline-file-download" />
            </NuxtLink>
            <NuxtLink
              to="/curriculum"
              class="rounded bg-indigo-400 p-2 text-white drop-shadow"
            >
              Full CV
              <Icon name="ic:baseline-arrow-forward" />
            </NuxtLink>
          </div>
          <p class="text-xl">Hey, welcome!</p>
          <p class="text-xl">
            I'm a software engineer focused in data engineering and MLOps.
            Originally from <TextGradient title="Brazil" /> currently in The
            Netherlands. Here you can find some information about me and my
            work.
          </p>
          <p class="my-4">
            Currently, I'm
            <span class="text-yellow-700">Head of Engineering</span> at
            <a
              href="https://www.syntho.ai"
              class="text-blue-500 dark:text-blue-300"
              >Syntho AI</a
            >
            where we are building a platform to help companies create synthetic
            data to train their machine learning models.
          </p>
          <Icon
            name="mingcute:target-line"
            class="mx-auto h-32 w-32 text-zinc-400"
          />
        </div>
        <NuxtImg
          id="avatar"
          format="avif,webp"
          alt="avatar"
          src="/assets/images/avatar4.png"
          class="mx-auto h-[150px] w-28 rounded-full md:block md:h-fit md:w-fit md:rounded-none"
        />
      </div>
    </section>
    <section
      class="mx-auto flex flex-col items-center gap-4 px-8 text-xl md:max-w-screen-lg md:flex-row"
    >
      <p class="my-4">
        Currently, I'm
        <span class="text-yellow-700">Head of Engineering</span> at
        <a href="https://www.syntho.ai" class="text-blue-500 dark:text-blue-300"
          >Syntho AI</a
        >
        where we are building a platform to help companies create synthetic data
        to train their machine learning models.
      </p>
      <Icon
        name="mingcute:target-line"
        class="mx-auto h-32 w-32 text-zinc-400"
      />
    </section>
    <section
      class="my-14 bg-gradient-to-b from-gray-100 from-10% via-green-500/10 via-30% to-gray-100 dark:bg-gradient-to-b dark:from-zinc-700/20 dark:from-10% dark:via-green-900/20 dark:via-30% dark:to-gray-900"
    >
      <FeaturePanel />
    </section>
    <section
      class="my-14 bg-gradient-to-b from-gray-100 from-10% via-green-500/20 via-50% to-gray-100 dark:bg-gradient-to-b dark:from-gray-900/20 dark:from-10% dark:via-green-900/20 dark:via-60% dark:to-gray-900"
    >
      <LayoutStack>
        <CountCard
          v-for="(s, index) in statisticsMap"
          :key="s.label"
          class="border-1 my-4 bg-gradient-to-r from-zinc-500 to-neutral-500 text-white drop-shadow-lg dark:border-gray-800 dark:bg-gray-800"
        >
          <template #header>
            <Icon :name="s.icon" class="mb-2 h-12 w-12" />
          </template>
          <template #title>
            <span class="text-6xl font-bold drop-shadow-glow">
              {{ s.value }}
            </span>
          </template>
          <template #description>
            <div class="text-center text-2xl">
              <span>{{ s.label }}</span>
              <sup>
                <a :href="'#ref' + index + 1" class="text-sm">{{
                  index + 1
                }}</a>
              </sup>
            </div>
          </template>
        </CountCard>
      </LayoutStack>
    </section>
    <section class="my-[6rem]">
      <h1 class="m-4 text-center text-2xl dark:text-white">
        All that done with at least one of these programming languages
      </h1>
      <LayoutStack>
        <CountCard
          v-for="lang in statistics?.programmingLanguages.sort((a, b) =>
            a.uid.localeCompare(b.uid),
          )"
          :key="lang.uid"
          :icon-name="`bx:bxl-${lang.name.toLowerCase()}`"
          class="bg-transparent"
        >
          <template #header>
            <Icon
              v-if="lang.name.toLocaleLowerCase() !== 'sql'"
              :name="`devicon:${lang.name.toLowerCase()}`"
              class="mb-2 h-[6rem] w-[6rem]"
            />
            <Icon
              v-else
              name="arcticons:sqlite-editor"
              class="mb-2 h-[6rem] w-[6rem] text-blue-500 dark:text-blue-300"
            />
          </template>
          <template #title>
            <span class="text-sm">{{ lang.name }}</span>
          </template>
        </CountCard>
      </LayoutStack>
    </section>
    <section class="my-[6rem]">
      <h1 class="m-4 text-center text-2xl dark:text-white">
        ...building up these expertise
      </h1>
      <SkillRadar />
    </section>
  </article>
</template>
