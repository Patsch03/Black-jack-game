let handCards = 2;
let dealerCards = 2;



//CARD CLASS CREATS A CARD THAT HAS A RANDOM SUIT AND RANDOM VALUE 1-10
class card{
    suit = "null";
    value = 0;
    ace = 0;
// MAKES A CONSTRUCTOR THAT ADDS THE RANDOM SUIT AND VALUES TO THE OBJECT.
    constructor(){
        let suitPick = Math.random();
        if(suitPick <= 0.25){
            this.suit = "spade";
        }else if(suitPick <= 0.50){
            this.suit = "club";
        }else if(suitPick <= 0.75){
            this.suit = "heart";
        }else if(suitPick <= 1){
            this.suit = "diamond";
        }

        let valuePick = Math.random();
        if(valuePick <= 0.0692307692){
            this.value = 1; // ace needs implementation
        }else if(valuePick <= 0.15384615384){
            this.value = 2;
        }else if(valuePick <= 0.23076923076){
            this.value = 3;
        }else if(valuePick <= 0.30769230768){
            this.value = 4;
        }else if(valuePick <= 0.3846153846){
            this.value = 5;
        }else if(valuePick <= 0.46153846152){
            this.value = 6;
        }else if(valuePick <= 0.53846153844){
             this.value = 7;
        }else if(valuePick <= 0.61538461536){
            this.value = 8;
        }else if(valuePick <= 0.69230769228){
            this.value = 9;
        }else if(valuePick <= 1){
            this.value = 10; //includes jack queen king 
        }
        
    }

    getValue(){
        return this.value;
    }
}

let playerCard1 = new card();
let playerCard2 = new card();

let dealerCard1 = new card();
let dealerCard2 = new card();

let dealerHand = [];
let playerHand = [];

//ADDS CARD 1 AND CARD 2 INTO PLAYER AND DEALER HAND
function gameStart(){
    console.log("Player hand");

    playerHand[0] = playerCard1;
    revealCard(playerCard1);
    playerHand[1] = playerCard2;

    dealerHand[0] = dealerCard1;
    dealerHand[1] = dealerCard2;

    console.log(playerCard1.suit + " " + playerCard1.value);
    
    console.log(playerCard2.suit + " " + playerCard2.value);
    console.log(playerHandValue());

    console.log("Dealer hand");
    console.log(dealerCard1.suit + " " + dealerCard1.value);

    console.log(dealerCard2.suit + " " + dealerCard2.value);
    console.log(dealerHandValue());

}

//ACTIVATES BUTTONS 
const standBut = document.getElementById("Stand");
standBut.addEventListener('click', stand);

const hitBut = document.getElementById('Hit');
hitBut.addEventListener('click', hit);// checks for button being hit 

const doubleBut = document.getElementById("Double");
doubleBut.addEventListener('click', double);

//ADDS CARD TO PLAYER HAND AND CONSOLE LOGS IT, CHECKS TOO SEE IF THE PLAYERHAND BUSTS OR IF PLAYERHAND = 21 AND REMOVES EVENTLISTENER ON BUTTONS
function hit(){
    playerHand[handCards] = new card; // adds new card to player hand array
    console.log(playerHand[handCards].suit + " " + playerHand[handCards].value) // shows player card
    console.log("New player hand value" + " " + playerHandValue()); // prints new value with new card added
    handCards += 1; // increases the index at playerHand so if player hits again it has proper memory allocated
    if(playerHandValue() > 21){
        buttonStop();
        console.log("player busts"); //temporary
    }else if(playerHandValue() == 21){
        stand();
    }
    
}

//LOGIC FOR STOPPING BUTTONS
function buttonStop(){
    const hitButR = document.getElementById("Hit");
    hitButR.removeEventListener('click', hit);
    
    const standButR = document.getElementById("Stand");
    standButR.removeEventListener('click', stand);

    const doubleButR = document.getElementById("Double");
    doubleButR.removeEventListener('click', double);

    
    
}



//STAND LOGIC, ALSO STARTS DEALER "AI"
function stand(){
    buttonStop();
    // checkWin();
    if(playerHandValue() > 21){
        console.log("Player loses");
    }else{
        dealerPlay();
    }
}

//CHECKS TO SEE WHO WON
function checkWin(){

    if(dealerHandValue().toString().includes("/") && playerHandValue().toString().includes("/")){
        let dealHand2 = dealerHandValue();
        const dealHand2Val = dealHand2.substring(dealHand2.indexOf("/") + 2);
        let compValD = parseInt(dealHand2Val);

        let playHand2 = playerHandValue();
        const playHand2Val = playHand2.substring(playHand2.indexOf("/") + 2);
        let compValP = parseInt(playHand2Val);

        if(compValP < 21 && compValP > compValD){
            console.log("Player wins");
        }else if(compValP < 21 && compValP < compValD){
            console.log("Dealer wins");
        }else if(compValP == compValD){
            console.log("push");
        }
    }
    if(dealerHandValue().toString().includes("/")){
        let dealT = dealerHandValue();
        const afterSl = dealT.substring(dealT.indexOf("/") + 2);
        let dealAce = parseInt(afterSl);
        console.log(dealAce);
        if(dealAce <= 21 && dealAce > 16){
            if(dealAce > playerHandValue()){
                console.log("dealer wins");
            }else if(dealAce < playerHandValue()){
                console.log("player wins");
            }else if(dealAce == playerHandValue()){
                console.log("push");
            }
        }else{
            if(dealerHandValue() > 21){
                console.log("Dealer busts");
            }else if(dealerHandValue() > playerHandValue()){
                console.log("dealer wins");
            }else if(dealerHandValue() < playerHandValue()){
                console.log("player wins");
            }else if(dealerHandValue() == playerHandValue()){
                console.log("push");
            }
        }
    }

    if(playerHandValue().toString().includes("/")){ 
        let thing = playerHandValue();
        const afterS = thing.substring(thing.indexOf("/") + 2);
        let aceVal = parseInt(afterS);
        if(aceVal > 21){
            console.log("Player loses!")
        }else if(dealerHandValue() > 21){
            console.log("Dealer busts, player wins!");           
        }else if((21 - aceVal) < (21 - dealerHandValue())){      
            console.log("Player wins!");                         
        }else if((21 - aceVal) > (21 - dealerHandValue())){
            console.log("Dealer won!");
        }else if(aceVal == dealerHandValue()){
            console.log("Push");
        }
    }else{
        if(playerHandValue() > 21){
            console.log("Player loses!")
        }else if(dealerHandValue() > 21){
            console.log("Dealer busts, player wins!");
        }else if((21 - playerHandValue()) < (21 - dealerHandValue())){
            console.log("Player wins!");
        }else if((21 - playerHandValue()) > (21 - dealerHandValue())){
            console.log("Dealer won!");
        }else if(playerHandValue() == dealerHandValue()){
            console.log("Push");
        }
    }


    
    
}

function double(){
    hit();
    stand();
    buttonStop();
}

//RETURNS THE VALUE OF THE PLAYERS CARDS
function playerHandValue(){
    let sum = 0;
    let sumAce = 0;
    let bool = false;
    for(let i = 0; i < playerHand.length; i++){
        if(playerHand[i].value == 1){
            sumAce += 11;
            sum += 1;
        }else{
            sum += playerHand[i].value;
            sumAce += playerHand[i].value;
        }
        
    }
//LOGIC FOR ACE IMPLEMENTATION
    for(let i = 0; i < playerHand.length; i++){
        if(playerHand[i].value == 1){
            bool = true;
        }
    }
    if(bool){
        if(sumAce > 21){
            return sum;
        }
        return sum + " / " + sumAce;
    }else{
        return sum;
    }
    
}

//RETURNS THE VALUE OF THE DEALERS HAND
function dealerHandValue(){
    let sum = 0;
    let sumAce = 0;
    let bool = false;
    for(let i = 0; i < dealerHand.length; i++){
        if(dealerHand[i].value == 1){
            sumAce += 11;
            sum += 1;
        }else{
            sum += dealerHand[i].value;
            sumAce += dealerHand[i].value;
        }
        
    }
//DEALER ACE IMPLEMENTATION
    for(let i = 0; i < dealerHand.length; i++){
        if(dealerHand[i].value == 1){
            bool = true;
        }
    }
    if(bool){
        if(sumAce > 21){
            return sum;
        }
        return sum + " / " + sumAce;
    }else{
        return sum;
    }

}

//LOGIC FOR DEALER "AI"
function dealerPlay(){
    if(dealerHandValue().toString().includes("/")){
        let fullRet = dealerHandValue();
        let secNum = fullRet.substring(fullRet.indexOf("/") + 2); 
        while(parseInt(secNum) <= 16){
            dealerHand[dealerCards] = new card;
            console.log(dealerHand[dealerCards].suit + " " + dealerHand[dealerCards].value);
            dealerHandValue();
            console.log("Dealer hand value " + dealerHandValue());
            secNum = secNum + dealerHand[dealerCards].value;
            dealerCards += 1;
        }
    }
    while(dealerHandValue() <= 16){
        dealerHand[dealerCards] = new card;
        console.log(dealerHand[dealerCards].suit + " " + dealerHand[dealerCards].value);
        dealerHandValue();
        console.log("Dealer hand value " + dealerHandValue());
        dealerCards += 1;
    }
    checkWin();
}

//INTIIALIZES FIRST TWO CARDS
function gamePlay(){
    gameStart();
    

}

function revealCard(card){
    if(card.value == 1 && card.suit == "spade"){
        document.getElementById("test").src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Aceofspades.svg/1200px-Aceofspades.svg.png";
    }
}

//RUNS INITIALIZATION.
gamePlay();


