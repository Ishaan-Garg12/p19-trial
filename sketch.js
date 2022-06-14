var boyImg, boy;
var obstacle, obstacleImg, obstaclesGroup;
var dungeonImg, dungeon;
var gameState;
var invisibleGround;
var score;


function preload(){
dungeonImg = loadImage("dungeon.png");
boyImg = loadImage("boy.png");
obstacleImg = loadImage("obstacle.png");
}

function setup() {
    createCanvas(600, 540);

    gameState = "play";

    invisibleGround = createSprite(0,540,400,10);
    invisibleGround.visible = false;
    
    dungeon = createSprite(222,222, 600, 540);
    dungeon.addImage("dungeon", dungeonImg);
    dungeon.scale = 4;

    boy = createSprite(60, 460, 50, 50);
    boy.addImage(boyImg);
    boy.scale = 0.8; 
    boy.setCollider("rectangle", 0, 0, boy.width -100, boy.height-30);
    
    score = 0;

    obstaclesGroup = new Group();
}

function draw() {
    background(200);
    
    
    text("Score: "+ score, 30, 50);

    //if (gameState == "play"){
        score = score + Math.round(getFrameRate()/60);
        dungeon.velocityX = -(6 + 3*score/100);

        if(dungeon.velocityX >= 15){
            dungeon.velocityX = 15;
        }

        //spawnObstacles();
        boy.velocityY += 1;
        boy.collide(invisibleGround);
        if(keyDown("space")&& boy.y > 350){
            boy.velocityY = -10;

        if (dungeon.x < 30){
            dungeon.x = dungeon.width/2;
        }
        drawSprites();
        //}
    /*else if(gameState == "end"){
        dungeon.velocityX = 0;
        obstaclesGroup.destroyEach();

    }*/
    
}
    
    
    /*if(obstacle.isTouching(boy)){
        dungeon.velocityX = 0;
        obstaclesGroup.destroyEach();
    }*/

    
     
}

function spawnObstacles(){
    if(frameCount % 60 === 0){
        obstacle = createSprite(600,520,10,40);

        obstacle.scale = 0.3;
        obstacle.addImage(obstacleImg);
        obstacle.velocityX = -10;
        obstacle.lifetime = 800;
        obstacle.depth = boy.depth;
        boy.depth += 1;

        obstacle.debug = true;
        obstacle.setCollider("circle", 0, 0, 100);
        obstaclesGroup.add(obstacle);
    }
}