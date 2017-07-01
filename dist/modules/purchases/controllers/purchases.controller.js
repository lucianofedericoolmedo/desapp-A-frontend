'use strict';

angular.module('purchases').controller('PurchaseCtrl', 
	[ '$scope', '$stateParams', '$state', '$controller',
	'Purchase', 'PaginatedSearch', 'Authentication', 
	function ($scope, $stateParams, $state, $controller, Purchase, 
		PaginatedSearch, Authentication) {

		$scope.$state = $state;
		$controller('DashboardCtrl', {$scope: $scope}); //This works
		
		var service = Purchase;
		$scope.search = new PaginatedSearch(service);

		$scope.findPurchasesByUser = function () {
			$scope.search.queryData.userId = Authentication.getUserId();
			$scope.search.search('pageByUser');
		};

		function manageErrorResponse (message) {
			window.alert(message.data.message);
		}

		$scope.get = function () {
			service.getDto( { id : $stateParams.id }, function (successResponse) {
				$scope.purchase = successResponse;
			}, manageErrorResponse);
		};

		$scope.totalPaid = function (itemPurchaseDto) {
			var total = 0.00;
			angular.forEach(itemPurchaseDto, function (item) {
				total += item.historyProductPrice;
			});
			return total;
		};

}]);