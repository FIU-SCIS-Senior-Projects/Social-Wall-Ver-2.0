(function() {
  'use strict';

  angular.module('social-wall-receiverApp')
    .controller('receiverController', ['$scope', 'messageHandlerService', function($scope, messageHandlerService) {

      window.onload = function() {
        window.connectManager = new connectsdk.ConnectManager();

        window.connectManager.on('join', function() {

          console.log('SOMEONE LOGGED IN');
        });

        window.connectManager.on('ready', function() {
          console.log('Im ready to cast ');
        });


        window.connectManager.on('message', function(data) {

          messageHandlerService.handleMessage(data.message);
        });
        window.connectManager.init();
      }


    }]);

})();