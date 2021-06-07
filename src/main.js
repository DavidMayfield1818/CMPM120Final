// Kendrick le
// Longyu Li
// David Mayfield
// The Lone Sword 
// completed on : 06/07/2021

// game configs
let config = {
    type: Phaser.AUTO,
    width: 800,     // subject to change 768
    height: 600,    // subject to change 768
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
    scene: [Menu, Load, Talking, PlayINS, Play, Play2, Play3  ,GameOver, Credits]
}


let game = new Phaser.Game(config);
let keyR, keyESC;
// set UI sizes


// reserve keyboard bindings
let cursors = null;
