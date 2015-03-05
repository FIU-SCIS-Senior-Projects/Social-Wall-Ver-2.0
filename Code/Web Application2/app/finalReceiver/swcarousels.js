function swcarousels(element,options){
	
	//This is the Div element where the carousel will be places
	this.carouselParent = element;

	//Defines the animation functions that the carousel will use 
	this.animationFunction={};
	//Defines the object in charge of animating the carousel
	//The object that calls the functions 60fps
	this.animate={};
	
	//Defines the state object that holds the information about the carousel
	//Whether its currently switching, the progress of the animation etc.
	this.state={};

	

	//Defines the object that holds the canvas elements.
	this.canvasBuffer={};
	
	
	//Defines the object that holds the animation parameters
	//speed of animation, width of canvas, height of canvas, switch Interval
	this.options = {};


	//Defines the defaults for the canvas if the object given does not specify it.
	this.defaults={
		switchInterval: 5000, // millisecs between switch
		width: 512, // pixels
		height: 255, // pixels
		speed: 8, // pixels/16 millisecs
		animationFunction: this.animationFunction.scroll
	};
	//Initializes the carousel
	this.init(options);

};

swcarousels.prototype.changeAnimationFunc = function(aniname){
	this.options.animationFunction = this.options.setupAnimationFunction(aniname);
};
/*
*
*
*/
swcarousels.prototype.setupAnimate = function setupAnimate(options,state,canvasBuffer){

var that = this;

this.animate.updateProgress = function updateProgress(state, options) {
		var g = options.speed/300;
		var M = 0.0012;
		var drag = Math.max(M*(-85+state.progress), 0);
		var acc = g - drag;
		var speed = Math.min(options.speed, acc*state.i);
		return Math.min(state.progress + speed, 100.0);
	}

this.animate.switchFrame = function switchFrame() {
		that.state.progress = that.animate.updateProgress(that.state, that.options);
		that.options.animationFunction(that.options, that.state, that.canvasBuffer);

		//canvasBuffer.renderNavigateLeft(state);
		//canvasBuffer.renderNavigateRight(state);

		if (that.state.progress >= 100.0) {
			console.log("Switch completed for " + that.state.switchTimerId);
			that.state.switchInProgress = false;
			//state.direction = state.Direction.RIGHT;
			that.state.setSourceImage(null);
		} else {
			requestAnimationFrame(switchFrame);
		}
		++that.state.i;
	}

	this.animate.startSwitchFrame = function startSwitchFrame() {
		if (that.state.switchInProgress) {
			console.log("Skipping switch for " + that.state.animationTimerId);
			return;
		}
		that.state.switchInProgress = true;
		console.log("Switching frames between " + that.state.currentFrame + " and " + that.state.nextFrame());

		
		that.state.currentFrame = that.state.nextFrame();
		that.state.progress = 0.0;
		that.state.i = 0;

		that.state.source = that.canvasBuffer.imageData(that.state.previousImage());
		that.state.target = that.canvasBuffer.imageData(that.state.currentImage());
		that.state.result = that.canvasBuffer.screenBuffer();

		that.state.animationTimerId = requestAnimationFrame(that.animate.switchFrame);
	}

	that.state.switchTimerId = window.setInterval(this.animate.startSwitchFrame, this.options.switchInterval);
	console.log("Started animation for " + that.canvasBuffer.id);


};
swcarousels.prototype.init = function(options){
		this.setupAnimationFunction();
		this.setUpOptions(options);
		this.setupCanvasBuffer();
		this.setUpState();
		var that = this;
		this.state.preloadImages(function(images){
			that.state.images = images;
			that.canvasBuffer.context.drawImage(that.state.images[0], 0, 0, that.options.width, that.options.height);		
			that.canvasBuffer.scratch.drawImage(that.state.images[0], 0, 0, that.options.width, that.options.height);		
			that.setupAnimate();
		});
		
};
swcarousels.prototype.setupCanvasBuffer = function(){
	var that = this;
	this.canvasBuffer.width = this.options.width;
	this.canvasBuffer.height = this.options.height;

	this.canvasBuffer.invisible = function invisible(e) {
		e.style.display = 'none';
		return e;
	}


	this.canvasBuffer.createCanvas = function createCanvas(options) {
		var canvas = document.createElement('canvas');
		canvas.width = options.width;
		canvas.height = options.height;
		return canvas;
	}

	this.canvasBuffer.highDef = function highDef(canvas, context) {
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

	this.canvasBuffer.width = this.options.width;
	this.canvasBuffer.height = this.options.height;

	this.canvasBuffer.canvas = this.canvasBuffer.createCanvas(this.options);
	this.canvasBuffer.id = "canvas_" + this.carouselParent.id;
	this.canvasBuffer.canvas.id = this.canvasBuffer.id;
	this.canvasBuffer.canvas.className = 'blend';
	this.carouselParent.appendChild(this.canvasBuffer.canvas);
	this.canvasBuffer.context = this.canvasBuffer.canvas.getContext("2d");
	this.canvasBuffer.highDef(this.canvasBuffer.canvas, this.canvasBuffer.context);



	this.canvasBuffer.scratchCanvas = this.canvasBuffer.invisible(this.canvasBuffer.createCanvas(this.options));
	this.canvasBuffer.scratchid = "canvas_scratch";
	this.canvasBuffer.scratchCanvas.id = this.canvasBuffer.scratchid;
	//console.log(this.scratchid );
	this.carouselParent.appendChild(this.canvasBuffer.scratchCanvas);
	this.canvasBuffer.scratch = this.canvasBuffer.scratchCanvas.getContext('2d');
	this.canvasBuffer.highDef(this.canvasBuffer.scratchCanvas, this.canvasBuffer.scratch);


	this.canvasBuffer.imageData = function(image) {
	that.canvasBuffer.scratch.drawImage(image, 0, 0, that.canvasBuffer.width, that.canvasBuffer.height);
	return that.canvasBuffer.scratch.getImageData(0, 0, that.canvasBuffer.width, that.canvasBuffer.height);
	};

this.canvasBuffer.screenBuffer = function() {
	return that.canvasBuffer.context.getImageData(0,0, that.canvasBuffer.width, that.canvasBuffer.height);
};

this.canvasBuffer.screenImage = function() {
	var image = new Image();
	image.src = this.canvas.toDataURL("image/png");
	return image;
};


};
swcarousels.prototype.setupAnimationFunction = function(){
	 
	this.animationFunction.blur = function(options, state, canvasBuffer) {
	var opacity = state.progress/100.0;
	var translucency = 1.0 - opacity;

	if(Math.round(state.progress) % 4 == 0){
	canvasBuffer.scratch.drawImage(state.sourceImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);
	canvasBuffer.scratch.globalAlpha = translucency;
	//canvasBuffer.scratch.drawImage(state.targetImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);		
	stackBlurCanvasRGB(canvasBuffer.scratchid,0,0,canvasBuffer.width, canvasBuffer.height,90 - state.i);

	canvasBuffer.scratch.globalAlpha = opacity;
	canvasBuffer.scratch.drawImage(state.targetImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);
	canvasBuffer.context.drawImage(canvasBuffer.scratchCanvas, 0,0, canvasBuffer.width, canvasBuffer.height);
	//canvasBuffer.scratch.clearRect(state.targetImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);
	}

};

this.animationFunction.fade = function(options, state, canvasBuffer) {
	var opacity = state.progress/100.0;
	var translucency = 1.0 - opacity;
	
	canvasBuffer.scratch.clearRect(0,0,canvasBuffer.width, canvasBuffer.height);

	canvasBuffer.scratch.globalAlpha = translucency;
	canvasBuffer.scratch.drawImage(state.sourceImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);

	canvasBuffer.scratch.globalAlpha = opacity;
	canvasBuffer.scratch.drawImage(state.targetImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);

	canvasBuffer.context.drawImage(canvasBuffer.scratchCanvas, 0,0, canvasBuffer.width, canvasBuffer.height);
	
};

this.animationFunction.scroll = function(options, state, canvasBuffer) {
	var x = state.progress * options.width/100.0;

	//if (state.direction == state.Direction.LEFT) {
	//	canvasBuffer.context.drawImage(state.sourceImage(), x, 0, canvasBuffer.width, canvasBuffer.height);
	//	canvasBuffer.context.drawImage(state.targetImage(), -canvasBuffer.width + x, 0, canvasBuffer.width, canvasBuffer.height);
	//} else {
		//console.log(state);
		canvasBuffer.context.drawImage(state.sourceImage(), -x, 0, canvasBuffer.width, canvasBuffer.height);
		canvasBuffer.context.drawImage(state.targetImage(), canvasBuffer.width - x, 0, canvasBuffer.width, canvasBuffer.height);
	//}
};

this.animationFunction.cards = function(options, state, canvasBuffer) {
	var x = state.progress * options.width/100.0;

	var SHADOW_WIDTH = 30;

	//if (state.direction == state.Direction.LEFT) {
		canvasBuffer.context.fillStyle = "rgba(0, 0, 0, 0.1)";
		canvasBuffer.context.beginPath();
		canvasBuffer.context.rect(x, 0, SHADOW_WIDTH, canvasBuffer.height);
		canvasBuffer.context.fill();		
		canvasBuffer.context.drawImage(state.targetImage(), -canvasBuffer.width + x, 0, canvasBuffer.width, canvasBuffer.height);
	//} else {
	//	canvasBuffer.context.fillStyle = "rgba(0, 0, 0, 0.1)";
	//	canvasBuffer.context.beginPath();
	//	canvasBuffer.context.rect(canvasBuffer.width - x - 0.3*(100 - state.progress), 0, SHADOW_WIDTH, canvasBuffer.height);
	//	canvasBuffer.context.fill();
	//	canvasBuffer.context.drawImage(state.targetImage(), canvasBuffer.width - x, 0, canvasBuffer.width, canvasBuffer.height);
	//}
};








};
swcarousels.prototype.setUpOptions = function(ops){

	
	this.options.switchInterval = null;
	this.options.width = null;
	this.options.height=  null; // pixels
	this.options.speed= null; // pixels/16 millisecs
	this.options.animationFunction= null;
	this.options.images = ops['images'];


	
	var that = this;
	console.log(that);
	this.options.stringSetting = function stringSetting(name,opt,defaultValue) {
		var value = opt[name];
		
		if (value != undefined) {
			return value;
		} else {
			console.log("warning: Failed to locate data attribute 'data-" + name + 
				"', returning default value " + defaultValue);
			return defaultValue.toString();
		}
	}

	this.options.contextWidth = function contextWidth(carousel) {
		if (carousel.parentNode !== null && carousel.parentNode.clientWidth > 0) {
			return carousel.parentNode.clientWidth;
		}
		return 100000;
	}
	this.options.setupAnimationFunction = function setupAnimationFunction(name) {
		for (var f in that.animationFunction) {
			console.log(f);
			if (f === name) {
				console.log("Using animationFunction function " + f);
				return that['animationFunction'][f];
			}
		}
		console.log("warning: Missing defined blend function, defaulting to scroll");
		return that.defaults.animationFunction;
	}

	this.options.intSetting =  function intSetting(name, opt,defaultValue) {
		var value = that.options.stringSetting(name, opt, defaultValue);
		var ret = parseInt(value, 10);
		if (ret == NaN) {
			console.log("error: Expected parameter " + value + 
            	" to be a number, using default value: " + defaultValue);
			return defaultValue;
		}
		return ret;
	}
	console.log(ops);
	var requestedWidth = this.options.intSetting('width',ops, this.defaults.width);
	var requestedHeight = this.options.intSetting('height', ops ,this.defaults.height);
	this.options.width = Math.min(requestedWidth, this.options.contextWidth(this.carouselParent));
	var ratio = requestedHeight / requestedWidth;
	this.options.height = ops.width * ratio;
	this.options.switchInterval = this.options.intSetting('switchInterval', ops,this.defaults.switchInterval);
	this.options.speed = this.options.intSetting('speed', ops,this.defaults.speed);
	this.options.animationFunction = this.options.setupAnimationFunction(this.options.stringSetting('animationFunction',ops , 'unknown'));
	console.log(this.options.height);
};
swcarousels.prototype.setUpState = function(){
	this.state.currentFrame = 0;
	this.state.tempSource = null;
	//The progress of the animation.
	this.state.progress = 0.0;
	this.state.images = null;
	this.state.i = 0;
	//The timer that handles the switching of the images.
	this.state.switchTimerId = -1;
	//The timer that records the identification of animation.
	this.state.animationTimerId = -1;
	//Determines whether the image is switching or not.
	this.state.switchInProgress = false;

	//Records the start time of the animation.
	this.state.animationStartTime = null;

	var that = this;
	this.state.currentImage = function(){
	return that.state.images[that.state.currentFrame];
	};

	this.state.currentImage = function(){
	return that.state.images[that.state.currentFrame];
	};

	this.state.preloadImages = function(callback){
		var loadedImages = 0;
		var ret = [];
		var images = that.options['images'];
		console.log(images);
		
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
	};

	this.state.incFrame = function () {
	return  ((that.state.currentFrame + 1) % that.state.images.length);
	};

	this.state.nextFrame = function () {
	return that.state.incFrame();
	};

	this.state.previousFrame = function () {
	var previous = that.state.currentFrame - 1 < 0 ?  that.state.currentFrame : that.state.currentFrame - 1;
	 return previous;
	};

	this.state.nextImage = function () {
	return that.state.images[that.state.nextFrame()];
	};

	this.state.previousImage = function () {
	return that.state.images[that.state.previousFrame()];
	};

	this.state.sourceImage = function () {
	if (that.state.tempSource !== null) {
		return that.state.tempSource;
	}
	return that.state.previousImage();
	};

	this.state.setSourceImage = function(img) {
	that.state.tempSource = img;
	};

	this.state.setSourceImage = function(img) {
	that.state.tempSource = img;
	};	

	this.state.targetImage = function () {
	return that.state.currentImage();
	};

};