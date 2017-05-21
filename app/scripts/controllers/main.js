'use strict';

/**
 * @ngdoc function
 * @name translateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the translateApp
 */
angular.module('translateApp')
  .controller('MainCtrl', function ($scope, Upload, FileUpload) {
    // Yeoman part (for tests)

	// upload later on form submit or something similar
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };

    function successCallback(response) {
    	console.log('Todo bien');
    }

    function errorCallback(errorResponse) {
    	console.log('Todo mal');
    }

	$scope.uploadFiles = function(file, errFiles) {
		FileUploadOsfe.uploadFile(file, "", successCallback, errorCallback);
	};

    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
