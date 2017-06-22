'use strict';

angular.module('cart').controller('PaymentTurnCountdownCtrl', ['$scope', '$stateParams',
	'Cart', '$rootScope', '$state', '$filter', '$location',
	function ($scope, $stateParams, Cart, $rootScope, $state, $filter, $location) {
	
		$scope.showRedirection = false;
		$scope.showCountdown = true;

		function setCountdownInformation () {
			if ($stateParams.currentTurn) {
				var currentTurn = $stateParams.currentTurn;
			} else if ($rootScope.currentTurn) {
				console.log($rootScope.currentTurn);
				var currentTurn = $rootScope.currentTurn;
			} else {
				$location.url('/');
				return;
			}
			$scope.requestTimeStamp = currentTurn.requestTimeStamp;
			$scope.stimatedTime = currentTurn.stimatedTime;
			$scope.cashRegisterCode = currentTurn.cashRegisterCode;
		}

		$scope.setEndTime = function () {
			setCountdownInformation();
			if ($rootScope.endTime === undefined) {
				var now = new Date();
				var endTime = now.setSeconds(now.getSeconds() + $scope.stimatedTime);
				$rootScope.endTime = endTime;
			}
			$scope.endTime = $rootScope.endTime;
		};

		$scope.finishedCountdown = function () {
			$scope.showRedirection = true;
			$scope.showCountdown = false;
			$rootScope.currentTurn = undefined;
		};

}]);