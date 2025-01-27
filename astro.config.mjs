import { defineConfig } from "astro/config"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import { SITE_URL } from "./src/lib/constants"
import partytown from "@astrojs/partytown"

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind(),
    sitemap(),
    partytown({
      config: {
        forward: ["dataLayer.pusg"],
      },
    }),
  ],
  site: SITE_URL,
  output: "static",
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
  },
})
