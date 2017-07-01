'use strict';

angular.module('discount').controller('DiscountCtrl', [ '$scope','$controller', '$stateParams', 'Discount',
	'PaginatedSearch', 'SweetAlert', '$state',
	function ($scope, $controller, $stateParams, Discount, 
		PaginatedSearch, SweetAlert, $state) {

		var service = Discount;

		$controller('DashboardCtrl', {$scope: $scope}); //This works

		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

		function manageErrorResponse (message) {
			SweetAlert.swal("Error", 
						message.data.message, "error");
		}

		$scope.newInstance = function () {
			$scope.discount = new Discount({
				name : '',
			});
		};

		$scope.get = function () {
			Discount.get( { id : $stateParams.id }, function (successResponse) {
				$scope.discount = successResponse;
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
			if (!$scope.discount.name) {
				SweetAlert.swal("Error", 
						'Ingrese un nombre', "error");
				return;
			}
			Discount[methodName]($scope.discount,
				function (successResponse) {
					callback(successResponse);
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.discount.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save', function (successResponse) {
					SweetAlert.swal("Ok", 
						"Se ha creado una oferta", "success");
					$scope.newInstance();
				});
			}
		};

}]);