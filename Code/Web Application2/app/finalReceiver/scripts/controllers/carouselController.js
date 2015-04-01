(function(){
  'use strict';
//This controller handles the creation and 


	angular.module('social-wall-receiverApp')
	.controller('carouselController', ['$scope', 'dataService',function($scope,dataService){
	$scope.paused = {};
	$scope.currentCampaign=null;	
	$scope.currentAnimation = 'scroll';
	$scope.isCurrentAnimation = function(aninm){
		return aninm === $scope.currentAnimation;
	}
	$scope.stopCarousel = function(){
		$scope.paused.isPaused=true;
        var pauseElement = angular.element(document.querySelector('#pauseIcon'));
        if(pauseElement.hasClass('ng-hide')){
        	pauseElement.removeClass('ng-hide');
        }

        if($scope.carouselObject){
			$scope.carouselObject.stopCarousel();
		}
	}
	$scope.startCarousel = function(){
		$scope.paused.isPaused=false;
		var pauseElement = angular.element(document.querySelector('#pauseIcon'));
        if(!pauseElement.hasClass('ng-hide')){
        	pauseElement.addClass('ng-hide');
        }



        if($scope.carouselObject){
			$scope.carouselObject.startCarousel();
		}
	}
	$scope.stopCarouselAnimation = function(){
		$scope.carouselObject.stopAnimating();
	}
	$scope.chageImages = function(newimages){
		$scope.carouselObject.changeImages(newimages);
		
	}

	$scope.carouselDefaults = {
		switchInterval: 5000, // millisecs between switch
		width: window.innerWidth, // pixels
		height: window.innerHeight, // pixels
		speed: 8, // pixels/16 millisecs
		animationFunction: 'hardcut'	
	};

	$scope.createCarousel = function(parentElement,options){
		return new swcarousels(parentElement,options);
	}


	//$scope.carouselObject = $scope.createCarousel(document.getElementById('main'),$scope.carouselOptions);
		$scope.setCurrentAnimation = function(anim){
			$scope.carouselObject.changeAnimationFunc(anim);
			$scope.currentAnimation = anim;
	}

	$scope.$watch(function(){
			return dataService.getModDate();
		}, function(){
		//var images = dataService.getPhotos();
		/*if(images.length > 0){
			$scope.carouselDefaults.images = images;
			if($scope.carouselObject){
				console.log(images);
				$scope.chageImages(images);
			}else{
			$scope.carouselObject = $scope.createCarousel(document.getElementById('main'),$scope.carouselDefaults);		
			}
			//$scope.carouselObject = $scope.createCarousel(document.getElementById('main'),$scope.carouselDefaults);	
		}*/
		console.log('In the data service watch function');
		console.log(dataService.getmodifiedPhotos());
		console.log(dataService);
		if(dataService.getmodifiedPhotos()){
			var images = dataService.getPhotos();

			if(images.length > 0){
				$scope.carouselDefaults.images = images;
				if($scope.carouselObject){
				console.log(images);
				$scope.chageImages(images);
				}else{
				$scope.carouselObject = $scope.createCarousel(document.getElementById('main'),$scope.carouselDefaults);		
				}
			}
		}
		console.log(dataService.getmodifiedPlaying());
		if(dataService.getmodifiedPlaying()){
			if (dataService.getPlaying()) {
				$scope.startCarousel();
			}else{
				$scope.stopCarousel();
			}
		}
		

	},true);


}]);




})();
