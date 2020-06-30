/***************************
 * class StageItem
 *
 * Represents the baseline visibility, position, scale,
 * and rotation for an item on the virtual stage set.
 * 
 * Author: William Bares 
 * Date: June 19, 2020
 *
 ***************************/

class StageItem {

  /*
   * constructor
   * Initializes a new instance of StageItem.
   *
   * @param {string} name - unique descriptive name of this StageItem.
	 * @param {string} type - what type of StageItem is this?  "Sprite", "Camera", etc.
   */
  constructor(name, type) {
		
		this.name = name;
		this.type = type;
		
		// Boolean flag set true if this StageItem is visible; else, false.
		this.isVisible = true;
		
		this.positionX = 0;
		this.positionY = 0;
		this.positionZ = 0;
		
		// Rotation angle in degrees.
		// Permit only Z-axis rotation since all StageItems
		// exits in a 2D XY plane.
		this.rotationZ = 0;
		
		// Scale multiplier along X-axis.
		this.scaleX = 1.0;
		// Scale multiplier along Y-axis.
		this.scaleY = 1.0;
		// All objects are flat so they have no Z-axis scale.
  }
	
	/* 
	 * getName
	 * @return {string} unique descriptive name as a non-empty string.
	 */
	getName() {
		return this.name;
	}
	
	/*
	 * getType
	 * @return {string} what type of StageItem is this?  "Sprite", "Camera", etc.
   */
	getType() {
		return this.type;
	}
	
	/*
	 * setVisible
	 * Change visibility of this StageItem.
	 * @param {Boolean} flag - Argument is true if StageItem will be visible; else, false.
	 */
	setVisible(flag) {
		this.isVisible = flag;
	}
	
	/*
	 * getVisible
	 * @return {Boolean} true if StageItem is visible; else, false.
	 */
	getVisible() {
		return this.isVisible;
	}
	
	/*
	 * setPositionX 
	 * @param {number} x - X-coordinate value
	 */
	setPositionX(x) {
		this.positionX = x;
	}
	
	/*
	 * getPositionX 
	 * @return {number} X-coordinate value
	 */
	getPositionX() {
		return this.positionX;
	}	
	
	/*
	 * setPositionY
	 * @param {number} y - Y-coordinate value
	 */
	setPositionY(y) {
		this.positionY = y;
	}
	
	/*
	 * getPositionY
	 * @return {number} Y-coordinate value
	 */
	getPositionY() {
		return this.positionY;
	}	
	
	/*
	 * setPositionZ
	 * @param {number} z - Z-coordinate value
	 */
	setPositionZ(z) {
		this.positionZ = z;
	}
	
	/*
	 * getPositionZ
	 * @return {number} Z-coordinate value
	 */
	getPositionZ() {
		return this.positionZ;
	}	
	
	/*
	 * setRotationZ
	 * @param {number} angle - Rotation angle in degrees about Z-axis.
	 */
	setRotationZ(angle) {
		this.rotationZ = angle;
	}
	
	/*
	 * getRotationZ
	 * @return {number} Rotation angle in degrees about Z-axis.
	 */
	getRotationZ() {
		return this.rotationZ;
	}
	
	/*
	 * setScale
	 * @param {number} multiplier - Uniform scale multiplier on X-axis and Y-axis.
	 */
	setScale(multiplier) {
		this.scaleX = multiplier;
		this.scaleY = multiplier;
	}
	
	/*
	 * setScaleX
	 * @param {number} multiplier - Scale multiplier on X-axis
	 */
	setScaleX(multiplier) {
		this.scaleX = multiplier;
	}
	
	/*
	 * getScaleX
	 * @return {number} Scale multiplier on X-axis
	 */
	getScaleX() {
		return this.scaleX;
	}
	
	/*
	 * setScaleY
	 * @param {number} multiplier - Scale multiplier on Y-axis
	 */
	setScaleY(multiplier) {
		this.scaleY = multiplier;
	}
	
	/*
	 * getScaleY
	 * @return {number} Scale multiplier on Y-axis
	 */
	getScaleY() {
		return this.scaleY;
	}
	
	/*
	 * applyTransforms
	 * Apply transforms to position, rotate, and scale this object.
	 * Derived class draw() method should call this method.
	 */
	applyTransforms() {

		translate( this.positionX, this.positionY, this.positionZ );
		
		rotateZ( this.rotationZ );
	}

}// end class ImgSprite.   