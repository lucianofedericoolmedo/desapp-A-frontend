'use strict';

angular.module('shopping-list').service('ShoppingList', function($resource) {
    return $resource('http://localhost:8080/services/shopping-lists/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: 'http://localhost:8080/services/shopping-lists/all',
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
            url: 'http://localhost:8080/services/shopping-lists/create-item-for/:id',
            isArray: false
        },
        removeItem : {
            method: 'DELETE',
            url: 'http://localhost:8080/services/shopping-lists/remove-item-in/:itemId/:shoppingListId',
            isArray: false
        }

    });
})