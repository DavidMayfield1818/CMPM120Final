class Load extends Phaser.Scene {
    constructor () {
        super("loadScene");
    }

    preload() {
        // asset loading
        this.load.image('Background', 'tempBackground.png');

    }

    create() {
        this.scene.start('playScene');
    }
}