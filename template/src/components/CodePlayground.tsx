import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import { useTheme } from "../contexts/ThemeContext";

interface CodePlaygroundProps {
  children?: React.ReactNode;
  className?: string;
  template?: string;
  files?: Record<string, string>;
  options?: any;
}

export function CodePlayground({
  children,
  className,
  template = "react-ts",
  files,
  options = {},
  ...props
}: CodePlaygroundProps) {
  const { theme } = useTheme();

  // Determine Sandpack theme based on current theme
  const sandpackTheme = theme === "dark" ? "dark" : "light";

  // If files prop is provided, use Sandpack directly (for MDX usage)
  if (files) {
    return (
      <div className="code-playground">
        <Sandpack
          template={template as any}
          files={files}
          options={{
            showNavigator: false,
            showTabs: true,
            showLineNumbers: true,
            showInlineErrors: true,
            wrapContent: true,
            editorHeight: 350,
            ...options,
          }}
          theme={sandpackTheme}
        />
      </div>
    );
  }

  // Check if this is a code block that should be interactive
  const isInteractive =
    className?.includes("language-tsx") || className?.includes("language-ts");

  if (!isInteractive) {
    return (
      <pre className={className} {...props}>
        {children}
      </pre>
    );
  }

  // Extract code from children
  const code = React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string") return child;
      if (React.isValidElement(child) && child.props.children) {
        return typeof child.props.children === "string"
          ? child.props.children
          : "";
      }
      return "";
    })
    .join("");

  return (
    <div className="code-playground">
      <Sandpack
        template="react-ts"
        files={{
          "/App.tsx": code,
        }}
        options={{
          showNavigator: false,
          showTabs: false,
          showLineNumbers: true,
          showInlineErrors: true,
          wrapContent: true,
          editorHeight: 350,
        }}
        theme={sandpackTheme}
      />
    </div>
  );
}
