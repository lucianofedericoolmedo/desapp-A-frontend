'use strict';

angular.module('core').controller('HomeCtrl', [ '$scope', 'Authentication', 
	'UserAuthentication', '$location',
	function ($scope, Authentication, UserAuthentication, $location) {

		$scope.createUserInstance = function () {
			$scope.user = new UserAuthentication({
				username : '',
				password : '',
			});
		};

		function basicUserSign (signMethod) {
			UserAuthentication[signMethod]($scope.user, function (userSuccessResponse) {
				Authentication.setUserData(userSuccessResponse);
				$scope.toLogOrNotToLog();
				$location.url('/');
			}, function (errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		}

		$scope.register = function () {
			basicUserSign('signup');
		};

		$scope.login = function () {
			basicUserSign('signin');
		};

		$scope.toLogOrNotToLog = function () {
			$scope.isLoggued = Authentication.isAnyLoggued();
		};

		$scope.hasRole = function (role) {
			return Authentication.hasRole(role);
		};

}])