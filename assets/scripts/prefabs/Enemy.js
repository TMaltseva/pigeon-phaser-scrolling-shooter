class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame) {
    super(scene, x, y, texture, frame);
    this.init();
  }

  init() {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setScale(0.5);
    this.body.enable = true;
    this.velocity = 100;
    this.velocityY = 0;
    this.scene.events.on("update", this.update, this);
  }

  static generate(scene) {
    const data = Enemy.generateAttributes();
    return new Enemy(scene, data.x, data.y, "ship", `ship_${data.id}`);
  }

  static generateAttributes() {
    const x = config.width + 100;
    const y = Phaser.Math.Between(100, config.height - 100);
    const id = Phaser.Math.Between(0, 3);

    return { x, y, id };
  }

  move() {
    this.body.setVelocityX(-this.velocity);
    this.body.setVelocityY(this.velocityY);

    // if (Phaser.Math.Between(0, 100) < 2) {
    //   this.velocityY = Phaser.Math.Between(-200, 200);
    // }

    // const halfHeight = this.displayHeight / 2;

    // if (this.y - halfHeight <= 0) {
    //   this.y = halfHeight;
    //   this.velocityY = Math.abs(this.velocityY);
    // }

    // if (this.y + halfHeight >= config.height) {
    //   this.y = config.height - halfHeight;
    //   this.velocityY = -Math.abs(this.velocityY);
    // }
  }

  update() {
    if (this.active && this.x < -this.width) {
      //   this.x = config.width + 100;
      //   this.y = Phaser.Math.Between(100, config.height - 100);
      //   this.velocityY = Phaser.Math.Between(-200, 200);
      //   const newId = Phaser.Math.Between(0, 3);
      //   this.setFrame(`ship_${newId}`);

      this.setAlive(false);
    }
  }

  reset() {
    const data = Enemy.generateAttributes();

    this.x = data.x;
    this.y = data.y;
    this.setFrame(`ship_${data.id}`);

    this.setAlive(true);
  }

  setAlive(status) {
    this.body.enable = status;
    this.setVisible(status);
    this.setActive(status);
  }
}
