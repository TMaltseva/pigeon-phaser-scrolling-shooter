const isMobile =
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

function getViewportDimensions() {
  if (!isMobile) {
    return { width: 1280, height: 720 };
  }

  const isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);

  if (isIOS) {
    return {
      width: window.screen.width,
      height: window.screen.height,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

const viewport = getViewportDimensions();

let config = {
  type: Phaser.AUTO,
  width: isMobile ? window.innerWidth : 1280,
  height: isMobile ? window.innerHeight : 720,
  scene: [BootScene, PreloadScene, StartScene, GameScene],
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.NO_CENTER,
    parent: null,
  },
  input: {
    touch: true,
  },
  render: {
    antialias: true,
    pixelArt: false,
    clearBeforeRender: false,
  },
  disableContextMenu: true,
  banner: false,
  fps: {
    target: 60,
    forceSetTimeOut: true,
  },
};

let game = new Phaser.Game(config);
