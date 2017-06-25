'use strict';

angular.module('cart').controller('CheckItemsCartCtrl', ['$scope', 'Cart', '$state', '$timeout',
	'Authentication', '$stateParams', '$location',
	function ($scope, Cart, $state, $timeout, Authentication, $stateParams, $location) {

		var itemCheckInformation = {};

		function manageErrorResponse (message) {
			window.alert(message.data.message);
		}

		$scope.get = function () {
			Cart.get( { id : $stateParams.id }, function (successResponse) {
				$scope.cart = successResponse;
			}, manageErrorResponse);
		};

		function fetchDataFromStateParams () {
			var justCreatedCart = $stateParams.justCreatedCart;
			if (justCreatedCart) {
				$scope.cart = justCreatedCart;
				return;
			}
			var id = $stateParams.id;
			if (id) {
				$scope.get();
			} else {
				$state.go('list-cart');
			}
		}

		function fetchUnattendedCartForUser () {
			Cart.findUnattendedCartForUser({ id: Authentication.getUserId() },
				function (unattendedCartId) {
					if (unattendedCartId.value !== null) {
						Cart.get({ id : unattendedCartId.value },
							function (fetchedCart) {
								$scope.cart = fetchedCart;
							}
						);
					} else {
						fetchDataFromStateParams();
					}
				}
			);			
		}

		$scope.checkItemsInit = function () {
			if ($stateParams.justCreatedCart || $stateParams.id) {
				fetchDataFromStateParams();
			} else {
				fetchUnattendedCartForUser();
			}

		};

		var sendingItemCheckState = false;

		$scope.checkItem = function (item) {
			item.checked = !item.checked;
			if (itemCheckInformation[item.id]) {
				itemCheckInformation[item.id] = false;
				return;
			}
			itemCheckInformation[item.id] = true;
			var sendRequest = function () {
				if (!itemCheckInformation[item.id]) {
					return;
				}
				var dataToSend = { checked : item.checked };
				if (item.checked) {
					dataToSend.newQuantity = item.quantity;
				}
				Cart.setValueToItem({ id : item.id }, dataToSend, function (successResponse) {
					itemCheckInformation[item.id] = false;
				}, function (errorResponse) {
					item.checked = !item.checked;
					itemCheckInformation[item.id] = false;
				});
			}
			$timeout(sendRequest, 3000);
		};

		function isSendingAnyItemCheckState() {
			var sendingItemCheckState = false;
			angular.forEach(Object.keys(itemCheckInformation), function (itemId) {
				sendingItemCheckState = sendingItemCheckState || itemCheckInformation[itemId];
			});
			return sendingItemCheckState;
		}

		$scope.requestPurchaseTurn = function () {
			if (isSendingAnyItemCheckState()) {
				$timeout(function () {}, 3000);
			}
			Cart.requestPurchaseTurn({ id : $scope.cart.id }, function (successResponse) {
				$state.go('confirm-cart-purchase', { turn : successResponse });
			}, function (errorResponse) {
				alert(errorResponse);
			});
		};

		$scope.decreaseQuantity = function (itemCart) {
			if (itemCart && itemCart.quantity) {
				itemCart.quantity = itemCart.quantity - 1;
			}
		};

		$scope.canDecrease = function (itemCart) {
			if (itemCart) {
				return itemCart.quantity !== undefined && itemCart.quantity > 0;
			}
			return false;
		};

		$scope.increaseQuantity = function (itemCart) {
			if (itemCart) {
				itemCart.quantity = itemCart.quantity ? itemCart.quantity + 1 : 1;
			}
		};

		$scope.cancelCart = function () {
			Cart.cancelCart({ id : $scope.cart.id },
				function (successResponse) {
					$state.go('list-shopping-list');
				}, manageErrorResponse
			);
		};

}])