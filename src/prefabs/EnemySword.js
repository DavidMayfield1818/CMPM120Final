class EnemySword extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'enemySword');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(16);

        // standard variables
        this.moveSpeed = 150;
        this.attackSpeed =200;
        this.detectionRadius = 300;
        this.attackRadius = 100;

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
        if(this.engaged) {
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
        }

        // begin attack
        if(this.attacking && !this.inStrike) {
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
        this.destroy();
    }

    updateState() {
        let distX = this.scene.player.x - this.x;
        let distY = this.scene.player.y - this.y;
        // use those to determine vector length
        let length = Math.sqrt((distX*distX)+(distY*distY));
        if(length > this.detectionRadius) {
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