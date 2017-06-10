'use strict';

angular.module('product').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-product', {
			url: '/product/create',
			templateUrl: 'modules/products/views/crud-actions-product.view.html',
			controller: 'ProductCtrl'
		}).
		state('edit-product', {
			url: '/product/edit/:id',
			templateUrl: 'modules/products/views/crud-actions-product.view.html',
			controller: 'ProductCtrl'
		}).
		state('list-product', {
			url: '/product/list',
			templateUrl: 'modules/products/views/list-product.view.html',
			controller: 'ProductCtrl'
		}).
		state('crud-batch', {
			url: '/product/crud-batch',
			templateUrl: 'modules/products/views/batch-crud-product.view.html',
			controller: 'ProductCtrl'
		});

}])