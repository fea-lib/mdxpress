import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import { resolve } from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

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
  plugins: [
    react(),
    mdx({
      jsxImportSource: "react",
      providerImportSource: "@mdx-js/react",
      development: true,
      include: /\.(mdx?|md)$/,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@docs": resolve(__dirname, `../${docsDir}`),
    },
  },
  optimizeDeps: {
    include: ["@mdx-js/react", "react/jsx-runtime", "react/jsx-dev-runtime"],
  },
});
