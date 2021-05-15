
class Play extends Phaser.Scene {
    
    constructor () {
        super("playScene");
    }

    create() {
        
        //map
        const map = this.make.tilemap({key:'mapjs'})
        const tileset = map.addTilesetImage('maptile','mappng')
        map.createLayer('ground',tileset)

        const walltile = map.createLayer('wall',tileset)
        walltile.setCollisionByProperty({collides: true});

        //collcsion debug
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        walltile.renderDebug(debugGraphics, {
            tileColor : null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor:new Phaser.Display.Color(40, 39, 37, 255)
        });

        this.left = this.input.keyboard.addKey('A');
        this.right = this.input.keyboard.addKey('D');
        this.up = this.input.keyboard.addKey('W');
        this.down = this.input.keyboard.addKey('S');

        this.player = new Swordsman (this,game.config.width/2,game.config.height/2).setOrigin(0.5);

        //map collision
        this.physics.add.collider(this.player, walltile);

        this.slashGroup = this.add.group({
            maxSize: 10
        });

        //background
        //this.backGround = this.add.tileSprite(0,0,3072,768,'Background').setOrigin(0,0);
        // cooldowns
        this.cooldownConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.attackText = this.add.text(10,10,'Attack:' + this.player.attackOnCooldown, this.cooldownConfig);
        this.sheathText = this.add.text(10,30,'Sheath:' + this.player.sheathOnCooldown, this.cooldownConfig);
        this.attackText.setScrollFactor(0);
        this.sheathText.setScrollFactor(0);

        this.cameras.main.startFollow(this.player,true);

        this.walksound = this.sound.add('walk_effect', {volume: 0})
        this.walksound.play();
        this.walksound.loop = true;

    }

    update() {

        if(this.player.ismove == true){
            this.walksound.setVolume(3)
        }else{
            this.walksound.setVolume(0) 
        }

        this.player.update();
        this.attackText.text = 'Attack:' + this.player.attackOnCooldown;
        this.sheathText.text = 'Sheath:' + this.player.sheathOnCooldown;
    }
}