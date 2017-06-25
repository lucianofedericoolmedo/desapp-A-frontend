'use strict';

angular.module('authentication').value('userAuthenticationData', {});
angular.module('authentication').service('Authentication', ['userAuthenticationData',
	'$state', 'DateUtils',
	function (userAuthenticationData, $state, DateUtils) {

		this.setUserData = function (user) {
			delete userAuthenticationData.user;
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
			if (this.isAnyLoggued()) {
				return this.getUser().userId;
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

		this.hasRole = function (role) {
			var user = this.getUser();
			var isAuthored = false;
			angular.forEach(user.roles, function (userRole) {
				isAuthored |= userRole.name === role;
			});
			return isAuthored;
		}

}]);