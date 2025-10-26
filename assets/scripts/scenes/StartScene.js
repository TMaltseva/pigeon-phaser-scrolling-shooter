class StartScene extends Phaser.Scene {
  constructor() {
    super("Start");
  }

  create(data) {
    this.gameEnded = data.score !== undefined;

    this.createBackground();
    if (this.gameEnded) {
      this.createStats(data);
    }
    this.createText();
    this.setEvents();
  }

  createBackground() {
    this.add.sprite(0, 0, "bg").setOrigin(0);
  }

  createText() {
    const centerX = config.width / 2;
    const centerY = config.height / 2;

    if (!this.gameEnded) {
      const rectWidth = 700;
      const rectHeight = 500;

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

    const titleY = centerY - 100;
    const titleFontSize = "48px";

    this.add
      .text(centerX, titleY, "Bird Shooter", {
        font: `${titleFontSize} CurseCasual`,
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);

    if (!this.gameEnded) {
      const instructionY = centerY;
      const instructionFontSize = "28px";
      const instructionText =
        "Control the bird with arrow keys\nShoot with spacebar\nAvoid enemy attacks!";

      this.add
        .text(centerX, instructionY, instructionText, {
          font: `${instructionFontSize} CurseCasual`,
          fill: "#FFFFFF",
          align: "center",
        })
        .setOrigin(0.5);
    }

    const startY = centerY + 150;
    const startFontSize = "36px";

    this.add
      .text(centerX, startY, "Press any key to start", {
        font: `${startFontSize} CurseCasual`,
        fill: "#FFFFFF",
      })
      .setOrigin(0.5);
  }

  createStats(data) {
    const centerX = config.width / 2;
    const centerY = config.height / 2;
    const rectWidth = 600;
    const rectHeight = 600;

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
    const fontSize = "40px";
    const textStyle = {
      font: `${fontSize} CurseCasual`,
      fill: "#FFFFFF",
    };

    this.add.text(centerX, centerY - 10, textTitle, textStyle).setOrigin(0.5);
    this.add.text(centerX, centerY + 50, textScore, textStyle).setOrigin(0.5);
  }

  setEvents() {
    this.input.keyboard.on("keydown", () => {
      this.scene.start("Game");
    });
  }
}
