(function ()
 {
    'use strict';

    angular.module('socialWall-sender')
    
        .directive('testSender', function () {
            return {
                restrict: 'EA',
                templateUrl: 'views/testsender.html',
                scope: false
            };
        });
})();
