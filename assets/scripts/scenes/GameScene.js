class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.score = 0;
    this.isFiring = false;
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchCurrentX = 0;
    this.touchCurrentY = 0;
    this.isTouching = false;
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

    if (this.isMobile) {
      this.setupTouchControls();
    }
  }

  setupTouchControls() {
    this.input.on("pointerdown", (pointer) => {
      this.isTouching = true;
      this.touchStartX = pointer.x;
      this.touchStartY = pointer.y;
      this.touchCurrentX = pointer.x;
      this.touchCurrentY = pointer.y;
    });

    this.input.on("pointermove", (pointer) => {
      if (this.isTouching) {
        this.touchCurrentX = pointer.x;
        this.touchCurrentY = pointer.y;
      }
    });

    this.input.on("pointerup", (pointer) => {
      this.isTouching = false;
      this.touchCurrentX = pointer.x;
      this.touchCurrentY = pointer.y;
    });

    const { width, height } = this.scale;
    this.fireButton = this.add
      .circle(width - 80, height - 80, 50, 0xffa000, 0.7)
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

    this.add.circle(width - 80, height - 80, 25, 0xffffff, 0.9);
  }

  handleTouchInput() {
    if (this.isTouching && this.isMobile) {
      const deltaX = this.touchCurrentX - this.touchStartX;
      const deltaY = this.touchCurrentY - this.touchStartY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > 10) {
        const speed = Math.min(distance / 100, 1) * this.player.velocity;
        const angle = Math.atan2(deltaY, deltaX);

        this.player.body.setVelocityX(Math.cos(angle) * speed);
        this.player.body.setVelocityY(Math.sin(angle) * speed);
      }
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

    if (!this.isMobile) {
      this.bg.tilePositionX += 0.5;
    }

    if (this.isMobile) {
      this.handleTouchInput();
    }

    if (this.isFiring) {
      const time = this.time.now;
      if (time > this.player.lastFired + this.player.fireDelay) {
        this.player.fire();
        this.player.lastFired = time;
      }
    }
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
      this.bg = this.add
        .tileSprite(0, 0, config.width, config.height, "bg")
        .setOrigin(0);
    }
  }
}
