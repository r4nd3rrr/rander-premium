// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({});

import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare()
});
