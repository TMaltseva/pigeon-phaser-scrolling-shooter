class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.score = 0;
    this.joystick = null;
    this.isFiring = false;
  }

  create() {
    this.createBackground();

    if (!this.sounds) {
      this.createSounds();
    }
    this.player = new Player(this);
    this.enemies = new Enemies(this);
    this.createCompleteEvents();
    this.addOverlap();
    this.createText();

    this.createVirtualJoystick();
  }

  createVirtualJoystick() {
    if (!this.sys.game.device.input.touch) return;

    const { width, height } = this.scale;

    this.joystick = this.plugins.get("rexVirtualJoystick").add(this, {
      x: 150,
      y: height - 150,
      radius: 80,
      base: this.add.circle(0, 0, 80, 0x888888, 0.5),
      thumb: this.add.circle(0, 0, 40, 0xcccccc, 0.8),
      dir: "8dir",
      forceMin: 16,
    });

    this.fireButton = this.add
      .circle(width - 150, height - 150, 60, 0xffa000, 0.5)
      .setInteractive()
      .on("pointerdown", () => {
        this.isFiring = true;
        this.player.fire();
        this.player.lastFired = this.time.now;
      })
      .on("pointerup", () => {
        this.isFiring = false;
      })
      .on("pointerout", () => {
        this.isFiring = false;
      });

    this.add.circle(width - 150, height - 150, 30, 0xffffff, 0.8);
  }

  handleJoystickInput() {
    if (this.joystick && this.joystick.force > 0) {
      const speedMultiplier = Math.min(this.joystick.force / 80, 1);
      this.player.body.setVelocityX(
        this.joystick.forceX * speedMultiplier * 10
      );
      this.player.body.setVelocityY(
        this.joystick.forceY * speedMultiplier * 10
      );
    }
  }

  createSounds() {
    this.sounds = {
      boom: this.sound.add("boom", { volume: 0.1 }),
      theme: this.sound.add("theme", { volume: 0.2, loop: true }),
    };
    this.sounds.theme.play();
  }

  createText() {
    this.scoreText = this.add.text(50, 50, "Score: 0", {
      font: "40px CurseCasual",
      fill: "#FFFFFF",
    });
  }

  addOverlap() {
    this.physics.add.overlap(
      this.player.fires,
      this.enemies,
      this.onOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.enemies.fires,
      this.player,
      this.onOverlap,
      undefined,
      this
    );
    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.onOverlap,
      undefined,
      this
    );
  }

  createCompleteEvents() {
    this.player.once("killed", this.onComplete, this);
    this.events.once("enemies-killed", this.onComplete, this);
  }

  onComplete() {
    this.scene.start("Start", {
      score: this.score,
      completed: this.player.active,
    });
  }

  onOverlap(source, target) {
    const enemy = [source, target].find((item) => item.texture.key === "ship");

    if (enemy) {
      ++this.score;
      this.scoreText.setText(`Score: ${this.score}`);
      Boom.generate(this, enemy.x, enemy.y);
      this.sounds.boom.play();
    }
    source.setAlive(false);
    target.setAlive(false);
  }

  update() {
    this.player.move();
    this.bg.tilePositionX += 0.5;
    this.handleJoystickInput();

    if (this.isFiring) {
      const time = this.time.now;
      if (time > this.player.lastFired + this.player.fireDelay) {
        this.player.fire();
        this.player.lastFired = time;
      }
    }
  }

  createBackground() {
    this.bg = this.add
      .tileSprite(0, 0, config.width, config.height, "bg")
      .setOrigin(0);
  }
}
