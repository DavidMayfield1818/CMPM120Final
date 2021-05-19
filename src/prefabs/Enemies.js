
class Enemies extends Phaser.Physics.Arcade.Sprite
{
	//direction = direction.RIGHT
	constructor(scene, x, y)
	{
		super(scene, x, y, 'enemypng');
		
		//scene.physic.word.on(PHaser.physic.Arcade.Events.TILE_COLLIDE, this.enemycollision)
        scene.add.existing(this);
        scene.physics.add.existing(this);

		this.setBounce(1,1)
		this.setCollideWorldBounds(true)
		this.direct = 1;
	}

	
}