class EnemySword extends Phaser.Physics.Arcade.Sprite {
    constructor (scene, x, y) {
        super(scene, x, y, 'enemySword');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.aware = false;
    }

}