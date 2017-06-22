'use strict';

angular.module('core').controller('HomeCtrl', [ '$scope', 'Authentication', 
	'UserAuthentication',
	function ($scope, Authentication, UserAuthentication) {

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
			}), function (errorResponse) {
				window.alert(errorResponse);
			};
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

}])