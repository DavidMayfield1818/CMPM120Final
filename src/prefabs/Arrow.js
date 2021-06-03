class Arrow extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y, dirX, dirY) {
        super(scene, x, y, 'slash');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        let dx = this.x - this.scene.player.x;
        let dy = this.scene.player.y - this.y;
        let rad = Math.atan2(dx,dy);
        this.setCircle(16);
        this.setRotation(rad+Math.PI);
        this.speed = 250;
        this.xSpeed = dirX*this.speed;
        this.ySpeed = dirY*this.speed;
        this.body.setVelocity(this.xSpeed,this.ySpeed);
        this.dead = false;
    }

    update() {
        if(this.scene.physics.collide(this,this.scene.player)&&!this.dead) {
            this.scene.player.hp -= 1;
            this.destroy();
        } else if(this.scene.physics.collide(this,this.scene.walltile)) {
            this.timedDeath();
        } else {
            if(!this.dead){
                this.body.setVelocity(this.xSpeed,this.ySpeed);
            }
        }
    }

    timedDeath() {
        this.body.setVelocity(0,0);
        this.dead = true;
        this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.destroy();
            }
        });
    }

    hit(sheathed = false) {
        if(!this.dead) {
            this.destroy();
        }
    }
}