import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite.
// base: "./" hace que la página funcione desde cualquier dirección,
// incluida la de GitHub Pages (https://usuario.github.io/nombre-del-repositorio/)
export default defineConfig({
  base: "./",
  plugins: [react()],
});
