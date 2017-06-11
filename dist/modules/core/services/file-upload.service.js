'use strict';

angular.module('core').service('FileUpload', ['$http', 'URLServer', function ($http, URLServer) {

	var url = URLServer.url + '/services/upload/product-batch-uploading';

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