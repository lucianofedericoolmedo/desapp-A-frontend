'use strict';

angular.module('discount').service('Discount', function($resource, URLServer) {
    return $resource(URLServer.url + '/services/discounts/:id', {'id': '@id'}, {

        get : {
        	method: 'GET'
        },
        update : {
        	method: 'PUT' 
        },
        save : { 
        	method: 'POST' 
        },

        findByPage : {
            method:'GET',
            url: URLServer.url + '/services/discounts/find-by-page'
        },

        getAllPossibles : {
            method:'GET',
            url: URLServer.url + '/services/discounts/all-possibles',
            isArray: true
        },

        getAllPriorities : {
            method:'GET',
            url: URLServer.url + '/services/discounts/fetch-priorities',
            isArray: true
        },

        perProduct : {
            method:'POST',
            url: URLServer.url + '/services/discounts/per-product',
        },

        perProductCategory : {
            method:'POST',
            url: URLServer.url + '/services/discounts/per-product-category',
        },

        perProductQuantity : {
            method:'POST',
            url: URLServer.url + '/services/discounts/per-product-quantity',
        }

    });
})