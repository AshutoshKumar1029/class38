//Create variables here
var dog, happyDog, database, foodS, foodStock;
var mainDog
var foodObj,fedTime, lastFed, feed, addFood;
var gameState, currentTime, milkBottle2,milkBottle
var bedroomImg, gardenImg, washroomImg, livingroomImg;
function preload()
{
	sadDog = loadImage("images/Dog.png")
  happyDog = loadImage("images/happy dog.png")
  bedroomImg = loadImage("images/Bed Room.png")
  gardenImg = loadImage("images/Garden.png")
  washroomImg= loadImage("images/Wash Room.png")
  livingroomImg = loadImage("images/Living Room.png")
milkBottle = loadImage("images/Milk.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 800);
  foodObj  = new food()
  mainDog = createSprite(250,500,50,50);
  mainDog.addImage(sadDog)
  mainDog.scale=0.2

  milkBottle2 = createSprite(100,700);
  milkBottle2.addImage(milkBottle)
  milkBottle2.scale = 0.1
  foodStock=database.ref('food')
  foodStock.on("value",readStock);
  

  readState = database.ref('gameState')
  readState.on("value",function(data){
gameState= data.val();
  })
 

 
}


function draw() {
  background(46,139,87);

  foodObj.display();

  /*fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data){
    lastFed = data.val();
  })

  fill(255,255,254);
  textSize(15);
  if (lastFed >= 12) {
    text("Last Feed: " + lastFed %12 + "PM", 200, 30);
  }
  else if(lastFed == 0) {
    text("Last Feed: 12AM ", 200, 30);
  }
  else {
    text("Last Feed:  " + lastFed + "AM", 200, 30);
  }*/
if(foodS == 0){
  mainDog.addImage(happyDog);
  milkBottle2.visible = false;
}else{
  mainDog.addImage(sadDog);
  milkBottle2.visible= true;
}
if(gameState===1){
  mainDog.addImage(happyDog);
  mainDog.scale=0.175;
  mainDog.y=400;
}
if(gameState===2){
  mainDog.addImage(sadDog)
  mainDog.scale = 0.175;
  milkBottle2.visible= false;
  mainDog.y=400;
}
bathButton = createButton("I want to take Bath")
  bathButton.position(580,125)
  bathButton.mousePressed(function(){
    gameState = 3
    database.ref('/').update({
      'gameState':gameState
    })
  });
if(gameState===3){
 mainDog.addImage(washroomImg);
  mainDog.scale = 1;
  milkBottle2.visible=false;
}

  sleepyButton = createButton("I am very Sleepy")
  sleepyButton.position(710,125);
sleepyButton.mousePressed(function(){
  gameState = 4
  database.ref('/').update({
    'gameState':gameState
  })
});
if(gameState===4){
  mainDog.addImage(bedroomImg);
  mainDog.scale=1;
  milkBottle2.visible=false;
}

  playButton = createButton("Lets Play!")
  playButton.position(500,160)
  playButton.mousePressed(function(){
    gameState = 5
    database.ref('/').update({
      'gameState':gameState
    })
  });
if(gameState===5){
  mainDog.addImage(livingroomImg);
  mainDog.scale=1;
  milkBottle2.visible=false;
}

  parkPlayButton = createButton("Lets Play in Park");
  parkPlayButton.position(585,160)
  parkPlayButton.mousePressed(function(){
    gameState = 6
    database.ref('/').update({
      'gameState':gameState
    })
  });
  if(gameState===6){
    mainDog.y=400;
    mainDog.addImage(gardenImg);
    mainDog.scale=1;
    milkBottle2.visible= false;
  }
  drawSprites();


}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


  /*function feedDog() {
    if (foodS>0){
    mainDog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }
  }*/



function addFoods(){
  if(foodS<20){
  foodS++;
  database.ref('/').update({
    food: foodS
  
  })
}
}
function update(state){
  database.ref('/').update({
    gameState:state
  })
}



