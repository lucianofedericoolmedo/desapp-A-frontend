'use strict';

angular.module('product').controller('ProductCtrl', [ '$scope', 
	'$controller','$stateParams', 'Product',
	'PaginatedSearch', 'Brand', '$uibModal', 
	'FileUpload', '$state', 'ProductCategory','SweetAlert', '$window', '$timeout',
	function ($scope, $controller, $stateParams, 
		Product, PaginatedSearch, Brand, $uibModal, 
		FileUpload, $state, ProductCategory, SweetAlert, $window, $timeout) {

		$scope.$state = $state;
		$controller('DashboardCtrl', {$scope: $scope}); //This works

		var service = Product;
		$scope.search = new PaginatedSearch(service);

		$scope.findPage = function () {
			$scope.search.search();
		};

		$scope.brands = Brand.getAll();
		$scope.productCategories = ProductCategory.getAll();
		$scope.products = Product.getAll();
		$scope.noImageSrc = 'http://www.jeaconf.org/UploadedFiles/Images/NoImage.jpg';

		function manageErrorResponseHelper(message) {
			SweetAlert.swal("Error", 
				message, "error");
		}

		function manageErrorResponse (message) {
			manageErrorResponseHelper(message);
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
				$scope.priceForDto = successResponse.currentPrice ? successResponse.currentPrice.price : undefined;
				Product.stockForProduct({ prodId : $scope.product.id },
					function (successResponse) {
						$scope.stockForDto = successResponse.quantity;
					}
				);
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

		$scope.delete = function(id) {
			SweetAlert.swal({
			   title: "Esta seguro?",
			   text: "No podra recobrar el producto una vez eliminado!",
			   type: "warning",
			   showCancelButton: true,
			   confirmButtonColor: "#DD6B55",confirmButtonText: "Si, eliminelo!",
			   cancelButtonText: "No, cancele por favor!",
			   closeOnConfirm: false,
			   closeOnCancel: false }, 
			function(isConfirm){ 
			   if (isConfirm) {
			      helperRemove(id);
			   } else {
			      SweetAlert.swal("Cancelado", "Sigue teniendo el producto :)", "error");
			   }
			});
		}

		function reloadPage(){
			$window.location.reload();
		}

		function helperRemove(id) {
			service.remove({ id : id},
				function(response){
					SweetAlert.swal("Ok", 
						"Se ha borrado el producto con exito!", "success");
					$timeout(reloadPage, 500);					
				}, 
				function(errorResponse){
					SweetAlert.swal("Error", 
						"No se ha borrado el producto!", "error")
				});
		};


		function buildDto() {
			var productDto = {};
			productDto.product = $scope.product;
			productDto.stock = $scope.stockForDto;
			productDto.price = $scope.priceForDto;
			return productDto;
		}

		function sendEntityWithMethod (methodName, callBack) {
			var dto = buildDto();

			service[methodName](dto,
				function (successResponse) {
					if (callBack) {
						callBack(successResponse);
					}
				}, manageErrorResponse);
		}

		$scope.saveOrUpdate = function () {
			var toListCallback = function (successResponse) {
				$state.go('list-product');
			};
			var dto = buildDto();

			if ($scope.product.id) {
				Product.updateDto({ id : $scope.product.id }, dto, toListCallback)
				//sendEntityWithMethod('updateDto', toListCallback);
			} else {
				sendEntityWithMethod('saveDto', toListCallback);
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

		$scope.openModalCrudProductCategory = function () {
			$uibModal.open({
				templateUrl: 'modules/product-categories/views/modal-crud-product-category.view.html',
				controller: 'ProductCategoriesCrudModalCtrl'
			}).result.then(function () {
				$scope.productCategories = ProductCategory.getAll();
			});
		};

		////////////// UPLOAD FILES //////////////

		$scope.uploadFiles = function(file, errFiles) {
			var successCallback = function (successResponse) {
				$scope.search.search();
			};
			var errorCallback = function (errorResponse) {
				console.alert(errorResponse);
			}
			FileUpload.uploadFile(file, "", successCallback, errorCallback);
		};

		////////////// CATEGORY //////////////

		$scope.addCategory = function (categoryToAdd) {
			if (categoryToAdd) {
				$scope.product.categories.push(categoryToAdd);
			}
		};

		$scope.removeCategory = function (index) {
			if (index !== null || index !== undefined) {
				$scope.product.categories.splice(index, 1);
			}
		};

		$scope.setStockForDto = function (stock) {
			$scope.stockForDto = stock;
		};

		$scope.setPriceForDto = function (price) {
			$scope.priceForDto = price;
		};

}]);