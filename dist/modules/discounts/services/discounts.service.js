'use strict';

angular.module('discount').service('Disocunt', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/discounts/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        update : {
        	method: 'PUT' 
        },
        save : { 
        	method: 'POST' 
        },

        findByPage : {
            method:'GET',
            url: URLServer.url + '/services/discounts/find-by-page'
        },

        getAllPossibles : {
            method:'GET',
            url: URLServer.url + '/services/discounts/all-possibles',
            isArray: true
        }

    });
})