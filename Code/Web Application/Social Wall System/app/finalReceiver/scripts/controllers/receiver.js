(function () {
    'use strict';

    angular.module('socialWall-receiver')
        .controller('ReceiverCtrl', ['$scope', '$timeout', '$http', 'GoogleCastMessageBus', 'DataService', 'rssService',
            function ($scope, $timeout, $http, GoogleCastMessageBus, DataService, rssService) {
                
            $scope.source = 'RSSFeed';
            $scope.URL = "http://tinyurl.com/nynogx3";
            $scope.message = '';
             
          

            GoogleCastMessageBus.onMessage = function (e) {
                console.log('Message Received:', e.data);

                // Parse the setting JSON
                var messageSentBySenderApp = JSON.parse(e.data);
                console.log('Setting', messageSentBySenderApp );

                // Set them on the scope
                DataService.setSource(messageSentBySenderApp.source);
                DataService.setURL(messageSentBySenderApp.URL);
                DataService.setMessage(messageSentBySenderApp.message);
                DataService.setTransition(messageSentBySenderApp.transition);
                
                $scope.source = DataService.getSource();
                $scope.URL = DataService.getURL();
                $scope.message = DataService.getMessage();
                
                $scope.$apply();
            
                console.log($scope.URL);
                console.log(DataService.getURL());
                console.log(messageSentBySenderApp.URL);
            


            var fotos = [];
            function loadFeed(){

			rssService.parseFeed($scope.URL).then(function(res){
				var feed = res.data.responseData.feed;
                                fotos = res.data.responseData.feed.entries;
                                DataService.setPhotos(fotos);
                                DataService.setphotosSet(true)
			});
                        //console.log(fotos.)
		}
                
                loadFeed();
                
                //DataService.setPhotos(photos);

           };
            
        }]);
})();
