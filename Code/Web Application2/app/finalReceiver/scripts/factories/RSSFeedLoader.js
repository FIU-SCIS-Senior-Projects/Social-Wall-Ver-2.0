(function () {
    'use strict';

    angular.module('socialWall-receiver')
        .factory('RSSFeedLoader', ['$resource', function ($resource) {
	console.log("we here 23432");
    	return $resource('http://ajax.googleapis.com/ajax/services/feed/load', {}, {
			fetch: { method: 'JSONP', params: {v: '1.0', callback: 'JSON_CALLBACK'} }
			
		});
	}])
})();