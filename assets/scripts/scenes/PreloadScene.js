class PreloadScene extends Phaser.Scene {
  constructor() {
    super("Preload");
  }

  preload() {
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    this.createBackground();

    const loadingBar = new LoadingBar(this);
    this.preloadAssets();
  }

  createBackground() {
    if (this.isMobile) {
      this.bg = this.add.image(0, 0, "bgp").setOrigin(0);

      const scaleX = this.scale.width / this.bg.width;
      const scaleY = this.scale.height / this.bg.height;
      const scale = Math.max(scaleX, scaleY);

      this.bg.setScale(scale);

      this.bg.setPosition(
        (this.scale.width - this.bg.displayWidth) / 2,
        (this.scale.height - this.bg.displayHeight) / 2
      );
    } else {
      this.add.sprite(0, 0, "bg").setOrigin(0);
    }
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
