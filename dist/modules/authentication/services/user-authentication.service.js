'use strict';

angular.module('authentication').service('UserAuthentication', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/users/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/carts/all',
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

        signup : {
            method: 'POST',
            url: URLServer.url + '/services/users/signup'
        },

        signin : {
            method: 'POST',
            url: URLServer.url + '/services/users/signin'
        },

    });
})