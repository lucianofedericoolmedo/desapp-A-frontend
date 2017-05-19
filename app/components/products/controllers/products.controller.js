'use strict';

angular.module('product').controller('ProductCtrl', [ '$scope', '$stateParam', 'Product', 
	function ($scope, $stateParam, Product) {
	
		function manageErrorResponse (message) {
			window.alert(message);
		}

		$scope.newInstance = function () {
			$scope.product = new Product({
				name : 'undefined',
				categories : [],
				brand : undefined,
				prices : []
			});
		};

		$scope.get = function () {
			Product.get( { id : $stateParam.id }, function (successResponse) {
				$scope.product = response;
			}, manageErrorResponse);
		}

		function sendEntityWithMethod (methodName) {
			Product[methodName]($scope.product,
				function (successResponse) {
					// Do something
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.product.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save');
			}
		};

}]);