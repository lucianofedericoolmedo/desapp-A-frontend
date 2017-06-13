'use strict';

angular.module('product-category').controller('ProductCategoriesCrudModalCtrl', ['$scope',
	'ProductCategory', '$uibModalInstance',
	function ($scope, ProductCategory, $uibModalInstance) {
	
		$scope.newInstance = function () {
			$scope.productCategory = new ProductCategory({
				name: ''
			});
		};

		$scope.create = function () {
			if (!$scope.productCategory.name) {
				alert('A new category must have a name.');
				return;
			}
			ProductCategory.save($scope.productCategory, function (successResponse) {
				$uibModalInstance.close();
			}, function (errorResponse) {
				alert(errorResponse);
			});
		};

		$scope.cancel = $uibModalInstance.dismiss;

}])