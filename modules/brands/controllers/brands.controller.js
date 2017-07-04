'use strict';

angular.module('brand').controller('BrandCtrl', [ '$scope','$controller', '$stateParams', 'Brand',
	'PaginatedSearch', 'SweetAlert', '$window', '$timeout',
	function ($scope, $controller, $stateParams, Brand, 
		PaginatedSearch, SweetAlert, $window, $timeout) {

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

		$scope.delete = function(id) {
			SweetAlert.swal({
			   title: "Esta seguro?",
			   text: "No podra recobrar los cambios una vez eliminado!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Si, eliminelo!",
			   cancelButtonText: "No, cancele por favor!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			      helperRemove(id);
			   } else {
			      SweetAlert.swal("Cancelado", "Sigue teniendo la marca :)", "error");
			   }
			});
		}

		function reloadPage(){
			$window.location.reload();
		}

		function helperRemove(id) {
			service.remove({ id : id},
				function(response){
					SweetAlert.swal("Ok", 
						"Se ha borrado la marca con exito!", "success");
					$timeout(reloadPage, 500);					
				}, 
				function(errorResponse){
					SweetAlert.swal("Error", 
						"No se ha borrado la marca!", "error")
				});
		};

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
				SweetAlert.swal("Error", 
						'Ingrese un nombre', "error");
				return;
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
					SweetAlert.swal("Ok", 
						"Se ha creado una marca", "success");
					$scope.newInstance();
				});
			}
		};

}]);