'use strict';

angular.module('product-category').controller('ProductCategoryCtrl',
 ['$scope', '$state','$controller','$stateParams',
 'ProductCategory', 'PaginatedSearch',
	function ($scope, $state, $controller, $stateParams, ProductCategory, PaginatedSearch) {
	
		var service = ProductCategory;

		$scope.$state = $state;
		$controller('DashboardCtrl', {$scope: $scope});

		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

		function manageErrorResponse (message) {
			window.alert(message);
		}

		$scope.newInstance = function () {
			$scope.productCategory = new ProductCategory({
				name : '',
			});
		};

		$scope.get = function () {
			ProductCategory.get( { id : $stateParams.id }, function (successResponse) {
				$scope.productCategory = successResponse;
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

		function sendEntityWithMethod (methodName) {
			ProductCategory[methodName]($scope.productCategory,
				function (successResponse) {
					// Do something
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.productCategory.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save');
			}
		};

}]);