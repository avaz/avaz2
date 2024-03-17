<script lang="ts" setup>
import { useCv } from "#imports";
import SkillsMap from "~/components/SkillsMap.vue";
import TextGradient from "~/components/TextGradient.vue";
const cv = useCv();
const contact = await cv.getContact();
const statistics = await cv.getStatistics();
</script>

<template>
  <article class="grid gap-6 mx-auto bg-white dark:bg-gray-900 w-full">
    <Title>Anderson Vaz - Software Engineer</Title>
    <section class="flex justify-center max-w-6xl mx-auto">
      <div class="grid grid-cols-2">
        <div class="flex flex-col items-center justify-center text-2xl">
          <TextGradient :title="contact?.name" class="text-5xl" />
          <p class="font-bold dark:text-white">Software Engineer</p>
          <p class="mt-2 text-center dark:text-gray-300">
            I specialize in meticulously translating business operations to
            machines using the most appropriate tools and techniques.
          </p>
          <p class="dark:text-gray-300">
            And I can do it in the other way around too.
          </p>
        </div>
        <div>
          <nuxt-img alt="avatar" src="/assets/images/avatar.png" />
        </div>
      </div>
    </section>
    <section class="flex justify-center gap-8 text-center">
      <CountCard>
        <template #header>
          <Icon name="heroicons:clock" class="mb-2 h-12 w-12" />
        </template>
        <template #title>
          <span class="text-6xl font-bold">
            {{ statistics?.yearsOfExperience }}
          </span>
        </template>
        <template #description>
          <span class="text-2xl">years of experience</span>
          <sup>
            <a href="#ref1" class="text-sm">1</a>
          </sup>
        </template>
      </CountCard>
      <CountCard>
        <template #header>
          <Icon name="heroicons:check" class="mb-2 h-12 w-12" />
        </template>
        <template #title>
          <span class="text-6xl font-bold">
            {{ statistics?.projectsCompleted }}
          </span>
        </template>
        <template #description>
          <span class="text-2xl">production projects</span>
          <sup>
            <a href="#ref3" class="text-sm">2</a>
          </sup>
        </template>
      </CountCard>
      <CountCard>
        <template #header>
          <Icon name="heroicons:user-group" class="mb-2 h-12 w-12" />
        </template>
        <template #title>
          <span class="text-6xl font-bold">{{ statistics?.maxTeamSize }}</span>
        </template>
        <template #description>
          <span class="text-2xl">people managed</span>
          <sup>
            <a href="#ref3" class="text-sm">3</a>
          </sup>
        </template>
      </CountCard>
      <CountCard>
        <template #header>
          <Icon name="heroicons:code-bracket" class="mb-2 h-12 w-12" />
        </template>
        <template #title>
          <span class="text-6xl font-bold">~30K</span>
        </template>
        <template #description>
          <span class="text-2xl">LoC written</span>
          <sup>
            <a href="#ref4" class="text-sm text-zinc-400">4</a>
          </sup>
        </template>
      </CountCard>
    </section>
    <section class="p-4">
      <h1 class="m-4 text-center text-2xl dark:text-white">
        All that done with at least one of these programming languages
      </h1>
    </section>
    <section class="flex justify-center gap-4 text-center mb-4">
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
          <Icon v-else name="arcticons:sqlite-editor" class="mb-2 h-12 w-12" />
        </template>
        <template #title>
          <span class="text-2xl">{{ lang.name }}</span>
        </template>
      </CountCard>
    </section>
    <section class="p-4">
      <h1 class="m-4 text-center text-2xl dark:text-white">
        Using at least one of these technologies
      </h1>
    </section>
    <section class="text-center text-2xl text-blue-800 font-bold mb-8">
      <SkillsMap />
    </section>
  </article>
</template>
