import React from "react";

export function HomePage() {
  return (
    <div className="home-page">
      <h1>Interactive Documentation</h1>
      <p>
        Welcome to your interactive documentation system. This platform combines
        the power of MDX with React to create engaging, interactive
        documentation with live code examples.
      </p>

      <div className="features">
        <div className="feature">
          <h3>🚀 Interactive Code</h3>
          <p>
            Execute TypeScript/JavaScript code directly in your documentation
            using Sandpack integration.
          </p>
        </div>

        <div className="feature">
          <h3>📝 MDX Support</h3>
          <p>
            Write documentation in MDX format, combining Markdown with React
            components for maximum flexibility.
          </p>
        </div>

        <div className="feature">
          <h3>🎨 Customizable</h3>
          <p>
            Full control over styling and functionality. Modify the codebase to
            match your project's needs.
          </p>
        </div>
      </div>
    </div>
  );
}
