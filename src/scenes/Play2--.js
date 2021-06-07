
class Play2 extends Phaser.Scene {
    
    constructor () {
        super("playScene2");
        this.attackallow = false;
    }

    create() {
        // map
        const map = this.make.tilemap({key:'mapjs2'});
        const tileset = map.addTilesetImage('maptile','mappng');
        
        this.ground = map.createLayer('ground',tileset);

        this.walltile = map.createLayer('wall',tileset);
        this.walltile.setCollisionByProperty({collides: true});
        this.level = map.createLayer('level',tileset);
        this.teleport = map.createLayer('teleport',tileset);

        // movement controls set up inputs
        this.left = this.input.keyboard.addKey('A');
        this.right = this.input.keyboard.addKey('D');
        this.up = this.input.keyboard.addKey('W');
        this.down = this.input.keyboard.addKey('S');

        // create the player object
        this.p1Spawn = map.findObject('Spawns', obj => obj.name === 'p1Spawn');
        this.firstSpawn = map.findObject('Spawns', obj => obj.name === 'firstSpawn');
        this.secondSpawn = map.findObject('Spawns', obj => obj.name === 'secondSpawn');
        this.thirdSpawn = map.findObject('Spawns', obj => obj.name === 'thirdSpawn');
        this.fourthSpawn = map.findObject('Spawns', obj => obj.name === 'fourthSpawn');
        this.endSpawn = map.findObject('Spawns', obj => obj.name === 'endSpawn');
        //this.player = new Swordsman (this,game.config.width/4,game.config.height/4).setOrigin(0.5);
        this.player = new Swordsman (this, this.p1Spawn.x, this.p1Spawn.y);

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
        
        //main
        this.mainobj = map.filterObjects("main",  obj => obj.name === 'mainrect')
        for(let i= 0; i<this.mainobj.length; i++){
            let main = this.mainobj[i];
            this.addmainRectangle(main.x,main.y, main.width, main.height);
        }

        //room1
        this.room1obj = map.filterObjects("first",  obj => obj.name === 'firstrect')
        for(let i= 0; i<this.room1obj.length; i++){
            let room1 = this.room1obj[i];
            this.addroom1Rectangle(room1.x,room1.y, room1.width, room1.height);
        }

        //room2
        this.room2obj = map.filterObjects("second",  obj => obj.name === 'secondrect')
        for(let i= 0; i<this.room2obj.length; i++){
            let room2 = this.room2obj[i];
            this.addroom2Rectangle(room2.x,room2.y, room2.width, room2.height);
        }
        //room3
        this.room3obj = map.filterObjects("third",  obj => obj.name === 'thirdrect')
        for(let i= 0; i<this.room3obj.length; i++){
            let room3 = this.room3obj[i];
            this.addroom3Rectangle(room3.x,room3.y, room3.width, room3.height);
        }
        //room4
        this.room4obj = map.filterObjects("fourth",  obj => obj.name === 'fourthrect')
        for(let i= 0; i<this.room4obj.length; i++){
            let room4 = this.room4obj[i];
            this.addroom4Rectangle(room4.x,room4.y, room4.width, room4.height);
        }

        //end
        this.endobj = map.filterObjects("end",  obj => obj.name === 'endrect')
        for(let i= 0; i<this.endobj.length; i++){
            let end = this.endobj[i];
            this.addendRectangle(end.x,end.y, end.width, end.height);
        }

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
        let attackoff1 = this.add.rectangle(x,y,width,heigth, 0x00FFFF).setOrigin(0,0);
        this.physics.add.existing(attackoff1);
        attackoff1.body.immovable = true; 
        attackoff1.alpha = 0.001;
        this.physics.add.overlap(this.player, attackoff1, function(){
            this.attackallow = false;
        }, null, this)
    }

    addlevelRectangle(x,y,width, heigth){
        let level1 = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(level1);
        level1.body.immovable = true; 
        level1.alpha = 0.001;
        this.physics.add.overlap(this.player, level1, function(){
            this.scene.start('playScene');
        }, null, this)
    }


    addroom1Rectangle(x,y,width, heigth){
        let room1 = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(room1);
        room1.body.immovable = true; 
        room1.alpha = 0.001;
        this.physics.add.overlap(this.player, room1, function(){
            this.player.x = this.firstSpawn.x;
            this.player.y = this.firstSpawn.y
        }, null, this)
    }

    addroom2Rectangle(x,y,width, heigth){
        let room2 = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(room2);
        room2.body.immovable = true; 
        room2.alpha = 0.001;
        this.physics.add.overlap(this.player, room2, function(){
            this.player.x = this.secondSpawn.x;
            this.player.y = this.secondSpawn.y
        }, null, this)
    }

    addroom3Rectangle(x,y,width, heigth){
        let room3 = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(room3);
        room3.body.immovable = true; 
        room3.alpha = 0.001;
        this.physics.add.overlap(this.player, room3, function(){
            this.player.x = this.thirdSpawn.x;
            this.player.y = this.thirdSpawn.y
        }, null, this)
    }

    addroom4Rectangle(x,y,width, heigth){
        let room4 = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(room4);
        room4.body.immovable = true; 
        room4.alpha = 0.001;
        this.physics.add.overlap(this.player, room4, function(){
            this.player.x = this.fourthSpawn.x;
            this.player.y = this.fourthSpawn.y
        }, null, this)
    }
    addendRectangle(x,y,width, heigth){
        let end = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(end);
        end.body.immovable = true; 
        end.alpha = 0.001;
        this.physics.add.overlap(this.player, end, function(){
            this.player.x = this.endSpawn.x;
            this.player.y = this.endSpawn.y
        }, null, this)
    }

    addmainRectangle(x,y,width, heigth){
        let main = this.add.rectangle(x,y,width,heigth, 0xff0000).setOrigin(0,0);
        this.physics.add.existing(main);
        main.body.immovable = true; 
        main.alpha = 0.001;
        this.physics.add.overlap(this.player, main, function(){
            this.player.x = this.p1Spawn.x;
            this.player.y = this.p1Spawn.y
        }, null, this)
    }

}