'use strict';

angular.module('cart').controller('CartCtrl', [ '$scope', '$stateParams', 'Cart',
	'PaginatedSearch',
	function ($scope, $stateParams, Cart, PaginatedSearch) {
	
		var service = Cart;
		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

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
		};

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

		$scope.checkItem = function (item) {
			item.checked = !item.checked;
		};

}]);