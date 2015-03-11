(function(){
  'use strict';
//This controller handles the creation and 


	angular.module('social-wall-receiverApp')
	.controller('carouselController', ['$scope', 'dataService',function($scope,dataService){
		
	$scope.animation	
	$scope.currentAnimation = 'scroll';
	$scope.isCurrentAnimation = function(aninm){
		return aninm === $scope.currentAnimation;
	}
	$scope.stopCarousel = function(){
		$scope.carouselObject.stopCarousel();
	}
	$scope.startCarousel = function(){
		$scope.carouselObject.stopAnimating();
	}
	$scope.stopCarouselAnimation = function(){
		$scope.carouselObject.stopAnimating();
	}
	$scope.chageImages = function(newimages){
		$scope.carouselObject.changeImages(newimages);
		
	}

	$scope.carouselDefaults = {
		switchInterval: 5000, // millisecs between switch
		width: 1250, // pixels
		height: 650, // pixels
		speed: 8, // pixels/16 millisecs
		animationFunction: 'scroll'	
	};

	$scope.createCarousel = function(parentElement,options){
		return new swcarousels(parentElement,options);
	}


	//$scope.carouselObject = $scope.createCarousel(document.getElementById('main'),$scope.carouselOptions);
		$scope.setCurrentAnimation = function(anim){
			$scope.carouselObject.changeAnimationFunc(anim);
			$scope.currentAnimation = anim;
	}

	$scope.$watch(dataService.getModDate, function(){
		var images = dataService.getPhotos();
		if(images.length > 0){
			$scope.carouselDefaults.images = images;
			if($scope.carouselObject){
				$scope.chageImages(images);
			}else{
			$scope.carouselObject = $scope.createCarousel(document.getElementById('main'),$scope.carouselDefaults);		
			}
			//$scope.carouselObject = $scope.createCarousel(document.getElementById('main'),$scope.carouselDefaults);	
		}



	});


}]);




})();