'use strict';


angular.module('app').controller('AppController', ['$scope', 'URLServer',
	function($scope,URLServer) {
		// This provides Authentication context.
		$scope.demoText = "Hello Angular Ui Router";
		console.log(URLServer.url);
	}
]);
