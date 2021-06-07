class EnemyBow extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'enemyBow');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(16);

        // standard variables
        this.moveSpeed = 75;
        this.detectionRadius = 500;
        this.attackRadius = 400;
        this.runawayRadius = 300;
        this.cooldownMax = 120;  // frames
        this.cooldown = 0;
        this.offCooldown = true;
        

        // state variables
        this.idle = true;
        this.engaged = false;
        this.running = false;
        this.safe = false;
        this.setVisible(false);
        
    }

    update() {
        this.updateState();
        // if idle look for player
        if(this.idle) {
            this.play('bowIdle',true);
        }
        // if in sight
        if(this.engaged && this.scene.attackallow == true) {
            // travel towards player
            // find base vector values AKA set origin to 0,0
            let distX = this.scene.player.x - this.x;
            let distY = this.scene.player.y - this.y;
            // use those to determine vector length
            let length = Math.sqrt((distX*distX)+(distY*distY));
            // divide by length to get length to 1; a/a =1
            distX /= length;
            distY /= length;
            // multiply by distance; 1*x = x
            distX *= this.moveSpeed;
            distY *= this.moveSpeed;
            // add it to the orginal coords as previous to remove 0,0 origin
            this.body.setVelocity(distX,distY);
            
            this.angle = Phaser.Math.Between(this.x,this.y,this.scene.player.x,this.scene.player.y)+180;
        }

        // running state
        if(this.running) {
            // travel away from the player
            // find base vector values AKA set origin to 0,0
            let distX = this.scene.player.x - this.x;
            let distY = this.scene.player.y - this.y;
            // use those to determine vector length
            let length = Math.sqrt((distX*distX)+(distY*distY));
            // divide by length to get length to 1; a/a =1
            distX /= length;
            distY /= length;
            // multiply by distance; 1*x = x
            distX *= this.moveSpeed * -1;
            distY *= this.moveSpeed * -1;
            // add it to the orginal coords as previous to remove 0,0 origin
            this.body.setVelocity(distX,distY);
            
            let dx = this.x - this.scene.player.x;
            let dy = this.scene.player.y - this.y;
            let rad = Math.atan2(dx,dy);
            let angle = Phaser.Math.RadToDeg(rad);
            angle += 22.5 + 90;
            angle /= 45;
            angle = Phaser.Math.FloorTo(angle,0);
            if(angle == 0) {
                this.play('bowRight',true);
            } else if (angle == 1) {
                this.play('bowDownLeft',true);
            } else if (angle == 2) {
                this.play('bowDown',true);
            } else if (angle == 3) {
                this.play('bowDownRight',true);
            } else if (angle == 4) {
                this.play('bowLeft',true);
            } else if (angle == 5) {
                this.play('bowUpRight',true);
            } else if (angle == 6) {
                this.play('bowUp',true);
            } else if (angle == 7) {
                this.play('bowUpLeft',true);
            }


            if(this.offCooldown && this.scene.attackallow == true && Phaser.Math.Distance.BetweenPoints(this, this.scene.player) <= 500){
                this.attack();
            }
        }

        if(this.safe){
            this.body.setVelocity(0,0);
            if(this.offCooldown && this.scene.attackallow == true && Phaser.Math.Distance.BetweenPoints(this, this.scene.player) <= 500){

                this.attack();
            }
        }
        
    }

    hit(sheathed = false) {
        this.dead = true;
        this.play('bowDeath',true);
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.destroy();
            }
        });
    }

    updateState() {
        let distX = this.scene.player.x - this.x;
        let distY = this.scene.player.y - this.y;
        // use those to determine vector length
        let length = Math.sqrt((distX*distX)+(distY*distY));
        if(this.cooldown == 0) {
            this.offCooldown = true;
        }else {
            this.cooldown -= 1;
        }
        if(length > this.detectionRadius) {
            this.idle = true;
            this.engaged = false;
            this.running = false;
            this.safe = false;
            this.setVisible(false);
        } else if(length < this.detectionRadius && length > this.attackRadius) {
            this.idle = false;
            this.engaged = true;
            this.running = false;
            this.safe = false;
            this.setVisible(true);
        } else if(length < this.attackRadius) {
            if(length < this.runawayRadius) {
                this.idle = false;
                this.engaged = false;
                this.running = true;
                this.safe = false;
                this.setVisible(true);
            } else {
                this.idle = false;
                this.engaged = false;
                this.running = false;
                this.safe = true;
                this.setVisible(true);
            }
        }
    }

    attack() {
        this.offCooldown = false;
        this.cooldown = this.cooldownMax;
        this.inStrike = true;
        // find base vector values AKA set origin to 0,0
        let distX = this.scene.player.x - this.x;
        let distY = this.scene.player.y - this.y;
        // use those to determine vector length
        let length = Math.sqrt((distX*distX)+(distY*distY));
        // divide by length to get length to 1; a/a =1
        distX /= length;
        distY /= length;
        // spawn an arrow
        let curShot = new Arrow(this.scene,this.x,this.y,distX,distY);
        this.scene.arrowGroup.add(curShot).setOrigin(0.5);
        let vec = new Phaser.Math.Vector2(distX,distY);
        let angle = Phaser.Math.RadToDeg(vec.angle());
        angle /= 180;
        angle = Phaser.Math.FloorTo(angle,0);
        if(angle == 0) {
            this.play('bowRightAttack',true);
        } else if (angle == 1) {
            this.play('bowLeftAttack',true);
        }
    }
}