import React from "react";
import { MDXProvider } from "@mdx-js/react";
import AmelcraftDoc from "./docs/amelcraft.mdx";
import PocContainer from "./components/PocContainer";

const components = {
  PocContainer,
};

function App() {
  return (
    <div className="container">
      <MDXProvider components={components}>
        <AmelcraftDoc />
      </MDXProvider>
    </div>
  );
}

export default App;
