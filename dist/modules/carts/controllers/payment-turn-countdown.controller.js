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
				$state.go('check-items-cart', { id : null, justCreatedCart : null });
				return;
			}
			$scope.requestTimeStamp = currentTurn.requestTimeStamp;
			$scope.stimatedTime = currentTurn.stimatedTime;
			$scope.cashRegisterCode = currentTurn.cashRegisterCode;
		}

		$scope.setEndTime = function () {
			setCountdownInformation();
			if (!$scope.stimatedTime) {
				return;
			}
			if ($rootScope.endTime === undefined) {
				var now = new Date();
				var endTime = now.setSeconds(now.getSeconds() + $scope.stimatedTime);
				console.log(endTime);
				$rootScope.endTime = endTime;
			}
			$scope.endTime = $rootScope.endTime;
			console.log('Endtime '.concat($scope.endTime));
		};

		$scope.finishedCountdown = function () {
			$scope.showRedirection = true;
			$scope.showCountdown = false;
			console.log('Termino el conteo.');
			$rootScope.currentTurn = undefined;
		};

}]);