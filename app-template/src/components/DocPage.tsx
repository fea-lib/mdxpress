import React from "react";
import { useLocation } from "react-router-dom";
import { getDocumentBySlug } from "../lib/docs";
import { marked } from "marked";

interface Document {
  slug: string;
  title: string;
  path: string;
  importer: () => Promise<any>;
  type: "mdx" | "md";
}

interface DocPageProps {
  documents: Document[];
  routePrefix: string;
}

export function DocPage({ documents, routePrefix }: DocPageProps) {
  const location = useLocation();

  // Extract slug from pathname, removing the base URL and docs directory prefix
  const baseUrl = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const relativePath = location.pathname.replace(baseUrl, "");
  const pathParts = relativePath.split("/").filter(Boolean);
  // Find the index of the routePrefix in the path
  const prefixIndex = pathParts.findIndex((part) => part === routePrefix);
  // Slug is everything after the routePrefix
  const slug =
    prefixIndex !== -1 ? pathParts.slice(prefixIndex + 1).join("/") : "";

  if (!slug) {
    return <div>Document not found</div>;
  }

  const document = getDocumentBySlug(documents, slug);

  if (!document) {
    return <div>Document not found</div>;
  }

  if (document.type === "mdx") {
    // Lazy load the MDX file as a React component
    const [Component, setComponent] =
      React.useState<React.ComponentType | null>(null);
    const [error, setError] = React.useState<Error | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);
      setComponent(null);
      document
        .importer()
        .then((mod) => {
          if (!cancelled) {
            setComponent(() => mod.default);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setLoading(false);
          }
        });
      return () => {
        cancelled = true;
      };
    }, [document]);

    if (loading) {
      return <div className="doc-content">Loading...</div>;
    }
    if (error) {
      return (
        <div className="doc-content">
          <h1>Error Loading Document</h1>
          <p>Failed to load: {document.title}</p>
          <details>
            <summary>Error Details</summary>
            <pre>{String(error)}</pre>
          </details>
        </div>
      );
    }
    if (!Component) {
      return <div className="doc-content">No content found.</div>;
    }
    return (
      <div className="doc-content">
        <Component />
      </div>
    );
  } else {
    // .md file: fetch raw content and render with marked
    const [html, setHtml] = React.useState<string>("");
    const [error, setError] = React.useState<Error | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);
      setHtml("");
      document
        .importer()
        .then((mod) => {
          // Vite's import.meta.glob returns a module with a default export as the raw string
          const raw = mod.default;
          if (!cancelled) {
            const html =
              typeof marked.parse === "function" ? marked.parse(raw) : "";
            setHtml(typeof html === "string" ? html : "");
            setLoading(false);
          }
        })
        .catch((err) => {
          if (!cancelled) {
            setError(err instanceof Error ? err : new Error(String(err)));
            setLoading(false);
          }
        });
      return () => {
        cancelled = true;
      };
    }, [document]);

    if (loading) {
      return <div className="doc-content">Loading...</div>;
    }
    if (error) {
      return (
        <div className="doc-content">
          <h1>Error Loading Document</h1>
          <p>Failed to load: {document.title}</p>
          <details>
            <summary>Error Details</summary>
            <pre>{String(error)}</pre>
          </details>
        </div>
      );
    }
    return (
      <div className="doc-content" dangerouslySetInnerHTML={{ __html: html }} />
    );
  }
}
