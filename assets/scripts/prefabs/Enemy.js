class Enemy extends MovableObject {
  static generate(scene) {
    const data = Enemy.generateAttributes();

    return new Enemy({
      scene,
      x: data.x,
      y: data.y,
      texture: "ship",
      frame: data.frame,
      velocity: -200,
    });
  }

  static generateAttributes() {
    const x = config.width + 100;
    const y = Phaser.Math.Between(100, config.height - 100);

    return { x, y, frame: `ship_${Phaser.Math.Between(0, 3)}` };
  }

  reset() {
    const data = Enemy.generateAttributes();
    super.reset(data.x, data.y);
    this.setFrame(data.frame);
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

  isDead() {
    return this.x < -this.width;
  }
}
