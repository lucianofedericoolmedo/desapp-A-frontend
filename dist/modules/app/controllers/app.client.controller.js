'use strict';


angular.module('app').controller('AppController', [
	'$rootScope', 
	'tmhDynamicLocale', 
	'$locale',
	'$scope', 
	'authService', 
  function(
  	$rootScope, 
  	tmhDynamicLocale, 
  	$locale,
  	$scope,
  	authService) {


    $scope.auth = authService;

    $scope.date = new Date();
    $scope.amount = 8000;


    $scope.login = function(){
      $scope.auth.login();
    };


    $scope.logout = function(){
      $scope.auth.logout();
    }

    $rootScope.availableLocales = {
      'es': 'Español',
      'en': 'English'
      };


    
    $rootScope.model = {selectedLocale: 'es'};
    $rootScope.$locale = $locale;
    $rootScope.changeLocale = tmhDynamicLocale.set;
	
  }
]);
