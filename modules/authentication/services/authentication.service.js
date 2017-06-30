'use strict';

//angular.module('authentication').value('userAuthenticationData', {});
angular.module('authentication').service('Authentication', [
	'$state', 'DateUtils',
	function ($state, DateUtils) {

		var userAuthenticationData = {'user' : localStorage.getItem('user')};

		this.deleteUser = function(){
			userAuthenticationData.user = undefined;
		}

		this.setUser = function(user){
			userAuthenticationData.user = {'user': user};
		}

		this.setUserData = function (user) {
			this.deleteUser();
			this.setUser(user);
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