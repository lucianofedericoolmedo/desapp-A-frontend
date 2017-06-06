'use strict';

angular.module('core').factory('PaginatedSearch', [ function () {

	return function (service, pageSizeParam) {
		this.queryData = {};
		this.pageNumber = 1; // Set it to ONE for offset for uib-paginator.
		this.pageSize = pageSizeParam ? pageSizeParam : 10;
		this.result = [];

		function findAndSet(data, service, parent, findMethodName) {
			service[findMethodName](data).$promise.then(function (results) {
				parent.totalSize = results.totalSize;
				parent.result = results.result;
			});
		}

		function dataToSend(parent, dataContainer) {
			var data = {};
			angular.forEach(Object.keys(dataContainer), function (k) {
				if (dataContainer[k] !== undefined) {
					data[k] = dataContainer[k];
				}
			});
			data.pageSize = parent.pageSize;
			data.pageNumber = parent.pageNumber - 1; // Substract the offset for uib-paginator.
			return data;
		}

		this.search = function (findMethodName) {
			var data = dataToSend(this, this.queryData);
			findAndSet(data, service, this, findMethodName ? findMethodName : 'findByPage');
		};

	}

}])