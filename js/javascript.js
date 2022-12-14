//to do list
// extra - gambling points, split, actual deck that cards are pulled from (shoe implemetation), side bets

document.getElementById("seperateMSG").style.display = "none";

document.getElementById("winLossMSG").style.display = "none";

document.getElementById("dealerBJ").style.display = "none";

document.getElementById("bjTie").style.display = "none";

let handCards = 2;
let dealerCards = 2;
let x = 1;
let y = 1;
let randomNum = 0;

randomNum = Math.floor(Math.random() * (4 - 1 + 1) + 1);



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
            this.value = 1; 
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


}

let playerCard1 = new card();
let playerCard2 = new card();

let dealerCard1 = new card();
let dealerCard2 = new card();

let dealerHand = [];
let playerHand = [];


//ADDS CARD 1 AND CARD 2 INTO PLAYER AND DEALER HAND
function gameStart(){


    playerHand[0] = playerCard1;
    revealCard(playerCard1, "playerCard1");
    playerHand[1] = playerCard2;
    revealCard(playerCard2, "playerCard2");
    

    dealerHand[0] = dealerCard1;
    revealCard(dealerCard1, "dealerCard1");

    dealerHand[1] = dealerCard2;
    document.getElementById("dealerCard2").src="https://media.istockphoto.com/photos/bicycle-rider-back-playing-card-design-picture-id157772536?k=20&m=157772536&s=170667a&w=0&h=46bM0a2wuwcddiOzNOHTfS9PcUzjXwNTTCy33SrkC_0="
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;


    if(playerHandValue().toString().includes("/")){
        let secondH = playerHandValue().toString();
        const secondHVal = secondH.substring(secondH.indexOf("/") + 2);
        let compVal = parseInt(secondHVal);

        let secondHD = dealerHandValue().toString();
        const secondHValD = secondHD.substring(secondHD.indexOf("/") + 2);
        let compValD = parseInt(secondHValD);


        if(compVal == 21){
            if(compValD == 21){
                document.getElementById("winLossMSG").innerHTML = "Push";
                buttonStop();
                dealerPlay();
            }else{
                document.getElementById("winLossMSG").innerHTML = "Player wins with BlackJack!";
                buttonStop();
                dealerPlay();

            }

            
        }
    }



}

    const standBut = document.getElementById("Stand");
    standBut.addEventListener('click', stand);

    const hitBut = document.getElementById('Hit');
    hitBut.addEventListener('click', hit);// checks for button being hit 

    const doubleBut = document.getElementById("Double");
    doubleBut.addEventListener('click', double);

    const resetBut = document.getElementById("reset");
    resetBut.addEventListener('click', resetGame);

//ACTIVATES BUTTONS 



//ADDS CARD TO PLAYER HAND AND CONSOLE LOGS IT, CHECKS TOO SEE IF THE PLAYERHAND BUSTS OR IF PLAYERHAND = 21 AND REMOVES EVENTLISTENER ON BUTTONS
function hit(){
    playerHand[handCards] = new card; // adds new card to player hand array
    revealCard(playerHand[handCards], `hit${x}img`);
    x = x + 1;
    handCards += 1; // increases the index at playerHand so if player hits again it has proper memory allocated
    if(playerHandValue() > 21){
        buttonStop();
        document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;
        revealCard(dealerCard2, "dealerCard2");
        document.getElementById("seperateMSG").style.display = "block";
        document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue()}`;
        // dealerPlay();
    }else if(playerHandValue() == 21){
        buttonStop();
        stand();
        dealerPlay();
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
    if(playerHandValue() > 21){
        document.getElementById("winLossMSG").innerHTML = "Player loses";
        
        document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;
        dealerPlay();
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
            document.getElementById("winLossMSG").innerHTML = "Player Wins";
            console.log("player wins");

            // dealerPlay();
        }else if(compValP < 21 && compValP < compValD && compValD < 21){
            document.getElementById("winLossMSG").innerHTML = "Player loses";
            console.log("player loses");

            // dealerPlay();
        }else if(compValD > 21 && compValP < 21){
            document.getElementById("winLossMSG").innerHTML = "Player Wins";
            console.log("player wins");

        }
    }
    if(dealerHandValue().toString().includes("/")){
        let dealT = dealerHandValue();
        const afterSl = dealT.substring(dealT.indexOf("/") + 2);
        let dealAce = parseInt(afterSl);

        if(dealAce <= 21){
            if(dealAce > playerHandValue()){
                document.getElementById("winLossMSG").innerHTML = "Player loses!";
                console.log("player loses");


            }else if(dealAce < playerHandValue() && playerHandValue() <= 21){
                document.getElementById("winLossMSG").innerHTML = "Player Wins!";
                console.log("player wins");


            }else if(dealAce == playerHandValue()){
                document.getElementById("winLossMSG").innerHTML = "Push";
                console.log("push");

            }
        }else{
            if(dealerHandValue() > 21){
                document.getElementById("winLossMSG").innerHTML = "Player Wins!";
                console.log("player wins");

            }else if(dealerHandValue() > playerHandValue()){
                document.getElementById("winLossMSG").innerHTML = "Player loses";
                console.log("player loses");

            }else if(dealerHandValue() < playerHandValue()){
                document.getElementById("winLossMSG").innerHTML = "Player Wins";
                console.log("player wins");

            }else if(dealerHandValue() == playerHandValue()){
                document.getElementById("winLossMSG").innerHTML = "Push";

            }
        }
    }

    if(playerHandValue().toString().includes("/")){ 
        let thing = playerHandValue();
        const afterS = thing.substring(thing.indexOf("/") + 2);
        let aceVal = parseInt(afterS);

            if(aceVal > 21){
                // document.getElementById("winLossMSG").innerHTML = "Player loses!";
            }else if(dealerHandValue() > 21 && (aceVal <= 21 || playerHandValue() <= 21)){
                document.getElementById("winLossMSG").innerHTML = "Player wins!";
                console.log("player wins");

            }else if(aceVal < dealerHandValue()){      
                document.getElementById("winLossMSG").innerHTML = "Player loses!";
                console.log("player loses");

            }else if(aceVal > dealerHandValue()){
                document.getElementById("winLossMSG").innerHTML = "Player wins!";
                console.log("player wins");

            }else if(aceVal == dealerHandValue()){
                document.getElementById("winLossMSG").innerHTML = "Push";

            }
    }else{
        if(playerHandValue() > 21){
            document.getElementById("winLossMSG").innerHTML = "Player loses";
            document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;
            console.log("player loses");


        }else if(dealerHandValue() > 21 && playerHandValue() <= 21 ){
            document.getElementById("winLossMSG").innerHTML = "Player wins";
            console.log("player wins");
        }else if(playerHandValue() < dealerHandValue()){
            document.getElementById("winLossMSG").innerHTML = "Player loses";
            console.log("player loses");
        }else if(playerHandValue() > dealerHandValue()){
            document.getElementById("winLossMSG").innerHTML = "Player wins";
            console.log("player loses");
        }else if(playerHandValue() == dealerHandValue()){
            document.getElementById("winLossMSG").innerHTML = "Push";
            console.log("push");

        }else if(playerHandValue() == 21){
            // dealerPlay();
        }else if(playerHandValue() > dealerHandValue()){
            document.getElementById("winLossMSG").innerHTML = "Player wins";
        }
    }
}

function double(){
    hit();
    stand();
    buttonStop();
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
        let checkVal = parseInt(secNum);
        if(playerHandValue().toString().includes("/")){
            let fullRetP = playerHandValue();
            let secNumP = fullRetP.substring(fullRetP.indexOf("/") + 2);
            let checkValP = parseInt(secNumP);
            if(checkVal == 21 && checkValP == 21){
                document.getElementById("bjTie").style.display = "block";
            }
        }



        if(checkVal == 21){
            document.getElementById("dealerBJ").style.display = "block";
        }
        
        while( checkVal <= 16 || fullRet <= 16){
            dealerHand[dealerCards] = new card;
            dealerHandValue();
            document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue().value}`;
            revealCard(dealerHand[dealerCards], `hit${y}Dimg`);
            checkVal = checkVal + dealerHand[dealerCards].value;
            dealerCards += 1;
            y += 1;
            
        }
    }

    y = 1;
    while(dealerHandValue() <= 16){
        
        dealerHand[dealerCards] = new card;
        dealerHandValue();
        document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue().value}`;
        revealCard(dealerHand[dealerCards], `hit${y}Dimg`);
        y += 1;
        dealerCards += 1;
        document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue()}`;
    }
    document.getElementById("winLossMSG").style.display = "block";
    document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue()}`;

    document.getElementById("dealerScore").innerHTML = `Dealer Score: ${dealerHandValue()}`;

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
    }else if(card.value == 10 && randomNum == 1){
        if(card.suit == "spade"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/English_pattern_jack_of_spades.svg/360px-English_pattern_jack_of_spades.svg.png";
        }else if(card.suit == "club"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Jack_of_clubs2.svg/1200px-Jack_of_clubs2.svg.png";
        }else if(card.suit == "heart"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/English_pattern_jack_of_hearts.svg/1200px-English_pattern_jack_of_hearts.svg.png";
        }else if(card.suit == "diamond"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/1/16/English_pattern_jack_of_diamonds.svg";
        }
    }else if(card.value == 10 && randomNum == 2){
        if(card.suit == "spade"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/c/ca/English_pattern_queen_of_spades.svg";
        }else if(card.suit == "club"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/English_pattern_queen_of_clubs.svg/1200px-English_pattern_queen_of_clubs.svg.png";
        }else if(card.suit == "heart"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Queen_of_Hearts_%28Elizabeth_of_York%29.png/640px-Queen_of_Hearts_%28Elizabeth_of_York%29.png";
        }else if(card.suit == "diamond"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/English_pattern_queen_of_diamonds.svg/1200px-English_pattern_queen_of_diamonds.svg.png";
        }
    }else if(card.value == 10 && randomNum == 3){
        if(card.suit == "spade"){
            document.getElementById(id).src = "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/English_pattern_king_of_spades.svg/1200px-English_pattern_king_of_spades.svg.png";
        }else if(card.suit == "club"){
            document.getElementById(id).src = "https://upload.wikimedia.org/wikipedia/commons/2/25/Poker-sm-242-Kc.png";
        }else if(card.suit == "heart"){
            document.getElementById(id).src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/English_pattern_king_of_hearts.svg/1200px-English_pattern_king_of_hearts.svg.png";
        }else if(card.suit == "diamond"){
            document.getElementById(id).src = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/English_pattern_king_of_diamonds.svg/1200px-English_pattern_king_of_diamonds.svg.png";
        }
    }else if(card.value == 10 && randomNum == 4){
        if(card.suit == "spade"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/10_of_spades.svg/1200px-10_of_spades.svg.png";
        }else if(card.suit == "club"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Playing_card_club_10.svg/1200px-Playing_card_club_10.svg.png";
        }else if(card.suit == "heart"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Playing_card_heart_10.svg/1200px-Playing_card_heart_10.svg.png";
        }else if(card.suit == "diamond"){
            document.getElementById(id).src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Playing_card_diamond_10.svg/819px-Playing_card_diamond_10.svg.png";
        }
    }
}

function resetGame(){
    handCards = 2;
    dealerCards = 2;
    x = 1;
    y = 1;

    document.getElementById("seperateMSG").style.display = "none";
    document.getElementById("playerScore").innerHTML = `Player Score: ${playerHandValue()}`;
    document.getElementById("dealerScore").innerHTML = `Dealer Score: `;
    document.getElementById("winLossMSG").style.display = "none";
    document.getElementById("bjTie").style.display = "none";
    document.getElementById("dealerBJ").style.display = "none";

    playerHand = [];
    dealerHand = [];
    playerCard1 = new card();
    playerCard2 = new card();

    dealerCard1 = new card();
    dealerCard2 = new card();
    gamePlay();

    const standBut = document.getElementById("Stand");
    standBut.addEventListener('click', stand);

    const hitBut = document.getElementById('Hit');
    hitBut.addEventListener('click', hit);// checks for button being hit 

    const doubleBut = document.getElementById("Double");
    doubleBut.addEventListener('click', double);

    const resetBut = document.getElementById("reset");
    resetBut.addEventListener('click', resetGame);

    for(let i = 1; i < 7; i++){
        document.getElementById(`hit${i}img`).src = "";
    }

    for(let i = 1; i < 7; i++){
        document.getElementById(`hit${i}Dimg`).src = "";
    }
 

}

//RUNS INITIALIZATION.
gamePlay();

