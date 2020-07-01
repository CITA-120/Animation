/*
 * Class to represent an articulated three-link arm.
 *
 * Model your animated articulated figures following this example.
 *
 * My record and playback tool will assume that your articulated object
 * class has the same method names and receive the same types and numbers
 * of arguments.
 *
 * TO-DO: Complete the 10 statements marked by the comment // TO-DO #...
 * TO-DO #1, TO-DO #2, ... TO-DO #10
 */

class ArticulatedArm3 extends StageItem {

  /*
	 * constructor
	 * 
	 * Initialize a list of rotation angles one per joint, each to 0 degrees.
	 * Initializes length of each arm segment.
	 * The default robot arm will appear anchored at (0,0,) with the
	 * three segments each extending UP.
	 *
   * @param {string} name - unique descriptive name of this StageItem.
	 */
	constructor(name) {
		// Call base class constructor - See class StageItem.
		// Second argument specifies the kind or type of StageItem.
		super(name, "ArticulatedArm3");
		
	  // This simple arm has three jointed segments.
		// Initialize the list to contain three elements.
		// I am choosing to make the starting angle 0 degrees for each joint.
	  this.jointAngleList = [ 0, 0, 0 ];
		
		// Assign a descriptive name for each joint.
		this.jointNameList = [ "shoulder", "elbow", "wrist" ];
		
		// Initialize any this. variables to store data used to represent/draw
		// your character.
		// My record and playback tools will not know about or care about these
		// variables.
		
		// Length of each robot arm segment.
		this.segmentLength = 100;
	}
	
	/*
	 * getNumJoints
	 * @return {integer} returns number of joints as a non-negative integer.
	 */
	getNumJoints() {
	
	  // TO-DO #1: What expression gives us the number of elements in this.jointAngleList ?
		// We do not want to hard-code the literal value 3.
		// The correct expression will be able to work for any number of joints.
		
		return this.jointAngleList.length;
	}
	
	/*
	 * getJointName
	 * @param {integer} jointIndex - Index to select joint.
	 *                  jointIndex is >= 0 and jointIndex < this.getNumJoints().
	 * @return {string} descriptive name of selected joint; else, "undefined" if
	 *         jointIndex is invalid.
	 */
	getJointName( jointIndex ) {
		// TO-DO #2: Write an if-statement to confirm that 
		// jointIndex is >= 0 and jointIndex < this.getNumJoints()
		
		// We call this.getNumJoints rather than hard-coding 3 because
		// we want this code to be useful for articulated characters with
		// different numbers of joints.
		
		if( jointIndex >= 0 && jointIndex < this.getNumJoints() ) {
		    // TO-DO #3: Write an assignment statement that assigns the argument value angle
				// into the this.jointAngleList element at index position given by jointIndex.
				return this.jointNameList[ jointIndex ];
		}
		else
			return "undefined";		 
  }
	
	/*
	 * setJointAngle
	 * @param {integer} jointIndex - Index to select joint to rotate.
	 *                  jointIndex is >= 0 and jointIndex < this.getNumJoints().
	 * @param {number} angle - rotation angle in degrees.
	 * @return true if jointIndex is valid and joint angle was modified;
	 *         else, false making no change to joint angles.
	 */
	setJointAngle(jointIndex, angle) {
		// TO-DO #4: Write an if-statement to confirm that 
		// jointIndex is >= 0 and jointIndex < this.getNumJoints()
		
		// We call this.getNumJoints rather than hard-coding 3 because
		// we want this code to be useful for articulated characters with
		// different numbers of joints.
		
		if( jointIndex >= 0 && jointIndex < this.getNumJoints() ) {
		    
		    // TO-DO #5: Write an assignment statement that assigns the argument value angle
				// into the this.jointAngleList element at index position given by jointIndex.
				
				this.jointAngleList[ jointIndex ] = angle;
				
				return true;
		}
		else
			return false;
	}
	
	/*
	 * getJointAngle
	 * @param {integer} jointIndex - Index to select joint whose angle we wish to get.
	 *                  jointIndex is >= 0 and jointIndex < this.getNumJoints().
	 * @return angle in degrees of selected joint; else, 0 if jointIndex is not valid.
	 */
	getJointAngle(jointIndex)	{
	
		// TO-DO #6: Write an if-statement to confirm that 
		// jointIndex is >= 0 and jointIndex < this.getNumJoints()
		
		if( jointIndex >= 0 && jointIndex < this.getNumJoints() ) {
		    
		    // TO-DO #7: Compute the return statement so that we give back the
				// angle for the this.jointAngleList element at index position given by jointIndex.
				
				return this.jointAngleList[ jointIndex ];
		}
		else // invalid jointIndex so return 0.
			return 0;
	}
	
	/*
	 * draw
	 * Display the articulated arm using its current joint rotation angles.
	 * The caller code will apply any desired transforms - translate, rotate, scale
	 * to set the overall position, orientation, and size of the entire arm.
	 */
	draw() {
	
	  // We do not clear the background since this.draw() is responsible only
		// for drawing this one particular articulated three-link arm.
		
		// Save coordinate system before starting any distinct shape/object.
		push();
		
		// Apply overall position, rotate, scale transforms
		// as set by base class StageItem.
		this.applyTransforms();
	
		// Rotate coordinate system by first joint's angle value.
		// TO-DO #8: Fill-in the literal integer index value to access the first element.
		rotateZ( this.jointAngleList[ 0 ] );
		
		// Draw root or first arm segment.
		fill('red');
		this.drawSegment();
	
		// Move coordinate system origin to endpoint of first segment.
		translate(0, this.segmentLength);
		
		// TO-DO #9: Fill-in the literal integer index value to access the first element.
		rotateZ( this.jointAngleList[ 1 ] );
		
		fill('green');
		this.drawSegment();
	
		// Move coordinate system origin to endpoint of second segment.
		translate(0, this.segmentLength);
		
		// TO-DO #10: Fill-in the literal integer index value to access the first element.
		rotateZ( this.jointAngleList[ 2 ] );
		
		fill('blue');
		this.drawSegment();
	
		// Restore original coordinate system at origin.
		pop();		
	}
	
	/*
	 * update
	 * Perform any update actions needed to update internal state
	 * on each frame.
	 */
	update() {
		// Nothing to do.  This arm does not have sprite frames to update.
	}
	
  //----------------- PRIVATE METHODS ------------------------
	//----------------------------------------------------------
	// The following methods are helper methods called by this.draw().
	// My record and playback tools will not call these methods.
	// Define and use them as you see fit for your particulare character.
	// Some programming languages such as Java allow a class to designate
	// some functions as 'private', which means that only code inside the
	// class can call them.
	// JavaScript (our language) does not have this capability so
	// code outside the class can directly access or call any method.
	// In my coding style, I still comment these methods as 'private'
	// to tell the reader that no code outside of this class file should
	// be calling 'private' methods.
	
  /*
   * drawSegment
   * Draw untransformed single arm segment
   * with its joint (point of rotation) at (0,0)
   * and end tip at (0,this.segmentLength).
   * With a rotation angle of 0-degrees an 
   * arm segment will appear to point up (+Y).
   */
  drawSegment() {
    beginShape();

    // Apex at (0, this.segmentLength).
    vertex(0, this.segmentLength);
	
    // bottom-left corner at (-10,10).
    vertex(-10,10);

    // joint anchor at (0,0)
	  // The arm segment will appear to rotate about this point.
    vertex(0,0);
	
    // bottom-right corner at (10,10).
    vertex(10,10);

    endShape(CLOSE);
  }// end drawSegment.
	
}// end class ArticulatedArm3.