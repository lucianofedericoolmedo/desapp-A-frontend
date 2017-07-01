'use strict';

angular.module('discount').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-discount', {
			url: '/discount/create',
			templateUrl: 'modules/discounts/views/crud-actions-discount.view.html',
			controller: 'DiscountCtrl'
		}).
		state('edit-discount', {
			url: '/discount/edit/:id',
			templateUrl: 'modules/discounts/views/crud-actions-discount.view.html',
			controller: 'DiscountCtrl'
		}).
		state('list-discount', {
			url: '/discount/list',
			templateUrl: 'modules/discounts/views/list-discount.view.html',
			controller: 'DiscountCtrl'
		});

}])