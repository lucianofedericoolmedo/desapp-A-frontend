'use strict';

angular.module('brand').controller('BrandCtrl', [ '$scope', '$stateParams', 'Brand', 
	function ($scope, $stateParams, Brand) {
	
		function manageErrorResponse (message) {
			window.alert(message);
		}

		$scope.newInstance = function () {
			$scope.brand = new Brand({
				name : '',
			});
		};

		$scope.get = function () {
			Brand.get( { id : $stateParams.id }, function (successResponse) {
				$scope.brand = response;
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
			Brand[methodName]($scope.brand,
				function (successResponse) {
					// Do something
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.brand.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save');
			}
		};

}]);