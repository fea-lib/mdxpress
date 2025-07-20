import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { DocPage } from "./components/DocPage";
import { getDocuments } from "./lib/docs";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

// Read docs configuration
async function getDocsConfig() {
  try {
    const response = await fetch("/docs.config.json");
    const config = await response.json();
    return {
      docsDir: config.docsDir || "docs",
      title: config.title || "Documentation",
      description: config.description || "",
    };
  } catch {
    return {
      docsDir: "docs",
      title: "Documentation",
      description: "",
    };
  }
}

function App() {
  const documents = getDocuments();
  const firstDocument = documents.length > 0 ? documents[0] : undefined;
  const [config, setConfig] = useState({
    docsDir: "docs",
    title: "Documentation",
    description: "",
  });

  // Load configuration
  useEffect(() => {
    getDocsConfig().then(setConfig);
  }, []);

  return (
    <ThemeProvider>
      <div className={`app ${documents.length === 1 ? "single-doc-mode" : ""}`}>
        {documents.length > 1 && <Navigation documents={documents} />}
        {documents.length === 1 && (
          <div className="floating-theme-toggle">
            <ThemeToggle />
          </div>
        )}
        <main className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                firstDocument ? (
                  <Navigate
                    to={`/${config.docsDir}/${firstDocument.slug}`}
                    replace
                  />
                ) : (
                  <div>No documents found</div>
                )
              }
            />
            <Route
              path={`/${config.docsDir}/*`}
              element={<DocPage documents={documents} />}
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
