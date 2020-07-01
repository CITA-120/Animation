/* CITA-120 Final Project
 * Authors: Benji Duke, Henry Horlbeck
 * This project shows an animation with a beginning, 
 * middle, and end. The animation uses sprites via the
 * ImgSprite and SpriteImageMapper classes. The animation is
 * put together by having each scene separated into functions
 * that are called in the draw function based on the current
 * frame number, tracked by the variable frameCounter.
*/

let canvasSize;
// Declare background images
let imgBackground1;
let imgBackground2;
let imgBackground3;
let imgBackground4;
let imgBackground5;
// Camera that will view our 3D scene.
let cam1;
// Declare frame count to keep animation on track.
let frameCounter;
// Position variables for the camera.
let zPos;
let xPos;
// Declare sprite image and mapper.
// ImgSprite object
let wolfSprite;
// Image
let wolfSpriteSheet;
// SpriteSheetMapper object
let wolfSpriteMapper;

// Declare Frog sprite variables.
let frogSprite;
// Image
let frogSpriteSheet;
// SpriteSheetMapper object
let frogSpriteMapper;

// Bat sprite, ImgSprite object.
let batSprite;
// Bat sprite sheet
let batSpriteSheet;
// Bat sprite mapper, SpriteSheetMapper object.
let batSpriteMapper;
// Bat sprite X position variable.
let batX;

let ratSprite;
let ratSpriteSheet;
let ratSpriteMapper;
let ratX;

// Declare dialog box placeholder
let dialogBox;
let dialogSpriteSheet;
let dialogSpriteMapper;

let dialogBox2;
let dialogSpriteSheet2;
let dialogSpriteMapper2;

// Handle the bar sprite
let barSprite;
let barSpriteSheet;
let barSpriteMapper;

// Declare King sprite variables
let kingSprite;
let kingSpriteSheet;
let kingSpriteMapper;

// Sounds
let frogSound;
let wolfSound;
let frogSound2;
let wolfSound2;
let scene3Sound;


function preload() {
	
  // Load an image that you uploaded into your P5JS WebEditor assets folder.
  wolfSpriteSheet = loadImage("assets/wolf_image_flip2.png");
  frogSpriteSheet = loadImage("assets/frog_sprite.png");
  batSpriteSheet = loadImage("assets/sprite_sheet2.png");
  barSpriteSheet = loadImage("assets/bar.png");
  ratSpriteSheet = loadImage("assets/rat_sprite.png");
  kingSpriteSheet = loadImage("assets/KingNeptune_tpose.png");
  dialogSpriteSheet = loadImage("assets/scene2dialog.png");
  dialogSpriteSheet2 = loadImage("assets/scene4dialog.png");
  imgBackground1 = loadImage("assets/storefront2_flip.png");
  imgBackground2 = loadImage("assets/fullbar.png");
  imgBackground3 = loadImage("assets/manyMonthsLater.png");
  imgBackground4 = loadImage("assets/throneRoom.png");
  imgBackground5 = loadImage("assets/theEnd.png");
  frogSound = loadSound("assets/frog_sound.mp3");
  wolfSound = loadSound("assets/wolf_sound.mp3");
  frogSound2 = loadSound("assets/frog_sound2.wav");
  wolfSound2 = loadSound("assets/wolf_sound2.wav");
  scene3Sound = loadSound("assets/manyMonths.mp3");
  
}

function setup() {
  canvasSize = 700;
  // Add argument WEBGL so we get a 3D drawing canvas.
  createCanvas(canvasSize,canvasSize, WEBGL);
	
  // Initialize camera that views our 3D scene.
  cam1 = createCamera();

  // 60 - field of view angle in degrees - this is our lens, wide or narrow.
  // width / height sets aspect ratio so the 3D rendering fits the shape of our sketch window.
  // 0.1 is the nearest distance that we expect any object to be to our camera.
  // 1000 is the farthest distance that we expect any object to be to our camera.
  // Any object too close or too far will be clipped (excluded) from what we see.
  cam1.perspective(60, width/height, 0.1, 1000);
  // Set position of the camera in 3D.
  cam1.setPosition(0,0,80);
  // Aim the camera at this specified point.
  cam1.lookAt(0,0,0);
  frameCounter = 0;
  zPos = 80;
  xPos = 0;
  
  // Wolf Sprite setup
  wolfSpriteMapper = new SpriteSheetMapper(wolfSpriteSheet, 6, 3);
  wolfSpriteMapper.setAction(0);
  wolfSprite = new ImgSprite("wolf", wolfSpriteMapper, 300, 384);
  
  // Frog sprite setup
  frogSpriteMapper = new SpriteSheetMapper(frogSpriteSheet, 2, 4);
  frogSpriteMapper.setAction(0);
  frogSprite = new ImgSprite("frog", frogSpriteMapper, 300, 400);
  
  // Bat/Rat sprite setup
  batSpriteMapper = new SpriteSheetMapper(batSpriteSheet, 4,3);
  batSpriteMapper.setAction(3);
  batSprite = new ImgSprite("bat", batSpriteMapper, 95, 128);
  batX = 1000;
  
  ratSpriteMapper = new SpriteSheetMapper(ratSpriteSheet, 2, 4);
  ratSpriteMapper.setAction(0);
  ratSprite = new ImgSprite("rat", ratSpriteMapper, 100,100);
  ratX = 1100;
  
  // Bar sprite
  barSpriteMapper = new SpriteSheetMapper(barSpriteSheet, 1, 1);
  barSpriteMapper.setAction(0);
  barSprite = new ImgSprite("bar", barSpriteMapper, 2048, 1024);
  
  // King sprite
  kingSpriteMapper = new SpriteSheetMapper(kingSpriteSheet, 1, 1);
  kingSpriteMapper.setAction(0);
  kingSprite = new ImgSprite("king", kingSpriteMapper, 420, 360);
  
  // Dialog box stageItem setup
  dialogSpriteMapper = new SpriteSheetMapper(dialogSpriteSheet, 5, 1);
  dialogSpriteMapper.setAction(0);
  dialogBox = new ImgSprite("dialogBox", dialogSpriteMapper, 750, 300);
  
  // Dialog box scene 4 setup
  dialogSpriteMapper2 = new SpriteSheetMapper(dialogSpriteSheet2, 3, 1);
  dialogSpriteMapper2.setAction(0);
  dialogBox2 = new ImgSprite("dialogBox2", dialogSpriteMapper2, 750, 300);
  
  // Establish frame rate at 60
  frameRate(60);
}

function draw() {

  if (frameCounter < 240){
    scene1();
    zPos-=0.1;
    cam1.setPosition(0,0,zPos);
  }
  else if (frameCounter < 2700){
    scene2();
  }
  else if (frameCounter < 2940){
    scene3();
  }
  else if (frameCounter < 3800){
    scene4();
  }
  else
    scene5();
    

  frameCounter++;
}

function scene1(){
  background(220);
  
  // Replace fill command with command that specifies current texture image.
  texture(imgBackground1);
	
  // Draw a square.
  let side = 500;
  beginShape();
	
  // top-left corner of polygon.
  // Map image pixel with (U,V) of (0,0) to top-left vertex of polygon.
  vertex(-side,side,  0,0);
	
  // bottom-left corner
  // Map image pixel with (U,V) of (0,imgBackground.height) to bottom-left vertex of polygon.
  vertex(-side,-side, 0,imgBackground1.height);
	
  // bottom-right corner
  // Map image pixel with (U,V) of (imgBackground.width,imgBackground.height) to bottom-right vertex of polygon.
  vertex(side,-side,  imgBackground1.width,imgBackground1.height);
	
  // top-right corner
  // Map image pixel with (U,V) of (imgBackground.width,0) to top-right vertex of polygon.
  vertex(side,side,  imgBackground1.width,0);

  endShape(CLOSE);
}

function scene2(){
  background(220);
  cam1.setPosition(xPos,0,-63);
  cam1.lookAt(xPos,0,0);
  if(xPos < 620)
    xPos+=2;
  // Replace fill command with command that specifies current texture image.
  texture(imgBackground2);
  let sideX = 1024;
  let sideY = 512;
  
  beginShape();
	
  // top-left corner of polygon.
  // Map image pixel with (U,V) of (0,0) to top-left vertex of polygon.
  vertex(-sideX,sideY,  0,0);
	
  // bottom-left corner
  // Map image pixel with (U,V) of (0,imgBackground.height) to bottom-left vertex of polygon.
  vertex(-sideX,-sideY, 0,imgBackground2.height);
	
  // bottom-right corner
  // Map image pixel with (U,V) of (imgBackground.width,imgBackground.height) to bottom-right vertex of polygon.
  vertex(sideX,-sideY,  imgBackground2.width,imgBackground2.height);
	
  // top-right corner
  // Map image pixel with (U,V) of (imgBackground.width,0) to top-right vertex of polygon.
  vertex(sideX,sideY,  imgBackground2.width,0);

  endShape(CLOSE);
  


  // Handle Frog sprite
  frogSprite.setPositionX(830);
  frogSprite.setPositionY(50);
  frogSprite.draw();
  barSprite.draw();
  
  // Frog pickup animation at frame 730
  if(frameCounter == 730)
    frogSpriteMapper.setAction(1);
  // Keep Frog animation to ~ 4 fps
  if(frameCounter % 16 == 0 && frameCounter < 730 ){
    frogSprite.update();
    barSprite.draw();
  }
  else if(frameCounter > 960 && frameCounter % 16 == 0)
    frogSprite.update();
  
  // Handle Bat/Rat sprite behavior.
  /*
  batSprite.setPositionX(batX);
  batSprite.setPositionY(100);
  if(frameCounter > 650){
    batX-=4;
    batSprite.draw();
    if(frameCounter % 8 == 0)
      batSprite.update();    
  }
  */
  
  // Handle Rat sprite behavior.
  ratSprite.setPositionX(ratX);
  ratSprite.setPositionY(5);
  
  // Move the rat up to the frog's X position
  if(frameCounter > 650 && frameCounter < 730){
    ratX-=4;
    ratSprite.draw();
    // Give the rat animation an ~8 fps frame rate
    if(frameCounter % 8 == 0)
      ratSprite.update();    
  }
  
  // Pause the rat's movement 
  else if (frameCounter >= 720 && frameCounter < 850){
    if(frameCounter == 730)
    ratSpriteMapper.setAction(1);
    ratSprite.setPositionY(-5);
    ratSprite.draw();
  }
   
  else if (frameCounter > 850){
    ratX-=4;
    ratSprite.draw();
    if(frameCounter % 8 == 0)
      ratSprite.update();    
  }
  
  // Handle Wolf sprite behavior.
  wolfSprite.setPositionX(400);
  wolfSprite.setPositionY(-50);
  //wolfSprite.setScaleX(1.5);
  //wolfSprite.setRotationZ(90);
  //wolfSprite.applyTransforms();
  wolfSprite.draw();
  if(frameCounter % 16 == 0)
    wolfSprite.update();


  // Set controls for dialogBoxes
  dialogBox.setPositionX(620);
  dialogBox.setPositionY(-220);
  
  // Start of dialog box drawing
  if(frameCounter > 890){
    dialogBox.draw();
    if(frameCounter == 891)
      frogSound.play();
  }
  if(frameCounter == 1200){
    dialogSpriteMapper.setAction(1);
    wolfSound.play();
  }
  if(frameCounter == 1420){
    dialogSpriteMapper.setAction(2);
    frogSound2.play();
  }
  if(frameCounter == 1800){
    dialogSpriteMapper.setAction(3);
    wolfSound2.play();
  }
  if(frameCounter == 2100){
    dialogSpriteMapper.setAction(4);
    wolfSound.play();
  }

}


function scene3(){
  background(220);  
  
  cam1.setPosition(0,0,-150);
  
  if(frameCounter == 2730)
    scene3Sound.play();
  
  texture(imgBackground3);
  let sideX = imgBackground3.width;
  let sideY = imgBackground3.height;
  
  beginShape();
	
  // top-left corner of polygon.
  // Map image pixel with (U,V) of (0,0) to top-left vertex of polygon.
  vertex(-sideX,sideY,  0,0);
	
  // bottom-left corner
  // Map image pixel with (U,V) of (0,imgBackground.height) to bottom-left vertex of polygon.
  vertex(-sideX,-sideY, 0,imgBackground3.height);
	
  // bottom-right corner
  // Map image pixel with (U,V) of (imgBackground.width,imgBackground.height) to bottom-right vertex of polygon.
  vertex(sideX,-sideY,  imgBackground3.width,imgBackground3.height);
	
  // top-right corner
  // Map image pixel with (U,V) of (imgBackground.width,0) to top-right vertex of polygon.
  vertex(sideX,sideY,  imgBackground3.width,0);

  endShape(CLOSE);
  
}

function scene4(){
  background(220);  
  
  cam1.setPosition(40, -220, -70);
  
  texture(imgBackground4);
  let sideX = imgBackground4.width;
  let sideY = imgBackground4.height;
  
  beginShape();
	
  // top-left corner of polygon.
  // Map image pixel with (U,V) of (0,0) to top-left vertex of polygon.
  vertex(-sideX,sideY,  0,0);
	
  // bottom-left corner
  // Map image pixel with (U,V) of (0,imgBackground.height) to bottom-left vertex of polygon.
  vertex(-sideX,-sideY, 0,imgBackground4.height);
	
  // bottom-right corner
  // Map image pixel with (U,V) of (imgBackground.width,imgBackground.height) to bottom-right vertex of polygon.
  vertex(sideX,-sideY,  imgBackground4.width,imgBackground4.height);
	
  // top-right corner
  // Map image pixel with (U,V) of (imgBackground.width,0) to top-right vertex of polygon.
  vertex(sideX,sideY,  imgBackground4.width,0);

  endShape(CLOSE);
  
  
  // King Neptune animation
  kingSprite.setPositionX(80);
  kingSprite.setPositionY(0);
  kingSprite.draw();
  
  // Handle wolf sprite animation
  wolfSprite.setPositionX(-200);
  wolfSprite.setPositionY(-300);
  wolfSprite.draw();
  if(frameCounter % 16 == 0)
    wolfSprite.update();
  
  // Handle frog sprite
  if(frameCounter == 2940)
    frogSpriteMapper.setAction(0);
  frogSprite.setPositionX(300);
  frogSprite.setPositionY(-320);
  frogSprite.draw();
  if(frameCounter % 16 == 0)
    frogSprite.update();  
  
  // Handle dialogBox
  if (frameCounter > 3000){
  dialogBox2.setPositionX(60);
  dialogBox2.setPositionY(-500);
  dialogBox2.draw();
  
  if(frameCounter == 3240)
    dialogSpriteMapper2.setAction(1);  
  }
  if(frameCounter == 3460)
    dialogSpriteMapper2.setAction(2);
  
  
}
  
  function scene5(){
    
    background(0);
    texture(imgBackground5);
    let sideX = imgBackground5.width;
    let sideY = imgBackground5.height;
  
    beginShape();
	
    // top-left corner of polygon.
    // Map image pixel with (U,V) of (0,0) to top-left vertex of polygon.
    vertex(-sideX,sideY,  0,0);
	
    // bottom-left corner
    // Map image pixel with (U,V) of (0,imgBackground.height) to bottom-left vertex of polygon.
    vertex(-sideX,-sideY, 0,imgBackground5.height);
    // bottom-right corner
    // Map image pixel with (U,V) of (imgBackground.width,imgBackground.height) to bottom-right vertex of polygon.
    vertex(sideX,-sideY,  imgBackground5.width,imgBackground5.height);
    // top-right corner
    // Map image pixel with (U,V) of (imgBackground.width,0) to top-right vertex of polygon.
    vertex(sideX,sideY,  imgBackground5.width,0);
    endShape(CLOSE);
  
}