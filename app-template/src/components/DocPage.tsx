import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDocumentBySlug } from "../lib/docs";

interface Document {
  slug: string;
  title: string;
  path: string;
  Component: React.ComponentType;
}

interface DocPageProps {
  documents: Document[];
}

export function DocPage({ documents }: DocPageProps) {
  const location = useLocation();

  // Extract slug from pathname, removing the base URL and docs directory prefix
  // First strip the base URL, then extract the slug
  const baseUrl = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const relativePath = location.pathname.replace(baseUrl, "");
  const pathParts = relativePath.split("/");
  // Remove empty first element and docs directory
  const slug = pathParts.slice(2).join("/");

  if (!slug) {
    return <div>Document not found</div>;
  }

  const document = getDocumentBySlug(documents, slug);

  if (!document) {
    return <div>Document not found</div>;
  }

  const { Component } = document;

  try {
    return (
      <div className="doc-content">
        <Component />
      </div>
    );
  } catch (error) {
    console.error("Error rendering component:", error);
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
}
