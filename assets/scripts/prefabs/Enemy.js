class Enemy extends MovableObject {
  static generateAttributes() {
    const x = config.width + 100;
    const y = Phaser.Math.Between(100, config.height - 100);

    return { x, y, frame: `ship_${Phaser.Math.Between(0, 3)}` };
  }

  static generate(scene) {
    const data = Enemy.generateAttributes();

    return new Enemy({
      scene,
      x: data.x,
      y: data.y,
      texture: "ship",
      frame: data.frame,
      velocity: -200,
      bullet: {
        delay: 1000,
        texture: "fire",
        velocity: -500,
      },
      origin: { x: 0, y: 0.5 },
    });
  }

  init(data) {
    super.init(data);
    this.setOrigin(data.origin.x, data.origin.y);
    this.fires = new Fires(this.scene);

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
  }

  fire() {
    this.fires.createFire(this);
  }

  isDead() {
    return this.x < -this.width;
  }

  //   update() {
  //     if (this.active && this.x < -this.width) {
  //       //   this.x = config.width + 100;
  //       //   this.y = Phaser.Math.Between(100, config.height - 100);
  //       //   this.velocityY = Phaser.Math.Between(-200, 200);
  //       //   const newId = Phaser.Math.Between(0, 3);
  //       //   this.setFrame(`ship_${newId}`);

  //       this.setAlive(false);
  //     }
  //   }
}
