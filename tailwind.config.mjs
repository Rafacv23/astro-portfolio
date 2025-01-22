/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "#F1F5F9",
        secondary: "#C8C8CC",
        accent: "#5BE5CF",
        outline: "#10211F",
        card: "#18181B",
      },
    },
  },
  plugins: [require("rippleui")],
}
