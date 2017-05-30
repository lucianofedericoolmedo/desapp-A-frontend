'use strict';

// Setting up route
angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('app', {
			url: '/',
			templateUrl: 'modules/app/views/app.client.view.html'
		}).
		state('app2', {
			url: '/nose',
			templateUrl: 'modules/app/views/extra.html'
		});
	}
]);