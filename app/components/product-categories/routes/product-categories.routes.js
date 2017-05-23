'use strict';

angular.module('product-category').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-product-category', {
			url: '/product-category/create',
			templateUrl: 'components/product-categories/views/crud-actions-product-category.view.html',
			controller: 'BrandCtrl'
		}).
		state('edit-product-category', {
			url: '/product-category/edit/:id',
			templateUrl: 'components/product-categories/views/crud-actions-product-category.view.html',
			controller: 'BrandCtrl'
		});

}])