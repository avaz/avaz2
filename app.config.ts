export default defineAppConfig({
  cover: "/assets/images/avatar-head-bg-transparent.webp",
  nuxtIcon: {
    aliases: {
      "dark-mode": "ph:moon-bold",
      "light-mode": "ph:sun-bold",
    },
  },
  tables: {
    cv: "cv.parquet",
    expertises: "expertises.parquet",
  },
});
