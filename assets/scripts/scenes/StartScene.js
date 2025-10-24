class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  create(data) {
    this.isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    this.gameEnded = data.score !== undefined;

    this.createBackground();
    if (this.gameEnded) {
      this.createStats(data);
    }
    this.createText();
    this.setEvents();
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
      this.add.sprite(0, 0, "bg").setOrigin(0);
    }
  }

  createText() {
    const centerX = this.isMobile ? this.scale.width / 2 : config.width / 2;
    const centerY = this.isMobile ? this.scale.height / 2 : config.height / 2;

    if (!this.gameEnded) {
      const rectWidth = this.isMobile ? this.scale.width * 0.9 : 700;
      const rectHeight = this.isMobile ? this.scale.height * 0.7 : 500;

      this.add
        .graphics()
        .fillStyle(0x000000, 0.5)
        .fillRoundedRect(
          centerX - rectWidth / 2,
          centerY - rectHeight / 2,
          rectWidth,
          rectHeight,
          20
        )
        .strokeRoundedRect(
          centerX - rectWidth / 2,
          centerY - rectHeight / 2,
          rectWidth,
          rectHeight,
          20
        );
    }

    const titleY = this.isMobile ? centerY - 120 : centerY - 100;
    const titleFontSize = this.isMobile ? "32px" : "48px";

    this.add
      .text(centerX, titleY, "Bird Shooter", {
        font: `${titleFontSize} CurseCasual`,
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);

    if (!this.gameEnded) {
      const instructionY = this.isMobile ? centerY - 20 : centerY;
      const instructionFontSize = this.isMobile ? "22px" : "28px";
      const instructionText = this.isMobile
        ? "Control the bird with touch\nShoot at enemies\nAvoid their attacks!"
        : "Control the bird with arrow keys\nShoot with spacebar\nAvoid enemy attacks!";

      this.add
        .text(centerX, instructionY, instructionText, {
          font: `${instructionFontSize} CurseCasual`,
          fill: "#FFFFFF",
          align: "center",
        })
        .setOrigin(0.5);
    }

    const startY = this.isMobile ? centerY + 120 : centerY + 150;
    const startFontSize = this.isMobile ? "28px" : "36px";

    this.add
      .text(centerX, startY, "Tap to start", {
        font: `${startFontSize} CurseCasual`,
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);
  }

  createStats(data) {
    const centerX = this.isMobile ? this.scale.width / 2 : config.width / 2;
    const centerY = this.isMobile ? this.scale.height / 2 : config.height / 2;
    const rectWidth = this.isMobile ? this.scale.width * 0.8 : 600;
    const rectHeight = this.isMobile ? this.scale.height * 0.6 : 600;

    this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(
        centerX - rectWidth / 2,
        centerY - rectHeight / 2,
        rectWidth,
        rectHeight
      );

    const textTitle = data.completed ? "Level completed!" : "Game over!";
    const textScore = `Score: ${data.score}`;
    const fontSize = this.isMobile ? "28px" : "40px";
    const textStyle = {
      font: `${fontSize} CurseCasual`,
      fill: "#FFFFFF",
    };

    this.add.text(centerX, centerY - 10, textTitle, textStyle).setOrigin(0.5);
    this.add.text(centerX, centerY + 50, textScore, textStyle).setOrigin(0.5);
  }

  setEvents() {
    this.input.on("pointerdown", () => {
      this.scene.start("Game");
    });
  }
}
