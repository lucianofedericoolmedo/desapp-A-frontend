'use strict';

//angular.module('authentication').value('userAuthenticationData', {});
angular.module('authentication').service('Authentication', [
	'$state', 'DateUtils',
	function ($state, DateUtils) {

		this.deleteUser = function(){
			console.log("deleteUser");
			localStorage.removeItem(
            'userId');
          	localStorage.removeItem('roles');
		}

		this.setUser = function(user){
			//if (localStorage)
			console.log("setUser");
			//console.log(userAuthenticationData);
			//userAuthenticationData.user = {'user': user};
		}

		this.setUserData = function (user) {
			/*
			console.log("setUserData");
			console.log(userAuthenticationData)
			this.deleteUser();
			this.setUser(user);
			userAuthenticationData.loginDate = new Date();
			*/
			console.log("setUserData");
		}

		this.getUser = function () {
			console.log("getUser");
			//console.log(userAuthenticationData);
			//return userAuthenticationData.user;
		}

		/*
		this.getLoginDate = function () {
			return userAuthenticationData.loginDate;
		}
		*/

		this.isAnyLoggued = function () {
			return localStorage.getItem(
            'userId') !== undefined;
		}

		this.getUserId = function () {
			return localStorage.getItem(
            'userId');
		}

		this.isValidLogin = function () {
			/*
			var loginDate = this.getLoginDate();
			var limitDate = new Date(loginDate);
			DateUtils.addHours(limitDate, 24);
			return loginDate <= limitDate;
			*/
			return true;
		}

		this.validateLogin = function () {
			if (this.isAnyLoggued() && this.isValidLogin()) {
				return;
			}
			$state.go('login');
		}

		this.hasRole = function (role) {
			if (localStorage.getItem("roles") !== undefined){
				var roles = JSON.parse(localStorage.getItem("roles"));
				var isAuthored = false;
				angular.forEach(roles, function (userRole) {
					isAuthored |= userRole.name === role;
				});
				return isAuthored;
			}
			return false;			
		}

}]);