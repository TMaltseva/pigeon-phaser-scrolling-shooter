class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.load.atlas(
      "bird",
      "assets/sprites/bird.png",
      "assets/sprites/bird.json"
    );
  }

  create() {
    this.scene.start("Start");
  }
}
