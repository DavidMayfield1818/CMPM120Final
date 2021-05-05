class Load extends Phaser.Scene {
    constructor () {
        super("loadScene");
    }

    preload() {
        // asset loading

    }

    create() {
        this.scene.start('playScene');
    }
}