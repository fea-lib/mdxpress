import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

interface CodePlaygroundProps {
  template?: "react" | "vanilla" | "vue" | "angular";
  files: Record<string, string>;
  theme?: "light" | "dark" | "auto";
}

export default function CodePlayground({
  template = "react",
  files,
  theme = "auto",
}: CodePlaygroundProps) {
  return (
    <div style={{ margin: "1rem 0" }}>
      <Sandpack
        template={template}
        files={files}
        theme={theme}
        options={{
          showNavigator: true,
          showTabs: true,
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
          editorHeight: 400,
        }}
      />
    </div>
  );
}
