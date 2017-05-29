'use strict';

angular.module('shopping-list').controller('ShoppingListCtrl', [ '$scope', '$state', 
	'$stateParams', '$location', 'ShoppingList', 'ItemManagementSrv', 'Product',
	'PaginatedSearch', 'Cart',
	function ($scope, $state, $stateParams, $location, ShoppingList, ItemManagementSrv, Product, 
		PaginatedSearch, Cart) {
	
		$scope.shoppingLists = ShoppingList.getAll();

		$scope.hardcodedUser = { id : 1 };

		function manageErrorResponse (message) {
			window.alert(message);
		}

		$scope.newInstance = function () {
			$scope.shoppingList = new ShoppingList({
				name : '',
			});
		};

		$scope.get = function () {
			ShoppingList.get( { id : $stateParams.id }, function (successResponse) {
				$scope.shoppingList = successResponse;
				// Once the shopping list is assigned, the not assigned products are fetched.
				$scope.searchProductsNotInShoppingList();
			}, manageErrorResponse);
		}

		$scope.crudInit = function () {
			var id = $stateParams.id;
			if (id) {
				$scope.get();
			} else {
				$scope.newInstance();
			}
		};

		$scope.delete = function (id) {
			service.remove({ id : id});
		};

		function sendEntityWithMethod (methodName, callback) {
			ShoppingList[methodName]($scope.shoppingList,
				function (successResponse) {
					if (callback) {
						callback(successResponse);
					}
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.shoppingList.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save', function (successResponse) {
					$location.path('/shopping-list/edit/'.concat(successResponse.id));
				});
			}
		};

		$scope.createCartFromShoppingList = function (shoppingList) {
			var data = {
				shoppingListId : { value : shoppingList.id },
				userId : { value : $scope.hardcodedUser.id }
			}
			Cart.createCartFromShoppingList(data, function (successResponse) {
				$state.go('edit-cart', { id : successResponse.id, justCreatedCart : successResponse });
			}, manageErrorResponse);
		};

		//////////// ITEM MANAGEMENT /////////////
		$scope.searchNotInShoppingList = new PaginatedSearch(Product);

		$scope.searchProductsNotInShoppingList = function () {
			$scope.searchNotInShoppingList.queryData.shoppingListId = $scope.shoppingList.id;
			$scope.searchNotInShoppingList.search('findNotInShoppingList');
		};

		$scope.initializeQuantity = function (product) {
			if (product && product.quantity === undefined) {
				product.quantity = 0;
			}
		};

		$scope.decreaseQuantity = function (product) {
			if (product && product.quantity) {
				product.quantity = product.quantity - 1;
			}
		};

		$scope.canDecrease = function (product) {
			if (product) {
				return product.quantity !== undefined && product.quantity > 0;
			}
			return false;
		};

		$scope.increaseQuantity = function (product) {
			if (product) {
				product.quantity = product.quantity + 1;
			}
		};

		$scope.addProduct = function (product) {
			if (product && product.id && product.quantity && product.quantity > 0) {
				var item = {
					product: product,
					quantity: product.quantity
				}
				ShoppingList.createItem({ id : $scope.shoppingList.id }, item, function (successResponse) {
					$scope.shoppingList.items.push(successResponse);
					$scope.searchProductsNotInShoppingList();
				}, manageErrorResponse);
				//ItemManagementSrv.setProductAndQuantity(product);
			}
		};

		$scope.removeItem = function (item, index) {
			var itemId = item.id;
			var shoppingListId = $scope.shoppingList.id;
			ShoppingList.removeItem({ itemId : itemId , shoppingListId : shoppingListId },
				function (successResponse) {
					$scope.shoppingList.splice(index, 1);
			}, manageErrorResponse);
		};

}]);