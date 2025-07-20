import React from "react";

interface Document {
  slug: string;
  title: string;
  path: string;
  Component: React.ComponentType;
}

// This function will be dynamically populated by the CLI
export function getDocuments(): Document[] {
  // Import all MDX and MD files from the docs directory (parent of docs-app)
  const modules = import.meta.glob("@/docs/**/*.{md,mdx}", { eager: true });
  const docsDir = "docs"; // Always use "docs" for the local directory name
  const documents: Document[] = [];

  for (const [path, module] of Object.entries(modules)) {
    // Check if this file is from the configured docs directory
    const pathSegments = path.split("/");
    const docsDirIndex = pathSegments.findIndex(
      (segment) => segment === docsDir
    );

    if (docsDirIndex === -1) {
      continue;
    }

    // Extract slug from path (everything after the docs directory)
    const slugParts = pathSegments.slice(docsDirIndex + 1);
    const slug = slugParts
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
      path,
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
