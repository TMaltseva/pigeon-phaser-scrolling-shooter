class Player extends MovableObject {
  constructor(scene) {
    super({
      scene,
      x: 150,
      y: config.height / 2,
      texture: "bird",
      frame: "bird_0",
      velocity: 500,
      bullet: {
        delay: 500,
        texture: "seeds",
        velocity: 500,
      },
      origin: { x: 1, y: 0.5 },
    });

    this.initPlayer();

    const frames = this.scene.anims.generateFrameNames("bird", {
      prefix: "bird_",
      start: 0,
      end: 5,
    });

    this.scene.anims.create({
      key: "fly",
      frames,
      frameRate: 5,
      repeat: -1,
    });

    this.play("fly");
  }

  initPlayer() {
    this.x += this.displayWidth / 2;

    if (this.originConfig) {
      this.setOrigin(this.originConfig.x, this.originConfig.y);
    }

    this.setScale(0.8);
    this.fires = new Fires(this.scene);

    // this.timer = this.scene.time.addEvent({
    //   delay: 1000,
    //   loop: true,
    //   callback: this.fire,
    //   callbackScope: this,
    // });

    this.lastFired = 0;
    this.fireDelay = 300;
  }

  fire() {
    this.fires.createFire(this);
  }

  move() {
    this.body.setVelocity(0);
    if (this.scene.joystick) {
    } else {
      if (this.scene.cursors.left.isDown) {
        this.body.setVelocityX(-this.velocity);
      } else if (this.scene.cursors.right.isDown) {
        this.body.setVelocityX(this.velocity);
      }

      if (this.scene.cursors.up.isDown) {
        this.body.setVelocityY(-this.velocity);
      } else if (this.scene.cursors.down.isDown) {
        this.body.setVelocityY(this.velocity);
      }
    }

    if (this.scene.cursors.space.isDown) {
      const time = this.scene.time.now;

      if (time > this.lastFired + this.fireDelay) {
        this.fire();
        this.lastFired = time;
      }
    }
  }
}
