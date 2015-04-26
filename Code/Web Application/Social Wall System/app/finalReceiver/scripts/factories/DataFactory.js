(function () {
    'use strict';

    angular.module('socialWall-receiver')
        .service('DataService', function () {
            // store photos
                             
            //  var photos = [{link:"http://photos-d.ak.instagram.com/hphotos-ak-xpa1/10611008_789984821044019_988173559_n.jpg"},
             //              {link:"http://photos-d.ak.instagram.com/hphotos-ak-xpa1/10611008_789984821044019_988173559_n.jpg"},
            //                {link:"http://photos-d.ak.instagram.com/hphotos-ak-xpa1/10611008_789984821044019_988173559_n.jpg"}];
                
                var photos = [];
                var source = 'RSSFeed';
                var URL = 'http://www.tinyurl.com/photozaptesting';
                var message = '';
                var transitionSpeed = '5000';
                var transition = '';
		var photosSet = false;
                
		this.arePhotosSet = function () {
		    return photosSet;
		}
		
		this.setphotosSet = function(newSet) {
		    photosSet = newSet;
		}
                
                this.getSource = function() {
                    return source;
                }
                
                this.setSource = function(newSource) {
                    source = newSource;
                }
                this.getPhotos = function(){
                    return photos;
                }
                
                this.getMessage = function(){
                    return message;
                }
                
                this.setMessage = function(newMessage) {
                    message = newMessage;
                }
                
               this.setPhotos = function(newPhotos) {
                    photos = newPhotos;
                }
                           
                this.getTransitionSpeed = function()
                {
                    return transitionSpeed;
                }
                
                this.setTransitionSpeed = function(newSpeed) {
                    transitionSpeed = newSpeed;
                }
                
                this.getURL = function() {
                    return URL;
                }
                
               this.setURL = function (newURL){
                    URL = newURL;
                }
		
		this.getTransition = function() {
		    return transition;
		}
		
		this.setTransition = function(newTran) {
		   transition = newTran;
		}
                
  
	});
})();