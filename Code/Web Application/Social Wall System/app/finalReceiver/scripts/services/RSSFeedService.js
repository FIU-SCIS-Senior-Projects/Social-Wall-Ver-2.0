(function () {
    'use strict';

    angular.module('socialWall-receiver')
        .service('RSSFeedService', ['RSSFeedLoader', function (RSSFeedLoader, DataService) {
		 
	 var feeds = [];
	// var URL = DataService.getURL();
	 
	 console.log(URL);
	  this.get = function() {
		    RSSFeedLoader.fetch({q: URL , num: 10}, {}, function (data) {
				    var feed = data.responseData.feed;
				    feeds.push(feed);
						
				    var feed = data.responseData.feed.entires;
				    console.log("we made it here 3");
				    DataService.setPhotos(feeds);
					});

		    return DataService.getPhotos();
	    }
    }]);
})();