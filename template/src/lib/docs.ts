import React from "react";

interface Document {
  slug: string;
  title: string;
  path: string;
  Component: React.ComponentType;
}

// This function will be dynamically populated by the CLI
export function getDocuments(): Document[] {
  // Import all MDX files from the docs directory (parent of docs-app)
  const modules = import.meta.glob("@/docs/**/*.mdx", { eager: true });
  const docsDir = "docs"; // Always use "docs" for the local directory name
  const documents: Document[] = [];

  console.log("Loading documents from:", modules);

  for (const [path, module] of Object.entries(modules)) {
    console.log("Importing module:", path, module);

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
      .replace(".mdx", "")
      .replace(/\/index$/, "");

    if (!slug) continue;

    // Extract title from the component or use slug as fallback
    const title =
      (module as any).frontmatter?.title ||
      slug.split("/").pop()?.replace(/-/g, " ") ||
      slug;

    // Ensure we have a valid React component
    const Component = (module as any).default;
    if (!Component || typeof Component !== "function") {
      console.error("Invalid component for", path, module);
      continue;
    }

    documents.push({
      slug,
      title,
      path,
      Component: (module as any).default,
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
