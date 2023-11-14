//This file is used for the actual programming of the game

//Import phaser library
import Phaser from './static/phaser.js'

//Export the game to be usable by other files
export default class Game extends Phaser. Scene
{

    // include the cursor to be used to interact with buttons
    
    
    // Create an array for the objects of the cards dealt
    cardsDealt = [];
    playerCardsDealt = [];
    dealerCardsDealt = [];
    

    playersCredits = -1;
    betCredits = 0;

    // Create an array for the values of the cards dealt
    cardsDealtValues = [];
    playerCardsDealtValues = [];
    dealerCardsDealtValues = [];
    
    // Create a variable to check if theres any special play
    specialPlay = 0;
    
    // Create a variable to hold the total of the players main hand
    totalMain = 0;

    totalDealer = 0;
    
    // Create a variable to hold the total of the players second hand in the case that they split
    //totalLeft = 0;

    gameStart = 0;
    startClicked = false;

    turnClicked = false;
    playersTurn = true;

    playerPlayed = 0;
    // // Create a variable to hold whether the player chooses to split a pair or not
    // isSplit = false;
    
    // // Create arrays to hold the hands as separate scores
    // // objects
    // playerCardsDealtLeft = [];
    // playerCardsDealtRight = [];
    // //values
    // playerCardsDealtValuesLeft = [];
    // playerCardsDealtValuesRight = [];

    
    constructor(){
        // User super class to inherit attributes from Phaser
        super( 'game')
    }

    // Load assets before starting the scene
    preload(){
        //load the background
        this.load.image('background', 'assets/cardTable.png')
        this.load.image('deck', 'assets/card_back.png')

        

        //preload the spritemap
        this.load.spritesheet('cardTilemap', 'assets/cardsLarge_tilemap.png', { frameWidth: 64, frameHeight: 64, spacing: 1 });

        // preload the button images
        this.load.image('hitButton', 'assets/button_hit.png')
        this.load.image('standButton', 'assets/button_stand.png')
        this.load.image('keepPairButton', 'assets/button_keep-pair.png')
        this.load.image('splitPairButton', 'assets/button_split-pair.png')
        this.load.image('playAgainButton', 'assets/button_play-again.png')
        this.load.image('playButton', 'assets/button_play.png')
    }


    // Create the assets that we have loaded in preload()
    create(){
        // add the background to the scene
        //NOTE: The x & y coordinates correspond to the center of the image, but you can add .setOrigin(0, 0) instead
        this.add.image(360, 240, 'background')
        this.add.image(360, 240, 'deck')
            .setScale(1.25);

        // Set the style for our score text
        const style = { color: '#FFFFFF', fontSize: 24}
        // Create the text for the players right hand score
        this.totalScoreMain = this.add.text(500, 350, 'Total: 0', style);
        this.creditText = this.add.text(35, 350, 'Your Credits: ', style);
        // Create the score text for the second hand, but hide it until the player splits
        // 30, 350 x and y for totalscore for second hand
        // this.totalScoreLeft = this.add.text(-100, -100, 'Total: 0', style)

        // Create our hit buttons and hide it off screen
        this.hitButtonMain = this.add.image(-100, -100, 'hitButton');
        this.hitButtonMain.setInteractive()
            .on('pointerdown', () => this.hit())
            .setScale(.5);

        // Create the buttons for standing
        this.standButtonMain = this.add.image(-100, -100, 'standButton');
        this.standButtonMain.setInteractive()
               .on('pointerdown', () => this.stand())
               .setScale(.5);

        // Create the buttons for standing
        this.startButton = this.add.image(360, 240, 'playButton');
        this.startButton.setInteractive()
               .on('pointerdown', () => this.flipIsClicked())
        // // Create the button for standing on the left hand
        // this.standButtonLeft = this.add.image(-100, -100, 'standButton');
        // this.standButtonLeft.setInteractive()
        //        .on('pointerdown', () => this.standLeft())
        //        .setScale(.5);
    }

    flipIsClicked(){
        console.log("clicked");
        if(this.startClicked == false){
            this.startClicked = true;
        }
    }

    //Function for dealing the cards initially
    deal(){
        
        

        // Create arrays with the x & y values to move the cards to
        this.cardPositionsX = [296, 414, 412, 296];
        this.cardPositionsY = [416, 90 , 416, 90];

        // for loop to iterate through the 3 cards being dealt face-up
        for (let i = 0; i < 4; i++) {
            // create a variable for selecting a random card for the cards
            this.cardsDealt[i] = Phaser.Math.Between(0, 9);
            
            // Set the player cards and dealer cards
           switch(i){
            case 0:
                this.playerCardsDealtValues[0] = this.cardsDealt[0];
            case 1: 
                this.dealerCardsDealtValues[0] = this.cardsDealt[1];
            case 2:
                this.playerCardsDealtValues[1] = this.cardsDealt[2];
            case 3:
                this.dealerCardsDealtValues[1] = this.cardsDealt[3];
           }


            //Since we are converting out values to objects, we need to maintain those maintain those values
            this.cardsDealtValues[i] = this.cardsDealt[i];

            // spawn the card with the corresponding card image
            //if the card has a value of 10, spawn it as either 10 or a face
            if(this.cardsDealt[i] == 9){
                // add an image to the variable
                this.cardsDealt[i] = this.physics.add.image(this.cardPositionsX[i], this.cardPositionsY[i], 'cardTilemap', Phaser.Math.Between(9, 12))
                    .setScale(1.25);
                // move the card from the deck to the correct position
                    
                    //Following code is for dealing animation:
                
                        //this.physics.moveTo(this.cardsDealt[i],this.cardPositionsX[i], this.cardPositionsY[i], 20, 1000);
                        
                        // game.time.events.add(1000, function () {
                        //     this.physics.cardsDealt[i].body.speed = 0;
                        //  }, this);
                }

            else{
                // add an image to the variable
                this.cardsDealt[i] = this.physics.add.image(this.cardPositionsX[i], this.cardPositionsY[i], 'cardTilemap', this.cardsDealt[i])
                    .setScale(1.25);
                // move the card from the deck to the correct position
                //this.physics.moveTo(this.cardsDealt[i],this.cardPositionsX[i], this.cardPositionsY[i], 20, 2500);
            }
            
        }
          

        // If i have time for animation:
            // this.physics.moveTo(this.cardsDealt[3], this.cardPositionsX[3], this.cardPositionsY[3], 20, 2500);

        // Once the cards have been dealt, update the the totalText value to show the sum of the cards
        // Create a variable to hold the sum
    
        this.cardSum = this.playerCardsDealtValues[0] + this.playerCardsDealtValues[1];
        // update the global total variable
        this.totalMain = this.cardSum + 2;

        this.dealerCardSum = this.dealerCardsDealtValues[0] + this.dealerCardsDealtValues[1];
        // update the global total variable
        this.totalDealer = this.dealerCardSum + 2;

        // Update the text to show the score of the initial deal
        this.updateTotalText();

        // Add the dealtCards[] objects to the playerDealtCards and dealerDealtCard arrays
        //(I should probaly replace this with a for-loop at some point lol)
        this.playerCardsDealt[0] = this.cardsDealt[0];
        this.playerCardsDealt[1] = this.cardsDealt[2];
        this.dealerCardsDealt[0] = this.cardsDealt[1];  
        this.dealerCardsDealt[1] = this.cardsDealt[3];

        

        // return the array with the values of the dealt card values
        return this.cardsDealtValues;
    }
    // function for updating the players score on screen
    updateTotalText()
    {

       
            // Check each element to see if the player has an ace
       
            //If there is an ace:
            if(this.playerCardsDealtValues.includes(0) )
            {
                // if the ace doesn't bring the score over 21 (factor in that we currently have the ace set to 0, so we have to add 10, plus an additional 2 since our values are all one short (for ease of use with indexes))
                if(this.totalMain + 10 < 21){
                    // Print the two possible total options
                    this.textTotal = `Total: ${this.totalMain} or ${this.totalMain + 10}`;
                    this.totalScoreMain.text = this.textTotal;
                    
                }
                else if(this.totalMain + 10 == 21){
                    // Print the two possible total options
                    this.textTotal = `Total: ${this.totalMain + 10}`;
                    this.totalScoreMain.text = this.textTotal;
                    
                }
                else{
                    // Print the total options
                    this.textTotal = `Total: ${this.totalMain}`;
                    this.totalScoreMain.text = this.textTotal;
                
                }
                }
            else if(this.totalMain == 21){
                // Print the two possible total options
                this.textTotal = `Total: ${this.totalMain}`;
                this.totalScoreMain.text = this.textTotal;
            }
        
             // if there isnt an ace
            else{
                this.textTotal = `Total: ${this.totalMain}`;
                    this.totalScoreMain.text = this.textTotal;            
            }
        // }
    }
    
    startGame(){

        if(this.gameStart == 0){
            this.gameStart = 1;
            this.startButton.x = -100;
            this.startButton.y = -100;
            for(let i = 0; i < this.cardsDealt.length; i++){
                this.cardsDealt[i].destroy();
            }
            for(let i = 0; i < this.playerCardsDealt.length; i++){
                this.playerCardsDealt[i].destroy();
            }
            for(let i = 0; i < this.dealerCardsDealt.length; i++){
                this.dealerCardsDealt[i].destroy();
            }
            this.readyToContinue = false;
            this.readyToContinue = this.mainGame();
            console.log("isthisreadytocontinue " + this.isreadytocontinue);
            
            if(this.readyToContinue)
            { 
                 return 0;
            }
            
    }
        
    }

    getStartVar(){
        return this.gameStart;
    }

    endGame(){
        this.gameStart = 0;
        this.gamePlaying = 0;
    }
    
    // Function for if the player chooses to stand on main hand
    
    stand(){
        // hide the buttons
        this.hitButtonMain.x = -100;
        this.hitButtonMain.y = -100;
        this.standButtonMain.x = -100;
        this.standButtonMain.y = -100;
        this.playersTurn = false;
    }

    // standLeft(){

    // }
    // // Function for if the player chooses to stand on left hand
    // holdLeft(){
    // }

    // function for if the player busts
    bust(){
        // set the game to be inactive
        this.gameActive = 0;
        // set the return credits to 0
        this.betCredits = 0;
        // destroy the buttons
        this.hitButtonMain.destroy();
        this.standButtonMain.destroy();

        // destroy the cards
        for(let i = 0; i < this.cardsDealt.length; i++){
            this.cardsDealt[i].destroy();
        
        }

        for(let i = 0; i < this.dealerCardsDealt.length; i++){
            console.log(this.dealerCardsDealt[i]);
            this.dealerCardsDealt[i].destroy();
        }

        for(let i = 0; i < this.playerCardsDealt.length; i++){
            this.playerCardsDealt[i].destroy();
        }

        console.log("you lost :)");
        this.creditText = `Your credits: ${this.playersCredits}`;
        
        
    }

checkBust(){
    if(this.totalMain >21){
        this.bust();
    }
}

win(winCreditMultiplier){
    this.gameActive = 0;

    this.hitButtonMain.destroy();
    this.standButtonMain.destroy();

    // remove cards from table
    for(let i = 0; i < this.cardsDealt.length; i++){
        this.cardsDealt[i].destroy(); 
    }

    for(let i = 0; i < this.dealerCardsDealt.length; i++){
        console.log(this.dealerCardsDealt[i]);
        this.dealerCardsDealt[i].destroy();
    }

    for(let i = 0; i < this.playerCardsDealt.length; i++){
        this.playerCardsDealt[i].destroy();
    }
    //prompt user to start a new game
   
    //end the game
    console.log("you won :)");
    
    this.playersCredits += this.betCredits * winCreditMultiplier;
    this.creditText = `Your credits: ${this.playersCredits}`;
    this.gameActive = 0;
    return;
}

checkWin(){
    //if the players total is greater than the dealer's total
    if(!this.playersTurn){
        this.creditMultiplier = 1.5;
        if(this.totalMain > this.totalDealer){
            this.win(this.creditMultiplier);
        }
    }
}
  
// Function to check if theres any special plays
    checkSpecialPlay(){
        //0 = none, 1 = Natural blackjack, 2 = double natural blackjack, 3 = splitting pairs
        this.specialPlayOption = 0;
        // Natural blackjack:
            //Check if the player has a natural blackjack (10/face + ace)
            if(this.playerCardsDealtValues[0] + this.playerCardsDealtValues[1] == 21){
                //If the player has a natural, check if the dealer does
                if(this.dealerCardsDealtValues[0] + this.dealerCardsDealtValues[1] == 21){
                    // If both the player and dealer have naturals, return 2 to end the game
                    this.specialPlayOption = 2;
                }
                // if only the player has naturals, return 1 to get the win
                else{
                    this.specialPlayOption = 1;
                }
            }
            // if the dealer has a natural blackjack and the player doesnt
            else if(this.dealerCardsDealtValues[0] + this.dealerCardsDealtValues[1] == 21){
                this.specialPlayOption = 3;
            }
        // Pairs
            // Check if starting cards are a pair
            // if(this.playerCardsDealtValues[0] == this.playerCardsDealtValues[1]){
            //     this.specialPlayOption = 4;
            // }
            else{
                this.specialPlayOption = 0;
            }

            this.handleSpecialPlay(this.specialPlayOption);
    }
    
    // Function to hand the special play options
    handleSpecialPlay(specialPlayValue){
        switch(specialPlayValue){
        // If the player has natural blackjack and the dealer doesn't
            case 1: 
                this.gameActive = 0;
                // end the game and give the player 1.5x their bet
                this.win(1.5);
        // If both the player and the dealer have natural blackjacks
            case 2:
                // End the game and return the bet to the player
                this.gameActive = 0;
                this.win(1);
                
        // If the dealer has a natural blackjack and the player doesn't
            case 3:
                // end the game and take the players bet
                this.gameActive = 0;
                this.betCredits = 0;
                this.bust();

        }
    }

    // split(splitResponse){
    //     this.splitButton.x = -100;
    //     this.splitButton.y = -100;
    //     this.keepButton.x = -100;
    //     this.keepButton.y = -100;
    //     // If the player chose to split
    //     if(splitResponse == 1){
    //         // set the isSplit variable to True
    //         this.isSplit = true;
            
    //         //Split the cards into the respective right and left hands
    //         this.playerCardsDealtValuesLeft[0] = this.playerCardsDealtValues[0];
    //         this.playerCardsDealtValuesRight[0] = this.playerCardsDealtValues[1];
    //         this.playerCardsDealtLeft[0] = this.cardsDealt[0];
    //         this.playerCardsDealtRight[0] = this.cardsDealt[1];

    //         // set the new totalMain and totalLeft variables
    //         this.totalMain = this.playerCardsDealtValuesRight[0] + 1;
    //         this.totalLeft = this.playerCardsDealtValuesLeft[0] + 1;

    //         //Set the text for the totalLeftScore
    //         this.textTotal = `Total: ${this.totalLeft}`;
    //         this.totalScoreLeft.text = this.textTotal;
    //         // show the total text for the left side
    //         this.totalScoreLeft.x = 30;
    //         this.totalScoreLeft.y = 350;

    //         // Display the hit button on left side
    //         this.hitButtonLeft.x = 50;
    //         this.hitButtonLeft.y = 320;

    //         // Update both score texts
    //         this.updateTotalText(0);
    //         this.updateTotalText(1);
    //         return;
    //     }
    //     // If the player chose not to split, destroy the buttons and play the hand normally
    //     else{  
    //         return;
    //     }
    // }
    
    playersMove(playersMoveCheck){
        if(playersMoveCheck){
            console.log("Players move() loaded");
            if(this.playersTurn){
                // if the total is under 21, show the hit button
                console.log("totalmain " + this.totalMain);
                if(this.totalMain < 21 && this.playerCardsDealt.length < 5){
                
                    this.hitButtonMain.x = 520;
                    this.hitButtonMain.y = 320;

                    // show the hold button
                    this.standButtonMain.x = 620;
                    this.standButtonMain.y = 320;
                }
            }
        // }
        if(!this.playersTurn){
                return;
        }
    }
}

    hit(){   
        // Hide the buttons so they are only visible during the players next turn
                if(this.totalMain >= 21 || this.playerCardsDealt > 5){
                    this.hitButtonMain.destroy();
             
                    this.standButtonMain.destroy();;
                    
                }
                else{
            //if(!this.isSplit){
            // Generate a new card for the player with a random value
                    this.hitCardValue = Phaser.Math.Between(0, 9);
                    this.playerCardsDealtValues[this.playerCardsDealtValues.length] = this.hitCardValue;
                    // Spawn the new card off screen
                    this.playerCardsDealt[this.playerCardsDealt.length] = this.physics.add.image(-100, -100, 'cardTilemap', this.hitCardValue)
                    .setScale(1.25); 

                    // Set the x and y of the new card to be to the right of the the rightmost card
                    this.playerCardsDealt[this.playerCardsDealt.length -1].x = (this.playerCardsDealt[this.playerCardsDealt.length - 2].x) + 64; 
                    this.playerCardsDealt[this.playerCardsDealt.length -1].y = this.playerCardsDealt[this.playerCardsDealt.length - 2].y;
                    
                    // Update the player's total (add an extra one since we generate card values starting at 0)
                    this.totalMain += this.hitCardValue;
                    this.totalMain += 1;
                    // update the total text
                    this.updateTotalText();
                    if(this.totalMain == 21){
                        this.checkWin(1.5);
                    }
                }
            //}
            this.checkWin(1.5);
        this.checkBust();
        this.playersTurn = false;
        
        this.endPlayersTurn();
    }

    // function for the dealer to hit
    dealerHit(){
        this.hitCardValue = Phaser.Math.Between(0, 9);
                this.dealerCardsDealtValues[this.dealerCardsDealtValues.length] = this.hitCardValue;
                // Spawn the new card off screen
                this.dealerCardsDealt[this.dealerCardsDealt.length] = this.physics.add.image(-100, -100, 'cardTilemap', this.hitCardValue)
                .setScale(1.25); 

                // Set the x and y of the new card to be to the right of the the rightmost card
                this.dealerCardsDealt[this.dealerCardsDealt.length -1].x = (this.dealerCardsDealt[this.dealerCardsDealt.length - 2].x) + 64; 
                this.dealerCardsDealt[this.dealerCardsDealt.length -1].y = this.dealerCardsDealt[this.dealerCardsDealt.length - 2].y;
                
                // Update the player's total (add an extra one since we generate card values starting at 0)
                this.totalDealer += this.hitCardValue;
                this.totalDealer += 1;
            if(this.totalDealer > 21){
                this.win(1.5);
            }
    }

    // Function to run the dealers turn
    dealersTurn()
    {
        // If the dealers hand is 17 or over, it must stand
        if(this.totalDealer > 16){
            return;
        }
        
        // If the dealers total is 16 or under, they must hit
        else if(this.totalDealer <= 16){
            this.dealerHit();
        }
        
        // if the dealers hand is over 21, end game
        if(this.totalDealer > 21){
            // end the game, give the player 1.5 times their bet
            this.win(1.5);
        }
    }

    // Flip the dealers facedown card
    flipDealersCard(){
        this.cardsDealt[3] = this.physics.add.image(this.cardPositionsX[3], this.cardPositionsY[3], 'cardTilemap', this.cardsDealtValues[3])
            .setScale(1.25);
    }

    enterCredits(){
        this.playersCredits = prompt("How many Credits do you have?");
        console.log(this.playersCredits);
        return this.playersCredits;
    }

    enterBet(){
        this.betCredits = prompt("How many credits would you like to bet?");
        console.log(this.betCredits)
        return this.betCredits;
    }

   
    updateCreditsText(){
        console.log(this.playersCredits);
        this.creditText = `Total: ${this.playersCredits}`;
    }

    getStartVar(){
        this.testActive = this.gameStart;
        return this.testActive;
    }

    getStartClicked(){
        this.testClick = this.startClicked;
        return this.testClick;
    }

    getPlayersTurn(){
        this.isItPlayersTurn = this.playersTurn;
        return this.isItPlayersTurn;
    }
    // check player credits
    getPlayerCredits(){
        console.log(this.playersCredits);
        return this.playersCredits;
    }
    endPlayersTurn(){
        this.playersTurn = false;
    }

    subtractBet(betEntered){
        console.log(this.playersCredits);
        this.playersCredits -= betEntered;
        console.log(this.playersCredits);
        this.creditText = `Your Credits: ${this.playersCredits}`;
    }
    
    // Function for the main game cycle
    mainGame(){
        this.isItPlayersTurn = this.getPlayersTurn();
        //deal the initial cards
        this.currentCreds = this.getPlayerCredits();
        if(this.currentCreds == -1){
            this.enterCredits();
        }
        this.placedBet = this.enterBet();
        this.subtractBet(this.placedBet);
        this.updateCreditsText();
        this.deal();

        // check if theres any special plays (we can end the game early if there is)
        
        this.checkSpecialPlay();
        
        this.isItPlayersTurn = this.getPlayersTurn();
        console.log(this.isItPlayersTurn);
        this.flipDealersCard();
        //players first turn
        this.playersMove( this.isItPlayersTurn);
        
        this.checkBust();
        this.checkWin();
        this.isItPlayersTurn = this.getPlayersTurn();
        console.log(this.isItPlayersTurn);
        this.endPlayersTurn();
       
        this.dealersTurn();
        
        
        this.turnClicked = false;
        return;
        // this.startGame();
    }
    
    // Code that gets called every frame
    update(){
        // Create a variable as an end condition for our game
        //rungame = false;
        this.isActive = this.getStartVar();
        this.isClicked = this.getStartClicked();
 
        if(this.isActive == 0 && this.isClicked == true){
            this.startGame();
            this.isActive = 1;
        }

    }
}