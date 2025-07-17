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
    <script src="./src/index.js"></script>
</body>
</html>`;

// Code files content - inline for now until we can get proper raw loading
const codeFiles: Record<string, string> = {
  "dragToMove.js": `// Simple drag-to-move demo
class DragToMoveDemo extends Phaser.Scene {
  constructor() {
    super({ key: "DragToMoveDemo" });
  }

  preload() {
    // No preloading needed - we'll create textures in create()
  }

  create() {
    // Create a colored rectangle for the player
    const graphics = this.add.graphics();
    graphics.fillStyle(0x3498db);
    graphics.fillRect(0, 0, 32, 32);
    graphics.generateTexture("player", 32, 32);
    graphics.destroy();

    // Create player sprite
    this.player = this.add.sprite(400, 300, "player");
    this.player.setScale(1.5);

    // Initialize dragging variables
    this.isDragging = false;
    this.targetPos = { x: 400, y: 300 };

    // Set up input events
    this.input.on("pointerdown", (pointer) => {
      this.isDragging = true;
      this.targetPos = { x: pointer.worldX, y: pointer.worldY };
    });

    this.input.on("pointermove", (pointer) => {
      if (this.isDragging) {
        this.targetPos = { x: pointer.worldX, y: pointer.worldY };
      }
    });

    this.input.on("pointerup", () => {
      this.isDragging = false;
    });

    // Add instructions
    this.add.text(16, 16, "Drag anywhere to move the blue square!", {
      fontSize: "16px",
      fill: "#000",
    });
  }

  update() {
    // Move player towards target position
    if (this.isDragging || 
        Math.abs(this.player.x - this.targetPos.x) > 2 || 
        Math.abs(this.player.y - this.targetPos.y) > 2) {
      
      const speed = 0.1;
      this.player.x = Phaser.Math.Linear(this.player.x, this.targetPos.x, speed);
      this.player.y = Phaser.Math.Linear(this.player.y, this.targetPos.y, speed);
    }
  }
}

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: window.GAME_WIDTH || 800,
  height: window.GAME_HEIGHT || 600,
  parent: "game-container",
  backgroundColor: "#ecf0f1",
  scene: DragToMoveDemo,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// Create and start the game
window.game = new Phaser.Game(config);`,

  "blockPlacement.js": `// Block placement demo
class BlockPlacementDemo extends Phaser.Scene {
  constructor() {
    super({ key: "BlockPlacementDemo" });
  }

  preload() {
    // No preloading needed - we'll create textures in create()
  }

  create() {
    this.tileSize = 48;
    this.gridWidth = Math.floor(800 / this.tileSize);
    this.gridHeight = Math.floor(600 / this.tileSize);
    
    // Initialize grid
    this.grid = [];
    for (let x = 0; x < this.gridWidth; x++) {
      this.grid[x] = [];
      for (let y = 0; y < this.gridHeight; y++) {
        this.grid[x][y] = null;
      }
    }

    // Create block texture
    const graphics = this.add.graphics();
    graphics.fillStyle(0x27ae60);
    graphics.fillRect(0, 0, this.tileSize, this.tileSize);
    graphics.lineStyle(2, 0x1e8449);
    graphics.strokeRect(0, 0, this.tileSize, this.tileSize);
    graphics.generateTexture("block", this.tileSize, this.tileSize);
    graphics.destroy();

    // Set up input
    this.input.on("pointerdown", (pointer) => {
      this.placeBlock(pointer.worldX, pointer.worldY);
    });

    // Add instructions
    this.add.text(16, 16, "Click anywhere to place green blocks!", {
      fontSize: "16px",
      fill: "#000",
    });
  }

  placeBlock(worldX, worldY) {
    const gridX = Math.floor(worldX / this.tileSize);
    const gridY = Math.floor(worldY / this.tileSize);

    if (gridX >= 0 && gridX < this.gridWidth && gridY >= 0 && gridY < this.gridHeight) {
      if (!this.grid[gridX][gridY]) {
        const block = this.add.sprite(
          gridX * this.tileSize + this.tileSize / 2,
          gridY * this.tileSize + this.tileSize / 2,
          "block"
        );
        this.grid[gridX][gridY] = block;
      }
    }
  }
}

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: window.GAME_WIDTH || 800,
  height: window.GAME_HEIGHT || 600,
  parent: "game-container",
  backgroundColor: "#ecf0f1",
  scene: BlockPlacementDemo,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// Create and start the game
window.game = new Phaser.Game(config);`,

  "responsiveCameraZoom.js": `// Responsive camera zoom demo
class ResponsiveCameraZoomDemo extends Phaser.Scene {
  constructor() {
    super({ key: "ResponsiveCameraZoomDemo" });
  }

  preload() {
    // No preloading needed - we'll create textures in create()
  }

  create() {
    // Create some example objects
    for (let i = 0; i < 20; i++) {
      const graphics = this.add.graphics();
      graphics.fillStyle(Phaser.Utils.Array.GetRandom([0xe74c3c, 0x3498db, 0xf39c12, 0x27ae60]));
      graphics.fillRect(0, 0, 40, 40);
      graphics.generateTexture(\`object\${i}\`, 40, 40);
      graphics.destroy();

      this.add.sprite(
        Phaser.Math.Between(50, 750),
        Phaser.Math.Between(50, 550),
        \`object\${i}\`
      );
    }

    // Calculate and set appropriate zoom level
    this.setResponsiveZoom();

    // Add instructions
    this.add.text(16, 16, "Resize your browser to see camera zoom adaptation!", {
      fontSize: "16px",
      fill: "#000",
    });

    // Listen for resize events
    this.scale.on('resize', this.setResponsiveZoom, this);
  }

  setResponsiveZoom() {
    const baseWidth = 800;
    const currentWidth = this.scale.width;
    const zoomFactor = Math.max(0.5, Math.min(1.5, currentWidth / baseWidth));
    
    this.cameras.main.setZoom(zoomFactor);
    
    // Update text to show current zoom
    if (this.zoomText) {
      this.zoomText.destroy();
    }
    this.zoomText = this.add.text(16, 550, \`Current zoom: \${zoomFactor.toFixed(2)}x\`, {
      fontSize: "14px",
      fill: "#000",
    });
  }
}

// Game configuration
const config = {
  type: Phaser.AUTO,
  width: window.GAME_WIDTH || 800,
  height: window.GAME_HEIGHT || 600,
  parent: "game-container",
  backgroundColor: "#ecf0f1",
  scene: ResponsiveCameraZoomDemo,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

// Create and start the game
window.game = new Phaser.Game(config);`,
};

export default function PocContainer({
  code,
  codeFile,
  title,
  dependencies = {},
}: Props) {
  // Get code content from file or direct code prop
  let codeContent = code;
  if (codeFile && !code) {
    codeContent = codeFiles[codeFile];
    if (!codeContent) {
      console.error(`Code file not found: ${codeFile}`);
      codeContent = `// Error: Code file "${codeFile}" not found`;
    }
  }

  const files = {
    "/index.html": htmlContainer,
    "/src/index.js": codeContent || "// No code provided",
  };

  return (
    <div style={{ margin: "20px 0" }}>
      {title && <h3>{title}</h3>}
      <Sandpack
        template="vanilla"
        files={files}
        customSetup={{
          entry: "/index.js",
          dependencies: {
            ...dependencies,
          },
        }}
        options={{
          externalResources: [
            "https://cdn.jsdelivr.net/npm/phaser@3.70.0/dist/phaser.min.js",
          ],
        }}
      />
    </div>
  );
}
