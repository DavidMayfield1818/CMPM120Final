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