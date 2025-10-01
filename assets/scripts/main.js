let config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    scene: [BootScene, PreloadScene, StartScene]
};

let game = new Phaser.Game(config);