(function () {
    'use strict';

    angular.module('socialWall-sender')
        .controller('MainCtrl', ['$rootScope', '$scope', 'GoogleCastSession', function ($rootScope, $scope, GoogleCastSession) {
            $scope.source = 'RSS';
            $scope.URL = "";
            $scope.animation = "Fade";
            $scope.transitionSpeed = '3';
            
            $scope.disabled = true;
            $scope.state = 'Initializing Cast Api';

            // Listen to the different states
            $rootScope.$on('INITIALIZING_CAST_API', function () {
                console.log('Caught Event!');
                $scope.state = 'Initializing Cast Api';
                $scope.disabled = true;
                $scope.$apply();
            });
            $rootScope.$on('RECEIVER_AVAILABLE', function () {
                console.log('Caught Event!');
                $scope.state = 'Send to Chrome Cast';
                $scope.disabled = false;
                $scope.$apply();
            });
            $rootScope.$on('RECEIVER_DEAD', function () {
                console.log('Caught Event!');
                $scope.state = 'Receiver Died, Refresh Page';
                $scope.disabled = true;
                $scope.$apply();
            });

            // Send the data to the chrome cast
            $scope.sendToCast = function () {
                GoogleCastSession.startChromeCast({
                    source: $scope.source,
                    URL: $scope.URL,
                    console: $scope.console
                });
            }
        }]);
})();