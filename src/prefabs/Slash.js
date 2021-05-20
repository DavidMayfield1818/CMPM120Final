class Slash extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'slash');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        let dx = this.x - this.scene.player.x;
        let dy = this.scene.player.y - this.y;
        let rad = Math.atan2(dx,dy);
        this.setCircle(16);
        this.setRotation(rad);
        this.sfxslash = scene.sound.add('slash')
        this.marker = this.scene.add.sprite(this.x,this.y,'marker').setOrigin(0.5);
        this.marker.setVisible(false);
    }

    destroyIn(duration){
        this.scene.time.addEvent({
            delay: duration-200,
            callback: () => {
                this.setVisible(true);
                this.marker.destroy();
                this.scene.enemyGroup.children.entries.forEach(enemy => {
                    if(this.scene.physics.collide(this,enemy)){
                        enemy.hit();
                    }
                });
                this.setAngle(Phaser.Math.Between(0,360));
            }
        });
        this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.destroy();
                this.sfxslash.play()
            }
        });
    }
}