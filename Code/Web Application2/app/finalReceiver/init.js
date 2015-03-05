'use strict';
//Top level object for the main carousel object;
var swcarousel = swcarousel || {};


//The number of carousel instances currently generated;
//swcarousel.instances = 0;
//The method that initialized the properties,images,and starts the animations.

swcarousel.initializeCarousel = function(carousel, options){
	carousel.style.width = "" + options.frameWidth + "px";
	carousel.style.height = "" + options.frameHeight + "px";

	//var images = options.images;
	//for (var i = 0; i < images.length; ++i) {
	//	var image = images[i];
	//	image.style.display = "none";
	//}


	var canvasBuffer = new swcarousel.CanvasBuffer(carousel,options);
	var state = new swcarousel.State(carousel,options)
	

	console.log(options.images);
	console.log(state);
	state.preloadImages(options,function(images){
	state.images = images;
	canvasBuffer.context.drawImage(state.images[0], 0, 0, options.width, options.height);		
	canvasBuffer.scratch.drawImage(state.images[0], 0, 0, options.width, options.height);		
	swcarousel.animate(options, state, canvasBuffer);	
	});

	//canvasBuffer.context.drawImage(state.images[0], 0, 0, options.width, options.height);		
	//canvasBuffer.scratch.drawImage(state.images[0], 0, 0, options.width, options.height);		
	//swcarousel.animate(options, state, canvasBuffer);

}


//Initialized the carousel elements and their properties.
//Takes a DOM Element and a object of options 
swcarousel.init = function(element,options){

		var carousel = element;
		carousel.id = "swcarousel_parent" + this.instances++;
		console.log("Found carousel [" + this.instances + "/" + carousel.id);
		var options = new swcarousel.Options(carousel,options);
		swcarousel.initializeCarousel(carousel,options);
		return options;
}
