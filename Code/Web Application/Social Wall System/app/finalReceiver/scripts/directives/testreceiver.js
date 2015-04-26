(function () {
    'use strict';

    angular.module('socialWall-receiver')
        .directive('testReceiver', function () {
            return {
                restrict: 'EA',
                templateUrl: 'views/testreceiver.html',
                scope: false
            };
        });
})();
