import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
   app: {
    head: {
      title: 'Relizens',
      meta: [
        { name: 'description', content: 'Assignment for Rezliens Compay with Nuxt3 + TS + Pinia' }
      ]
    }
  },
  css: ["~/assets/main.css"],
  modules: ["@pinia/nuxt", "shadcn-nuxt"],
  imports: {
    dirs: [
      'stores', 
    ],
  },
  colorMode: {
    preference: "system",
    fallback: "light",
    classSuffix: "", 
  },
  shadcn: {
    prefix: "",
    componentDir: "./components/ui",
  },
  vite: {
    plugins: [tailwindcss(), tsconfigPaths()],
  },
});
