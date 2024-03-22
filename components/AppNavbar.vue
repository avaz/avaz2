<script lang="ts" setup>
import { useCv } from "#imports";

const contact = await useCv().getContact();
</script>

<template>
  <header
    class="bg-blue-600 py-4 text-white drop-shadow-md dark:bg-gray-800 sm:px-8"
  >
    <div class="flex flex-col items-center md:flex-row md:justify-around">
      <nav class="dark:text-gray-200 md:block md:self-start">
        <NuxtLink :to="`/`" active-class="font-bold" class="p-3">
          Summary
        </NuxtLink>
        <NuxtLink
          :to="`/blog`"
          active-class="font-bold"
          class="p-3"
          :class="{ 'font-bold': $route.path.startsWith('/blog') }"
        >
          Thoughts
        </NuxtLink>
        <NuxtLink :to="`/curriculum`" active-class="font-bold" class="p-3">
          Curriculum
        </NuxtLink>
      </nav>
      <div class="md:space-x-3.5 md:self-end md:transition">
        <NuxtLink
          v-if="contact?.x"
          :href="contact?.x"
          class="p-5 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 md:p-0"
          rel="noopener noreferrer"
          target="_blank"
          title="Twitter"
        >
          <Icon class="h-5 w-5" name="fa-brands:twitter" />
        </NuxtLink>
        <NuxtLink
          v-if="contact?.github"
          :href="contact?.github"
          class="p-5 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 md:p-0"
          rel="noopener noreferrer"
          target="_blank"
          title="GitHub"
        >
          <Icon class="h-5 w-5" name="fa-brands:github" />
        </NuxtLink>
        <NuxtLink
          v-if="contact?.linkedin"
          :href="contact?.linkedin"
          class="p-5 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 md:p-0"
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        >
          <Icon class="h-5 w-5" name="fa-brands:linkedin" />
        </NuxtLink>
        <ColorModeSwitch
          class="p-5 hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 md:p-0"
        />
      </div>
    </div>
  </header>
</template>
