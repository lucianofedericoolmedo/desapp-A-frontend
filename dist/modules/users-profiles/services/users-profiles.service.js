'use strict';

angular.module('users-profiles').service('UserProfile', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/users-profiles/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getByUserId : {
            method: 'GET',
            url: URLServer.url + '/services/users-profiles/by-user/:id'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/users-profiles/all',
        	isArray: true
        },
        update : {
        	method: 'PUT' 
        }

    });
})