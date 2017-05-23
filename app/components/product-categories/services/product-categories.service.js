'use strict';

angular.module('product-category').service('ProductCategory', function($resource) {
    return $resource('http://localhost:8080/services/product-category/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: 'http://localhost:8080/services/product-category/all',
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