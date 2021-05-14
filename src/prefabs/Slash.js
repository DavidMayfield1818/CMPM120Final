class Slash extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'slash');
        scene.add.existing(this);
        scene.physics.add.existing(this);
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