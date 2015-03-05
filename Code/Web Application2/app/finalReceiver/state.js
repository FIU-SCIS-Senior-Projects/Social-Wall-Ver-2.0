'use strict';
//Top level object for the main carousel object;
swcarousel.State = function(carousel, options){
	//Current Image on the screen
	this.currentFrame = 0;
	//The progress of the animation.
	this.progress = 0.0;
	
	this.i = 0;
	//The timer that handles the switching of the images.
	this.switchTimerId = -1;
	//The timer that records the identification of animation.
	this.animationTimerId = -1;
	//Determines whether the image is switching or not.
	this.switchInProgress = false;

	//Records the start time of the animation.
	this.animationStartTime = new Date().getTime();
	
	//this.direction = this.Direction.RIGHT;
	//console.log(options);
	this.preloadImages =  function(options,callback) {

		//an array of URLs representing the images.
		var loadedImages = 0;
		var ret = [];
		var images = options['images'];
		console.log(images);
		//var images = carousel.getElementsByTagName('img');
		for (var i = 0; i < images.length; ++i) {
			var imageObj = new Image();
			imageObj.crossOrigin="anonymous";
			imageObj.src = images[i];
			imageObj.onload = function(){
				if(++loadedImages >= images.length) {
              		callback(ret);
            	}
			}
			// TODO: This might not be necessary.
				ret.push(imageObj);
		}
		console.log(ret);
		return ret;
	}

	//this.images = images(options);
	console.log(this.images);
	this.tempSource = null;

};
swcarousel.State.prototype.currentImage = function () {
	return this.images[this.currentFrame];
};


swcarousel.State.prototype.incFrame = function () {
	return  ((this.currentFrame + 1) % this.images.length);
		//((this.currentFrame + this.images.length - 1) % this.images.length);
};

/**
 * Integer indicating the index of the next image in the list.
 */
swcarousel.State.prototype.nextFrame = function () {
	return this.incFrame();
};

swcarousel.State.prototype.previousFrame = function () {
	//function reverse(dir) {
	//	return (dir + 1) % 2;
	//}
	var previous = this.currentFrame - 1 < 0 ?  this.currentFrame : this.currentFrame - 1;
	 //this.incFrame(reverse(this.direction));
	 return previous;
};


 //img element of the next image to be displayed.

swcarousel.State.prototype.nextImage = function () {
	return this.images[this.nextFrame()];
};

swcarousel.State.prototype.previousImage = function () {
	return this.images[this.previousFrame()];
};

swcarousel.State.prototype.sourceImage = function () {
	if (this.tempSource !== null) {
		return this.tempSource;
	}
	return this.previousImage();
};

swcarousel.State.prototype.setSourceImage = function(img) {
	this.tempSource = img;
};

swcarousel.State.prototype.targetImage = function () {
	return this.currentImage();
};


