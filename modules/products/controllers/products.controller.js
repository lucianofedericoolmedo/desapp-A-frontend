'use strict';

angular.module('product').controller('ProductCtrl', [ '$scope', '$stateParams', 'Product', 'PaginatedSearch',
	'Brand', '$uibModal', 'FileUpload', '$state',
	function ($scope, $stateParams, Product, PaginatedSearch, Brand, $uibModal, FileUpload,
		$state) {

		var service = Product;
		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

		$scope.brands = Brand.getAll();
		$scope.products = Product.getAll();
		$scope.noImageSrc = 'http://www.jeaconf.org/UploadedFiles/Images/NoImage.jpg';

		function manageErrorResponse (message) {
			window.alert(message);
		}

		$scope.newInstance = function () {
			$scope.product = new Product({
				name : '',
				categories : [],
				brand : undefined,
				prices : [],
				imageUrl : ''
			});
		};

		$scope.get = function () {
			service.get( { id : $stateParams.id }, function (successResponse) {
				$scope.product = successResponse;
			}, manageErrorResponse);
		};

		$scope.crudInit = function () {
			var id = $stateParams.id;
			if (id) {
				$scope.get();
			} else {
				$scope.newInstance();
			}
		};

		$scope.delete = function (id) {
			service.remove({ id : id});
		};

		function sendEntityWithMethod (methodName, callBack) {
			service[methodName]($scope.product,
				function (successResponse) {
					$scope.newInstance();
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			if ($scope.product.id) {
				sendEntityWithMethod('update');
			} else {
				sendEntityWithMethod('save');
			}
		};

		$scope.openModalCrudBrand = function () {
			$uibModal.open({
				templateUrl: 'modules/brands/views/modal-crud-brand.view.html',
				controller: 'BrandCrudModalCtrl'
			}).result.then(function () {
				$scope.brands = Brand.getAll();
			});
		};

		$scope.uploadFiles = function(file, errFiles) {
			var successCallback = function (successResponse) {
				$state.go('list-product');
			};
			var errorCallback = function (errorResponse) {
				console.alert(errorResponse);
			}
			FileUpload.uploadFile(file, "", successCallback, errorCallback);
		};

}]);