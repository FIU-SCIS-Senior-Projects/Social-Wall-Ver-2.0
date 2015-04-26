(function () {
    'use strict';

    angular.module('socialWall-shared')
        .directive('appHeading', function () {
            return {
                restrict: 'EA',
                templateUrl: '../shared/views/heading.html',
                scope: false
            };
        });
})();
