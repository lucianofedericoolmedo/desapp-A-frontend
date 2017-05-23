'use strict';

angular.module('product-category').controller('ProductCategoryCtrl', [ '$scope', '$stateParams', 'ProductCategory', 
	function ($scope, $stateParams, ProductCategory) {
	
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
				$scope.productCategory = response;
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