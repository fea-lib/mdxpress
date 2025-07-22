import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { resolve } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import rehypeHighlight from "rehype-highlight";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the docs configuration
let docsDir = "docs";
try {
  const config = JSON.parse(readFileSync("./docs.config.json", "utf8"));
  docsDir = config.docsDir || "docs";
} catch {
  // Use default if config doesn't exist
}

export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/mdxpress/" : "/",
  assetsInclude: ["**/*.md"],
  plugins: [
    react(),
    mdx({
      jsxImportSource: "react",
      providerImportSource: "@mdx-js/react",
      development: process.env.NODE_ENV !== "production",
      include: /\.mdx$/,
      rehypePlugins: [rehypeHighlight],
      jsxRuntime: "automatic",
    }),
  ],
  server: {
    watch: {
      // Ignore app directories within the docs to prevent infinite loops
      ignored: [
        "**/docs/**/app/**",
        "**/docs/**/apps/**",
        "**/docs/**/*-app/**",
        "**/docs/**/app-*/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ["@mdx-js/react", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
});
