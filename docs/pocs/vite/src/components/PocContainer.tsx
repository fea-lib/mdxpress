import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

interface Props {
  code?: string;
  codeFile?: string;
  title?: string;
  dependencies?: Record<string, string>;
}

const htmlContainer = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Phaser.js Demo</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: Arial, sans-serif;
            background-color: #f5f5f5;
        }
        #game-container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            border: 1px solid #ccc;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        canvas {
            display: block;
            width: 100% !important;
            height: auto !important;
        }
    </style>
</head>
<body>
    <div id="game-container">
        <!-- Phaser.js will create and insert the canvas here -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js"></script>
    <script>
        // Make the game responsive to container size
        function getGameSize() {
            const container = document.getElementById('game-container');
            const containerWidth = container.offsetWidth;
            const aspectRatio = 4/3; // 800/600 = 4/3
            const height = containerWidth / aspectRatio;
            return { width: containerWidth, height: height };
        }
        
        // Set initial size
        const gameSize = getGameSize();
        window.GAME_WIDTH = gameSize.width;
        window.GAME_HEIGHT = gameSize.height;
        
        // Handle resize
        window.addEventListener('resize', () => {
            const newSize = getGameSize();
            if (window.game && window.game.scale) {
                window.game.scale.resize(newSize.width, newSize.height);
            }
        });
    </script>
    <script src="/index.js"></script>
</body>
</html>`;

export default function PocContainer({
  code,
  codeFile,
  title,
  dependencies = {},
}: Props) {
  // If codeFile is provided, load it dynamically
  let codeContent = code;
  if (codeFile && !code) {
    try {
      // Import the code file as raw text
      const codeModule = import.meta.glob("/src/docs/pocs/*.js", {
        query: "?raw",
        import: "default",
        eager: true,
      });
      const filePath = `/src/docs/pocs/${codeFile}`;
      codeContent = codeModule[filePath] || `// Error loading ${codeFile}`;
    } catch (error) {
      console.error(`Failed to load code file: ${codeFile}`, error);
      codeContent = `// Error loading ${codeFile}`;
    }
  }

  const files = {
    "/index.js": codeContent || "// No code provided",
    "/index.html": htmlContainer,
  };

  return (
    <div className="poc-container">
      {title && <h3 className="poc-title">{title}</h3>}
      <Sandpack
        theme="auto"
        template="vanilla"
        files={files}
        customSetup={{
          entry: "/index.js",
          dependencies: {
            ...dependencies,
          },
        }}
        options={{
          rtl: true,
          showLineNumbers: true,
          externalResources: [
            "https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js",
          ],
        }}
      />
    </div>
  );
}
