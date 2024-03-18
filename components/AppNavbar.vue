<script lang="ts" setup>
const appConfig = useAppConfig();
</script>

<template>
  <header class="py-4 sm:px-8 text-white bg-blue-600 dark:bg-gray-800">
    <div class="flex items-center flex-col md:flex-row md:justify-around">
      <nav class="md:self-start dark:text-gray-200 md:block">
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
      <div class="md:self-end md:space-x-3 md:transition">
        <NuxtLink
          v-if="appConfig.socials?.twitter"
          :href="`https://twitter.com/${appConfig.socials?.twitter}`"
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-5 md:p-0"
          rel="noopener noreferrer"
          target="_blank"
          title="Twitter"
        >
          <Icon class="h-5 w-5" name="fa-brands:twitter" />
        </NuxtLink>
        <NuxtLink
          v-if="appConfig.socials?.github"
          :href="`https://github.com/${appConfig.socials?.github}`"
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-5 md:p-0"
          rel="noopener noreferrer"
          target="_blank"
          title="GitHub"
        >
          <Icon class="h-5 w-5" name="fa-brands:github" />
        </NuxtLink>
        <NuxtLink
          v-if="appConfig.socials?.linkedin"
          :href="`https://www.linkedin.com/in/${appConfig.socials?.linkedin}`"
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-5 md:p-0"
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        >
          <Icon class="h-5 w-5" name="fa-brands:linkedin" />
        </NuxtLink>
        <ColorModeSwitch
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300 p-5 md:p-0"
        />
      </div>
    </div>
  </header>
</template>
