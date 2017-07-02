'use strict';

angular.module('discount').controller('DiscountCtrl', [ '$scope','$controller', '$stateParams', 'Discount',
	'PaginatedSearch', 'SweetAlert', '$state', 'PossibleDiscount', '$uibModal',
	'Product', 'ProductCategory',
	function ($scope, $controller, $stateParams, Discount, 
		PaginatedSearch, SweetAlert, $state, PossibleDiscount, $uibModal,
		Product, ProductCategory) {

		var service = Discount;

		$scope.discounts = PossibleDiscount.possiblesDiscounts;

		$scope.priorities = Discount.getAllPriorities();

		$controller('DashboardCtrl', {$scope: $scope}); //This works

		$scope.products = Product.getAll();

		$scope.productCategories = ProductCategory.getAll();

		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

		function manageErrorResponse (message) {
			SweetAlert.swal("Error", 
						message.data.message, "error");
		}

		$scope.newInstance = function () {
			$scope.discount = new Discount({
				name : '',
			});
		};

		$scope.get = function () {
			Discount.get( { id : $stateParams.id }, function (successResponse) {
				$scope.discount = successResponse;
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

		function sendEntityWithMethod (methodName, callback) {
			Discount[methodName]($scope.discount,
				function (successResponse) {
					callback(successResponse);
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.discount.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod($scope.discount.postMethod, function (successResponse) {
					SweetAlert.swal("Ok", 
						"Se ha creado una oferta", "success");
					$state.go('list-discount');
					$scope.newInstance();
				});
			}
		};

		$scope.changedDiscountType = function (selectedDiscountType) {
			$scope.discount = angular.copy(selectedDiscountType);
		};

		function selectModal (templateUrl, controller, variableName) {
			$uibModal.open({
				templateUrl: templateUrl,
				controller: controller
			}).result.then(function (selected) {
				$scope.discount[variableName] = selected;
			});
		}

		$scope.selectProduct = function () {
			selectModal('modules/products/views/modal-product-selection.view.html', 'ProductSelectionModalCtrl', 'product');
		};

		$scope.selectProductCategory = function () {
			selectModal('modules/product-categories/views/modal-product-category-selection.view.html', 'ProductCategorySelectionModalCtrl', 'productCategory');
		};

}]);