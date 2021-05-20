class Swordsman extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'swordsman');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCircle(16);

        // attack anim booleans
        this.inAttack = false;
        this.attackOnCooldown = false;
        this.sheathOnCooldown = false;

        // distance values
        this.attackRange = 35;
        this.baseMoveSpeed = 200;
        this.moveSpeed = this.baseMoveSpeed;
        
        // movement sfx variables
        this.isMoving = false;
        this.sfxattack = scene.sound.add('sword_out')
        this.walksound = scene.sound.add('walk_effect', {volume: 0})
        this.walksound.play();
        this.walksound.loop = true;

        // mouse input
        this.scene.input.mouse.disableContextMenu();
        this.scene.input.on('pointerdown', function(pointer){
            if(!this.inAttack) {
                if(pointer.rightButtonDown()){
                    this.sheath();
                } else {
                    let tempX = this.x + pointer.x - game.config.width/2;
                    let tempY = this.y + pointer.y - game.config.height/2;
                    this.attack(Phaser.Math.RoundTo(tempX,-1),Phaser.Math.RoundTo(tempY,-1));
                }
            }
        }, this);
    }

    update() {
        // determine walking
        if(this.isMoving && !this.inAttack){
            this.walksound.setVolume(3);
        }else{
            this.walksound.setVolume(0);
        }

        // movement controls will change add directional sprite animations
        if(this.scene.left.isDown && this.scene.up.isDown) {
            this.isMoving = true;
            this.setVelocityX(this.moveSpeed * -0.7);
            this.setVelocityY(this.moveSpeed * -0.7);
            this.setAngle(315);
        } else if(this.scene.left.isDown && this.scene.down.isDown) {
            this.isMoving = true;
            this.setVelocityX(this.moveSpeed * -0.7);
            this.setVelocityY(this.moveSpeed * 0.7);
            this.setAngle(225);
        } else if(this.scene.right.isDown && this.scene.up.isDown) {
            this.isMoving = true;
            this.setVelocityX(this.moveSpeed * 0.7);
            this.setVelocityY(this.moveSpeed * -0.7);
            this.setAngle(45);
        } else if(this.scene.right.isDown && this.scene.down.isDown) {
            this.isMoving = true;
            this.setVelocityX(this.moveSpeed * 0.7);
            this.setVelocityY(this.moveSpeed * 0.7);
            this.setAngle(135);
        } else if(this.scene.left.isDown) {
            this.isMoving = true;
            this.setVelocityX(this.moveSpeed * -1);
            this.setVelocityY(0);
            this.setAngle(270);
        } else if(this.scene.right.isDown) {
            this.isMoving = true;
            this.setVelocityX(this.moveSpeed);
            this.setVelocityY(0);
            this.setAngle(90);
        } else if(this.scene.up.isDown) {
            this.isMoving = true;
            this.setVelocityX(0);
            this.setVelocityY(this.moveSpeed * -1);
            this.setAngle(0);
        } else if(this.scene.down.isDown) {
            this.isMoving = true;
            this.setVelocityX(0);
            this.setVelocityY(this.moveSpeed);
            this.setAngle(180);
        } else {
            this.isMoving = false;
            this.setVelocityX(0);
            this.setVelocityY(0);
            this.movespeed /= 2.5;
        }
        // collide with wall
        this.scene.physics.collide(this,this.scene.walltile);

    }

    attack(inX, inY) {
        if(this.attackOnCooldown){
            console.log('attack on cooldown');
            
        } else {
            console.log('attacked location (' + inX + ',' + inY + ')');
            this.sfxattack.play();
            this.moveSpeed /= 4;
            // find base vector values AKA set origin to 0,0
            let distX = inX - this.x;
            let distY = inY - this.y;
            // use those to determine vector length
            let length = Math.sqrt((distX*distX)+(distY*distY));
            // divide by length to get length to 1; a/a =1
            distX /= length;
            distY /= length;
            // multiply by distance; 1*x = x
            distX *= this.attackRange;
            distY *= this.attackRange;
            // add it to the orginal coords as previous to remove 0,0 origin
            let atkCrdX = this.x + distX;
            let atkCrdY = this.y + distY;

            let curslash = new Slash(this.scene,atkCrdX,atkCrdY);
            // add collision for hits here
            this.scene.enemyGroup.children.entries.forEach(enemy => {
                if(this.scene.physics.collide(curslash,enemy)){
                    enemy.hit();
                }
            });

            // add to group of slashes
            // if full remove oldest
            if(this.scene.slashGroup.isFull())
            {
                this.scene.slashGroup.getFirstAlive().marker.destroy();
                this.scene.slashGroup.remove(this.scene.slashGroup.getFirstAlive(),true,true);
            }
            this.scene.slashGroup.add(curslash).setOrigin(0.5);

            // lock player during attack anim
            this.inAnim(300,this.movespeed/4);
            this.attackOnCooldown = true;
            // free up player at end of attack anim
            this.scene.time.addEvent({
                delay: 300,
                callback: () => {
                    this.attackOnCooldown = false;
                    curslash.setVisible(false);
                    curslash.marker.setVisible(true);
                }
            });
        }
    }

    sheath() {
        if(this.sheathOnCooldown){
            console.log('sheath on cooldown');
        } else {
            console.log('sheathed');
            this.inAnim(2000,0);
            this.moveSpeed = 0;

            let counter = 1000;
            this.scene.slashGroup.children.entries.forEach(element => {
                element.destroyIn(counter);
                counter += 100;
            });

            this.sheathOnCooldown = true;
            this.scene.time.addEvent({
                delay: 10000,
                callback: () => {
                    this.sheathOnCooldown = false;
                }
            });
        }
    }

    inAnim(duration) {
        this.inAttack = true;
        this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.inAttack = false;
                this.moveSpeed = this.baseMoveSpeed;
            }
        });
    }
}