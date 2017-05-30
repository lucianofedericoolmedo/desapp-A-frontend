'use strict';


angular.module('app').controller('App2Controller', ['$scope',
	function($scope) {
		// This provides Authentication context.
		$scope.demoText = "Hello Angular Ui Router - App2";
	}
]);
