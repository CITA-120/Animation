/***************************
 *    class ImgSprite
 *
 * Displays a Sprite image onto a 3D rectangular polygon.
 * HAS-A image mapping object that manages which sub-rectangle
 * of a texture image is to be mapped onto the polygon.
 * 
 * Author: William Bares with code to be completed by ...
 * Date: June 19, 2020
 *
 ***************************/

class ImgSprite {

  /*
   * constructor
   * Initializes a new instance of ImgSprite.
   *
   * @param {Image Mapper Object} - class object that
   *        contains a texture image and methods that
   *        mangage access to current UV sub-rectangle
   *        of image that is to be mapped onto this
   *        sprite's 3D rectangular polygon.
   * @param {number} width - horizontal size of sprite in
   *        3D World Coordinate units assumed to be > 0.
   * @param {number} height - vertical size of sprite in
   *        3D World Coordinate units assumed to be > 0.
   */
  constructor(imgMapper, width, height) {
    // Assign arguments received to 
    // this.imgMapper, this.width, and this.height
    // the attributes owned by this instance of ImgSprite.

    this.imgMapper = imgMapper;
    this.width = width;
    this.height = height;
  }

  /*
   * draw
   * 
   * Immediately paints rectangular polygon sprite into 
   * P5JS 3D WebGL canvas using the UV mapping coordinates
   * reported by this.imgMapper object.
   */
  draw() {

    // Call on this.imgMapper to get its texture image.
    let imgTexture = this.imgMapper.getImage();

    // Set current image texture
    texture(imgTexture);

    // Call on this.imgMapper to get UV image coordinates
    // that mark the top-left and bottom-right corners of
    // a rectangular sub-region within the image texture.
   
    // Get (U,V) coordinates of top-left corner of sprite sheet image.
    let leftU = this.imgMapper.getLeftU();
    let topV = this.imgMapper.getTopV();

    // Get (U,V) coordinates of bottom-right corner of sprite sheet image.
    let rightU = this.imgMapper.getRightU();
    let bottomV = this.imgMapper.getBottomV();

    //----------------------------- 
    // Give (x,y) vertices so center of sprite is at (0,0)
    // in the XYZ World
    // leftmost x-coord will be negative half width
    // rightmost x-coord will be positive half width
    // uppermost y-coord will be positive half height
    // lowermost y-coord will be negative half height

    beginShape();
    // top-left corner vertex given in XY World Units
    // maps to texture image pixel at (topU, topV)
    vertex(-0.5*this.width,0.5*this.height, leftU, topV );

    // bottom-left vertex...
    vertex(-0.5*this.width,-0.5*this.height, leftU, bottomV );

    // bottom-right vertex...
    vertex(0.5*this.width,-0.5*this.height, rightU, bottomV );

    // top-right vertex...
    vertex(0.5*this.width,0.5*this.height, rightU, topV );

    endShape(CLOSE);

  }// end draw method of ImgSprite.
	
  /*
   * update
   * Calls this.imgMapper to run its update method to advance to
   * the next frame of animation.
   */
  update() {
	this.imgMapper.update();
  }

}// end class ImgSprite.
    