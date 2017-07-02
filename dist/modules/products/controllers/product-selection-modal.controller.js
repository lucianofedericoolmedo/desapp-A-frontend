'use strict';

angular.module('product').controller('ProductSelectionModalCtrl', [ '$scope', 
	'$controller','$stateParams', 'Product',
	'PaginatedSearch', '$uibModalInstance',
	'SweetAlert', 
	function ($scope, $controller, Product, 
		PaginatedSearch, $uibModalInstance, 
		SweetAlert) {

		var service = Product;
		$scope.search = new PaginatedSearch(service, 5);

		console.log($scope.search);

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

		$scope.select = function (selectedProduct) {
			if (selectedProduct) {
				$uibModalInstance.close(selectedProduct);
			} else {
				$uibModalInstance.dismiss();
			}
		};

		$scope.cancel = $uibModalInstance.dismiss;

}]);