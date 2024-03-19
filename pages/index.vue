<script lang="ts" setup>
import { useCv } from "#imports";
import TextGradient from "~/components/TextGradient.vue";
import LayoutStack from "~/components/LayoutStack.vue";
import { TransitionPresets, useTransition } from "@vueuse/core";
import type { ComputedRef } from "vue";

const cv = useCv();
const contact = await cv.getContact();

const yearsOfExperience = ref(0);
const projectsCompleted = ref(0);
const maxTeamSize = ref(0);
const locWritten = ref(0);

const counters: ComputedRef<Array<number>> = useTransition(
  [yearsOfExperience, projectsCompleted, maxTeamSize, locWritten],
  {
    duration: 1000,
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
  <article class="mx-auto bg-white dark:bg-gray-900 w-full">
    <Title>{{ contact?.name }} - Software Engineer</Title>
    <section class="flex justify-center max-w-6xl m-6 mx-auto">
      <div class="flex">
        <div class="flex flex-col items-center justify-center">
          <div class="flex items-center gap-4">
            <nuxt-img
              format="avif,webp"
              class="block rounded-full w-28 h-28 md:hidden"
              alt="avatar"
              src="/assets/images/avatar.png"
            />
            <div>
              <TextGradient
                :title="contact?.name"
                class="text-4xl md:text-5xl text-center"
              />
              <p class="my-2 text-center font-bold dark:text-white text-2xl">
                Software Engineer
              </p>
            </div>
          </div>
          <p
            class="m-4 break-after-column hyphens-auto leading-snug text-justify md:text-center text-2xl dark:text-gray-400"
          >
            I specialize in meticulously translating business operations to
            machines using the most appropriate tools and techniques.
            <br />
            And I can do it in the other way around too.
          </p>
        </div>
        <div class="hidden md:block">
          <nuxt-img
            format="avif,webp"
            alt="avatar"
            src="/assets/images/avatar.png"
          />
        </div>
      </div>
    </section>
    <LayoutStack class="my-14">
      <CountCard v-for="(s, index) in statisticsMap" :key="s.label">
        <template #header>
          <Icon :name="s.icon" class="mb-2 h-12 w-12" />
        </template>
        <template #title>
          <span class="text-6xl font-bold">
            {{ s.value }}
          </span>
        </template>
        <template #description>
          <div class="text-center text-2xl">
            <span>{{ s.label }}</span>
            <sup>
              <a :href="'#ref' + index + 1" class="text-sm">{{ index + 1 }}</a>
            </sup>
          </div>
        </template>
      </CountCard>
    </LayoutStack>
    <section class="my-14">
      <h1 class="m-4 text-center text-2xl dark:text-white">
        All that done with at least one of these programming languages
      </h1>
      <LayoutStack>
        <CountCard
          v-for="lang in statistics?.programmingLanguages"
          :key="lang.uid"
          :icon-name="`bx:bxl-${lang.name.toLowerCase()}`"
        >
          <template #header>
            <Icon
              v-if="lang.name.toLocaleLowerCase() !== 'sql'"
              :name="`bx:bxl-${lang.name.toLowerCase()}`"
              class="mb-2 h-12 w-12"
            />
            <Icon
              v-else
              name="arcticons:sqlite-editor"
              class="mb-2 h-12 w-12"
            />
          </template>
          <template #title>
            <span class="text-2xl">{{ lang.name }}</span>
          </template>
        </CountCard>
      </LayoutStack>
    </section>
    <section class="my-14">
      <h1 class="m-4 text-center text-2xl dark:text-white">
        Building up these skills (in hours of practice)
      </h1>
      <SkillRadar />
    </section>
  </article>
</template>
