// https://nuxt.com/docs/api/configuration/nuxt-config

import { resolve } from "path";

export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ["models"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/eslint-module",
    "@nuxt/content",
    "nuxt-icon",
    "@nuxt/image",
    "@vueuse/nuxt",
  ],
  colorMode: {
    classSuffix: "",
  },
  eslint: {
    lintOnStart: false,
  },
  tailwindcss: {
    exposeConfig: {
      level: 4,
    },
  },
  content: {
    sources: {
      blog: {
        driver: "fs",
        prefix: "/blog",
        base: resolve(__dirname, "blog"),
      },
    },
  },
});
