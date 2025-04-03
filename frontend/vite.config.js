import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/NutriBuddy",
  server: {
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
