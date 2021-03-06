'use strict';

// Setting up route
angular.module('app').config(['$stateProvider', 
	'$urlRouterProvider', 
	'$locationProvider',

    '$httpProvider',
    'angularAuth0Provider',
    'jwtOptionsProvider',

	function($stateProvider, 
		$urlRouterProvider, 
		$locationProvider,

		$httpProvider,
        angularAuth0Provider,
        jwtOptionsProvider

		) {
		// Redirect to home view when route not found
		//$urlRouterProvider.otherwise('/dashboard/overview');


		$urlRouterProvider.when('/', '/dashboard/overview');
	    //$urlRouterProvider.otherwise('/login');

	    $stateProvider
	      .state('base', {
	        abstract: true,
	        url: '',
	        templateUrl: 'modules/core/views/base.html'
	      })
	        .state('login', {
	          url: '/login',
	          parent: 'base',
	          templateUrl: 'modules/core/views/login.html',
	          controller: 'LoginCtrl'
	        })
	        .state('dashboard', {
	          url: '/dashboard',
	          parent: 'base',
	          templateUrl: 'modules/core/views/dashboard.html',
	          controller: 'DashboardCtrl'
	        })
	          .state('overview', {
	            url: '/overview',
	            parent: 'dashboard',
	            templateUrl: 'modules/core/views/dashboard/overview.html'
	          })
	          .state('reports', {
	            url: '/reports',
	            parent: 'dashboard',
	            templateUrl: 'modules/core/views/dashboard/reports.html'
	          });

		// Home state routing
		/*
		$stateProvider.
		state('app', {
			url: '/',
			controller: 'AppController',
			templateUrl: 'modules/app/views/app.client.view.html'
		}).
		state('app2', {
			url: '/nose',
			templateUrl: 'modules/app/views/extra.html'
		});
		*/

		/*
		To add auth0 to the app
		*/

		// Initialization for the angular-auth0 library
	    angularAuth0Provider.init({
	      clientID: AUTH0_CLIENT_ID,
	      domain: AUTH0_DOMAIN,
	      responseType: 'token id_token',
	      audience: AUTH0_AUDIENCE,
	      redirectUri: AUTH0_CALLBACK_URL,
	      scope: REQUESTED_SCOPES
	    });


	    jwtOptionsProvider.config({
	      tokenGetter: function() {
	        return localStorage.getItem('access_token');
	      },
	      whiteListedDomains: ['localhost']
	    });

	    $httpProvider.interceptors.push('jwtInterceptor');


	    function checkAuthentication($transition$) {
	      var $state = $transition$.router.stateService;
	      var auth = $transition$.injector().get('authService');
	      if (!auth.isAuthenticated()) {
	        return $state.target('home');
	      }
	    }

	    function checkForScopes(scopes) {
	      return function checkAuthentication($transition$) {
	        var $state = $transition$.router.stateService;
	        var auth = $transition$.injector().get('authService');
	        if (!auth.isAuthenticated() || !auth.userHasScopes(scopes)) {
	          return $state.target('home');
	        }
	      }
	    }




	}
]);