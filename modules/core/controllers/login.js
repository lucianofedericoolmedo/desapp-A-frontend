'use strict';

/**
 * @ngdoc function
 * @name yapp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of yapp
 */
angular.module('core')
  .controller('LoginCtrl', function($scope, $controller, $location) {


  	$controller('AppController', {$scope: $scope}); //This works

    $scope.submit = function() {

    	$scope.login();
      	//$location.path('/dashboard');

        return false;
    };

  });
