class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }
  preload() {
    console.log("Preload assets");
  }
  create() {
    this.scene.start("Start");
  }
}
