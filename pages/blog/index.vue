<script setup lang="ts">
const title = ref("Thoughts");
</script>

<template>
  <div class="mt-4 max-w-2xl mx-auto w-full dark:text-white">
    <Title>{{ title }}</Title>
    <div class="text-2xl">{{ title }}</div>
    <ContentNavigation v-slot="{ navigation }">
      <ul>
        <li
          v-for="link in navigation[0].children"
          :key="link._path"
          class="mt-2 p-2 text-xl underline hover:text-blue-500 dark:hover:text-blue-300"
        >
          <NuxtLink :key="link._path" :to="link._path">
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </ContentNavigation>
  </div>
</template>
