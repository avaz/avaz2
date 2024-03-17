<script setup lang="ts">
const year = ref(new Date().getFullYear());
</script>

<template>
  <footer class="bg-gray-200 dark:bg-gray-800">
    <div class="mx-auto px-4 py-8 sm:px-8">
      <div class="flex items-center justify-center">
        <div class="text-gray-700 dark:text-gray-200">
          <span>&copy; {{ year }}</span>
          <span> &bull; </span>
          <span>Created by me with NuxtJS and DuckDB 🐤</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss"></style>
