import React from "react";
import config from "../../docs.config.json";

interface Document {
  slug: string;
  title: string;
  path: string;
  Component: React.ComponentType;
}

// This function will be dynamically populated by the CLI
export function getDocuments(): Document[] {
  // Import all MDX and MD files from the docs directory (symlinked as src/docs)
  const modules = import.meta.glob("@/docs/**/*.{md,mdx}", { eager: true });
  // Use the last segment of the configured docsDir for slug generation
  const configDocsDir =
    config.docsDir.split("/").filter(Boolean).pop() || "docs";
  const localDocsDir = "docs"; // Symlinked directory name
  const documents: Document[] = [];

  for (const [path, module] of Object.entries(modules)) {
    // path: e.g. '/src/docs/advanced/getting-started.mdx'
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

    // Slug should be relative to the configured docsDir, not the symlink name
    // So, if config.docsDir is 'app-template/example-docs', slug is everything after that path
    // But since we import from symlink, we use the path after localDocsDir
    const slug = pathAfterDocs
      .join("/")
      .replace(/\.(mdx?|md)$/, "")
      .replace(/\/index$/, "");
    if (!slug) continue;

    // Extract title from the component, use original filename with extension, or slug as fallback
    const originalFileName = pathSegments[pathSegments.length - 1];
    const title =
      (module as any).frontmatter?.title ||
      originalFileName ||
      slug.split("/").pop()?.replace(/-/g, " ") ||
      slug;

    // Ensure we have a valid React component
    const Component = (module as any).default;
    if (!Component || typeof Component !== "function") {
      continue;
    }

    documents.push({
      slug,
      title,
      // Store the path relative to the configured docsDir for UI/routing
      path: `${configDocsDir}/${slug}`,
      Component,
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
