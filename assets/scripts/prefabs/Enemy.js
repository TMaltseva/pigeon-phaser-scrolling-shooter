class Enemy extends MovableObject {
  static generateAttributes() {
    const x = config.width + 100;
    const y = Phaser.Math.Between(100, config.height - 100);

    return { x, y, frame: `ship_${Phaser.Math.Between(0, 3)}` };
  }

  static generate(scene, fires) {
    const data = Enemy.generateAttributes();

    return new Enemy({
      scene,
      fires,
      x: data.x,
      y: data.y,
      texture: "ship",
      frame: data.frame,
      velocity: -200,
      bullet: {
        delay: 1500,
        texture: "fire",
        velocity: -500,
      },
      origin: { x: 0, y: 0.5 },
    });
  }

  init(data) {
    super.init(data);
    this.setOrigin(data.origin.x, data.origin.y);
    this.fires = data.fires || new Fires(this.scene);
    this.timer = this.scene.time.addEvent({
      delay: data.bullet.delay,
      loop: true,
      callback: this.fire,
      callbackScope: this,
    });
  }

  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(data.frame);

    this.wasCounted = false;
  }

  fire() {
    this.fires.createFire(this);
  }

  isDead() {
    return this.x < -this.width;
  }
}
