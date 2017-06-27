'use strict';

angular.module('purchases').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('list-purchase', {
			url: '/purchase/history-list',
			templateUrl: 'modules/purchases/views/list-purchase.view.html',
			controller: 'PurchaseCtrl'
		}).
		state('review-purchase', {
			url: '/purchase/history/:id',
			templateUrl: 'modules/purchases/views/purchase-detail.view.html',
			controller: 'PurchaseCtrl'
		});

}])