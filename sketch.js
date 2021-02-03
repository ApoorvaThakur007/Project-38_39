var database;
var form,player,game;
var gameState = 0;
var playerCount = 0;
var allPlayers = [];
var distance = 0
var car1,car2,car3,car4;
var cars;
var car1Img,car2Img,car3Img,car4Img,groundImg,trackImg;
var obs,obsImg;

function preload(){
  car1Img = loadImage("images/car1_Img.png")
  car2Img = loadImage("images/car2_Img.png")
 // car3Img = loadImage("images/car3.png")
 // car4Img = loadImage("images/car4.png")
 // groundImg = loadImage("images/ground.png")
  trackImg = loadImage("images/Road.jpg")
  obsImg = loadImage("images/obs.png")
}

function setup(){
  database = firebase.database();
  console.log(database);
  createCanvas(displayWidth,displayHeight);
  game = new Game()
  game.getState()
  game.start()
  obsG = new Group()
}

function draw(){
  background("grey"); 
  if(playerCount === 2){
    game.update(1)
  }
  if(gameState === 1){
    clear()
    game.play()
  }
  if(gameState === 2){
    game.end()
  }
}
function spawnObstacle(){
  if(frameCount % 70 === 0){
    obs = createSprite(0,0,10,10)
    obs.addImage(obsImg)
    obs.scale = 0.20
    obs.lifetime = 100 
    obs.x = Math.round(random(10,width-10))
    obs.y = Math.round(random(10,height-10))
    obsG.add(obs)
  }
}