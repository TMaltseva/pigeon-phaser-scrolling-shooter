class Fire extends Phaser.GameObjects.Sprite {
  constructor(data) {
    super(data.scene, data.x, data.y, data.texture);
    this.init(data);
  }

  init(data) {
    this.scene.add.existing(this);
    this.velocity = data.velocity;
    this.setScale(0.5);
  }

  static generate(scene, source) {
    const data = {
      scene,
      x: source.x + source.width / 2,
      y: source.y,
      texture: "seeds",
      velocity: 750,
    };
    return new Fire(data);
  }

  move() {
    this.body.setVelocityX(this.velocity);
  }

  reset() {}
}
