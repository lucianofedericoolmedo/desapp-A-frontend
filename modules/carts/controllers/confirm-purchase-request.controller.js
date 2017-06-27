'use strict';

angular.module('cart').controller('ConfirmCartPurchaseCtrl', ['$scope', '$stateParams', 'Cart',
	'$rootScope', '$state', 'uiGmapGoogleMapApi', '$uibModal',
	function ($scope, $stateParams, Cart, $rootScope, $state, uiGmapGoogleMapApi,$uibModal) {
	
		$scope.turn = $stateParams.turn;

		$scope.direccion = {};

		$scope.confirmTurn = function () {
			Cart.confirmTurn($scope.turn, function () {
				$rootScope.currentTurn = $scope.turn;
				$state.go('payment-turn-countdown', { currentTurn : $scope.turn });
			});
		};


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
				console.log("Cerrando ...");
				//.. Algo que involucre borrado del carrito ... (?)
			});				
		};	


		$scope.confirmarGeolocalizacion = function(){
			console.log('confirmarGeolocalizacion');
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
			      	console.log('El mapa no está disponible para estos datos de domicilio.');
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
				console.log("Cerrando ..");
				geolocalizarHelper();
			});
		};

}]);

angular.module('cart').filter('secondsToDateTime', [function() {
    return function(seconds) {
        return new Date(1970, 0, 1).setSeconds(seconds);
    };
}])