/*VARIABLES*/
let bitsy;
let bitsySprites;
let sensor;
let bitsyAnis = {
    everything:{
        row: 0,
        frames: 1,
    },
    idle:{
        row: 1,
        frames: 2,
        frameDelay: 30,
    },
};

let ground;
let ball;

/*IMAGES AND SUCH*/
function preload(){
    bitsySprites = loadImage('assets/bitsy.png');
}
/*SETUP ONLY RUNS ONCE*/
function setup(){
    new Canvas(180,180, 'pixelated');
    allSprites.pixelPerfect = true; 
    //allSprites.debug = true;
    ground = new Group();
    ground.color = 'grey';
    ground.collider = 's';

    wall = new Group();
    wall.color = 'grey';
    wall.collider = 's';

    bitsy = new Sprite();
    bitsy.spriteSheet = bitsySprites;
    bitsy.anis.w = 18;
    bitsy.anis.h = 18;
    bitsy.addAnis(bitsyAnis);
    bitsy.changeAni('idle');
    bitsy.w = 16;
    bitsy.h = 16;
    bitsy.rotationLock = true;
    bitsy.friction = 0;

    sensor = new Sprite();
    sensor.x = bitsy.x;
    sensor.y = bitsy.y + bitsy.h/2;
    sensor.w = 30;
    sensor.h = 6;
    sensor.collider = 'none';
    sensor.visible = false;

    let a = new GlueJoint(bitsy,sensor);
    a.visible = false;

    groundPlat();
    ball = new Sprite(1950, height-76);
    ball.diameter = 10;
    ball.color = 'orange';
    ball.collider = 's';
}

/*DRAW LOOPS*/
function draw(){
    background ('lightblue');
    world.gravity.y = 10;
    movement();
    reset();
    winState();
}

/*CAMERA*/
function drawFrame(){
    camera.x = bitsy.x;
}


/*FUNCTIONS*/
function movement(){
    if(kb.pressing('left')){
        bitsy.changeAni('everything');
        bitsy.vel.x = -4;
        bitsy.mirror.x = true;
    } else if (kb.pressing('right')){
        bitsy.changeAni('everything');
        bitsy.vel.x = 4;
        bitsy.mirror.x = false;
    } else{
        bitsy.changeAni('idle');
        bitsy.vel.x = 0;
    }
   if(sensor.overlapping(ground)){
        if(kb.presses('space')){
            bitsy.changeAni('everything');
            bitsy.vel.y = -3.5;

        }
   } else{
        bitsy.changeAni('idle');
   }
}
function groundPlat(){
    new ground.Sprite(width/2, height+10, 100, 50);
    new ground.Sprite(190, height+10, 100,50);
    new ground.Sprite(290, height+10, 100, 50);
    new ground.Sprite(440, height-30, 50, 8);
    new ground.Sprite(590, height+10, 120, 50);
    new ground.Sprite(780, height+10, 35, 70);
    new ground.Sprite(920, height+10, 35, 70);
    new ground.Sprite(1060, height+10, 35, 70);
    new ground.Sprite(1210, height+10, 120, 50);
    new ground.Sprite(1320, height+10, 100, 50);
    new ground.Sprite(1420,height+10, 100, 50);
    new ground.Sprite(1540, height+10, 140, 50);
    new ground.Sprite(1580, height-40, 50, 5);
    new ground.Sprite(1490, height-60, 35, 5);
    new ground.Sprite(1585, height-80, 35, 5);
    new ground.Sprite(1490, height-100, 35,5);
    new ground.Sprite(1650, height-120, 35,10);
    new ground.Sprite(1720, height-100, 35, 10);
    new ground.Sprite(1790, height-80, 35, 10);
    new ground.Sprite(1860, height-60, 35, 10);
    new ground.Sprite(1910, height-40, 140, 60);

    
    new wall.Sprite(-11,height-100, 100,200);
    new wall.Sprite(1470, height-85, 10,90);
    new wall.Sprite(1605, height-75, 10, 120);
}

function reset(){
    if(bitsy.y > 400){
        bitsy.x = 90;
        bitsy.y = 100;
    }
}
function winState(){
    if(bitsy.overlapping(ball)){
        bitsy.vel.x = 0;
        bitsy.vel.y = 0;
        text("There's my ball!", width/4, height-100);
    }
}

