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