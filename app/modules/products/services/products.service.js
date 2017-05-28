'use strict';

angular.module('product').service('Product', function($resource) {
    return $resource('http://localhost:8080/services/products/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: 'http://localhost:8080/services/products/all',
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
            url: 'http://localhost:8080/services/products/find-by-page'
        },
        findNotInShoppingList : {
            method:'GET',
            url: 'http://localhost:8080/services/products/find-not-in-shopping-list'
        }

    });
})