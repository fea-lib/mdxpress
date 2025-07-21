import { Routes, Route, Navigate } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { DocPage } from "./components/DocPage";
import { getDocuments } from "./lib/docs";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ThemeToggle } from "./components/ThemeToggle";

import config from "../docs.config.json";

function App() {
  console.log("App component mounting...");
  const documents = getDocuments();
  const firstDocument = documents.length > 0 ? documents[0] : undefined;

  // Derive route prefix from docsDir (use last segment or "docs" as fallback)
  const routePrefix = config.docsDir
    ? config.docsDir.split("/").pop() || "docs"
    : "docs";

  console.log("App debug:", {
    documentsCount: documents.length,
    firstDocument: firstDocument?.title,
    configDocsDir: config.docsDir,
    routePrefix: routePrefix,
  });

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
                    to={`/${routePrefix}/${firstDocument.slug}`}
                    replace
                  />
                ) : (
                  <div>No documents found</div>
                )
              }
            />
            <Route
              path={`/${routePrefix}/*`}
              element={<DocPage documents={documents} />}
            />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
