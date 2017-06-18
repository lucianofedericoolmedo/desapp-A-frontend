'use strict';

angular.module('cart').controller('PaymentTurnCountdownCtrl', ['$scope', '$stateParams',
	'Cart', '$rootScope', '$state', '$filter', '$location',
	function ($scope, $stateParams, Cart, $rootScope, $state, $filter, $location) {
	
		$scope.showRedirection = false;
		$scope.showCountdown = true;

		function setCountdownInformation () {
			if ($stateParams.countdownInformation) {
				console.log('state params');
				var countdownInformation = $stateParams.countdownInformation;
			} else if ($rootScope.paymentCountdown) {
				console.log('root scope');
				var countdownInformation = $rootScope.countdownInformation;
			} else {
				console.log('none of previous');
				$location.url('/');
				return;
			}
			$scope.requestTimestamp = countdownInformation.requestTimestamp;
			$scope.stimatedTime = countdownInformation.stimatedTime;
		}

		$scope.setEndTime = function () {
			setCountdownInformation();
			var now = new Date();
			$scope.endTime = now.setSeconds(now.getSeconds() + $scope.stimatedTime);
		};

		$scope.finishedCountdown = function () {
			$scope.showRedirection = true;
			$scope.showCountdown = false;
			$rootScope.countdownInformation = undefined;
		};

}]);