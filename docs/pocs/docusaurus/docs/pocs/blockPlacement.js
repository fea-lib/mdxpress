// Block placement demo
class BlockPlacementDemo extends Phaser.Scene {
  constructor() {
    super({ key: "BlockPlacementDemo" });
  }

  preload() {
    // Create block texture
    const graphics = this.add.graphics();
    graphics.fillStyle(0x27ae60);
    graphics.fillRect(0, 0, 48, 48);
    graphics.lineStyle(2, 0x229954);
    graphics.strokeRect(0, 0, 48, 48);
    graphics.generateTexture("block", 48, 48);
    graphics.destroy();
  }

  create() {
    this.tileSize = 48;
    this.worldTiles = [];

    // Initialize world grid
    for (let x = 0; x < 20; x++) {
      this.worldTiles[x] = [];
      for (let y = 0; y < 15; y++) {
        this.worldTiles[x][y] = 0;
      }
    }

    // Create grid lines for visualization
    this.drawGrid();

    // Set up block placement
    this.input.on("pointerdown", (pointer) => {
      const tileX = Math.floor(pointer.worldX / this.tileSize);
      const tileY = Math.floor(pointer.worldY / this.tileSize);

      if (tileX >= 0 && tileX < 20 && tileY >= 0 && tileY < 15) {
        if (this.worldTiles[tileX][tileY] === 0) {
          this.worldTiles[tileX][tileY] = 1;
          this.add.sprite(
            tileX * this.tileSize + this.tileSize / 2,
            tileY * this.tileSize + this.tileSize / 2,
            "block"
          );
        }
      }
    });

    // Add instructions
    this.add.text(16, 16, "Click to place blocks!", {
      fontSize: "16px",
      fill: "#000",
      backgroundColor: "#fff",
      padding: { x: 8, y: 4 },
    });
  }

  drawGrid() {
    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xcccccc, 0.5);

    // Draw vertical lines
    for (let x = 0; x <= 20; x++) {
      graphics.moveTo(x * this.tileSize, 0);
      graphics.lineTo(x * this.tileSize, 15 * this.tileSize);
    }

    // Draw horizontal lines
    for (let y = 0; y <= 15; y++) {
      graphics.moveTo(0, y * this.tileSize);
      graphics.lineTo(20 * this.tileSize, y * this.tileSize);
    }

    graphics.strokePath();
  }
}

// Initialize the game with responsive dimensions
const config = {
  type: Phaser.AUTO,
  width: window.GAME_WIDTH || 800,
  height: window.GAME_HEIGHT || 600,
  parent: "game-container",
  scene: BlockPlacementDemo,
  backgroundColor: "#ffffff",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

window.game = new Phaser.Game(config);
