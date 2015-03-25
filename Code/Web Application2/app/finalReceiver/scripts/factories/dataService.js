(function(){
  'use strict';

  angular.module('social-wall-receiverApp')
	.service('dataService', [function () {
		var ModDate= null;

		var thePhotos = [];
		
		//var photosSet = false;


		this.setPhotos = function(newSet) {
		    thePhotos = newSet;
		}

		this.setModDate = function(newdate){
			ModDate = newdate;
		}
		this.getPhotos = function(){
			return thePhotos;
		}

		this.getModDate = function(){
			return ModDate;
		}

	}]);

  })();