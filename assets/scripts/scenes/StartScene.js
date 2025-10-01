class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }
  create() {
    console.log("StartScene loaded");
    this.createBackground();
  }
  createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }
}
