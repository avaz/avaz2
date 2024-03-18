export default defineAppConfig({
  socials: {
    twitter: "aavaz",
    github: "avaz",
    linkedin: "andersonvaz",
  },
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
