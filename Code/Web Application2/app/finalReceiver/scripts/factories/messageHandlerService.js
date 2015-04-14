(function() {
	'use strict';

	angular.module('social-wall-receiverApp')
		.factory('messageHandlerService', ['dataService', 'fotoZapService', '$rootScope', function(dataService, fotoZapService, $rootScope) {


			return {
				handlePlay: function(object) {
					dataService.setPlaying(true);
					dataService.setmodifiedPlaying(true);
					dataService.setmodifiedPhotos(false);
					$rootScope.$apply(function() {
						dataService.setModDate(new Date());
					});
				},
				handlePause: function() {
					console.log('handling the pause');
					console.log(dataService);
					dataService.setPlaying(false);
					dataService.setmodifiedPlaying(true);
					dataService.setmodifiedPhotos(false);
					$rootScope.$apply(function() {
						dataService.setModDate(new Date());
					});

					console.log(dataService);
				},
				handleCampaignSelected: function(object) {
					console.log('handling campaignselected message');
					var data = object.data;
					console.log(data);
					console.log(fotoZapService);
					var dataArray = data.split(" ");
					var user = dataArray[0];
					var pass = dataArray[1];
					var campaignid = dataArray[2];

					var fservice = fotoZapService;
					var dservice = dataService;

					console.log(dservice);

					fservice.callApi(user, pass, 'https://zap-rest.fotozap.com/campaigns/' + campaignid + '/media?offset=0&limit=50').then(function(res) {

						var ids = [];
						for (var i = 0; i < res.data.length; i++) {
							var ob = res.data[i];
							ids.push(ob.id);
						};
						console.log(ids);
						var arrayOfsrc = fservice.parseMediaIds(ids, user, pass, campaignid);

						console.log('in the inner function');
						dservice.setPhotos(arrayOfsrc);
						dservice.setmodifiedPhotos(true);
						dservice.setmodifiedPlaying(false);
						console.log('innner inner function');
						dservice.setModDate(new Date());
						console.log('inner inner inner function');

					});
				},
				handleMessage: function(messageObject) {
					var type = messageObject.type;
					console.log('received ur message');
					switch (type) {
						case 'play':
							this.handlePlay(messageObject);
							break;

						case 'pause':
							this.handlePause();
							break;

						case 'campaignseleted':

							this.handleCampaignSelected(messageObject);
							break;
					};


				}

			};
		}]);

})();