'use strict';

angular.module('cart').controller('CartCtrl', [ '$scope', 
	'$controller', '$stateParams', 'Cart',
	'PaginatedSearch', '$timeout', '$state','$window', 'SweetAlert',
	function ($scope, $controller, $stateParams, Cart, 
		PaginatedSearch, $timeout, $state, $window, SweetAlert) {
	
	
		$scope.$state = $state;
		$controller('DashboardCtrl', {$scope: $scope}); //This works

		var service = Cart;
		$scope.search = new PaginatedSearch(service);

		var itemCheckInformation = {};

		$scope.findPage = function () {
			$scope.search.search();
		};

		function manageErrorResponse (message) {
			SweetAlert.swal("Error", 
						message, "error");
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

		$scope.delete = function(id) {
			SweetAlert.swal({
			   title: "Esta seguro?",
			   text: "No podra recobrar el carrito una vez eliminado!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Si, eliminelo!",
			   cancelButtonText: "No, cancele por favor!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			      helperRemove(id);
			   } else {
			      SweetAlert.swal("Cancelado", "Sigue teniedo el carrito :)", "error");
			   }
			});
		}

		function reloadPage(){
			$window.location.reload();
		}

		function helperRemove(id) {
			service.remove({ id : id},
				function(response){
					SweetAlert.swal("Ok", 
						"Se ha borrado el carrito con exito!", "success");
					$timeout(reloadPage, 500);					
				}, 
				function(errorResponse){
					SweetAlert.swal("Error", 
						"No se ha borrado el carrito!", "error")
				});
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
				console.log("En CartCtrl");
				console.log(successResponse);
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

}]);