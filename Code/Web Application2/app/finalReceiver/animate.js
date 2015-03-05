'use strict';

swcarousel.animate = function(options,state,canvasBuffer){

	
	// Get a smoother looking animation by using accelaration and breaking.
	//the progress is a value between 0.0 and 100.0 that denoted the completion of the animation.
	function updateProgress(state, options) {
		var g = options.speed/300;
		var M = 0.0012;
		var drag = Math.max(M*(-85+state.progress), 0);
		var acc = g - drag;
		var speed = Math.min(options.speed, acc*state.i);
		return Math.min(state.progress + speed, 100.0);
	}

	function switchFrame() {
		state.progress = updateProgress(state, options);
		options.animationFunction(options, state, canvasBuffer);

		//canvasBuffer.renderNavigateLeft(state);
		//canvasBuffer.renderNavigateRight(state);

		if (state.progress >= 100.0) {
			console.log("Switch completed for " + state.switchTimerId);
			state.switchInProgress = false;
			//state.direction = state.Direction.RIGHT;
			state.setSourceImage(null);
		} else {
			requestAnimationFrame(switchFrame);
		}
		++state.i;
	}

	function startSwitchFrame() {
		if (state.switchInProgress) {
			console.log("Skipping switch for " + state.animationTimerId);
			return;
		}
		state.switchInProgress = true;
		console.log("Switching frames between " + state.currentFrame + " and " + state.nextFrame());

		
		state.currentFrame = state.nextFrame();
		state.progress = 0.0;
		state.i = 0;

		state.source = canvasBuffer.imageData(state.previousImage());
		state.target = canvasBuffer.imageData(state.currentImage());
		state.result = canvasBuffer.screenBuffer();

		state.animationTimerId = requestAnimationFrame(switchFrame);
	}
	
	state.switchTimerId = window.setInterval(startSwitchFrame, options.switchInterval);
	console.log("Started animation for " + canvasBuffer.id);


};