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

washroom(){
    image(washroomImg,250,400)
}

livingroom(){
    image(livingroomImg,250,400);
}
display(){
}

}