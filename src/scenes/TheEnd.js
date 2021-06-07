class TheEnd extends Phaser.Scene {
    constructor () {
        super("theEndScene");
    }

    preload() {
        // add a load of background scene here

    }

    create() {
        let menuConfigTitle = {
            fontFamily: 'Viner Hand ITC',
            fontSize: '40px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfig = {
            fontFamily: 'Viner Hand ITC',
            fontSize: '22px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        let menuConfigBold = {
            fontFamily: 'Viner Hand ITC',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }


        let h = 64;
        let increment = 32;
        let space = 16;
        this.add.text(game.config.width/2, h, 'The End', menuConfigTitle).setOrigin(0.5);


        h += increment + space;
        this.add.text(game.config.width/2, h, 'The boss ran away.', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'He is sitting in another identical tower.', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Better find him before its too late...', menuConfig).setOrigin(0.5);




        h += increment + space;
        let menuButton = this.add.text(game.config.width/2, h, 'Credits', menuConfig).setOrigin(0.5);

        menuButton.setInteractive();
        menuButton.on('pointerdown', () => {
            this.scene.start('creditsScene'); 
        });

        menuButton.on('pointerover', function () {
            menuButton.setColor('#25e5fa')
        });

        menuButton.on('pointerout', function () {
            menuButton.setColor('#FFFFFF')
        });
    }
}