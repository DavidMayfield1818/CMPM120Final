class GameOver extends Phaser.Scene {
    constructor () {
        super("gameOverScene");
    }

    preload() {
        // add a load of background scene here

    }

    create() {
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

        this.add.text(game.config.width/2, game.config.height/2 - 64 - 30, 'You Died', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px';
        menuConfig.color = '#FFFFFF';
        let menuButton = this.add.text(game.config.width/2, game.config.height/2 , 'Back to menu', menuConfig).setOrigin(0.5);

        menuButton.setInteractive();
        menuButton.on('pointerdown', () => {
            this.scene.start('menuScene'); 
        });

        menuButton.on('pointerover', function () {
            menuButton.setColor('#25e5fa')
        });

        menuButton.on('pointerout', function () {
            menuButton.setColor('#FFFFFF')
        });
    }
}