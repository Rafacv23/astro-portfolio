import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), sitemap()],
  output: "hybrid",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"]
  },
  adapter: vercel()
});