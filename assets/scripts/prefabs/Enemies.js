class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.scene = scene;

    this.countMax = 5;
    this.countCreated = 0;
    this.timer = this.scene.time.addEvent({
      delay: 2000,
      loop: true,
      callback: this.tick,
      callbackScope: this,
    });
  }

  tick() {
    if (this.countCreated < this.countMax) {
      this.createEnemy();
    } else {
      this.timer.remove();
    }
  }

  createEnemy() {
    let enemy = this.getFirstDead();

    if (!enemy) {
      console.log("create new enemy");
      enemy = Enemy.generate(this.scene);
      this.add(enemy);
    } else {
      console.log("reset existing enemy");
      enemy.reset();
    }

    enemy.move();
    ++this.countCreated;
  }
}
