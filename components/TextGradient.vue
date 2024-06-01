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
  <span class="font-semibold">
    <span
      class="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-500 bg-clip-text text-transparent"
      >{{ props.title }}</span
    >
  </span>
</template>

<style scoped lang="postcss"></style>
