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
    this.velocitySetToZero = false;
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
    this.scale.removeAllListeners();
  }

  setupTouchControls() {
    if (this.touchHandlersAdded) {
      this.input.off("pointerdown");
      this.input.off("pointermove");
      this.input.off("pointerup");
    }

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

        this.handleTouchInputDirect();
      }
    });

    this.input.on("pointerup", (pointer) => {
      this.isTouching = false;
      this.touchCurrentX = pointer.x;
      this.touchCurrentY = pointer.y;

      this.velocitySetToZero = false;
    });

    this.touchHandlersAdded = true;

    const width = this.game.config.width;
    const height = this.game.config.height;

    const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
    const safeAreaBottom = isIOS ? 34 : 0;
    const safeAreaRight = isIOS ? 20 : 20;

    const buttonX = width - 80 - safeAreaRight;
    const buttonY = height - 80 - safeAreaBottom;

    this.fireButton = this.add
      .circle(buttonX, buttonY, 50, 0xffa000, 0.7)
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

    this.add.circle(buttonX, buttonY, 25, 0xffffff, 0.9);
  }

  handleTouchInputDirect() {
    if (this.isTouching && this.isMobile && this.player) {
      this.player.x = this.touchCurrentX;
      this.player.y = this.touchCurrentY;

      if (!this.velocitySetToZero) {
        this.player.body.setVelocity(0);
        this.velocitySetToZero = true;
      }
    }
  }

  handleTouchInput() {
    if (this.isTouching && this.isMobile) {
      const targetX = this.touchCurrentX;
      const targetY = this.touchCurrentY;

      const deltaX = Math.abs(targetX - this.lastTouchX);
      const deltaY = Math.abs(targetY - this.lastTouchY);

      if (deltaX > 2 || deltaY > 2) {
        const lerpFactor = 0.7;
        this.player.x = Phaser.Math.Linear(this.player.x, targetX, lerpFactor);
        this.player.y = Phaser.Math.Linear(this.player.y, targetY, lerpFactor);

        this.lastTouchX = targetX;
        this.lastTouchY = targetY;
      }

      if (!this.velocitySetToZero) {
        this.player.body.setVelocity(0);
        this.velocitySetToZero = true;
      }
    } else if (!this.isTouching && this.isMobile) {
      this.velocitySetToZero = false;
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
      fill: "#ffa000",
      antialias: true,
      resolution: window.devicePixelRatio || 1,
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

  destroy() {
    super.destroy();
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
    if (this.player) {
      this.player.move();
    }

    if (!this.isMobile && this.bg && this.time.now % 2 === 0) {
      this.bg.tilePositionX += 0.5;
    }

    if (this.isFiring && this.player) {
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

      const gameWidth = this.game.config.width;
      const gameHeight = this.game.config.height;

      const scaleX = gameWidth / this.bg.width;
      const scaleY = gameHeight / this.bg.height;
      const scale = Math.max(scaleX, scaleY);

      this.bg.setScale(scale);

      this.bg.setPosition(
        (gameWidth - this.bg.displayWidth) / 2,
        (gameHeight - this.bg.displayHeight) / 2
      );
    } else {
      this.bg = this.add
        .tileSprite(0, 0, config.width, config.height, "bg")
        .setOrigin(0);
    }
  }
}
