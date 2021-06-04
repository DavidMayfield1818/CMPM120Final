
class Play extends Phaser.Scene {
    
    constructor () {
        super("playScene");
    }

    create() {
        
        // map
        const map = this.make.tilemap({key:'mapjs'});
        const tileset = map.addTilesetImage('maptile','mappng');
        
        map.createLayer('ground',tileset);

        this.walltile = map.createLayer('wall',tileset);
        this.walltile.setCollisionByProperty({collides: true});
        this.level = map.createLayer('level',tileset);

        // movement controls set up inputs
        this.left = this.input.keyboard.addKey('A');
        this.right = this.input.keyboard.addKey('D');
        this.up = this.input.keyboard.addKey('W');
        this.down = this.input.keyboard.addKey('S');

        // create the player object
        const p1Spawn = map.findObject('Spawns', obj => obj.name === 'p1Spawn');
        
        //this.player = new Swordsman (this,game.config.width/4,game.config.height/4).setOrigin(0.5);
        this.player = new Swordsman (this, p1Spawn.x, p1Spawn.y);

        // Group that holds the enemies
        this.enemyGroup = this.physics.add.group({
            runChildUpdate: true
        });

        // load position of enemies from map
        const enemygroupLayer = map.getObjectLayer('enemyla')
        enemygroupLayer.objects.forEach(enemyobj =>{
            let enemy = new EnemyBow(this,enemyobj.x, enemyobj.y);
            this.enemyGroup.add(enemy);
        });

        //map collision
        //this.physics.add.collider(this.player, this.walltile);
        this.physics.add.collider(this.enemyGroup, this.walltile);

        // group the arrows
        this.arrowGroup = this.physics.add.group({
            runChildUpdate: true
        });
        
        // group to retain slash data
        this.slashGroup = this.add.group({
            maxSize: 10
        });

        // background
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
        this.blk = this.add.image(0,0,'blackcir').setOrigin(0);

        // health bar
        this.hpBar = this.add.graphics();
        this.hpBar.fillStyle(0xbf3634,1);
        this.hpBar.x = 780;
        this.hpBar.y = 580;
        this.hpBar.fillRect(0,0,100,30);
        this.hpBar.setScrollFactor(0);
        this.hpBar.setAngle(180);

        // cooldown bar
        this.cdBar = this.add.graphics();
        this.cdBar.fillStyle(0xffffff,1);
        this.cdBar.x = 780;
        this.cdBar.y = 550;
        this.cdBar.fillRect(0,0,100,10);
        this.cdBar.setScrollFactor(0);
        this.cdBar.setAngle(180);

        this.blk.setScrollFactor(0);
        this.cameras.main.startFollow(this.player,true);
    }

    update() {
        this.player.update();
        if(this.player.hp <= 0) {
            this.gameOver();
        }

        this.hpBar.scaleX = this.player.hp/this.player.maxhp;
        this.cdBar.scaleX = this.player.cd/100;
    }


    gameOver() {
        this.scene.pause();
        this.scene.start('gameOverScene');

    }
}