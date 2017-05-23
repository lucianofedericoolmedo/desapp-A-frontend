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
				$scope.product = successResponse;
				console.log(successResponse);
			}, manageErrorResponse);
		};

		$scope.crudInit = function () {
			var id = $stateParams.id;
			if (id) {
				$scope.get();
			} else {
				$scope.newInstance();
			}
		};

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

		$scope.products = [ {
			id : 1,
			name : 'Pitusas',
			imageUrl : 'http://www.santamariasa.com.ar/comercio/images/a00031359.jpg'
		}, {
			id : 2,
			name : 'Surtidas',
			imageUrl : 'https://www.latinando.de/media/images/org/Galletas-surtidas-DIVERSION-ARCOR-400g+_+78_0.jpg'
		}, {
			id : 3,
			name : 'Opera',
			imageUrl : 'http://www.aldo.com.uy/imagenes/img_contenido/productos/a/29266.jpg'
		}];

}]);