const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

let config = {
  type: Phaser.AUTO,
  width: isMobile ? window.innerWidth : 1280,
  height: isMobile ? window.innerHeight : 720,
  // width: 1280,
  // height: 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scale: {
    mode: isMobile ? Phaser.Scale.RESIZE : Phaser.Scale.FIT,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 360,
      height: 500,
    },
    max: {
      // width: 1920,
      // height: 1080,
      width: isMobile ? window.innerWidth : 1920,
      height: isMobile ? window.innerHeight : 1080,
    },
  },
  input: {
    touch: true,
  },
};

let game = new Phaser.Game(config);

// if (isMobile) {
//   window.addEventListener("resize", () => {
//     game.scale.resize(window.innerWidth, window.innerHeight);
//   });
// }
