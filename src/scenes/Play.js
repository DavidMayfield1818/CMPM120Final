class Play extends Phaser.Scene {
    constructor () {
        super("playScene");
    }

    create() {
        this.left = this.input.keyboard.addKey('A');
        this.right = this.input.keyboard.addKey('D');
        this.up = this.input.keyboard.addKey('W');
        this.down = this.input.keyboard.addKey('S');

        this.player = new Swordsman (this,game.config.width/2,game.config.height/2).setOrigin(0.5);
        //background
        this.backGround = this.add.tileSprite(0,0,512,768,'Background').setOrigin(0,0);
        // cooldowns
        this.cooldownConfig = {
            fontFamily: 'Courier',
            fontSize: '20px',
            color: '#FFFFFF',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        this.attackText = this.add.text(10,10,'Attack:' + this.player.attackOnCooldown, this.cooldownConfig);
        this.sheathText = this.add.text(10,30,'Sheath:' + this.player.sheathOnCooldown, this.cooldownConfig);

        this.cameras.main.startFollow(this.player);
    }

    update() {
        this.player.update();
        this.attackText.text = 'Attack:' + this.player.attackOnCooldown;
        this.sheathText.text = 'Sheath:' + this.player.sheathOnCooldown;
    }
}