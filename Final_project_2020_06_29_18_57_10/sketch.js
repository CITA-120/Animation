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
// Bat sprite, ImgSprite object.
let batSprite;
// Bat sprite sheet
let batSpriteSheet;
// Bat sprite mapper, SpriteSheetMapper object.
let batSpriteMapper;
// Bat sprite X position variable.
let batX;
// Declare dialog box placeholder
let dialogBox;
let dialogSpriteSheet;
let dialogSpriteMapper;


function preload() {
	
  // Load an image that you uploaded into your P5JS WebEditor assets folder.
  wolfSpriteSheet = loadImage("wolf_image_flip2.png");
  batSpriteSheet = loadImage("sprite_sheet2.png");
  dialogSpriteSheet = loadImage("undertale_text_box1.png");
  imgBackground1 = loadImage("storefront2.png");
  imgBackground2 = loadImage("fullbar.png");
  imgBackground3 = loadImage("manyMonthsLater.png");
  imgBackground4 = loadImage("throneRoom.png");
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
  
  // Establish frame rate at 60
  frameRate(60);
  
  // Bat/Rat sprite setup
  batSpriteMapper = new SpriteSheetMapper(batSpriteSheet, 4,3);
  batSpriteMapper.setAction(3);
  batSprite = new ImgSprite("bat", batSpriteMapper, 95, 128);
  batX = 1000;
  
  // Dialog box stageItem setup
  dialogSpriteMapper = new SpriteSheetMapper(dialogSpriteSheet, 1, 1);
  dialogSpriteMapper.setAction(0);
  dialogBox = new ImgSprite("dialogBox", dialogSpriteMapper, 750, 300);
  
}

function draw() {
  if (frameCounter < 240){
    scene1();
    zPos-=0.1;
    cam1.setPosition(0,0,zPos);
  }
  else if (frameCounter < 1600){
    scene2();
  }
  else if (frameCounter < 2000){
    scene3();
  }
  else if (frameCounter < 5200){
    scene4();
  }
  else
    background(220);
  
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
  
  // Handle Bat/Rat sprite behavior.
  batSprite.setPositionX(batX);
  batSprite.setPositionY(100);
  if(frameCounter > 650){
    batX-=4;
    batSprite.draw();
    if(frameCounter % 8 == 0)
      batSprite.update();
    
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
  if(frameCounter > 890)
    dialogBox.draw();
  
}

function scene3(){
  background(220);  
  
  cam1.setPosition(0,0,-150);
  
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
  
  cam1.setPosition(40, 0, -100);
  
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
  
  // TODO: Set new Wolf and Frog mocap animation, set King sprite position,
  // setup dialog boxes for the ending.
}