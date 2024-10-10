import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Ensure Vite binds to 0.0.0.0
    port: 5173, // Make sure this matches your exposed port
  },
  build: {
    outDir: "dist", // Ensure build outputs to the dist folder
  },
});
