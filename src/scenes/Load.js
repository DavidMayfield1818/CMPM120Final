class Load extends Phaser.Scene {
    constructor () {
        super("loadScene");
    }

    preload() {
        this.load.path = './assets/';
        // asset loading
        this.load.image('Background', 'tempBackground.png');

        this.load.image('swordsman', 'swordsman.png');
        this.load.image('slash', 'slash.png');
        this.load.image('marker', 'star.png');
        
        this.load.image('mappng','maptile.png');
        this.load.tilemapTiledJSON('mapjs','mapjs.json')
        this.load.audio('walk_effect', 'walk_effect.wav');
        this.load.audio('slash', 'sword_ex.wav');
        this.load.audio('sword_out', 'sword_out.wav'); //from youtube https://www.youtube.com/watch?v=EgRvVq8mStE
    }

    create() {
        this.scene.start('playScene');
    }
}