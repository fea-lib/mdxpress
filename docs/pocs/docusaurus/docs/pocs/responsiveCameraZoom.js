// Responsive camera zoom demo
class ResponsiveCameraDemo extends Phaser.Scene {
  constructor() {
    super({ key: "ResponsiveCameraDemo" });
  }

  preload() {
    // Create textures
    const graphics = this.add.graphics();

    // Create tile texture
    graphics.fillStyle(0x8e44ad);
    graphics.fillRect(0, 0, 48, 48);
    graphics.lineStyle(2, 0x9b59b6);
    graphics.strokeRect(0, 0, 48, 48);
    graphics.generateTexture("tile", 48, 48);

    // Create player texture
    graphics.clear();
    graphics.fillStyle(0xe74c3c);
    graphics.fillCircle(24, 24, 20);
    graphics.generateTexture("player", 48, 48);

    graphics.destroy();
  }

  create() {
    this.tileSize = 48;

    // Calculate optimal zoom level based on canvas size
    this.currentZoomLevel = this.calculateOptimalZoom();

    // Create a larger grid of tiles (24x18)
    for (let x = 0; x < 24; x++) {
      for (let y = 0; y < 18; y++) {
        this.add.sprite(
          x * this.tileSize + this.tileSize / 2,
          y * this.tileSize + this.tileSize / 2,
          "tile"
        );
      }
    }

    // Add player at center
    this.player = this.add.sprite(
      12 * this.tileSize + this.tileSize / 2,
      9 * this.tileSize + this.tileSize / 2,
      "player"
    );

    // Apply the calculated zoom
    this.cameras.main.setZoom(this.currentZoomLevel);
    this.cameras.main.centerOn(
      12 * this.tileSize + this.tileSize / 2,
      9 * this.tileSize + this.tileSize / 2
    );

    // Create UI elements
    this.zoomText = this.add.text(16, 16, "", {
      fontSize: "16px",
      fill: "#fff",
      backgroundColor: "#000",
      padding: { x: 8, y: 4 },
    });
    this.zoomText.setScrollFactor(0);

    this.instructionText = this.add.text(
      16,
      60,
      "Press SPACE to toggle zoom levels",
      {
        fontSize: "14px",
        fill: "#fff",
        backgroundColor: "#000",
        padding: { x: 8, y: 4 },
      }
    );
    this.instructionText.setScrollFactor(0);

    // Add zoom toggle controls
    this.input.keyboard.on("keydown-SPACE", () => {
      this.toggleZoom();
    });

    this.updateUI();
  }

  calculateOptimalZoom() {
    const gameWidth = this.sys.canvas.width;
    const gameHeight = this.sys.canvas.height;

    // Define minimum tiles we want to see on screen
    const minTilesX = 12; // Minimum 12 tiles horizontally
    const minTilesY = 9; // Minimum 9 tiles vertically

    // Calculate zoom needed to fit minimum tiles
    const zoomForMinTilesX = gameWidth / (this.tileSize * minTilesX);
    const zoomForMinTilesY = gameHeight / (this.tileSize * minTilesY);

    // Use the smaller zoom to ensure both minimums are met
    const minZoom = Math.min(zoomForMinTilesX, zoomForMinTilesY);

    // Cap the zoom at 1.0 for larger screens (desktop/tablet)
    // Only reduce zoom if we can't fit minimum tiles at 1.0x
    return Math.min(1.0, minZoom);
  }

  toggleZoom() {
    // Cycle through different zoom levels to demonstrate responsiveness
    const zoomLevels = [0.5, 0.75, 1.0, 1.25, 1.5];
    const currentIndex = zoomLevels.findIndex(
      (level) => Math.abs(level - this.currentZoomLevel) < 0.1
    );
    const nextIndex = (currentIndex + 1) % zoomLevels.length;

    this.currentZoomLevel = zoomLevels[nextIndex];
    this.cameras.main.setZoom(this.currentZoomLevel);

    this.updateUI();
  }

  updateUI() {
    const tilesVisible = this.getTilesVisible();
    const isOptimalZoom = this.currentZoomLevel >= 1.0;
    this.zoomText.setText(
      [
        `Zoom Level: ${this.currentZoomLevel.toFixed(2)}`,
        `Tiles Visible: ${tilesVisible.x} x ${tilesVisible.y}`,
        `Mode: ${isOptimalZoom ? "Full Size" : "Scaled Down"}`,
      ].join("\n")
    );
  }

  getTilesVisible() {
    const gameWidth = this.sys.game.config.width;
    const gameHeight = this.sys.game.config.height;
    const zoom = this.currentZoomLevel;

    const tilesX = Math.floor(gameWidth / (this.tileSize * zoom));
    const tilesY = Math.floor(gameHeight / (this.tileSize * zoom));

    return { x: tilesX, y: tilesY };
  }
}

// Initialize the game with responsive dimensions
const config = {
  type: Phaser.AUTO,
  width: window.GAME_WIDTH || 800,
  height: window.GAME_HEIGHT || 600,
  parent: "game-container",
  scene: ResponsiveCameraDemo,
  backgroundColor: "#2c3e50",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

window.game = new Phaser.Game(config);
