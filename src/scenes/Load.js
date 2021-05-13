class Load extends Phaser.Scene {
    constructor () {
        super("loadScene");
    }

    preload() {
        this.load.path = './assets/';
        // asset loading
        this.load.image('Background', 'tempBackground.png');
        
        this.load.image('mappng','maptile.png');
        this.load.tilemapTiledJSON('mapjs','mapjs.json')
    }

    create() {
        this.scene.start('playScene');
    }
}