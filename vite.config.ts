import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import tailwind from '@tailwindcss/vite';

export default defineConfig({
    plugins: [react(), tailwind()],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "gcontrolComponentsReact",
            formats: ["es"],
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @use "./src/styles/variables" as *;
          @use "./src/styles/mixins" as *;
        `,
            },
        },
    },
    server: {
        fs: {
            allow: [".."],
        },
    },
});
