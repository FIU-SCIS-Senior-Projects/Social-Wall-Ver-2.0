(function(){
  'use strict';

  angular.module('social-wall-receiverApp')
  .controller('receiverController', ['$scope','fotoZapService', 'dataService',function($scope,fotoZapService,dataService){
  		

  		window.onload = function(){
  			window.connectManager = new connectsdk.ConnectManager();

  			window.connectManager.on('join',function(){

			
				document.getElementById('main').innerHTML +='SOMEONE LOGGED IN '; 
			});

        window.connectManager.on('ready',function(){

       document.getElementById('main').innerHTML +='Im ready to cast ';	
      });
			//var fz = fotoZapService;
			var dataservice = dataService;
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
                    var fotozapservice = fotoZapService;
		                var dataservice = dataService;
                    // window.connectManager.sendMessage(from, {message:"I got your JSON message :-)"});
                    //username,password,endpoint
			fotoZapService.callApi(user,pass,'https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media').then(function(res){
					  var arrayOfsrc =  fotozapservice.parseMediaIds(res.data.mediaIds,user,pass,campaignid);
					// document.getElementById('main').innerHTML +='In the inner function';
				    dh.setPhotos(arrayOfsrc);
					  dh.setModDate(new Date());
		
                   });

 			});
				 window.connectManager.init();   
  		}
  		//	var campaignid = '3207';
  	//	fotoZapService.callApi('snoel006@fiu.edu','fotozap','https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media').then(function(res){
	//				  var arrayOfsrc =  fotoZapService.parseMediaIds(res.data.mediaIds,'snoel006@fiu.edu','fotozap',campaignid);
	//				  dataService.setPhotos(arrayOfsrc);
	//				  dataService.setModDate(new Date());
	//	
	//		            });
	//	var fz = fotoZapService;		
	//	setTimeout(function(){
		
	//	 var campaignid = '3206';
         //       fz.callApi('snoel006@fiu.edu','fotozap','https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media').then(function(res){
           //                               var arrayOfsrc =  fz.parseMediaIds(res.data.mediaIds,'snoel006@fiu.edu','fotozap',campaignid);
            //                              dataService.setPhotos(arrayOfsrc);
             //                             dataService.setModDate(new Date());
		//
                //                    });
	//
	//
	//
	//	},10000);

  }]);

})();
