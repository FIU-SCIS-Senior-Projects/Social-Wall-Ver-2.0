'use strict';

var swcarousel = swcarousel || {};

swcarousel.CanvasBuffer = function(carousel,options){

	function invisible(e) {
		e.style.display = 'none';
		return e;
	}


	function createCanvas(options) {
		var canvas = document.createElement('canvas');
		canvas.width = options.width;
		canvas.height = options.height;
		return canvas;
	}

	function highDef(canvas, context) {
		if (window.devicePixelRatio) {
			var defaultWidth = canvas.width;
			var defaultHeight = canvas.height;
			var cssWidth = defaultWidth;
			var cssHeight = defaultHeight;

			canvas.style.width = cssWidth.toString() + "px";
			canvas.style.height = cssHeight.toString() + "px";

			canvas.width = defaultWidth * window.devicePixelRatio;
			canvas.height = defaultHeight * window.devicePixelRatio;
			context.scale(window.devicePixelRatio, window.devicePixelRatio);             
		}
	}




	this.width = options.width;
	this.height = options.height;

	this.canvas = createCanvas(options);
	this.id = "canvas_" + carousel.id;
	this.canvas.id = this.id;
	this.canvas.className = 'blend';
	carousel.appendChild(this.canvas);
	this.context = this.canvas.getContext("2d");
	highDef(this.canvas, this.context);

	//this.overlayCanvas = createCanvas(options);
	//this.overlayCanvas.className = 'overlay';
	//carousel.appendChild(this.overlayCanvas);
	//this.overlay = this.overlayCanvas.getContext('2d');
	//highDef(this.overlayCanvas, this.overlay);
	/**
	 * TODO: Try to remove...
	 */
	this.scratchCanvas = invisible(createCanvas(options));
	this.scratchid = "canvas_scratch";
	this.scratchCanvas.id = this.scratchid;
	console.log(this.scratchid );
	carousel.appendChild(this.scratchCanvas);
	this.scratch = this.scratchCanvas.getContext('2d');
	highDef(this.scratchCanvas, this.scratch);

};

swcarousel.CanvasBuffer.prototype.imageData = function(image) {
	this.scratch.drawImage(image, 0, 0, this.width, this.height);
	return this.scratch.getImageData(0, 0, this.width, this.height);
};

swcarousel.CanvasBuffer.prototype.screenBuffer = function() {
	return this.context.getImageData(0,0, this.width, this.height);
};

swcarousel.CanvasBuffer.prototype.screenImage = function() {
	var image = new Image();
	image.src = this.canvas.toDataURL("image/png");
	return image;
};