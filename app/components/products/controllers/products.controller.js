'use strict';

angular.module('product').controller('ProductCtrl', [ '$scope', '$stateParams', 'Product', 
	function ($scope, $stateParams, Product) {
	
		function manageErrorResponse (message) {
			window.alert(message);
		}

		$scope.newInstance = function () {
			$scope.product = new Product({
				name : '',
				categories : [],
				brand : undefined,
				prices : []
			});
		};

		$scope.get = function () {
			Product.get( { id : $stateParams.id }, function (successResponse) {
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