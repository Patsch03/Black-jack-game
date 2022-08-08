let handCards = 2;

class card{
    suit = "null";
    value =  0;

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
        if(valuePick <= 0.07692307692){
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


function gameStart(){
    console.log("Player hand");

    playerHand[0] = playerCard1;
    playerHand[1] = playerCard2;

    dealerHand[0] = dealerCard1;
    dealerHand[1] = dealerCard2;

    console.log(playerCard1.suit + " " + playerCard1.value);
    
    console.log(playerCard2.suit + " " + playerCard2.value);

    console.log("Dealer hand");
    console.log(dealerCard1.suit + " " + dealerCard1.value);

    console.log(dealerCard2.suit + " " + dealerCard2.value);

}

const hitBut = document.getElementById('Hitti');
hitBut.addEventListener('click', hit);// checks for button being hit 





function hit(){
    playerHand[handCards] = new card; // adds new card to player hand array
    console.log(playerHand[handCards].suit + " " + playerHand[handCards].value) // shows player card
    console.log("New player hand value" + " " + playerHandValue()); // prints new value with new card added
    handCards += 1; // increases the index at playerHand so if player hits again it has proper memory allocated
    if(playerHandValue() > 21){
        buttonStop();
        console.log("player busts"); //temporary
    }
}

function buttonStop(){
    if(playerHandValue() > 21){
        const hitButR = document.getElementById("Hitti");
        hitButR.removeEventListener('click', hit);
    }    
}

function stand(){

}

function double(){

}

function playerHandValue(){
    let sum = 0;
    for(let i = 0; i < playerHand.length; i++){
        sum += playerHand[i].value;
    }

    return sum;
}

function dealerHandValue(){
    let sum = 0;
    for(let i = 0; i < dealerHand.length; i++){
        sum += dealerHand[i].value;
    }

    return sum;
}


gameStart();

console.log(playerHand);

console.log(playerHandValue());

console.log(dealerHandValue());




