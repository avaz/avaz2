<script lang="ts" setup>
const appConfig = useAppConfig();
</script>

<template>
  <header class="py-4 sm:px-8 text-white bg-blue-500 dark:bg-gray-800">
    <div class="flex justify-around mx-auto max-w-full">
      <nav class="self-start dark:text-gray-200">
        <NuxtLink :to="`/`" active-class="font-bold" class="mr-6">
          Summary
        </NuxtLink>
        <NuxtLink
          :to="`/blog`"
          active-class="font-bold"
          class="mr-6"
          :class="{ 'font-bold': $route.path.startsWith('/blog') }"
        >
          Thoughts
        </NuxtLink>
        <NuxtLink :to="`/curriculum`" active-class="font-bold" class="mr-6">
          Curriculum
        </NuxtLink>
      </nav>
      <div class="self-end space-x-3 transition">
        <a
          v-if="appConfig.socials?.twitter"
          :href="`https://twitter.com/${appConfig.socials?.twitter}`"
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
          rel="noopener noreferrer"
          target="_blank"
          title="Twitter"
        >
          <Icon class="h-5 w-5" name="fa-brands:twitter" />
        </a>
        <a
          v-if="appConfig.socials?.github"
          :href="`https://github.com/${appConfig.socials?.github}`"
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
          rel="noopener noreferrer"
          target="_blank"
          title="GitHub"
        >
          <Icon class="h-5 w-5" name="fa-brands:github" />
        </a>
        <a
          v-if="appConfig.socials?.linkedin"
          :href="`https://www.linkedin.com/in/${appConfig.socials?.linkedin}`"
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
          rel="noopener noreferrer"
          target="_blank"
          title="LinkedIn"
        >
          <Icon class="h-5 w-5" name="fa-brands:linkedin" />
        </a>
        <ColorModeSwitch
          class="hover:text-gray-700 dark:text-gray-100 dark:hover:text-gray-300"
        />
      </div>
    </div>
  </header>
</template>
