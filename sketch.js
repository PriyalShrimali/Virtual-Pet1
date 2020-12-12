//Create variables here
var dog,happyDog,database,foodS,foodStock;
var Dog1, DogHappy;
var gameState;
var foodType = null;
var happiness = 0;

function preload()
{
  //load images here
  Dog1 = loadImage("images/dogImg.png");
  DogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);

  gameState = "select";

  dog = createSprite(250,250,50,50);
  dog.addImage(Dog1);
  dog.scale=0.2;
  database = firebase.database();

  foodStock = database.ref('food');
  foodStock.on("value", readStock);
  
}


function draw() {  
  background(46, 139, 87);

    if(keyWentDown(UP_ARROW) ){
      writeStock(foodS);
     // happiness +=random(0, 5);
      dog.addImage(DogHappy);
    }

    
      textSize(33);
      fill("red");
      text("Food Remaining : "+foodS, 90, 50);
      text("Happiness Level : " + round(happiness), 90, 100)
    
  
  //  if(foodS === 0){
      //textSize(30);
      //fill("black");
      //text("Press 'R' to Refill the Stock", 50, 450);
    //}

  drawSprites();
}

function readStock(data){
  foodS =data.val();

}

function writeStock(x){

  if(x<=0){
    x = 0; 
  }
  else{
    x -=1;
  }

  database.ref('/').update({
    food:x
  })
}

function keyPressed(){
  console.log("sd");
  if(keyCode === 32){
    console.log("vc");
    database.ref('/').update({
      food: 20
    })
  }
}