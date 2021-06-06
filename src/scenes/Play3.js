
class Play3 extends Phaser.Scene {
    
    constructor () {
        super("playScene3");
        this.attackallow = false;
    }

    create() {
        
        // map
        const map = this.make.tilemap({key:'mapjs3'});
        const tileset = map.addTilesetImage('maptile','mappng');
        
        this.ground = map.createLayer('ground',tileset);

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
            let enemy = new EnemySword(this,enemyobj.x, enemyobj.y);
            this.enemyGroup.add(enemy);
        });


        // Group that holds the enemies
        this.enemyGroupBow = this.physics.add.group({
            runChildUpdate: true
        });

        // load position of enemies from map
        const enemygroupBowLayer = map.getObjectLayer('enemyla2')
        enemygroupBowLayer.objects.forEach(enemyobj =>{
            let enemyBow = new EnemyBow(this,enemyobj.x, enemyobj.y);
            this.enemyGroupBow.add(enemyBow);
        });

        //enenmy area
        this.enareaobj = map.filterObjects("enemyarea",  obj => obj.name === 'enar')
        for(let i= 0; i<this.enareaobj.length; i++){
            let enarea1 = this.enareaobj[i];
            this.addEnareaRectangle(enarea1.x,enarea1.y, enarea1.width, enarea1.height);
        }
        //attackoff area
        this.attackoffobj = map.filterObjects("attackoff",  obj => obj.name === 'attoff')
        for(let i= 0; i<this.attackoffobj.length; i++){
            let attackoff1 = this.attackoffobj[i];
            this.addAttackoffRectangle(attackoff1.x,attackoff1.y, attackoff1.width, attackoff1.height);
        }

        //next level
        this.levelobj = map.filterObjects("levelobj",  obj => obj.name === 'lvl')
        for(let i= 0; i<this.levelobj.length; i++){
            let level1 = this.levelobj[i];
            this.addlevelRectangle(level1.x,level1.y, level1.width, level1.height);
        }

        //map collision
        //this.physics.add.collider(this.player, this.walltile);
        this.physics.add.collider(this.enemyGroup, this.walltile);
        this.physics.add.collider(this.enemyGroupBow, this.walltile);

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
        //this.blk = this.add.image(0,0,'blackcir').setOrigin(0);


    
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

        //this.blk.setScrollFactor(0);
        this.cameras.main.startFollow(this.player,true);
        

        this.attackText = this.add.text(10,50,'attack:' + this.attackallow, this.cooldownConfig);
        this.attackText.setScrollFactor(0);


        
    }

    update() {
        this.player.update();
        if(this.player.hp <= 0) {
            this.gameOver();
        }

        
        this.hpBar.scaleX = this.player.hp/this.player.maxhp;
        this.cdBar.scaleX = this.player.cd/100;

        this.attackText.text = 'attack: ' + this.attackallow;
    }


    gameOver() {
        this.scene.pause();
        this.scene.start('gameOverScene');

    }

    addEnareaRectangle(x,y,width, heigth){
        let enarea1 = this.add.rectangle(x,y,width,heigth, 0x0000FF).setOrigin(0,0);
        this.physics.add.existing(enarea1);
        enarea1.body.immovable = true; 
        enarea1.alpha = 0.001;
        this.physics.add.overlap(this.player, enarea1, function(){
            this.attackallow = true;
        }, null, this)
    }

    addAttackoffRectangle(x,y,width, heigth){
        let attackoff1 = this.add.rectangle(x,y,width,heigth, 0xFFFFFF).setOrigin(0,0);
        this.physics.add.existing(attackoff1);
        attackoff1.body.immovable = true; 
        attackoff1.alpha = 0.001;
        this.physics.add.overlap(this.player, attackoff1, function(){
            this.attackallow = false;
        }, null, this)
        this.physics.add.collider(this.enemyGroup, attackoff1)
        this.physics.add.collider(this.enemyGroupBow, attackoff1)
    }

    addlevelRectangle(x,y,width, heigth){
        let level1 = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(level1);
        level1.body.immovable = true; 
        level1.alpha = 0.001;
        this.physics.add.overlap(this.player, level1, function(){
            this.scene.start('playScene2');
        }, null, this)
    }

}