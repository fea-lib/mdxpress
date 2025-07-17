import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { DocPage } from "./components/DocPage";
import { HomePage } from "./components/HomePage";
import { getDocuments } from "./lib/docs";

function App() {
  const documents = getDocuments();

  return (
    <div className="app">
      <Navigation documents={documents} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/docs/:slug"
            element={<DocPage documents={documents} />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
