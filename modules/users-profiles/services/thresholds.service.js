'use strict';

angular.module('users-profiles').service('Threshold', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/thresholds/:id', {'id': '@id'}, {

        getPossiblesThresholds : {
            method: 'GET',
            url: URLServer.url + '/services/thresholds/all-possibles',
            isArray: true
        },
        getPossiblesThresholdsCriterias : {
            method: 'GET',
            url: URLServer.url + '/services/thresholds/all-criterias-possibles',
            isArray: true
        }

    });
})