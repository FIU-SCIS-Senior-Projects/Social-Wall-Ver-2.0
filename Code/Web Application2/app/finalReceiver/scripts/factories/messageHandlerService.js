(function(){
  'use strict';

	angular.module('social-wall-receiverApp')
	.factory('messageHandlerService', ['dataService','fotoZapService',function (dataService,fotoZapService) {
		

		return {
			handlePlay:function(object){
				dataService.setPlaying(true);
				dataService.setmodifiedPlaying(true);
				dataService.setmodifiedPhotos(false);
				dataService.setModDate(new Date());
			},
			handlePause:function(){
				dataService.setPlaying(false);
				dataService.setmodifiedPlaying(true);
				dataService.setmodifiedPhotos(false);
				dataService.setModDate(new Date());
			},
			handleCampaignSelected:function(object){
				console.log('handling campaignselected message');
				var data = object.data;
				var dataArray = data.split(" ");
				var user = dataArray[0];
                var pass = dataArray[1];
                var campaignid = dataArray[2];

                 var fservice = fotoZapService;
		         var dservice = dataService;
		         
		         var that = this;
				fservice.callApi(user,pass,'https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media').then(function(res){
					  var arrayOfsrc =  fservice.parseMediaIds(res.data.mediaIds,user,pass,campaignid);
					// document.getElementById('main').innerHTML +='In the inner function';
				    dservice.setPhotos(arrayOfsrc);
				    dservice.setmodifiedPhotos(true);
				    dservice.setmodifiedPlaying(false);
					dservice.setModDate(new Date());
		
                   });
			},
			handleMessage:function(messageObject){
					var type = messageObject.type;
					console.log('received ur message');
					switch(type){
						case 'play':
						this.handlePlay(messageObject);
						break;

						case 'pause':
						this.handlePause(messageObject);
						break;

						case 'campaignseleted'

						this.handleCampaignSelected(messageObject);
						break;
					};


			}

		};
	}]);

})();