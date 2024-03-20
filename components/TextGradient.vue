<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: "Anderson Vaz",
  },
});
</script>

<template>
  <p class="text-2xl font-semibold">
    <span
      class="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-400 bg-clip-text text-transparent"
      >{{ props.title }}</span
    >
  </p>
</template>

<style scoped lang="postcss"></style>
