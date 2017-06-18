'use strict';

angular.module('authenticacion').value('userAuthenticationData', {});
angular.module('authenticacion').service('Authentication', ['userAuthenticationData',
	'$state', 'DateUtils',
	function (userAuthenticationData, $state, DateUtils) {

		this.setUserData = function (user) {
			userAuthenticationData.user = user;
			userAuthenticationData.loginDate = new Date();
		}

		this.getUser = function () {
			return userAuthenticationData.user;
		}

		this.getLoginDate = function () {
			return userAuthenticationData.loginDate;
		}

		this.isAnyLoggued = function () {
			return this.getUser() !== undefined;
		}

		this.getUserId = function () {
			var hardcodedUserId = 1;
			return hardcodedUserId;
			if (this.isAnyLoggued()) {
				return this.getUser().id;
			} else {
				return null;
			}
		}

		this.isValidLogin = function () {
			var loginDate = this.getLoginDate();
			var limitDate = new Date(loginDate);
			DateUtils.addHours(limitDate, 24);
			return loginDate <= limitDate;
		}

		this.validateLogin = function () {
			if (this.isAnyLoggued() && this.isValidLogin()) {
				return;
			}
			$state.go('login');
		}

}]);