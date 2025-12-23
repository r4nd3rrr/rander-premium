// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { sharpImageService } from "astro/config";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  image: {
    service: sharpImageService(),
  },
});
