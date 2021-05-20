class EnemySword extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'enemySword');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCircle(16);

        // standard variables
        this.moveSpeed = 150;
        this.detectionRadius = 200;

        // state variables
        this.idle = true;
        this.engaged = false;
        this.attacking = false;
        this.visable = false;
        
    }

    update() {    
        // if idle look for player
        if(this.idle) {
            let distX = this.scene.player.x - this.x;
            let distY = this.scene.player.y - this.y;
            // use those to determine vector length
            let length = Math.sqrt((distX*distX)+(distY*distY));
            if(length < this.detectionRadius) {
                this.idle = false;
                this.engaged = true;
                this.visable = false;
            }
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
    }

    hit() {
        this.destroy();
    }
}