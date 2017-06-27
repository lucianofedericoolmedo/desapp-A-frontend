'use strict';

angular.module('users-profiles').config(['$stateProvider',
	function($stateProvider) {

		$stateProvider.
		state('edit-profile', {
			url: '/profile',
			templateUrl: 'modules/users-profiles/views/profile-edition.view.html',
			controller: 'UserProfileCtrl'
		});

}])