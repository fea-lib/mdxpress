import React from "react";
import config from "../../docs.config.json";

interface Document {
  slug: string;
  title: string;
  path: string;
  importer: () => Promise<any>;
}

// This function will be dynamically populated by the CLI
export function getDocuments(): Document[] {
  // Import all MDX and MD files from the docs directory (symlinked as src/docs), lazy (not eager)
  const modules = import.meta.glob("@/docs/**/*.{md,mdx}");
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

    documents.push({
      slug,
      title,
      path: `${configDocsDir}/${slug}`,
      importer: importer as () => Promise<any>,
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
