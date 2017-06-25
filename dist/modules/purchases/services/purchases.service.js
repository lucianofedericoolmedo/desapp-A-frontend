'use strict';

angular.module('purchases').service('Purchase', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/purchases/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/purchases/all',
        	isArray: true
        },
        update : {
        	method: 'PUT' 
        },
        save : { 
        	method: 'POST' 
        },
        remove : { 
        	method:'DELETE' 
        },

        pageByUser : {
            method:'GET',
            url: URLServer.url + '/services/purchases/find-by-page-for-user'
        },

        getDto : {
            method: 'GET',
            url: URLServer.url + '/services/purchases/get-dto/:id'
        }

    });
})