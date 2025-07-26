import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/main.css"],
  modules: ["@pinia/nuxt", "shadcn-nuxt"],
  imports: {
    dirs: [
      'stores', 
    ],
  },
  colorMode: {
    preference: "system", // default value
    fallback: "light",
    classSuffix: "", // important: avoid extra suffix like 'dark-mode'
  },
  shadcn: {
    prefix: "", // optional component name prefix
    componentDir: "./components/ui",
  },
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});
