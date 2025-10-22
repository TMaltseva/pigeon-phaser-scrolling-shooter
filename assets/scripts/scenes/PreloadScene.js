class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.add.sprite(0, 0, "bg").setOrigin(0);

    const loadingBar = new LoadingBar(this);
    this.preloadAssets();
  }

  preloadAssets() {
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

    this.load.atlas(
      "boom",
      "assets/sprites/boom.png",
      "assets/sprites/boom.json"
    );

    this.load.audio("theme", "assets/sounds/theme.mp3");
    this.load.audio("boom", "assets/sounds/boom.mp3");
  }

  create() {
    this.scene.start("Start");
  }
}
