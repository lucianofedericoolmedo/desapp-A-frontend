'use strict';

angular.module('users-profiles').controller('UserProfileCtrl', [ '$scope', '$stateParams', 
	'UserProfile', 'Authentication', '$location',
	function ($scope, $stateParams, UserProfile, Authentication, $location) {

		function manageErrorResponse (message) {
			window.alert(message.data.message);
		}

		$scope.findProfile = function () {
			var userId = Authentication.getUserId();
			UserProfile.getByUserId( { id : userId }, function (successResponse) {
				$scope.profile = successResponse;
			}, manageErrorResponse);
		};

		$scope.update = function () {
			var userProfile = angular.copy($scope.profile);
			UserProfile.update(userProfile, function (successResponse) {
				$location.url('/');
			}, manageErrorResponse)
		};

}]);