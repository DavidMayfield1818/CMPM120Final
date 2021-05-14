class Slash extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'slash');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        let dx = this.x - this.scene.player.x;
        let dy = this.scene.player.y - this.y;
        let rad = Math.atan2(dx,dy);
        this.setRotation(rad);
    }

    destroyIn(duration){
        this.scene.time.addEvent({
            delay: duration-200,
            callback: () => {
                this.setVisible(true);
            }
        });
        this.scene.time.addEvent({
            delay: duration,
            callback: () => {
                this.destroy();
            }
        });
    }
}