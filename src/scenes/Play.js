
class Play extends Phaser.Scene {
    
    constructor () {
        super("playScene");
    }

    create() {
        
        // map
        const map = this.make.tilemap({key:'mapjs'})
        const tileset = map.addTilesetImage('maptile','mappng')
        map.createLayer('ground',tileset)

        this.walltile = map.createLayer('wall',tileset)
        this.walltile.setCollisionByProperty({collides: true});

        // collision debug
        const debugGraphics = this.add.graphics().setAlpha(0.7)
        this.walltile.renderDebug(debugGraphics, {
            tileColor : null,
            collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
            faceColor:new Phaser.Display.Color(40, 39, 37, 255)
        });

        // movement controls set up inputs
        this.left = this.input.keyboard.addKey('A');
        this.right = this.input.keyboard.addKey('D');
        this.up = this.input.keyboard.addKey('W');
        this.down = this.input.keyboard.addKey('S');

        // create the player object
        this.player = new Swordsman (this,game.config.width/2,game.config.height/2).setOrigin(0.5);

        // Group that holds the enemies
        // this.enemygroup = this.physics.add.group({
        //     classType: Enemies,
        // });

        // load position of enemies from map
        // const enemygroupLayer = map.getObjectLayer('enemyla')
        // enemygroupLayer.objects.forEach(enemyobj =>{
        //     this.enemygroup.get(enemyobj.x, enemyobj.y).setVelocity(-50,0).setBounce(1, 1).setCollideWorldBounds(true);
        // });
      

        //map collision
        this.physics.add.collider(this.player, this.walltile);
        //this.physics.add.collider(this.enemygroup, this.walltile);
        
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
    }

    update() {
        this.player.update();

        this.attackText.text = 'Attack:' + this.player.attackOnCooldown;
        this.sheathText.text = 'Sheath:' + this.player.sheathOnCooldown;

    }

}