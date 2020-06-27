/***************************
 *    class SpriteSheetMapper
 *
 * Contains a P5JS image object and attributes and methods
 * that manage access to a current rectangular sub-region
 * of the image that will be mapped as a texture onto a
 * rectangular sprite polygon in the XYZ World.
 * 
 * Author: William Bares with code to be completed by ...
 * Benji Duke
 * Date: June 22, 2020
 *
 ***************************/

class SpriteSheetMapper {

  /*
   * constructor
   * Initializes a new instance of SpriteSheetMapper.
   *
   * @param {P5JS Image Object} img - pixel image object
   *        that contains the sprite sheet graphic.
   *        This img HAS-A .width and .height attributes.
   * @param {integer} numActions - number of actions depicted.
   *        We assume one action per row of frames.
   * @param {integer} numFrames - number of frames in each action.
   *        We assume all actions have the same number of frames.
   */
  constructor(img, numActions, numFrames) {
    // TO-DO - Assign arguments received to 
    // this.spriteSheet, this.numActions, and this.numFrames
    // the attributes owned by this instance of SpriteSheetMapper.
    this.spriteSheet = img;
    this.numActions = numActions;
    this.numFrames = numFrames;

    // Compute frameWidth and frameHeight from know attributes.
    this.frameWidth = this.spriteSheet.width / this.numFrames;
    this.frameHeight = this.spriteSheet.height / this.numActions;

    //***** NEW ATTRIBUTES DECLARED FOR ANIMATION ******

    // Keep track of current action.
    // Valid values are >= 0 and < this.numActions.
    this.actionId = 0;

    // Initialize new attribute to keep track of current
    // animation frame.  Counts from 0 up to this.numFrames-1
    this.frameCounter = 0;

    // Boolean variable set true if animation is running.
    this.playing = true;

    // Store most recented computed UV coordinates of top-left
    // corner of currently displayed frame of animation.
    this.leftU = 0;
    this.topV = 0;
  }

  /*
   * setAction
   * @param {integer} actId - Give integer ID of action to play.
   *        Value must be >= 0 and < this.numActions.
   * @return true if given actId is valid and action is changed; else,
   *         return false making no changes.
   */
  setAction(actId) {
     // TO-DO: Write an if-statement to ask if actId is >= 0
     // and actId is <= this.numActions

            // TO-DO: if the if-statement is true, then do the following:
            // (i) Assign this.actionId to be equal to actId
            // (ii) Assign this.frameCounter to 0 to restart at first frame
            // (iii) Call this.computeUV to re-compute top-left UV coordinates
            // (iv) return true

	if (actId >= 0 && actId <= this.numActions){
	  this.actionId = actId;
	  this.frameCounter = 0;
	  this.computeUV();
	  return true;
	}
	else
	  return false;

   
  }

  /*
   * computeUV
   * Compute UV pixel coordinates for top-left corner of
   * currently playing frame of animation.
   */
  computeUV() {
    
    // Use values stored in our attribute variables
    // this.actionId, this.frameCounter, this.frameWidth, and
    // this.frameHeight
	this.leftU = this.frameWidth * this.frameCounter;
	this.topV = this.frameHeight * this.actionId;

  }

  /*
   * update
   * If this.playing is equal to true, then do the following:
   * (i) Increment this.frameCounter by 1 and re-set it to 0 if
   *     it becomes >= this.numFrames
   * (ii) Call this.computeUV() to update the UV coordinates for next frame.
   * otherwise, do nothing.
   */
  update() {

     if(this.playing){
	this.frameCounter+=1;
	if(this.frameCounter >= this.numFrames)
		this.frameCounter = 0;
	this.computeUV();
	}

  }

  /*
   * getImage
   * @return {P5JS Image Object} texture image of entire sprite sheet.
   */
  getImage() {
    return this.spriteSheet;
  }

  /*
   * getLeftU
   * @return {integer} U-coordinate of top-left corner of active 
   *         sub-rectangle of sprite sheet.
   */
  getLeftU() {

    	return this.leftU;
  }

  /*
   * getTopV
   * @return {integer} V-coordinate of top-left corner of active 
   *         sub-rectangle of sprite sheet.
   */
  getTopV() {

    	return this.topV;
  }

  /*
   * getRightU
   * @return {integer} U-coordinate of bottom-right corner of active 
   *         sub-rectangle of sprite sheet.
   */
  getRightU() {

    	return this.leftU + this.frameWidth;

  }

  /*
   * getBottomV
   * @return {integer} V-coordinate of bottom-right corner of active 
   *         sub-rectangle of sprite sheet.
   */
  getBottomV() {

    	return this.topV + this.frameHeight;

  }

}// end class SpriteSheetMapper.