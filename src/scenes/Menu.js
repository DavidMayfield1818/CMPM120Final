class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene");
    }

    preload() {
        // add a load of background scene here
        this.load.audio('slash', 'assets/sword_ex.wav');
    }

    create() {
        let sfxslash = this.sound.add('slash');
        let menuConfig = {
            fontFamily: 'Viner Hand ITC',
            fontSize: '40px',
            backgroundColor: '#000000',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - 64 - 32, 'The Lone Sword', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px';
        menuConfig.color = '#FFFFFF';
        let startButton = this.add.text(game.config.width/2, game.config.height/2 , 'Start', menuConfig).setOrigin(0.5);
        let creditsButton = this.add.text(game.config.width/2, game.config.height/2 + 32, 'Credits', menuConfig).setOrigin(0.5);

        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('loadScene'); 
        });

        startButton.on('pointerover', function () {
            sfxslash.play();
            startButton.setColor('#25e5fa')
        });

        startButton.on('pointerout', function () {
            startButton.setColor('#FFFFFF')
        });

        creditsButton.setInteractive();
        creditsButton.on('pointerdown', () => {
            this.scene.start('creditsScene'); 
        });

        creditsButton.on('pointerover', function () {
            sfxslash.play();
            creditsButton.setColor('#25e5fa')
        });

        creditsButton.on('pointerout', function () {
            creditsButton.setColor('#FFFFFF')
        });
    }
}