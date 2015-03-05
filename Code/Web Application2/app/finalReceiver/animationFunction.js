"use strict";
swcarousel = swcarousel || {};
swcarousel.animationFunction = swcarousel.animationFunction || {};



swcarousel.animationFunction.blur = function(options, state, canvasBuffer) {
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

}



swcarousel.animationFunction.fade = function(options, state, canvasBuffer) {
	var opacity = state.progress/100.0;
	var translucency = 1.0 - opacity;
	
	canvasBuffer.scratch.clearRect(0,0,canvasBuffer.width, canvasBuffer.height);

	canvasBuffer.scratch.globalAlpha = translucency;
	canvasBuffer.scratch.drawImage(state.sourceImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);

	canvasBuffer.scratch.globalAlpha = opacity;
	canvasBuffer.scratch.drawImage(state.targetImage(), 0, 0, canvasBuffer.width, canvasBuffer.height);

	canvasBuffer.context.drawImage(canvasBuffer.scratchCanvas, 0,0, canvasBuffer.width, canvasBuffer.height);
	
};

swcarousel.animationFunction.scroll = function(options, state, canvasBuffer) {
	var x = state.progress * options.width/100.0;

	//if (state.direction == state.Direction.LEFT) {
	//	canvasBuffer.context.drawImage(state.sourceImage(), x, 0, canvasBuffer.width, canvasBuffer.height);
	//	canvasBuffer.context.drawImage(state.targetImage(), -canvasBuffer.width + x, 0, canvasBuffer.width, canvasBuffer.height);
	//} else {
		canvasBuffer.context.drawImage(state.sourceImage(), -x, 0, canvasBuffer.width, canvasBuffer.height);
		canvasBuffer.context.drawImage(state.targetImage(), canvasBuffer.width - x, 0, canvasBuffer.width, canvasBuffer.height);
	//}
};

swcarousel.animationFunction.cards = function(options, state, canvasBuffer) {
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

swcarousel.animationFunction.immediate = function(options, state, canvasBuffer) {
	canvasBuffer.context.drawImage(state.targetImage(), 0,0, canvasBuffer.width, canvasBuffer.height);
};