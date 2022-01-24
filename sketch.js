var oceanImg, ocean;
var coinImg, coin, coinGroup;
var climberImg, climber, climbersGroup;
var frog, frogImg;
var gameOverImg;
var gameState = "play"
var score = 0;
var play = 1 ;
var end = 0;

function preload(){
  oceanImg = loadImage("water.jpg");
  coinImg = loadImage("coin.png");
  climberImg = loadImage("seaweed.png");
  frogImg = loadImage("frog.png");
  gameOverImg = loadImage("gameOver.png");

}

function setup(){
  createCanvas(580,450);
  
  ocean = createSprite(300,300);
  ocean.addImage("ocean",oceanImg);
  
  //climberImg.frameDelay = 4;
  //coinImg.frameDelay = 4;
  //spawnCoin().frameDelay = 4;

  frog = createSprite(200,250,50,50);
  frog.scale = 0.1;
  frog.addImage("frog", frogImg);  
  
  //create coin group and climber group
  coinGroup = new Group();
  climbersGroup = new Group(); 

 // climber.setCollider("rectangle",0,0,400,400);
  //climber.debug = "true"; 
}

function draw(){
  background(0);
  drawSprites();
  fill("red");
  textSize(25);
  text("Score = " + score, 400, 30);
  
  
  
  if (gameState === "play") {

    
    ocean.setVelocity(0, -4);   
    
    spawnCoin();

    if(keyDown("space") && frog.position.y > 60){
      frog.position.y -= 15;
    }

    if(keyDown("left") && frog.isTouching(climbersGroup)){
      frog.position.x -= 5;
      frog.position.y = 0;
    }
    
    if(keyDown("right") && frog.isTouching(climbersGroup)){
      frog.position.x += 5;
      frog.position.y = 0;
    }
    
    if(frog.isTouching(climbersGroup)){
      frog.velocityX = 0;
      frog.velocityY = 0;
    }
    
    if(frog.isTouching(coinGroup)){
      score = score + 1;
      coinGroup.destroyEach();
      
    }
    else{
      frog.setVelocity(0, 8);
    } 
    
    if(frog.position.y > 400){
      gameState = "end";
    }
  }
  
  if (gameState === "end"){
    
    
    ocean.setVelocity(0,0);
   
    coinGroup.destroyEach();
    climbersGroup.destroyEach();
    
    ocean.addImage("ocean", gameOverImg);
  }
  
  
  //if(ocean.y < 500) {
   // ocean.velocityY = 400;
  //}

  // infinity background
  if(ocean.position.y < 200){

    ocean.position.y = 250;
  }
}

// create the coin and climber in the same function
function spawnCoin() {
  
  if (frameCount % 200 === 0) {

    climber = createSprite(Math.round(random(20,440)),80,20,20);
    climber.addImage("climber", climberImg);
    climber.setVelocity(-3,0);

    climber.setCollider("rectangle", 0 ,0, 400, 400);
    climber.debug = "true"; 
      
    climber.scale = 0.4;
    climber.lifetime = 60;
      
    climbersGroup.add(climber);
  
     //make the x position of the coin and climber the same
    
    coin = createSprite(climber.x, 60, 20, 20);
    coin.addImage("coin", coinImg);
    coin.setVelocity(-3, 0);
      
    coin.scale = 0.1;
      
    coin.lifetime = 60;
      
    coinGroup.add(coin);
    
   
  }
}

