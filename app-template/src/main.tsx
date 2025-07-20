import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MDXProvider } from "@mdx-js/react";
import App from "./App";
import { CodePlayground } from "./components/CodePlayground";
import "./index.css";

const components = {
  pre: CodePlayground,
  CodePlayground,
  // Add other custom components here
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL || "/"}>
      <MDXProvider components={components}>
        <App />
      </MDXProvider>
    </BrowserRouter>
  </React.StrictMode>
);
