<script lang="ts" setup>
const { cover } = useAppConfig();
</script>

<template>
  <main
    class="flex min-h-screen flex-grow flex-col justify-center bg-gray-100 dark:bg-gray-900"
  >
    <Html lang="en" />
    <Meta :content="cover" property="og:image" />
    <Meta
      content="Software Engineer, Data Engineer, MLOps, NLP,
    Machine Learning, Big Data, Java, Python, Javascript, Vue, NodeJS"
      property="description"
    />
    <Meta content="/favicon" property="/favicon" />
    <Meta content="Anderson Vaz" property="og:title" />
    <Meta content="summary_large_image" name="twitter:card" />
    <Meta
      content="Anderson Vaz, Software Engineer. artificial intelligence,
      machine learning, data engineering, mlops, machine learning operations."
      name="description"
    />
    <NuxtLoadingIndicator />
    <AppNavbar />
    <div class="flex flex-grow">
      <slot />
    </div>
    <AppFooter />
  </main>
</template>

<style lang="postcss" scoped></style>
