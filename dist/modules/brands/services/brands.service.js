'use strict';

angular.module('brand').service('Brand', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/brands/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/brands/all',
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

        findByPage : {
            method:'GET',
            url: URLServer.url + '/services/brands/find-by-page'
        },

    });
})