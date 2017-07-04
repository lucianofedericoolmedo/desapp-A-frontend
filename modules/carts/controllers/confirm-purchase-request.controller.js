'use strict';

angular.module('cart').controller('ConfirmCartPurchaseCtrl', ['$scope', '$controller','$stateParams', 'Cart',
	'$rootScope', '$state', 'uiGmapGoogleMapApi', '$uibModal', 'SweetAlert',
	function ($scope, $controller, $stateParams, Cart, $rootScope, 
		$state, uiGmapGoogleMapApi,$uibModal, SweetAlert) {
	
		$scope.$state = $state;
		$controller('DashboardCtrl', {$scope: $scope}); //This works

		$scope.turn = $stateParams.turn;

		$scope.direccion = {};

		$scope.confirmTurn = function () {
			Cart.confirmTurn($scope.turn, function () {
				$rootScope.currentTurn = $scope.turn;
				$state.go('payment-turn-countdown', 
					{ currentTurn : $scope.turn });
			});
		};

		function manageErrorResponse (message) {
			SweetAlert.swal("Error", 
						message, "error");
		}

		$scope.verMapa = function (){
			var templateUrl = 'modules/carts/views/geolocalizar.client.view.html';
			var controller = 'GeolocalizarController';
			$uibModal.open({
				templateUrl: templateUrl,
				controller: controller,
				resolve: {
				   data : $scope
				}
			}).result.then(function () {
				Cart.confirmDelivery({'turn': $scope.turn , 
						'shippingAddress' : {
							'street' : $scope.direccion.calle,
							'number' : $scope.direccion.numero,
							'city' : $scope.direccion.localidad,
							'province' : $scope.direccion.provincia
						}},
					function(data){
						SweetAlert.swal("Se ha confirmado el pedido a domicilio", 
							message, "success");
					},
					function(errorResponse){
						manageErrorResponse("No se pudo concretar el envio a domicilio");
					})

				//.. Algo que involucre borrado del carrito ... (?)
			});				
		};	


		$scope.confirmarGeolocalizacion = function(){
			geolocalizarHelper();
		}
 
		function geolocalizarHelper(){
					
			uiGmapGoogleMapApi.then(function(maps) {

			    var address = $scope.direccion.calle + ' ' + 
			    	$scope.direccion.numero +
			    	', ' + $scope.direccion.localidad + ', ' 
			    	+ $scope.direccion.provincia; 


			    var geocoder = new maps.Geocoder();
			    geocoder.geocode({'address': address}, function(results, status) {
			      if(status === 'OK'){
			        var location = { 
			      	   lat: results[0].geometry.location.lat(),
			      	   lng: results[0].geometry.location.lng()
			        };

			      	$scope.direccion.latitud = location.lat;
			      	$scope.direccion.longitud = location.lng;
			      	
			      	$scope.verMapaAfiliado();
			      }else{
			      	manageErrorResponse('El mapa no está disponible para estos datos de domicilio.');
			      }
			    });
			});
			
		}


		$scope.verMapaAfiliado = function(){
				$scope.objetoAGeolocalizar = {
					lat: $scope.direccion.latitud,
			      	lng: $scope.direccion.longitud
				};
				$scope.verMapa();
			};

		$scope.geolocalizarDomicilio = function() {

			// Falta resetear el carrito ...

			$uibModal.open({
				templateUrl: 'modules/carts/views/modal-add-domicilio.view.html',
				controller: 'GeolocalizarController',
				resolve: {
				   data : $scope
				}
			}).result.then(function () {
				geolocalizarHelper();
			});
		};

}]);

angular.module('cart').filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])