class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.image("seeds", "assets/sprites/seeds.png");
    this.load.image("fire", "assets/sprites/fire.png");

    this.load.atlas(
      "bird",
      "assets/sprites/bird.png",
      "assets/sprites/bird.json"
    );

    this.load.atlas(
      "ship",
      "assets/sprites/ship.png",
      "assets/sprites/ship.json"
    );
  }

  create() {
    this.scene.start("Start");
  }
}
