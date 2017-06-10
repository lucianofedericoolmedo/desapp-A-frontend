'use strict';

angular.module('core').service('FileUpload', ['$http', function ($http) {

	var url = 'http://localhost:8080/services/upload/product-batch-uploading'

	var uploadFile = function(image, path, success, error) {
		var fd = new FormData();
		fd.append('image', image);
		$http.post(url, fd, {
			//withCredentials: true,
			headers: {'Content-Type': undefined },
			transformRequest: angular.identity
		}).then(success, error);
	};

	return {
		uploadFile : uploadFile
	};

}]);