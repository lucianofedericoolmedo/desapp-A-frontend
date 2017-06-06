'use strict';

angular.module('product-category').service('ProductCategory', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/products-categories/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/products-categories/all',
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