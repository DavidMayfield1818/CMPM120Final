
class Play3 extends Phaser.Scene {
    
    constructor () {
        super("playScene3");
        this.attackallow = false;
    }

    create() {
        console.log('play3');
        this.bgm = this.sound.add("bgm2", {volume: 0.05, loop: true}); 
        this.bgm.play();
        this.healsound = this.sound.add("heal",{volume:0.5,});
        
        // map
        const map = this.make.tilemap({key:'mapjs3'});
        const tileset = map.addTilesetImage('maptile','mappng');
        
        this.ground = map.createLayer('ground',tileset);

        this.walltile = map.createLayer('wall',tileset);
        this.walltile.setCollisionByProperty({collides: true});
        this.level = map.createLayer('level',tileset);

        this.animationsetup();

        // movement controls set up inputs
        this.left = this.input.keyboard.addKey('A');
        this.right = this.input.keyboard.addKey('D');
        this.up = this.input.keyboard.addKey('W');
        this.down = this.input.keyboard.addKey('S');

        // create the player object
        const p1Spawn = map.findObject('Spawns', obj => obj.name === 'p1Spawn');
        
        //this.player = new Swordsman (this,game.config.width/4,game.config.height/4).setOrigin(0.5);
        this.player = new Swordsman (this, p1Spawn.x, p1Spawn.y);

        
        // Group that holds the health
        this.healthGroup = this.physics.add.group({
            runChildUpdate: true
        });

        // load position of health from map
        const healthgroupLayer = map.getObjectLayer('health')
        healthgroupLayer.objects.forEach(healthobj =>{
            let health = this.physics.add.image(healthobj.x, healthobj.y,'healthimage').setImmovable();
            this.physics.add.collider(this.player, health,function(){
                if(this.player.hp <5){
                    this.healsound.play()
                    this.player.hp = 5;
                    health.destroy();
                } else {
                    health.destroy();
                }
            }, null, this)
            this.healthGroup.add(health);
        });
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

        // load position of enemies from map
        const enemygroupBowLayer = map.getObjectLayer('enemyla2')
        enemygroupBowLayer.objects.forEach(enemyobj =>{
            let enemyBow = new EnemyBow(this,enemyobj.x, enemyobj.y);
            this.enemyGroup.add(enemyBow);
        });

        // load position of enemies from map
        const enemygroupShieldLayer = map.getObjectLayer('enemyla3')
        enemygroupShieldLayer.objects.forEach(enemyobj =>{
            let enemyShield = new EnemyShield(this,enemyobj.x, enemyobj.y);
            this.enemyGroup.add(enemyShield);
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
        this.blk = this.add.image(0,0,'blackcir').setOrigin(0);
        this.blk.setScrollFactor(0);
        // cooldowns

        


    
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
    }

    addlevelRectangle(x,y,width, heigth){
        let level1 = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(level1);
        level1.body.immovable = true; 
        level1.alpha = 0.001;
        this.physics.add.overlap(this.player, level1, function(){
            this.player.walvol = false;
            this.bgm.stop();
            this.scene.start('playScene3');
        }, null, this)
    }


    animationsetup() {
        // set up animations
        // --------------------------------------------------------------------
        // player animations
        // --------------------------------------------------------------------
        this.anims.create ({
            key: 'swordsmanDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 0, end: 3})
        });
        this.anims.create ({
            key: 'swordsmanDownRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 4, end: 7})
        });
        this.anims.create ({
            key: 'swordsmanRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 8, end: 9})
        });
        this.anims.create ({
            key: 'swordsmanUpRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 10, end: 12})
        });
        this.anims.create ({
            key: 'swordsmanUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 13, end: 15})
        });
        this.anims.create ({
            key: 'swordsmanUpLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 16, end: 18})
        });
        this.anims.create ({
            key: 'swordsmanLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 19, end: 20})
        });
        this.anims.create ({
            key: 'swordsmanDownLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 21, end: 24})
        });
        this.anims.create ({
            key: 'swordsmanDownAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 25, end: 25})
        });
        this.anims.create ({
            key: 'swordsmanDownRightAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 26, end: 26})
        });
        this.anims.create ({
            key: 'swordsmanRightAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 27, end: 27})
        });
        this.anims.create ({
            key: 'swordsmanUpRightAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 28, end: 28})
        });
        this.anims.create ({
            key: 'swordsmanUpAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 29, end: 29})
        });
        this.anims.create ({
            key: 'swordsmanUpLeftAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 30, end: 30})
        });
        this.anims.create ({
            key: 'swordsmanLeftAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 31, end: 31})
        });
        this.anims.create ({
            key: 'swordsmanDownLeftAttack',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 32, end: 32})
        });
        this.anims.create ({
            key: 'swordsmanSheath',
            repeat: 0,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 33, end: 37})
        });
        this.anims.create ({
            key: 'swordsmanDeath',
            repeat: 0,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 38, end: 43})
        });
        this.anims.create ({
            key: 'swordsmanIdle',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('swordsman',{start: 0, end: 0})
        });

        // --------------------------------------------------------------------
        // Enemy animations
        // --------------------------------------------------------------------
        this.anims.create ({
            key: 'ogreIdle',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 0, end: 0})
        });
        this.anims.create ({
            key: 'ogreDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 0, end: 1})
        });
        this.anims.create ({
            key: 'ogreDownRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 2, end: 3})
        });
        this.anims.create ({
            key: 'ogreRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 4, end: 6})
        });
        this.anims.create ({
            key: 'ogreUpRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 7, end: 8})
        });
        this.anims.create ({
            key: 'ogreUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 9, end: 10})
        });
        this.anims.create ({
            key: 'ogreUpLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 11, end: 12})
        });
        this.anims.create ({
            key: 'ogreLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 13, end: 15})
        });
        this.anims.create ({
            key: 'ogreDownLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('ogre',{start: 16, end: 17})
        });
        this.anims.create ({
            key: 'ogreDeath',
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('ogre',{start: 18, end: 19})
        });

        // --------------------------------------------------------------------
        // Shield animations
        // --------------------------------------------------------------------
        this.anims.create ({
            key: 'shieldIdle',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 0, end: 0})
        });
        this.anims.create ({
            key: 'shieldDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 0, end: 2})
        });
        this.anims.create ({
            key: 'shieldDownRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 2, end: 5})
        });
        this.anims.create ({
            key: 'shieldRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 6, end: 8})
        });
        this.anims.create ({
            key: 'shieldUpRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 9, end: 11})
        });
        this.anims.create ({
            key: 'shieldUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 12, end: 14})
        });
        this.anims.create ({
            key: 'shieldLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 15, end: 17})
        });
        this.anims.create ({
            key: 'shieldLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 18, end: 20})
        });
        this.anims.create ({
            key: 'shieldDownLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('shield',{start: 21, end: 23})
        });
        this.anims.create ({
            key: 'shieldDeath',
            repeat: -1,
            frameRate: 2,
            frames: this.anims.generateFrameNumbers('shield',{start: 24, end: 26})
        });

        // --------------------------------------------------------------------
        // archer animations
        // --------------------------------------------------------------------
        this.anims.create ({
            key: 'bowDown',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 8, end: 10})
        });
        this.anims.create ({
            key: 'bowDownRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 11, end: 12})
        });
        this.anims.create ({
            key: 'bowRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 13, end: 16})
        });
        this.anims.create ({
            key: 'bowUpRight',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 17, end: 18})
        });
        this.anims.create ({
            key: 'bowUp',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 19, end: 20})
        });
        this.anims.create ({
            key: 'bowUpLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 21, end: 22})
        });
        this.anims.create ({
            key: 'bowLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 23, end: 26})
        });
        this.anims.create ({
            key: 'bowDownLeft',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 27, end: 28})
        });
        this.anims.create ({
            key: 'bowRightAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 29, end: 32})
        });
        this.anims.create ({
            key: 'bowLeftAttack',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 33, end: 36})
        });
        this.anims.create ({
            key: 'bowDeath',
            repeat: 0,
            frameRate: 4,
            frames: this.anims.generateFrameNumbers('bow',{start: 37, end: 40})
        });
        this.anims.create ({
            key: 'bowIdle',
            repeat: -1,
            frameRate: 10,
            frames: this.anims.generateFrameNumbers('bow',{start: 0, end: 7})
        });
    }
}