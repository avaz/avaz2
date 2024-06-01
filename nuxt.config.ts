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
    "@vueuse/motion/nuxt",
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
  app: {
    head: {
      link: [
        {
          rel: "apple-touch-icon",
          type: "image/png",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "manifest",
          href: "/site.webmanifest",
        },
      ],
    },
  },
});
