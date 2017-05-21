'use strict';

angular.module('translateApp').service('FileUpload', [ '$http', function ($http) {


	var url = 'http://localhost:8080/services/upload/product-batch-uploading'

	var uploadFile = function(image, path, success, error) {
	//var url = URLConfig.server+'services/upload' + path;
	var fd = new FormData();
	fd.append('image', image);
	$http.post(url, fd, {
		//withCredentials: true,
		headers: {'Content-Type': undefined },
		transformRequest: angular.identity
	})
		.success(success)
		.error(error);
	};

	return {
		uploadFile : uploadFile
	};

}])