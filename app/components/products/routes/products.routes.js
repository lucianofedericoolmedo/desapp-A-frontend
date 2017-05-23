'use strict';

angular.module('product').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-product', {
			url: '/product/create',
			templateUrl: 'components/products/views/crud-actions-product.view.html',
			controller: 'ProductCtrl'
		}).
		state('edit-product', {
			url: '/product/edit/:id',
			templateUrl: 'components/products/views/crud-actions-product.view.html',
			controller: 'ProductCtrl'
		}).
		state('list-product', {
			url: '/product/list',
			templateUrl: 'components/products/views/list-product.view.html',
			controller: 'ProductCtrl'
		});

}])