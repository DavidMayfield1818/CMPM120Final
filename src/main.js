// Kendrick le
// Longyu Li
// David Mayfield
// Alien 
// completed on : ##/##/####

// game configs
let config = {
    type: Phaser.AUTO,
    width: 768,     // subject to change
    height: 768,    // subject to change
    fps: {
        min: 5,
        target: 60,
        forceSetTimeOut: true
    },

    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: { y: 0}
        }
    },
    scene: [Menu, Load, Play]
}


let game = new Phaser.Game(config);
let keyR, keyESC;
// set UI sizes


// reserve keyboard bindings

