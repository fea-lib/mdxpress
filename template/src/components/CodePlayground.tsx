import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

interface CodePlaygroundProps {
  children: React.ReactNode;
  className?: string;
}

export function CodePlayground({
  children,
  className,
  ...props
}: CodePlaygroundProps) {
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
        theme="light"
      />
    </div>
  );
}
