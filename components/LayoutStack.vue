<script setup lang="ts"></script>

<template>
  <div
    class="grid gap-4 sm:gap-8 grid-cols-2 justify-center justify-items-center mx-auto md:flex"
  >
    <slot>
      <div class="grid gap-4 col-span-2 grid-cols-2 md:flex">
        <div
          v-for="i in 4"
          :key="i"
          class="animate-pulse w-44 h-44 sm:w-48 sm:h-48 rounded-xl bg-gray-200 dark:bg-gray-800 p-8"
        ></div>
      </div>
    </slot>
  </div>
</template>

<style scoped lang="postcss"></style>
