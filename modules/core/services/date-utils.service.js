'use strict';

angular.module('core').service('DateUtils', [function () {
	
	this.now = function () {
		return new Date();
	}

	this.addHours = function (date, hours) {
		date.setHours(date.getHours() + hours);
	}

}]);