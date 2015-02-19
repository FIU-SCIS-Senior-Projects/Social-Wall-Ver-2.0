(function () {
    'use strict';

    angular.module('socialWall-receiver')
        .controller('ReceiverCtrl', ['$scope', '$timeout', '$http', 'GoogleCastMessageBus', 'DataService', 'rssService','fotoZapFactory','connectSDKFactory',
            function ($scope, $timeout, $http, GoogleCastMessageBus, DataService, rssService,fotoZapFactory,connectSDKFactory) {
                
            $scope.source = 'RSSFeed';
            $scope.URL = "http://tinyurl.com/nynogx3";
            $scope.message = '';
             
            fotoZapFactory.parseFotoZapPhotos('snoel006@fiu.edu','fotozap','3207').then(function(res){
                var campaignid = res.data.id;
                var slides = [];
                var username = encodeURIComponent(fotoZapFactory.username);
                var hashPass = encodeURIComponent(fotoZapFactory.hashpassword);
                 angular.forEach(res.data.mediaIds, function(value,key){
                    slides.push({link:'https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media/'+value+'/ORIGINAL_Overlayed_Scaled960.jpg?user='+username+'&pass='+hashPass});
                });
                 DataService.setPhotos(slides);
                 DataService.setphotosSet(true);
            }); 

            window.connectManager.on('message', function(data) {
                    var from = data.from;
                    var message = data.message;
                    var messageString;
                    var isJSON = false;
                    if (typeof message == "string")
                    {
                        messageString = JSON.parse(message);
                    } else if (typeof message == "object")
                    {
                        messageString = JSON.stringify(message);
                        isJSON = true;
                    }
                    //textContainer.style.display = 'table';

                    //textElement.innerText = messageString;
                    alert(messageString);
                    if (isJSON)
                        window.connectManager.sendMessage(from, {message:"I got your JSON message :-)"});
                    else
                        window.connectManager.sendMessage(from, "I got your message :-)");
                });




            /*
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
                                DataService.setphotosSet(true);
			});
                        //console.log(fotos.)
		}
                
                loadFeed();
                
                //DataService.setPhotos(photos);

           }; */
            
        }]);
})();
