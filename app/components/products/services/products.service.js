'use strict';

angular.module('product').service('Product', function($resource) {
    return $resource('/product/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: '/product/all',
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