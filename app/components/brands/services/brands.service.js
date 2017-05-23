'use strict';

angular.module('brand').service('Brand', function($resource) {
    return $resource('http://localhost:8080/services/brand/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: 'http://localhost:8080/services/brand/all',
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
        }

    });
})