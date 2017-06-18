'use strict';

angular.module('cart').controller('ConfirmCartPurchaseCtrl', ['$scope', '$stateParams', 'Cart',
	'$rootScope', '$state',
	function ($scope, $stateParams, Cart, $rootScope) {
	
		$scope.turn = $stateParams.turn;

		$scope.confirmTurn = function () {
			Cart.confirmTurn($scope.turn, function () {
				var paymentCountdown = {
					requestTimestamp : $scope.turn.requestTimestamp,
					stimatedTime : $scope.turn.stimatedTime
				};
				$rootScope.paymentCountdown = paymentCountdown;
				$state.go('payment-turn-countdown', { countdownInformation : paymentCountdown});
			});
		};

}]);

angular.module('cart').filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])