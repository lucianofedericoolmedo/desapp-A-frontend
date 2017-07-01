'use strict';

angular.module('product-category').controller('ProductCategoriesCrudModalCtrl', ['$scope',
	'ProductCategory', '$uibModalInstance','SweetAlert',
	function ($scope, ProductCategory, $uibModalInstance, SweetAlert) {
	
		$scope.newInstance = function () {
			$scope.productCategory = new ProductCategory({
				name: ''
			});
		};

		$scope.create = function () {
			if (!$scope.productCategory.name) {
				SweetAlert.swal("Error", 
				'A new category must have a name.', "error");
				return;
			}
			ProductCategory.save($scope.productCategory, function (successResponse) {
				$uibModalInstance.close();
			}, function (errorResponse) {
				SweetAlert.swal("Error", 
				errorResponse, "error");
			});
		};

		$scope.cancel = $uibModalInstance.dismiss;

}])