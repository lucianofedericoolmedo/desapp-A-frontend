'use strict';

angular.module('cart').controller('GeolocalizarController', ['$scope',
 'data', 'uiGmapGoogleMapApi', '$controller',
	function ($scope, data, uiGmapGoogleMapApi,$controller) {

		$scope.ok = $scope.$close;

		$controller('DashboardCtrl', {$scope: $scope}); //This works
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
			$scope.$close();
		}

}]);