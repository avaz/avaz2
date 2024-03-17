<script setup lang="ts"></script>

<template>
  <div class="overflow-hidden rounded-2xl bg-white shadow">
    <div class="p-1 pb-0">
      <img
        alt="Header"
        class="h-32 w-full rounded-xl object-cover"
        src="~/assets/header.png"
      />
    </div>
    <div class="-mt-12 p-6 pt-0">
      <img
        alt="Avatar"
        class="h-20 w-20 rounded-full object-cover outline outline-2 outline-white"
        src="../public/assets/images/avatar.png"
      />
      <div class="mt-4 font-semibold">
        <span
          class="bg-gradient-to-r from-blue-500 via-green-500 to-yellow-400 bg-clip-text text-transparent"
          >Anderson Vaz</span
        >
      </div>
      <div class="text-sm text-gray-600">Chief Technology Officer</div>
      <div class="mt-2 text-sm">
        <a
          class="font-medium text-indigo-500 focus:underline focus:outline-none"
          href="https://linkedin.com/in/andersonvaz"
          >LinkedIn</a
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
