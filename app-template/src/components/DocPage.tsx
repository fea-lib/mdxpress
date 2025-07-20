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

  console.log("DocPage debug:", {
    pathname: location.pathname,
    baseUrl,
    relativePath,
    pathParts,
    slug,
    documentsCount: documents.length,
  });

  if (!slug) {
    return <div>Document not found</div>;
  }

  const document = getDocumentBySlug(documents, slug);

  if (!document) {
    return <div>Document not found</div>;
  }

  const { Component } = document;

  console.log("About to render component:", {
    slug: document.slug,
    title: document.title,
    Component: Component,
    componentType: typeof Component,
  });

  return (
    <div className="doc-content">
      <Component />
    </div>
  );
}
