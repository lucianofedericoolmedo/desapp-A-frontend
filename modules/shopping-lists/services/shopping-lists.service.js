'use strict';

angular.module('shopping-list').service('ShoppingList', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/shopping-lists/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/shopping-lists/all',
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

        createItem : {
            method: 'POST',
            url: URLServer.url + '/services/shopping-lists/create-item-for/:id',
            isArray: false
        },
        removeItem : {
            method: 'DELETE',
            url: URLServer.url + '/services/shopping-lists/remove-item-in/:itemId/:shoppingListId',
            isArray: false
        },
        updateItem : {
            method: 'PUT',
            url: URLServer.url + '/services/shopping-lists/update-item/:id',
            isArray: false
        },
        saveForUser : {
            method: 'POST',
            url: URLServer.url + '/services/shopping-lists/create-for/:userId',
            isArray: false
        },
        pageByUser : {
            method: 'GET',
            url: URLServer.url + '/services/shopping-lists/page-by-user',
            isArray: false
        }

    });
})