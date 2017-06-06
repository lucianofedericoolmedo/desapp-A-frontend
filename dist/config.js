'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'baseModule';

	var applicationModuleVendorDependencies = [
		'ngFileUpload', 
		'ngAnimate', 
		'ngCookies', 
		'ngResource',
		'ngRoute',
		'ui.router', 
		'ui.bootstrap',
		'ngSanitize',
	    'ngTouch',
	    'pascalprecht.translate',
	    'tmh.dynamicLocale',
	    'auth0.auth0', 
	    'angular-jwt'
		];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);

	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();