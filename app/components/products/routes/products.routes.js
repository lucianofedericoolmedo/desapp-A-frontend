'use strict';

angular.module('product').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-product', {
			url: '/product/create',
			templateUrl: 'components/products/views/create-product.view.html',
			controller: 'ProductCtrl'
		}).
		state('edit-product', {
			url: '/product/edit/:id',
			templateUrl: 'components/products/views/edit-product.view.html',
			controller: 'ProductCtrl'
		});

}])