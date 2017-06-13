'use strict';

angular.module('product').service('Product', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/products/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/products/all',
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
            url: URLServer.url + '/services/products/find-by-page'
        },
        findNotInShoppingList : {
            method:'GET',
            url: URLServer.url + '/services/products/find-not-in-shopping-list'
        },

        updateDto : {
            method: 'PUT',
            url: URLServer.url + '/services/products/update-dto/:id'
        },
        saveDto : { 
            method: 'POST',
            url: URLServer.url + '/services/products/create-dto'
        }

    });
})