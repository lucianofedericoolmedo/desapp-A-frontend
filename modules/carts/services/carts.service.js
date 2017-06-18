'use strict';

angular.module('cart').service('Cart', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/carts/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        getAll : {
        	method: 'GET',
        	url: URLServer.url + '/services/carts/all',
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
            url: URLServer.url + '/services/carts/find-by-page'
        },

        createCartFromShoppingList : {
            method: 'POST',
            url: URLServer.url + '/services/carts/create-from-shopping-list-for-user/:shoppingListId/:userId'
        },

        setValueToItem : {
            method: 'PUT',
            url: URLServer.url + '/services/carts/check-item-cart/:id'
        },

        requestPurchaseTurn: {
            method: 'GET',
            url: URLServer.url + '/services/carts/request-turn/:id'
        },

        confirmTurn : {
            method: 'POST',
            url: URLServer.url + '/services/carts/confirm-turn'
        }

    });
})