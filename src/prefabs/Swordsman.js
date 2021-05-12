class Swordsman extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'swordsman');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setImmovable(true);
        this.setCircle(16);
        this.inAttack = false;
        this.attackOnCooldown = false;
        this.sheathOnCooldown = false;
        this.attackRange = 25;

        // mouse input
        this.scene.input.mouse.disableContextMenu();
        this.scene.input.on('pointerdown', function(pointer){
            if(!this.inAttack) {
                if(pointer.rightButtonDown()){
                    this.sheath();
                } else {
                    this.attack(Phaser.Math.RoundTo(pointer.x,-1),Phaser.Math.RoundTo(pointer.y,-1));
                }
            }
        }, this);
    }

    update() {
        if(this.scene.left.isDown && this.scene.up.isDown) {
            this.setVelocityX(-354);
            this.setVelocityY(-354);
        } else if(this.scene.left.isDown && this.scene.down.isDown) {
            this.setVelocityX(-354);
            this.setVelocityY(354);
        } else if(this.scene.right.isDown && this.scene.up.isDown) {
            this.setVelocityX(354);
            this.setVelocityY(-354);
        } else if(this.scene.right.isDown && this.scene.down.isDown) {
            this.setVelocityX(354);
            this.setVelocityY(354);
        } else if(this.scene.left.isDown) {
            this.setVelocityX(-500);
            this.setVelocityY(0);
        } else if(this.scene.right.isDown) {
            this.setVelocityX(500);
            this.setVelocityY(0);
        } else if(this.scene.up.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(-500);
        } else if(this.scene.down.isDown) {
            this.setVelocityX(0);
            this.setVelocityY(500);
        } else {
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
    }

    attack(inX, inY) {
        if(this.attackOnCooldown){
            console.log('attack on cooldown');
        } else {
            console.log('attacked location (' + inX + ',' + inY + ')');
            
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

            this.inAnim(300);
            this.attackOnCooldown = true;
            this.scene.time.addEvent({
                delay: 300,
                callback: () => {
                    this.attackOnCooldown = false;
                }
            });
        }
    }

    sheath() {
        if(this.sheathOnCooldown){
            console.log('sheath on cooldown');
        } else {
            console.log('sheathed');
            this.inAnim(2000);
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
            }
        });
    }
}