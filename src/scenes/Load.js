class Load extends Phaser.Scene {
    constructor () {
        super("loadScene");
    }

    preload() {
        this.load.path = './assets/';
        // asset loading
        // background - to be scraped for tilemap
        this.load.image('Background', 'tempBackground.png');

        // swordsman and attack sprites
        this.load.image('swordsman', 'swordsman.png');
        this.load.image('slash', 'slash.png');
        this.load.image('marker', 'star.png');

        // enemy sprites
        this.load.image('enemypng', 'enemies.png');
        this.load.image('enemySword', 'enemy_sword.png');
        this.load.image('enemyShield', 'enemy_shield.png');
        this.load.image('enemySpear', 'enemy_spear.png');
        this.load.image('enemyBow', 'enemy_bow.png');
        this.load.image('arrowSprite', 'arrow.png');
        
        // tile map stuff
        this.load.image('mappng','maptile32.png');
        this.load.tilemapTiledJSON('mapjs','mapjs32.json')
        //this.load.tilemapTiledJSON('mapjs2','mapjs32-level2.json')
        this.load.tilemapTiledJSON('mapjs2','mapjs32-2.json')
        this.load.image('blackcir','blackcir.png')

        // audio stuff
        this.load.audio('walk_effect', 'walk_effect.wav');
        this.load.audio('slash', 'sword_ex.wav');
        this.load.audio('sword_out', 'sword_out.wav'); //from youtube https://www.youtube.com/watch?v=EgRvVq8mStE


        //dialog
        this.load.json('dialog', 'json/dialog.json');
        this.load.image('dialogbox', 'dialog/dialogbox.png');
        this.load.image('swordman', 'dialog/swordman1.png');
        this.load.bitmapFont('gem_font', 'font/dubai01.png', 'font/dubai.xml');
        
    }

    create() {
        //this.scene.start('playScene-level2');
        this.scene.start('playScene');
        //this.scene.start('talkingScene');
    }
}