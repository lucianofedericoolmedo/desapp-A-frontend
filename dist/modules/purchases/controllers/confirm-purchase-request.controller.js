'use strict';

angular.module('cart').controller('ConfirmCartPurchaseCtrl', ['$scope', '$stateParams', 'Cart',
	'$rootScope', '$state',
	function ($scope, $stateParams, Cart, $rootScope, $state) {
	
		$scope.turn = $stateParams.turn;

		$scope.confirmTurn = function () {
			Cart.confirmTurn($scope.turn, function () {
				$rootScope.currentTurn = $scope.turn;
				$state.go('payment-turn-countdown', { currentTurn : $scope.turn });
			});
		};

}]);

angular.module('cart').filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])