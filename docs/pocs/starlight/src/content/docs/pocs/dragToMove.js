// Simple drag-to-move demo
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
    // Move player towards target position with constant speed
    if (this.isDragging) {
      const speed = 200; // pixels per second
      const dt = this.game.loop.delta / 1000; // delta time in seconds

      // Calculate direction vector
      const dx = this.targetPos.x - this.player.x;
      const dy = this.targetPos.y - this.player.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only move if we're not already at the target
      if (distance > 5) {
        // Normalize direction and apply speed
        const moveX = (dx / distance) * speed * dt;
        const moveY = (dy / distance) * speed * dt;

        this.player.x += moveX;
        this.player.y += moveY;
      }
    }
  }
}

// Initialize the game with responsive dimensions
const config = {
  type: Phaser.AUTO,
  width: window.GAME_WIDTH || 800,
  height: window.GAME_HEIGHT || 600,
  parent: "game-container",
  scene: DragToMoveDemo,
  backgroundColor: "#f0f0f0",
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

window.game = new Phaser.Game(config);
