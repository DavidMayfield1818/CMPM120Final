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
        this.load.tilemapTiledJSON('mapjsins','mapjs-instrction.json');
        this.load.tilemapTiledJSON('mapjs','mapjs32.json');
        //this.load.tilemapTiledJSON('mapjs2','mapjs32-level2.json');
        this.load.tilemapTiledJSON('mapjs2','mapjs32-2.json');
        this.load.tilemapTiledJSON('mapjs3','mapjs32-3.json');
        this.load.image('blackcir','blackcir.png');
        this.load.image('ins','ins.png');
        this.load.image('ins2','ins2.png');
        this.load.image('insw','inswhite.png');
        this.load.image('ins2w','ins2white.png');

        this.load.image('healthimage', 'health.png');
        // audio stuff
        this.load.audio('walk_effect', 'walk_effect.wav');
        this.load.audio('slash', 'sword_ex.wav');
        this.load.audio('sword_out', 'sword_out.wav'); //from youtube https://www.youtube.com/watch?v=EgRvVq8mStE
        this.load.audio('bgm', 'music/music1.wav');
        this.load.audio('bgm2', 'music/music2.wav');
        this.load.audio('heal','soundeffect/health.wav');
        this.load.audio('hit','soundeffect/hit.wav');
        this.load.audio('nextdialog','soundeffect/nextdialog.wav');

        //dialog
        this.load.json('dialog', 'json/dialog.json');
        this.load.image('dialogbox', 'dialog/dialogbox.png');
        this.load.image('swordman', 'dialog/swordman1.png');
        this.load.bitmapFont('gem_font', 'font/dubai01.png', 'font/dubai.xml');
        this.load.image('diaimage1','dialog/image1.png')
        
    }

    create() {
        //this.scene.start('theEndScene');
        this.scene.start('talkingScene');
    }
}