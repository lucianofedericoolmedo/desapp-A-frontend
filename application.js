'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);


angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider', 
  function($locationProvider) {
  $locationProvider.hashPrefix('');
  $locationProvider.html5Mode(false);
}]);


angular.module(ApplicationConfiguration.applicationModuleName).constant('DEBUG_MODE', /*DEBUG_MODE*/true/*DEBUG_MODE*/);
angular.module(ApplicationConfiguration.applicationModuleName).constant('VERSION_TAG', /*VERSION_TAG_START*/new Date().getTime()/*VERSION_TAG_END*/);
angular.module(ApplicationConfiguration.applicationModuleName).constant('LOCALES', {
    'locales': {
      'es_ES': 'Español',
      'en_US': 'English'
    },
    'preferredLocale': 'es_ES'
  });
// Angular debug info
angular.module(ApplicationConfiguration.applicationModuleName).config(function ($compileProvider, DEBUG_MODE) {
    if (!DEBUG_MODE) {
      $compileProvider.debugInfoEnabled(false);// disables AngularJS debug info
    }
  })
// Angular Translate
angular.module(ApplicationConfiguration.applicationModuleName).config(function ($translateProvider, DEBUG_MODE, LOCALES) {
    if (DEBUG_MODE) {
      $translateProvider.useMissingTranslationHandlerLog();// warns about missing translates
    }

    $translateProvider.useStaticFilesLoader({
      prefix: 'resources/locale-',
      suffix: '.json'
    });

    $translateProvider.preferredLanguage(LOCALES.preferredLocale);
    $translateProvider.useLocalStorage();
  })
  // Angular Dynamic Locale
angular.module(ApplicationConfiguration.applicationModuleName).config(function (tmhDynamicLocaleProvider) {
    tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
  });



angular.module(ApplicationConfiguration.applicationModuleName).config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyCXV5KjTMLDeoYHi6mCozzDrOFfr7eBb7M',
        v: '3.26',
        libraries: 'weather,geometry,visualization',
        china: true
    });
});




//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	//if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});