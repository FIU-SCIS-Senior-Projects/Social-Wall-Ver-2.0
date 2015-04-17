(function(){
  'use strict';

  angular.module('social-wall-receiverApp')
	.service('dataService', [function () {
		var ModDate= null;
		var Playing = true;
		var modifiedPlaying = false;
		var thePhotos = [];
		var modifiedPhotos = false;	
		
		this.setPlaying = function(value){
			this.Playing = value;
		}
		this.setmodifiedPlaying = function(value){
			this.modifiedPlaying = value;	
		}
		this.setPhotos = function(newSet) {
			this.thePhotos = newSet;
		}
		this.setmodifiedPhotos = function(modp){
			this.modifiedPhotos = modp;
		}
		this.setModDate = function(newdate){
			console.log('setting the Mod Date');
			this.ModDate = newdate;
		}
///////////////////////////////////////////////////////
		this.getmodifiedPlaying = function(){
			return this.modifiedPlaying;
		}
		this.getPhotos = function(){
			return this.thePhotos;
		}
		this.getModDate = function(){

			console.log('get the mod date');
			return this.ModDate;
		}
		this.getPlaying = function(){
			return this.Playing;
		}
		this.getmodifiedPhotos = function(){
			return this.modifiedPhotos;
		}

	}]);

  })();
