


let handCards = 2;
let dealerCards = 2;
let x = 1;
let y = 1;




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
    revealCard(playerCard1, "playerCard1");
    playerHand[1] = playerCard2;
    revealCard(playerCard2, "playerCard2");


    dealerHand[0] = dealerCard1;
    revealCard(dealerCard1, "dealerCard1");

    dealerHand[1] = dealerCard2;
    document.getElementById("dealerCard2").src="https://media.istockphoto.com/photos/bicycle-rider-back-playing-card-design-picture-id157772536?k=20&m=157772536&s=170667a&w=0&h=46bM0a2wuwcddiOzNOHTfS9PcUzjXwNTTCy33SrkC_0="


    console.log(playerCard1.suit + " " + playerCard1.value);
    
    console.log(playerCard2.suit + " " + playerCard2.value);
    console.log(playerHandValue());

    console.log("Dealer hand");
    console.log(dealerCard1.suit + " " + dealerCard1.value);

    console.log(dealerCard2.suit + " " + dealerCard2.value);
    console.log(dealerHandValue());

    document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;
    document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerCard1.value}`;

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
    revealCard(playerHand[handCards], `hit${x}img`);
    x = x + 1;
    handCards += 1; // increases the index at playerHand so if player hits again it has proper memory allocated
    if(playerHandValue() > 21){
        buttonStop();
        console.log("player busts"); //temporary
    }else if(playerHandValue() == 21){
        stand();
    }
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;


    
    
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
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;
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
    buttonStop(); // fix
    dealerPlay();
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;

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
    revealCard(dealerCard2, "dealerCard2");
    document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue()}`;

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
        revealCard(dealerHand[dealerCards], `hit${y}Dimg`);
        y += 1;
        dealerCards += 1;
        document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue()}`;
    }
    checkWin();
}

//INTIIALIZES FIRST TWO CARDS
function gamePlay(){
    gameStart();
}
//NEEDS CONDENSING, NEED TO ADD J,Q,K LOGIC
function revealCard(card, id){
    if(card.value == 1 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Aceofspades.svg/1200px-Aceofspades.svg.png";
    }else if(card.value == 1 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/3/38/Poker-sm-241-Ac.png";
    }else if(card.value == 1 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Poker-sm-221-Ah.png";
    }else if(card.value == 1 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/b/be/Poker-sm-231-Ad.png";
    }else if(card.value == 2 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/2_of_spades.svg/706px-2_of_spades.svg.png";
    }else if(card.value == 2 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/2_of_clubs.svg/1200px-2_of_clubs.svg.png";
    }else if(card.value == 2 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/2_of_hearts.svg/1200px-2_of_hearts.svg.png";
    }else if(card.value == 2 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Playing_card_diamond_2.svg/1200px-Playing_card_diamond_2.svg.png";
    }else if(card.value == 3 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_spade_3.svg/1200px-Playing_card_spade_3.svg.png";
    }else if(card.value == 3 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Playing_card_club_3.svg/819px-Playing_card_club_3.svg.png";
    }else if(card.value == 3 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Playing_card_heart_3.svg/819px-Playing_card_heart_3.svg.png";
    }else if(card.value == 3 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Playing_card_diamond_3.svg/1200px-Playing_card_diamond_3.svg.png";
    }else if(card.value == 4 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Playing_card_spade_4.svg/1200px-Playing_card_spade_4.svg.png";
    }else if(card.value == 4 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Playing_card_club_4.svg/819px-Playing_card_club_4.svg.png";
    }else if(card.value == 4 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Playing_card_heart_4.svg/1200px-Playing_card_heart_4.svg.png";
    }else if(card.value == 4 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/4_of_diamonds.svg/1200px-4_of_diamonds.svg.png";
    }else if(card.value == 5 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Playing_card_spade_5.svg/1200px-Playing_card_spade_5.svg.png";
    }else if(card.value == 5 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_club_5.svg/1200px-Playing_card_club_5.svg.png";
    }else if(card.value == 5 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Playing_card_heart_5.svg/1200px-Playing_card_heart_5.svg.png";
    }else if(card.value == 5 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Playing_card_diamond_5.svg/1200px-Playing_card_diamond_5.svg.png";
    }else if(card.value == 6 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Playing_card_spade_6.svg/1200px-Playing_card_spade_6.svg.png";
    }else if(card.value == 6 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Playing_card_club_6.svg/1200px-Playing_card_club_6.svg.png";
    }else if(card.value == 6 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Playing_card_heart_6.svg/1200px-Playing_card_heart_6.svg.png";
    }else if(card.value == 6 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Playing_card_diamond_6.svg/819px-Playing_card_diamond_6.svg.png";
    }else if(card.value == 7 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Playing_card_spade_7.svg/1200px-Playing_card_spade_7.svg.png";
    }else if(card.value == 7 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Playing_card_club_7.svg/1200px-Playing_card_club_7.svg.png";
    }else if(card.value == 7 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/7_of_hearts.svg/1200px-7_of_hearts.svg.png";
    }else if(card.value == 7 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/7_of_diamonds.svg/1200px-7_of_diamonds.svg.png";
    }else if(card.value == 8 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/8_of_spades.svg/1200px-8_of_spades.svg.png";
    }else if(card.value == 8 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Playing_card_club_8.svg/1200px-Playing_card_club_8.svg.png";
    }else if(card.value == 8 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_8.svg/1200px-Playing_card_heart_8.svg.png";
    }else if(card.value == 8 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Playing_card_diamond_8.svg/1200px-Playing_card_diamond_8.svg.png";
    }else if(card.value == 9 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Playing_card_spade_9.svg/1200px-Playing_card_spade_9.svg.png";
    }else if(card.value == 9 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Playing_card_club_9.svg/819px-Playing_card_club_9.svg.png";
    }else if(card.value == 9 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Playing_card_heart_9.svg/1638px-Playing_card_heart_9.svg.png";
    }else if(card.value == 9 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Playing_card_diamond_9.svg/1200px-Playing_card_diamond_9.svg.png";
    }else if(card.value == 10 && card.suit == "spade"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/10_of_spades.svg/1200px-10_of_spades.svg.png";
    }else if(card.value == 10 && card.suit == "club"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Playing_card_club_10.svg/1200px-Playing_card_club_10.svg.png";
    }else if(card.value == 10 && card.suit == "heart"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Playing_card_heart_10.svg/1200px-Playing_card_heart_10.svg.png";
    }else if(card.value == 10 && card.suit == "diamond"){
        document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Playing_card_diamond_10.svg/819px-Playing_card_diamond_10.svg.png";
    }
}

//RUNS INITIALIZATION.
gamePlay();


