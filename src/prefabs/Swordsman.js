class Swordsman extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'swordsman');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCircle(16);
        this.maxhp = 5;
        this.hp = this.maxhp;
        this.cd = 100;
        this.walvol = true;
        // attack anim booleans
        this.inAttack = false;
        this.attackOnCooldown = false;
        this.sheathOnCooldown = false;

        // distance values
        this.attackRange = 40;
        this.baseMoveSpeed = 200;
        this.moveSpeed = this.baseMoveSpeed;
        
        // movement sfx variables
        this.isMoving = false;
        this.sfxattack = scene.sound.add('sword_out')
        this.walksound = scene.sound.add('walk_effect', {volume: 0})
        this.hitsound = scene.sound.add("hit",{volume:0.5,});
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
        if(this.isMoving && !this.inAttack && this.walvol == true){
            this.walksound.setVolume(3);

        }else {
            this.walksound.setVolume(0);
        }
    
        // movement controls will change add directional sprite animations
        if(!this.inAttack) {
            if(this.scene.left.isDown && this.scene.up.isDown) {
                this.isMoving = true;
                this.setVelocityX(this.moveSpeed * -0.7);
                this.setVelocityY(this.moveSpeed * -0.7);
                this.play('swordsmanUpLeft',true);
            } else if(this.scene.left.isDown && this.scene.down.isDown) {
                this.isMoving = true;
                this.setVelocityX(this.moveSpeed * -0.7);
                this.setVelocityY(this.moveSpeed * 0.7);
                this.play('swordsmanDownLeft',true);
            } else if(this.scene.right.isDown && this.scene.up.isDown) {
                this.isMoving = true;
                this.setVelocityX(this.moveSpeed * 0.7);
                this.setVelocityY(this.moveSpeed * -0.7);
                this.play('swordsmanUpRight',true);
            } else if(this.scene.right.isDown && this.scene.down.isDown) {
                this.isMoving = true;
                this.setVelocityX(this.moveSpeed * 0.7);
                this.setVelocityY(this.moveSpeed * 0.7);
                this.play('swordsmanDownRight',true);
            } else if(this.scene.left.isDown) {
                this.isMoving = true;
                this.setVelocityX(this.moveSpeed * -1);
                this.setVelocityY(0);
                this.play('swordsmanLeft',true);
            } else if(this.scene.right.isDown) {
                this.isMoving = true;
                this.setVelocityX(this.moveSpeed);
                this.setVelocityY(0);
                this.play('swordsmanRight',true);
            } else if(this.scene.up.isDown) {
                this.isMoving = true;
                this.setVelocityX(0);
                this.setVelocityY(this.moveSpeed * -1);
                this.play('swordsmanUp',true);
            } else if(this.scene.down.isDown) {
                this.isMoving = true;
                this.setVelocityX(0);
                this.setVelocityY(this.moveSpeed);
                this.play('swordsmanDown',true);
            } else {
                this.isMoving = false;
                this.setVelocityX(0);
                this.setVelocityY(0);
                this.play('swordsmanIdle',true);
            }
        }
        // collide with wall
        this.scene.physics.collide(this,this.scene.walltile);

    }

    attack(inX, inY) {
        if(!this.attackOnCooldown){
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
                if(this.scene.physics.overlap(curslash,enemy)){
                    enemy.hit(false);
                }
            });
            this.scene.arrowGroup.children.entries.forEach(arrow => {
                if(this.scene.physics.overlap(curslash,arrow)){
                    arrow.hit(false);
                }
            });

            let vec = new Phaser.Math.Vector2(distX,distY);
            let angle = Phaser.Math.RadToDeg(vec.angle());
            angle += 22.5;
            angle /= 45;
            angle = Phaser.Math.FloorTo(angle,0);
            if(angle == 0) {
                this.play('swordsmanRightAttack',true);
            } else if (angle == 1) {
                this.play('swordsmanDownLeftAttack',true);
            } else if (angle == 2) {
                this.play('swordsmanDownAttack',true);
            } else if (angle == 3) {
                this.play('swordsmanDownRightAttack',true);
            } else if (angle == 4) {
                this.play('swordsmanLeftAttack',true);
            } else if (angle == 5) {
                this.play('swordsmanUpRightAttack',true);
            } else if (angle == 6) {
                this.play('swordsmanUpAttack',true);
            } else if (angle == 7) {
                this.play('swordsmanUpLeftAttack',true);
            }

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
        if(!this.sheathOnCooldown){
            this.inAnim(2000,0);
            this.moveSpeed = 0;
            this.play('swordsmanSheath',true);
            this.setVelocityX(0);
            this.setVelocityY(0);

            let counter = 0;
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
            this.cd = 0;
            this.scene.time.addEvent({
                delay: 100,
                repeat: 100,
                callback: () => {
                    this.cd += 1;
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

    damage(amount) {
        this.hitsound.play();
        this.hp -= amount;
    }
}