'use strict';

angular.module('brand').controller('BrandCtrl', [ '$scope','$controller', '$stateParams', 'Brand',
	'PaginatedSearch', 'SweetAlert',
	function ($scope, $controller, $stateParams, Brand, 
		PaginatedSearch, SweetAlert) {

		var service = Brand;

		$controller('DashboardCtrl', {$scope: $scope}); //This works

		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

		function manageErrorResponse (message) {
			SweetAlert.swal("Error", 
						message, "error");
		}

		$scope.newInstance = function () {
			$scope.brand = new Brand({
				name : '',
			});
		};

		$scope.get = function () {
			Brand.get( { id : $stateParams.id }, function (successResponse) {
				$scope.brand = successResponse;
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
			if (!$scope.brand.name) {
				console.log('invalid brand!');
			}
			Brand[methodName]($scope.brand,
				function (successResponse) {
					callback(successResponse);
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.brand.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save', function (successResponse) {
					$scope.newInstance();
				});
			}
		};

}]);