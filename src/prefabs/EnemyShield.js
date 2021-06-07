class EnemyShield extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'enemyShield');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(16);

        // standard variables
        this.moveSpeed = 50;
        this.attackSpeed =150;
        this.detectionRadius = 300;
        this.attackRadius = 80;
        this.stunTime = 30; // aka frames
        this.curStun = 0;
        this.knockback = -10;


        // state variables
        this.idle = true;
        this.engaged = false;
        this.attacking = false;
        this.inStrike = false;
        this.struck = false;
        this.setVisible(false);
        
    }

    update() {
        this.updateState();
        // if idle look for player
        if(this.idle) {
            
        }

        // if in sight
        if(this.engaged && this.scene.attackallow == true && Phaser.Math.Distance.BetweenPoints(this, this.scene.player) <= 300) {
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
            
            let dx = this.x - this.scene.player.x;
            let dy = this.scene.player.y - this.y;
            let rad = Math.atan2(dx,dy);
            let angle = Phaser.Math.RadToDeg(rad);
            angle += 22.5 + 90;
            angle /= 45;
            angle = Phaser.Math.FloorTo(angle,0);
            if(angle == 0) {
                this.play('shieldRight',true);
            } else if (angle == 1) {
                this.play('shieldDownLeft',true);
            } else if (angle == 2) {
                this.play('shieldDown',true);
            } else if (angle == 3) {
                this.play('shieldDownRight',true);
            } else if (angle == 4) {
                this.play('shieldLeft',true);
            } else if (angle == 5) {
                this.play('shieldUpRight',true);
            } else if (angle == 6) {
                this.play('shieldUp',true);
            } else if (angle == 7) {
                this.play('shieldUpLeft',true);
            }
        }

        // begin attack
        if(this.attacking && !this.inStrike && this.scene.attackallow == true) {
            this.struck = false;
            this.inStrike = true;
            this.attack();
        }

        // collision of attack
        if(this.attacking) {
            if(this.scene.physics.overlap(this,this.scene.player) && !this.struck) {
                this.scene.player.damage(1);
                this.struck = true;
            }
        }
    }

    hit(sheathed = false) {
        if(sheathed) {
            this.dead = true;
                this.play('shieldDeath',true);
                this.scene.time.addEvent({
                    delay: 1000,
                    callback: () => {
                        this.destroy();
                    }
                });
        } else {
            let distX = this.scene.player.x - this.x;
            let distY = this.scene.player.y - this.y;
            // use those to determine vector length
            let length = Math.sqrt((distX*distX)+(distY*distY));
            distX /= length;
            distY /= length;
            // multiply by distance; 1*x = x
            distX *= this.knockback;
            distY *= this.knockback;
            this.x += distX;
            this.y += distY;
            this.curStun = this.stunTime;
        }
        
    }

    updateState() {
        let distX = this.scene.player.x - this.x;
        let distY = this.scene.player.y - this.y;
        // use those to determine vector length
        let length = Math.sqrt((distX*distX)+(distY*distY));
        if(this.dead) {
            this.body.setVelocity(0,0);
            this.idle = false;
            this.engaged = false;
            this.attacking = false;
            this.inStrike = false;
            this.setVisible(true);
        } else if(this.curStun > 0) {
            this.curStun -= 1;
            this.body.setVelocity(0,0);
            this.idle = false;
            this.engaged = true;
            this.attacking = false;
            this.inStrike = false;
            this.setVisible(true);
        } else if(length > this.detectionRadius) {
            this.idle = true;
            this.engaged = false;
            this.attacking = false;
            this.inStrike = false;
            this.setVisible(false);
        } else if(length < this.detectionRadius && length > this.attackRadius) {
            this.idle = false;
            this.engaged = true;
            this.attacking = false;
            this.inStrike = false;
            this.setVisible(true);
        } else if(length < this.attackRadius) {
            this.idle = false;
            this.engaged = false;
            this.attacking = true;
            this.setVisible(true);
        }
    }

    attack() {
        this.inStrike = true;
        // find base vector values AKA set origin to 0,0
        let distX = this.scene.player.x - this.x;
        let distY = this.scene.player.y - this.y;
        // use those to determine vector length
        let length = Math.sqrt((distX*distX)+(distY*distY));
        // divide by length to get length to 1; a/a =1
        distX /= length;
        distY /= length;
        // multiply by distance; 1*x = x
        distX *= this.attackSpeed;
        distY *= this.attackSpeed;
        // add it to the orginal coords as previous to remove 0,0 origin
        this.body.setVelocity(distX,distY);
    }
}