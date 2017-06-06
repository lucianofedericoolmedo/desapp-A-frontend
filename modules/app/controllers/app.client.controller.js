'use strict';


angular.module('app').controller('AppController', ['$scope', 'authService',
  function($scope,authService) {
    // This provides Authentication context.
    $scope.demoText = "Bueenasss";
    $scope.auth = authService;


    $scope.login = function(){
      $scope.auth.login();
    }
  }
]);
