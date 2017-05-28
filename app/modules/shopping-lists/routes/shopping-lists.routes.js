'use strict';

angular.module('shopping-list').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('create-shopping-list', {
			url: '/shopping-list/create',
			templateUrl: 'modules/shopping-lists/views/crud-actions-shopping-list.view.html',
			controller: 'ShoppingListCtrl'
		}).
		state('edit-shopping-list', {
			url: '/shopping-list/edit/:id',
			templateUrl: 'modules/shopping-lists/views/crud-actions-shopping-list.view.html',
			controller: 'ShoppingListCtrl'
		}).
		state('list-shopping-list', {
			url: '/shopping-list/list',
			templateUrl: 'modules/shopping-lists/views/list-shopping-list.view.html',
			controller: 'ShoppingListCtrl'
		});

}])