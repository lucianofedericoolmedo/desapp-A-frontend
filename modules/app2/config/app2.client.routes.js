'use strict';

// Setting up route
angular.module('pode').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('poder', {
			url: '/poder',
			templateUrl: 'modules/app2/views/app2.client.view.html'
		}).
		state('poder2', {
			url: '/poder2',
			templateUrl: 'modules/app2/views/extra2.html'
		});
	}
]);