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
    $controller('AppController', {$scope: $scope}); //This works

    $scope.menuItems = [];
    console.log($state.get());
    angular.forEach($state.get(), function (item) {
        console.log(item);
        console.log(localStorage.getItem('roles').name);
        if (item.data && item.data.visible ) {
            if (hasRole(item)){
                $scope.menuItems.push({name: item.name, 
                text: item.data.text});
            }            
        }
    });

    function hasRole(item){
        var roles = localStorage.getItem('roles');
        if (item.role !== undefined){
            return true;
        }
        var includesRole = false;
        else{
            for (var index = 0; index < roles.length; index ++){
                includesRole = includesRole || roles[index].name === item.role;
            }
        }
        return includesRole;
    }
  };
