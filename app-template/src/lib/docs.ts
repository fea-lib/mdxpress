import React from "react";
import config from "../../docs.config.json";
import validMdxFiles from "../validMdxFiles.json";
import { getValidMdxModules } from "../validMdxGlobs.generated";

interface Document {
  slug: string;
  title: string;
  path: string;
  importer: () => Promise<any>;
  type: "md" | "mdx";
}

// This function will be dynamically populated by the CLI
export function getDocuments(): Document[] {
  // Only import valid MDX files (literal array via generated function) and all MD files from the docs directory
  const modules = {
    ...getValidMdxModules(),
    ...import.meta.glob(["@/docs/**/*.md"]),
  };
  // Use the last segment of the configured docsDir for slug generation
  const configDocsDir =
    config.docsDir.split("/").filter(Boolean).pop() || "docs";
  const localDocsDir = "docs"; // Symlinked directory name
  const documents: Document[] = [];

  for (const [path, importer] of Object.entries(modules)) {
    // Ignore any file in a node_modules directory
    if (path.includes("/node_modules/")) continue;

    const pathSegments = path.split("/");
    const docsDirIndex = pathSegments.findIndex(
      (segment) => segment === localDocsDir
    );
    if (docsDirIndex === -1) continue;

    // Skip any paths that contain app directories to avoid symlink loops
    const pathAfterDocs = pathSegments.slice(docsDirIndex + 1);
    if (
      pathAfterDocs.some(
        (segment) =>
          segment === "app" ||
          segment.endsWith("-app") ||
          segment.startsWith("app-")
      )
    ) {
      continue;
    }

    const slug = pathAfterDocs
      .join("/")
      .replace(/\.(mdx?|md)$/, "")
      .replace(/\/index$/, "");
    if (!slug) continue;

    // Title will be loaded dynamically when the doc is loaded
    const originalFileName = pathSegments[pathSegments.length - 1];
    const title =
      originalFileName || slug.split("/").pop()?.replace(/-/g, " ") || slug;

    // Determine type from file extension
    const ext = originalFileName.split(".").pop();
    const type = ext === "mdx" ? "mdx" : "md";

    // For MDX files, only include if in validMdxFiles
    if (type === "mdx") {
      // validMdxFiles contains paths relative to docs dir, so build that
      const relPath = pathAfterDocs.join("/");
      if (!validMdxFiles.includes(relPath)) continue;
    }

    documents.push({
      slug,
      title,
      path: `${configDocsDir}/${slug}`,
      importer: importer as () => Promise<any>,
      type,
    });
  }

  return documents.sort((a, b) => a.title.localeCompare(b.title));
}

export function getDocumentBySlug(
  documents: Document[],
  slug: string
): Document | undefined {
  return documents.find((doc) => doc.slug === slug);
}
