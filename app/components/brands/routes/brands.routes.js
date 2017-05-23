'use strict';

angular.module('brand').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-brand', {
			url: '/brand/create',
			templateUrl: 'components/brands/views/crud-actions-brand.view.html',
			controller: 'BrandCtrl'
		}).
		state('edit-brand', {
			url: '/brand/edit/:id',
			templateUrl: 'components/brands/views/crud-actions-brand.view.html',
			controller: 'BrandCtrl'
		});

}])