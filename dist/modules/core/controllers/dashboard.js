'use strict';

/**
 * @ngdoc function
 * @name core.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of core
 */
angular.module('core')
  .controller('DashboardCtrl', function($scope, $state, $controller) {
    $scope.$state = $state;
    //$controller('AppController', {$scope: $scope}); //This works


    $scope.menuItems = [];
    angular.forEach($state.get(), function (item) {
        if (item.data && item.data.visible) {
            $scope.menuItems.push({name: item.name, 
            	text: item.data.text});
        }
    });
  });
