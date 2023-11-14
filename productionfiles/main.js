//This file will be sent to blackjack.html (index) as a module that will run the game in the web browser

import Phaser from './static/phaser.js'

//import the game scene into our main program
import Game from './static/Game.js'

export default new Phaser . Game ( {
    type: Phaser . AUTO,
    width: 720,
    height: 480,
    
    // set the scene to be Game.js
    scene: Game,
    //set the physics system to arcade to use the accelerateTo function (This will come in handy when animating dealing cards from the deck)
    physics:{
        default: 'arcade'
    }
})