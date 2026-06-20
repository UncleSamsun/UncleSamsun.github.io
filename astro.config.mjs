import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  site: "https://unclesamsun.github.io",
  output: "static",
});
