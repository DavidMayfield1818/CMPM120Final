class Menu extends Phaser.Scene {
    constructor () {
        super("menuScene");
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

        this.add.text(game.config.width/2, game.config.height/2 - 64 - 30, 'Project Blade', menuConfig).setOrigin(0.5);
        menuConfig.fontSize = '26px';
        menuConfig.color = '#FFFFFF';
        let startButton = this.add.text(game.config.width/2, game.config.height/2 , 'Start', menuConfig).setOrigin(0.5);

        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('loadScene'); 
        });

        startButton.on('pointerover', function () {
            startButton.setColor('#25e5fa')
        });

        startButton.on('pointerout', function () {
            startButton.setColor('#FFFFFF')
        });
    }
}