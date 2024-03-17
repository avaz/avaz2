<script lang="ts" setup>
import { useCv } from "#imports";
import SkillsMap from "~/components/SkillsMap.vue";
import TextGradient from "~/components/TextGradient.vue";
import Stack from "~/components/Stack.vue";
import type { ComputedRef } from "vue";
const cv = useCv();
const contact = await cv.getContact();
const statistics = await cv.getStatistics();
const statisticsMap: ComputedRef<
  { label: string; value: number; icon: string }[]
> = computed(() => {
  return [
    {
      label: "years of experience",
      value: statistics?.value.yearsOfExperience,
      icon: "heroicons:clock",
    },
    {
      label: "production projects",
      value: statistics?.value.projectsCompleted,
      icon: "heroicons:check",
    },
    {
      label: "people managed",
      value: statistics?.value.maxTeamSize,
      icon: "heroicons:user-group",
    },
    {
      label: "LoC written",
      value: statistics?.value.locWritten,
      icon: "heroicons:code-bracket",
    },
  ];
});
</script>

<template>
  <article class="grid gap-6 mx-auto bg-white dark:bg-gray-900 w-full">
    <Title>Anderson Vaz - Software Engineer</Title>
    <section class="flex justify-center max-w-6xl mx-auto">
      <div class="flex">
        <div class="flex flex-col items-center justify-center">
          <div class="mt-4 flex items-center gap-4">
            <nuxt-img
              class="block rounded-full w-28 h-28 md:hidden"
              alt="avatar"
              src="/assets/images/avatar.png"
            />
            <div>
              <TextGradient
                :title="contact?.name"
                class="text-5xl text-center"
              />
              <p class="mt-2 text-center font-bold dark:text-white">
                Software Engineer
              </p>
            </div>
          </div>
          <p class="mt-4 text-center text-2xl dark:text-gray-400">
            I specialize in meticulously translating business operations to
            machines using the most appropriate tools and techniques.
          </p>
          <p class="dark:text-gray-400 text-2xl">
            And I can do it in the other way around too.
          </p>
        </div>
        <div class="hidden md:block">
          <nuxt-img alt="avatar" src="/assets/images/avatar.png" />
        </div>
      </div>
    </section>
    <section class="mb-4">
      <Stack>
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
                <a :href="'#ref' + index + 1" class="text-sm">{{
                  index + 1
                }}</a>
              </sup>
            </div>
          </template>
        </CountCard>
      </Stack>
      <h1 class="m-4 text-center text-2xl dark:text-white">
        All that done with at least one of these programming languages
      </h1>
      <Stack>
        <CountCard
          v-for="lang in statistics?.programmingLanguages"
          :key="lang.name"
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
      </Stack>
    </section>

    <section class="hidden sm:p-4 lg:block">
      <h1 class="m-4 text-center text-2xl dark:text-white">
        Using at least one of these technologies
      </h1>
      <SkillsMap />
    </section>
  </article>
</template>
