(function () {
    'use strict';

    angular.module('socialWall-sender')
        // Google Cast SDK Application ID
        .value('CAST_APP_ID', '4EC064DF')
        .value('MESSAGE_NAMESPACE', 'urn:x-cast:com.angular.cast.message');
})();