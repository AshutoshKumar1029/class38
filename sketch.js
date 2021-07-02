//Create variables here
var dog, happyDog, database, foodS, foodStock;
var mainDog
var foodObj,fedTime, lastFed, feed, addFood;
var gameState, currentTime, milkBottle, milkBottle2
var bedroomImg, gardenImg, washroomImg, livingroomImg;
function preload()
{
	sadDog = loadImage("images/Dog.png")
  happyDog = loadImage("images/happy dog.png")
  bedroomImg = loadImage("images/Bed Room.png")
  gardenImg = loadImage("images/Garden.png")
  washroomImg= loadImage("images/Wash Room.png")
  livingroomImg = loadImage("images/Living Room.png")
milkBottle = loadImage("images/milk.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 800);
  foodObj  = new food()
  mainDog = createSprite(250,500,50,50);
  mainDog.addImage(sadDog)
  mainDog.scale=0.2

  milkBottle2 = createSprite(1000,10,50,50)
  milkBottle2.addImage(milkBottle)
  milkBottle2.scale =1

  foodStock=database.ref('food')
  foodStock.on("value",readStock);

  readState = database.ref('gameState')
  readState.on("value",function(data){
gameState= data.val();
  })
  feedButton = createButton("Feed the dog")
  feedButton.position(40,55)
  feedButton.mousePressed(function(){
    foodS=foodS-1;
    gameState = 1
    database.ref('/').update({
      'gameState':gameState
    })
  });
if (gameState === 1){
  mainDog.addImage(happyDog);
  mainDog.scale = 0.175;
  mainDog.y = 250
}

  addFoodButton = createButton("Add Food");
  addFoodButton.position(142,55);
  addFoodButton.mousePressed(function(){
    foodS=foodS+1;
    gameState = 2
    database.ref('/').update({
      'gameState':gameState
    })
  });

  bathButton = createButton("I want to take Bath")
  bathButton.position(225,55)
  bathButton.mousePressed(function(){
    gameState = 3
    database.ref('/').update({
      'gameState':gameState
    })
  });


  sleepyButton = createButton("I am very Sleepy")
  sleepyButton.position(360,55);
sleepyButton.mousePressed(function(){
  gameState = 4
  database.ref('/').update({
    'gameState':gameState
  })
});

  playButton = createButton("Lets Play!")
  playButton.position(200,85)
  playButton.mousePressed(function(){
    gameState = 5
    database.ref('/').update({
      'gameState':gameState
    })
  });


  parkPlayButton = createButton("Lets Play in Park");
  parkPlayButton.position(280,85)
  parkPlayButton.mousePressed(function(){
    gameState = 6
    database.ref('/').update({
      'gameState':gameState
    })
  });
}


function draw() {
  background(46,139,87);

  foodObj.display();

  fedTime = database.ref('FeedTime');
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
  }
/*if (foodS == 0){
  mainDog.addImage(happyDog)
  milkBottle2.visible = false;
}else{
  mainDog.addImage(sadDog);
  milkBottle2.visible = true;
}*/

}


function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}


  function feedDog() {
    mainDog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      food: foodObj.getFoodStock(),
      FeedTime : hour()
    })
  }



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



