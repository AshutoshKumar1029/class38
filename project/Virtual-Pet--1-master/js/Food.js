class food {
constructor(){
    this.foodStock = 0
    this.image = loadImage("images/Milk.png")
    this.lastFed;
}
updateFoodStock(foodStock){
this.foodStock= foodStock
}
getFedTime(lastFed){
    this.lastFed= lastFed;
}
deductFood(){
    if (this.foodStock>0){
        this.foodStock=this.foodStock-1;
    }

}
getFoodStock(){
    return this.foodStock
}

bedroom(){
    image(bedroomImg,250,400);
}

garden(){
    image(gardenImg,250,400);
}
text1(){
    fill("black")
    textSize(20)
    text("food: "+foodS,300,700)
}
washroom(){
    image(washroomImg,250,400)
}
display(){
    /*var x=100, y=150;
    imageMode(CENTER);
    image(this.image,720,220, 70,70);     
    
    if(this.foodStock !=0){
        for (var i=0; i<this.foodStock; i++){
            if(i%10==0){
                x=120
                y=y+50;
            }
            image(this.image,x,y, 50,50);
            x=x+30;
        }
    }*/
     
    var feedButton = createButton("Feed the dog")
    feedButton.position(400,125)
    feedButton.mousePressed(function(){
       
        
        if(foodS>0){
        foodS = foodS-1;
        }
        gameState = 1;
        database.ref('/').update({
            'gameState':gameState,
            'food':foodS
        })
    });

    var addFood = createButton("Add Food");
    addFood.position(500,125);
    addFood.mousePressed(function(){
        if (foodS<20){
        foodS= foodS+1;
        }
        gameState=2;
        database.ref('/').update({
            'gameState':gameState,
            'food': foodS
        })
    });
}

}