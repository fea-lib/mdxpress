import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { DocPage } from "./components/DocPage";
import { getDocuments } from "./lib/docs";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

function App() {
  const documents = getDocuments();
  const firstDocument = documents.length > 0 ? documents[0] : undefined;

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
                  <Navigate to={`/docs/${firstDocument.slug}`} replace />
                ) : (
                  <div>No documents found</div>
                )
              }
            />
            <Route path="/docs/*" element={<DocPage documents={documents} />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
