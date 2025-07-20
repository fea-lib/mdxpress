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

  // Extract slug from pathname, removing the docs directory prefix
  // The pathname will be like "/my-docs/some-slug" or "/docs/some-slug"
  const pathParts = location.pathname.split("/");
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

  return (
    <div className="doc-content">
      <Component />
    </div>
  );
}
