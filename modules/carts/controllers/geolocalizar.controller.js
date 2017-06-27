'use strict';

angular.module('cart').controller('GeolocalizarController', ['$scope', 'data', 'uiGmapGoogleMapApi',
	function ($scope, data, uiGmapGoogleMapApi) {

		$scope.ok = $scope.$close;

		$scope.init = function(){

			console.log(data.objetoAGeolocalizar);
			$scope.map = { 
				center: { latitude: data.objetoAGeolocalizar.lat, longitude: data.objetoAGeolocalizar.lng }, 
				markers: [],
				zoom: 15
			};
			var marker = {
                id: Date.now(),
                coords: {
                    latitude: data.objetoAGeolocalizar.lat,
                    longitude: data.objetoAGeolocalizar.lng
                }
            };
            $scope.map.markers.push(marker);
		};

		$scope.confirmarGeolocalizacion = function(){
			data.direccion = $scope.direccion;
			$scope.$close();
		}

}]);