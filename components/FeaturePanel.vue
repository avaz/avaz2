<script setup lang="ts"></script>

<template>
  <div class="mx-auto flex max-w-screen-lg gap-4 p-8">
    <CountCard class="m-4 bg-transparent text-black">
      <template #header>
        <Icon name="bx:bxl-javascript" class="mb-2 h-12 w-12" />
      </template>
      <template #title>
        <span class="drop-shadow-glow text-6xl font-bold">21</span>
      </template>
      <template #description>
        <div class="text-center text-2xl">Years of experience</div>
      </template>
    </CountCard>
    <div class="p-8">
      <p class="text-2xl font-bold text-zinc-800">And counting....</p>
      <p class="text-2xl text-zinc-800">
        Since 2006 working as a professional software engineer. However, my
        career started back in 1998 as I help desk analyst from which I learned
        telecommunications, networking and overall internet concepts that
        continue to be useful to this day. To move from help desk to software
        engineering, I learnt how to code by creating a intranet web application
        that was used by the whole help desk department, reaching more than 300
        users every day. Nothing bad for a first project, right?
      </p>
    </div>
  </div>
</template>

<style scoped lang="postcss"></style>
