import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/

export default defineConfig({
  
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@components", replacement: "/src/components" },
      { find: "@api", replacement: "/src/api" },
      { find: "@types", replacement: "/src/types" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@service", replacement: "/src/service" },
      { find: "@helpers", replacement: "/src/helpers" },
      { find: "@hooks", replacement: "/src/hooks" },
      { find: "@utils", replacement: "/src/utils" },
    ],
  },
});
