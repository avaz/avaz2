<script setup lang="ts"></script>
<template>
  <div
    class="flex max-w-md flex-col items-center rounded-xl bg-gray-200 dark:bg-gray-800 dark:text-gray-200 p-8"
  >
    <slot name="header"></slot>
    <slot name="title"></slot>
    <div class="mt-4 w-28"><slot name="description"></slot></div>
  </div>
</template>

<style scoped lang="postcss"></style>
