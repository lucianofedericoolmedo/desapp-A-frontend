'use strict';

angular.module('cart').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-cart', {
			url: '/cart/create',
			templateUrl: 'modules/carts/views/crud-actions-cart.view.html',
			controller: 'CartCtrl'
		}).
		state('edit-cart', {
			url: '/cart/edit/:id',
			templateUrl: 'modules/carts/views/crud-actions-cart.view.html',
			controller: 'CartCtrl',
			params: {
				id : undefined,
				justCreatedCart : undefined
			}
		});

}])