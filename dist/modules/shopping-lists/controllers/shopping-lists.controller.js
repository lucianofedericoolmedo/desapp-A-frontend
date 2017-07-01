'use strict';

angular.module('shopping-list').controller('ShoppingListCtrl', 
	[ '$scope', '$state', '$controller',
	'$stateParams', '$location', 'ShoppingList', 
	'ItemManagementSrv', 'Product',
	'PaginatedSearch', 'Cart', 'Authentication',
	function ($scope, $state, $controller,
		$stateParams, $location, ShoppingList, 
		ItemManagementSrv, Product, 
		PaginatedSearch, Cart, Authentication) {

		$scope.$state = $state;
		$controller('DashboardCtrl', {$scope: $scope}); //This works

		$scope.usersShoppingLists = new PaginatedSearch(ShoppingList);

		$scope.searchUsersShoppingLists = function () {
			console.log(Authentication.getUserId());
			$scope.usersShoppingLists.queryData.userId = Authentication.getUserId();
			$scope.usersShoppingLists.search('pageByUser');
		};

		function manageErrorResponse (errorResponse) {
			window.alert(errorResponse.data.message);
		}

		$scope.newInstance = function () {
			$scope.shoppingList = new ShoppingList({
			});
		};

		$scope.get = function () {
			ShoppingList.get( { id : $stateParams.id }, function (successResponse) {
				$scope.shoppingList = successResponse;
				// Once the shopping list is assigned, the unassigned products are fetched.
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

		$scope.saveOrUpdate = function () {
			console.log(Authentication.getUserId());
			if ($scope.shoppingList.id) {
				ShoppingList.update($scope.shoppingList,
					function (successResponse) {
						$location.path('/shopping-list/list');
					}, manageErrorResponse);
			} else {
				ShoppingList.saveForUser({ userId : Authentication.getUserId() }, 
					$scope.shoppingList,
					function (successResponse) {
						$location.path('/shopping-list/edit/'.concat(successResponse.id));
					}, manageErrorResponse);
			}
		};

		$scope.createCartFromShoppingList = function (shoppingList) {
			var data = {
				shoppingListId : { value : shoppingList.id },
				userId : { value : Authentication.getUserId() }
			}
			Cart.createCartFromShoppingList(data, function (successResponse) {
				$state.go('check-items-cart', { id : successResponse.id, justCreatedCart : successResponse });
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
				product.quantity = product.quantity ? product.quantity + 1 : 1;
			}
		};

		$scope.addProduct = function (product) {
			if (product && product.id && product.quantity && product.quantity > 0) {
				var item = {
					product: product,
					quantity: product.quantity
				}
				ShoppingList.createItem({ id : $scope.shoppingList.id }, item, function (successResponse) {
					var persistedItem = successResponse;
					persistedItem.initialQuantity = persistedItem.quantity;
					$scope.shoppingList.items.push(persistedItem);
					$scope.searchProductsNotInShoppingList();
				}, manageErrorResponse);
			}
		};

		$scope.updateItem = function (item) {
			ShoppingList.updateItem(item, function (successResponse) {
				item.initialQuantity = item.quantity;
			}, manageErrorResponse);
		};

		$scope.removeItem = function (item, index) {
			var itemId = item.id;
			var shoppingListId = $scope.shoppingList.id;
			ShoppingList.removeItem({ itemId : itemId , shoppingListId : shoppingListId },
				function (successResponse) {
					$scope.searchProductsNotInShoppingList();
					$scope.shoppingList.items.splice(index, 1);
			}, manageErrorResponse);
		};

}]);