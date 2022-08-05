class card{
    suit = "null";
    value =  0;
    color = "red";

    randomSuit(){
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
    }

    randomValue(){
        let valuePick = Math.random();
        if(valuePick <= 0.07692307692){
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
        }else if(valuePick <=1){
            this.value = 10; //includes jack queen king 
        }
    }
}



let dealerHand = [];
let playerHand = [];


function gameStart(){
    let playerCard1 = new card;
    let playerCard2 = new card;

    let dealerCard1 = new card;
    let dealerCard2 = new card;

    playerCard1.randomSuit();
    playerCard2.randomSuit();
    playerCard1.randomValue();
    playerCard2.randomValue();

    dealerCard1.randomSuit();
    dealerCard2.randomSuit();
    dealerCard1.randomValue();
    dealerCard2.randomValue();

    console.log(playerCard1.suit);
    console.log(playerCard1.value);

    console.log(playerCard2.suit);
    console.log(playerCard2.value);

    console.log(dealerCard1.suit);
    console.log(dealerCard1.value);

    console.log(dealerCard2.suit);
    console.log(dealerCard2.value);


}




function randomColor(){

}

gameStart();

console.log("hello");