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
