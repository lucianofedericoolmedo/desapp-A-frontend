'use strict';

angular.module('shopping-list').service('ItemManagementSrv', [function () {

	this.newItemInstance = function () {
		this.item = {
			product : undefined,
			quantity : 0
		};
	};

	this.newItemInstance();

	// The quantity of the product should be pass as a field 'quantity' inside the 'product'
	// variable
	this.setProductAndQuantity = function (product) {
		this.item.product = product;
		this.item.quantity = product.quantity;
	};

}])