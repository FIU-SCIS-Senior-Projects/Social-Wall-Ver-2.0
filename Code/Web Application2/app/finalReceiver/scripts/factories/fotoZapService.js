(function(){
  'use strict';

	angular.module('social-wall-receiverApp')
	.factory('fotoZapService', ['$http',function ($http) {
		

		return {
			SetHttpCredentials:function(username,password){
				var token = window.btoa(username+":"+password);
				$http.defaults.headers.common['Authorization'] = 'Basic ' + token;
			},
			clearHttpCredentials:function(){
				$http.defaults.headers.common.Authorization = 'Basic ';
			},
			callApi:function(username,password,endpoint){
				this.SetHttpCredentials(username,password);
				return $http.get(endpoint);
			},
			parseMediaIds:function(arrayofMediaIds,username,password,campaignid){
				var hashpass = encodeURIComponent(password);
				var hashuser = encodeURIComponent(username);
				var arrayofSrcs=[];
				angular.forEach(arrayofMediaIds, function(value,key){
					arrayofSrcs.push('https://zap-rest.fotozap.com/campaigns/'+campaignid+'/media/'+value+'/ORIGINAL_Overlayed_Scaled960.jpg?user='+hashuser+'&pass='+hashpass);
				});
				return arrayofSrcs;
			}

		};
	}]);

})();