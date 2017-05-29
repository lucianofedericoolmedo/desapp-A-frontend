'use strict';

angular.module('cart').service('Cart', function($resource) {
    return $resource('http://localhost:8080/services/carts/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: 'http://localhost:8080/services/carts/all',
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

        createCartFromShoppingList : {
            method: 'POST',
            url: 'http://localhost:8080/services/carts/create-from-shopping-list-for-user/:shoppingListId/:userId'
        }

    });
})