import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import svelte from "@astrojs/svelte";

import path from "path";

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), svelte()],
    vite: {
        resolve: {
            alias: {
                $lib: path.resolve("./src/lib"),
            },
        },
        server: {
            watch: { usePolling: true }
        }
    }
});