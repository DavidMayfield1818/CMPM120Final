class Credits extends Phaser.Scene {
    constructor () {
        super("creditsScene");
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
        this.add.text(game.config.width/2, h, 'Credits', menuConfigTitle).setOrigin(0.5);


        h += increment + space;
        this.add.text(game.config.width/2, h, 'David Mayfield', menuConfigBold).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Player control', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Enemy AI', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Gameplay Direction', menuConfig).setOrigin(0.5);
        h += increment + space;
        this.add.text(game.config.width/2, h, 'Longyu Li', menuConfigBold).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Map Generation', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Map Interaction', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Dialogue Implementaion', menuConfig).setOrigin(0.5);
        h += increment + space;
        this.add.text(game.config.width/2, h, 'Kendrick Le', menuConfigBold).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Sprites', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Animation', menuConfig).setOrigin(0.5);
        h += increment;
        this.add.text(game.config.width/2, h, 'Tiles', menuConfig).setOrigin(0.5);



        h += increment + space;
        let menuButton = this.add.text(game.config.width/2, h, 'Back to menu', menuConfig).setOrigin(0.5);

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