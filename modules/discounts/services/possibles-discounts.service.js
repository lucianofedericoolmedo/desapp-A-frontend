'use strict';

angular.module('discount').service('PossibleDiscount', [function () {

    this.possiblesDiscounts = [
        {
            name : 'Per Product',
            product : {},
            usesProduct : true,
            usesProductCategory : false,
            usesQuantity : false,
            postMethod : 'perProduct'
        }, {
            name : 'Per Product Quantity',
            usesProduct : true,
            usesProductCategory : false,
            usesQuantity : true,
            postMethod : 'perProductQuantity'
        }, {
            name : 'Per Product Category',
            productCategory : {},
            usesProduct : false,
            usesProductCategory : true,
            usesQuantity : false,
            postMethod : 'perProductCategory'
        }
    ];

    this.postMethodByDiscountName = {
        'Per Product' : 'perProductPut',
        'Per Product Quantity' : 'perProductQuantityPut',
        'Per Product Category' : 'perProductCategoryPut'
    };
    
}]);