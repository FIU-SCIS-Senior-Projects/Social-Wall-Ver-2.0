(function(){
  'use strict';

  angular.module('social-wall-receiverApp')
  .controller('receiverController', ['$scope','messageHandlerService',function($scope,messageHandlerService){
  		

  		window.onload = function(){
  			window.connectManager = new connectsdk.ConnectManager();

  			window.connectManager.on('join',function(){

			
			//	document.getElementById('main').innerHTML +='SOMEONE LOGGED IN '; 
      console.log('SOMEONE LOGGED IN');
			});

        window.connectManager.on('ready',function(){

       //document.getElementById('main').innerHTML +='Im ready to cast ';	
       console.log('Im ready to cast ');
      });		//Hi
			//var fotozapservice = fotoZapService;
			//var dataservice = dataService;
 			window.connectManager.on('message', function(data) {
		/*
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
                   
                    var fservice = fotozapservice;
		                var dservice = dataservice;
                    // window.connectManager.sendMessage(from, {message:"I got your JSON message :-)"});
                    //username,password,endpoint
			fotozapservice.callApi(user,pass,'https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media').then(function(res){
					  var arrayOfsrc =  fservice.parseMediaIds(res.data.mediaIds,user,pass,campaignid);
					// document.getElementById('main').innerHTML +='In the inner function';
				    dservice.setPhotos(arrayOfsrc);
					  dservice.setModDate(new Date());
		
                   });
            */
            messageHandlerService.handleMessage(data.message);
 			}); 
				 window.connectManager.init();   
  		}
  	//		var campaignid = '3207';
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
