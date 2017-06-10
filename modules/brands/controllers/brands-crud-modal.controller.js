'use strict';

angular.module('brand').controller('BrandCrudModalCtrl', ['$scope', 'Brand', '$uibModalInstance',
	function ($scope, Brand, $uibModalInstance) {
	
		$scope.newInstance = function () {
			$scope.brand = new Brand({
				name: ''
			});
		};

		$scope.create = function () {
			if (!$scope.brand.name) {
				alert('A new brand must have a name.');
				return;
			}
			Brand.save($scope.brand, function (successResponse) {
				$uibModalInstance.close();
			}, function (errorResponse) {
				alert(errorResponse);
			});
		};

		$scope.cancel = $uibModalInstance.dismiss;

}])