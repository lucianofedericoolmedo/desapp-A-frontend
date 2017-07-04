'use strict';

/**
 * @ngdoc function
 * @name core.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of core
 */
angular.module('core')
  .controller('DashboardCtrl', function($scope, Product, PaginatedSearch,
    $state, $controller) {
    $scope.$state = $state;
    $controller('AppController', {$scope: $scope}); //This works

    $scope.menuItems = [];
    angular.forEach($state.get(), function (item) {
        if (item.data && item.data.visible ) {
            if (hasRole(item)){
                $scope.menuItems.push({name: item.name, 
                text: item.data.text});  
            }        
            
        }
    });

    var productService = Product;
    $scope.search = new PaginatedSearch(productService);

    $scope.findPageForProducts = function () {
        $scope.search.search();
    };

    

    function hasRole(item){
        var roles = JSON.parse(localStorage.getItem("roles"));
        if (item.role === undefined){
            return true;
        }
        var includesRole = false;
        
        for (var index = 0; index < roles.length; index ++){
            includesRole = includesRole || roles[index].name === item.role;
        }
        return includesRole;
    }
  });
