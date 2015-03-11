(function(){
  'use strict';

  angular.module('social-wall-receiverApp')
  .controller('receiverController', ['$scope','fotoZapService', 'dataService',function($scope,fotoZapService,dataService){
  		

  		window.onload = function(){
  			window.connectManager = new connectsdk.ConnectManager();

  			window.connectManager.on('join',function(){

				console.log("someone joined");

			});


 			window.connectManager.on('message', function(data) {

				var from = data.from;
                    var message = data.message;
                    var messageString;
                    var isJSON = false;
                    if (typeof message == "string")
                    {
                        messageString = message;
                    } else if (typeof message == "object")
                    {
                        messageString = JSON.stringify(message);
                        isJSON = true;
                    }

                    var messagearray = messageString.split(" ");
                    var user = messagearray[0];
                    var pass = messagearray[1];
                    var campaignid = messagearray[2];
                    //username,password,endpoint
fotoZapService.callApi(user,pass,'https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media').then(function(res){
					  var arrayOfsrc =  fotoZapService.parseMediaIds(res.data.mediaIds,user,pass,campaignid);
					  dataService.setImages(arrayOfsrc);
					  dataService.setModTime(new Date());

                    });

 			});
				 window.connectManager.init();   
  		}
  			//var campaignid = '3207';
  		//fotoZapService.callApi('snoel006@fiu.edu','fotozap','https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media').then(function(res){
		//			  var arrayOfsrc =  fotoZapService.parseMediaIds(res.data.mediaIds,'snoel006@fiu.edu','fotozap',campaignid);
		//			  dataService.setPhotos(arrayOfsrc);
		//			  dataService.setModDate(new Date());

		//            });


  }]);

})();