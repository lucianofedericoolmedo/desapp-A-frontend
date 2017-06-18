'use strict';

angular.module('cart').controller('PaymentTurnCountdownCtrl', ['$scope', '$stateParams',
	'Cart', '$rootScope', '$state',
	function ($scope, turn, Cart, $rootScope) {
	
		$scope.requestTimestamp = $stateParams.countdownInformation.requestTimestamp;
		$scope.stimatedTime = $stateParams.countdownInformation.stimatedTime;

		$scope.setEndTime = function () {
			var now = new Date();
			$scope.endTime = now.setSeconds(now.getSeconds() + $scope.stimatedTime);
		};

}]);