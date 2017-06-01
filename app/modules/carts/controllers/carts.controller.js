'use strict';

angular.module('cart').controller('CartCtrl', [ '$scope', '$stateParams', 'Cart', 
	function ($scope, $stateParams, Cart) {
	
		var service = Cart;

		$scope.carts = Cart.getAll();

		function manageErrorResponse (message) {
			window.alert(message);
		}

		$scope.newInstance = function () {
			$scope.cart = new Cart({
				name : '',
			});
		};

		$scope.get = function () {
			service.get( { id : $stateParams.id }, function (successResponse) {
				$scope.cart = successResponse;
			}, manageErrorResponse);
		}

		$scope.crudInit = function () {
			var justCreatedCart = $stateParams.justCreatedCart;
			if (justCreatedCart) {
				$scope.cart = justCreatedCart;
				return;
			}
			var id = $stateParams.id;
			if (id) {
				$scope.get();
			} else {
				$scope.newInstance();
			}
		};

		function sendEntityWithMethod (methodName, callback) {
			Cart[methodName]($scope.cart,
				function (successResponse) {
					callback(successResponse);
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.cart.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save', function (successResponse) {
					$scope.newInstance();
				});
			}
		};

		$scope.delete = function (id) {
			service.remove({ id : id});
		};

}]);