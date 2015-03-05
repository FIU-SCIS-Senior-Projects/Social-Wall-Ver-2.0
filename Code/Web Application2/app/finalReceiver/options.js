'use strict';
//Top level object for the main carousel object;
var swcarousel = swcarousel || {};

swcarousel.Options = function(carousel,options){

//Established deafault values for the carousel.

	var defaults = {
		switchInterval: 5000, // millisecs between switch
		width: 512, // pixels
		height: 255, // pixels
		speed: 8, // pixels/16 millisecs
		animationFunction: swcarousel.animationFunction.scroll
	};


	function stringSetting(name,options, defaultValue) {
		var value = options[name];
		//console.log(options);
		//console.log("the value" + value);
		//console.log("the name" + name);
		if (value != undefined) {
			return value;
		} else {
			console.log("warning: Failed to locate data attribute 'data-" + name + 
				"', returning default value " + defaultValue);
			return defaultValue.toString();
		}
	}
	function contextWidth(carousel) {
		if (carousel.parentNode !== null && carousel.parentNode.clientWidth > 0) {
			return carousel.parentNode.clientWidth;
		}
		return 100000;
	}


	function intSetting(name,options, defaultValue) {
		var value = stringSetting(name, options, defaultValue);
		var ret = parseInt(value, 10);
		if (ret == NaN) {
			console.log("error: Expected parameter " + value + 
            	" to be a number, using default value: " + defaultValue);
			return defaultValue;
		}
		return ret;
	}

	function setupAnimationFunction(name) {
		for (var f in swcarousel.animationFunction) {
			console.log(f);
			if (f === name) {
				console.log("Using animationFunction function " + f);
				return window['swcarousel']['animationFunction'][f];
			}
		}
		console.log("warning: Missing defined blend function, defaulting to scroll");
		return defaults.animationFunction;
	}
	var requestedWidth = intSetting('width',options, defaults.width);
	var requestedHeight = intSetting('height', options ,defaults.height);

	var ratio = requestedHeight / requestedWidth;

	this.width = Math.min(requestedWidth, contextWidth(carousel));
	this.height = this.width * ratio;
	this.switchInterval = intSetting('switchInterval', options,defaults.switchInterval);
	this.speed = intSetting('speed', options,defaults.speed);
	this.animationFunction = setupAnimationFunction(stringSetting('animationFunction',options , 'unknown'));
	this.images = options['images'];

	this.changeInterval = function(newinterval){
		this.switchInterval = newinterval;
	}
	this.changeAnimationFunc = function(newanime){
		this.animationFunction = setupAnimationFunction(newanime);
		//alert(this.animationFunction);
	}
	this.changeSpeed = function(newsp){
		this.speed = newsp;
	}

};