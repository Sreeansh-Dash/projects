var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex,trexImg; 
var ground, invisibleGround, groundImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4;

var score;
var gameover,gameOverImg,bgImg;



function preload(){
trexImg=loadImage("img/download.png");
 bgImg=loadImage("img/bgImg.jpg");
  gameOverImg=loadImage("img/gameOver.png");
  obstacle1 = loadImage("img/divide.png");
  obstacle2 = loadImage("img/minus.png");
  obstacle3 = loadImage("img/pi.png");
  obstacle4 = loadImage("img/multiplication.png");
  groundImage=loadImage("img/line.png")
 
}

function setup() {
  createCanvas(600, 200);


  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trexImg);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.x = ground.width /2;
  ground.addImage(groundImage);


  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();
 

  
  trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = false;
  
  score = 0;
  
}

function draw() {
  
  background(bgImg);
  //displaying score
  text("Score: "+ score, 500,50);
  
  
  if(gameState === PLAY){


    
    ground.velocityX = -(4 + 3* score/100)
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& trex.y >= 100) {
        trex.velocityY = -12;
        jumpSound.play();
    }
    
    //add gravity
    trex.velocityY = trex.velocityY + 0.8
  
    //spawn the clouds
    
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(trex)){
        //trex.velocityY = -12;
       gameover=createSprite(200,200,200,200);
       gameover.addImage(gameOverImg);
       text("refresh page to play again",200,50);
        gameState = END;
        
      
    }
  }
   else if (gameState === END) {
     
     
     //change the trex animation
      
    
     
     
      ground.velocityX = 0;
      trex.velocityY = 0
      
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
  
     
     obstaclesGroup.setVelocityXEach(0);
       
   }
  
 
  //stop trex from falling down
  trex.collide(invisibleGround);
  
 

  drawSprites();
}




function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100);
   
    //generate random obstacles
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}


