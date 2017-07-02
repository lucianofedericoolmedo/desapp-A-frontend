'use strict';

angular.module('product').controller('ProductCategorySelectionModalCtrl', [ '$scope', 
	'$controller','$stateParams', 'ProductCategory',
	'PaginatedSearch', '$uibModalInstance',
	'SweetAlert', 
	function ($scope, $controller, 
		ProductCategory, PaginatedSearch, $uibModalInstance, 
		SweetAlert) {

		var service = ProductCategory;
		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

		function manageErrorResponseHelper(message) {
			SweetAlert.swal("Error", 
				message.data.message, "error");
		}

		function manageErrorResponse (message) {
			manageErrorResponseHelper(message);
		}

		$scope.select = function (selectedProductCategory) {
			if (selectedProduct) {
				$uibModalInstance.close(selectedProductCategory);
			} else {
				$uibModalInstance.dismiss();
			}
		};

		$scope.cancel = $uibModalInstance.dismiss;

}]);