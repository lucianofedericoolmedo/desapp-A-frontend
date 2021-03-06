'use strict';

// Setting up route

    	
angular
    .module(ApplicationConfiguration.applicationModuleName).config(['$stateProvider', 
	'$urlRouterProvider', 
	'$locationProvider',
    '$httpProvider',
    'angularAuth0Provider',
    'jwtOptionsProvider',
    'URLServerProvider',
	function($stateProvider, 
		$urlRouterProvider, 
		$locationProvider,
		$httpProvider,
        angularAuth0Provider,
        jwtOptionsProvider,
        URLServerProvider
		) {
		// Redirect to home view when route not found
		//$urlRouterProvider.otherwise('/dashboard/overview');


		var states = [
	        { name: 'base', 
	        	state: { abstract: true, url: '', 
	        	templateUrl: 'modules/core/views/base.html', 
	        	data: {text: "Base", visible: false } } },

	        { name: 'login', 
	        	state: { url: '/login', parent: 'base', 
	        	templateUrl: 'modules/core/views/login.html', 
	        	controller: 'LoginCtrl', 
	        	data: {text: "Login", visible: false } } },

	        { name: 'dashboard', 
	        	state: { url: '/dashboard', parent: 'base', 
	        	templateUrl: 'modules/core/views/dashboard.html', 
	        	controller: 'DashboardCtrl', 

	        	data: {text: "Dashboard", visible: false } } },

	        { name: 'overview', 
	        	state: { url: '/overview', parent: 'dashboard', 
	        	templateUrl: 'modules/core/views/dashboard/overview.html', 
	        	data: {text: "Overview", visible: true } } },

	        /*
	        { name: 'reports', 
	        	state: { url: '/reports', parent: 'dashboard', 
	        	templateUrl: 'modules/core/views/dashboard/reports.html', 
	        	data: {text: "Reports", visible: true } } },
			*/
	        { name: 'create-cart', 
	        	state: {
				url: '/cart/create',
				templateUrl: 'modules/carts/views/crud-actions-cart.view.html',
				controller: 'CartCtrl',
	        	data: {text: "Create Cart", visible: false } } },

	        { name: 'list-cart', 
	        	state: {
				url: '/cart/list',
				templateUrl: 'modules/carts/views/list-cart.view.html',
				controller: 'CartCtrl',
	        	data: {text: "List Cart", visible: true } } },

	        { name: 'check-items-cart', 
	        	state: {
				url: '/cart/check-items/',
				templateUrl: 'modules/carts/views/check-cart-items.view.html',
				controller: 'CheckItemsCartCtrl',
				params: {
					id : undefined,
					justCreatedCart : undefined
				},
	        	data: {text: "List Cart", visible: true } } },

	        { name: 'edit-cart', 
	        	state: {
				url: '/cart/edit/:id',
				templateUrl: 'modules/carts/views/crud-actions-cart.view.html',
				controller: 'CartCtrl' ,
				data: {text: "Editar", visible: false }}
			},

			{ name: 'confirm-cart-purchase', 
	        	state: {				
				url: '/cart/confirmation',
				templateUrl: 'modules/carts/views/confirm-purchase-request.view.html',
				controller: 'ConfirmCartPurchaseCtrl',
				params: {
					turn : undefined
				},
				data: {text: "Confirmacion", visible: false }}
			},

			{ name: 'payment-turn-countdown', 
	        	state: {				
				url: '/cart/payment-countdown',
				templateUrl: 'modules/carts/views/payment-countdown.view.html',
				controller: 'PaymentTurnCountdownCtrl',
				params: {
					currentTurn : undefined
				},
				data: {text: "Conteo", visible: false }}
			},



			//BRANDS ::::


			{ name: 'create-brand', 
	        	state: {				
				url: '/brand/create',
				role : 'ADMIN',
				templateUrl: 'modules/brands/views/crud-actions-brand.view.html',
				controller: 'BrandCtrl',
				data: {text: "Crear Marca", visible: false }}
			},

			{ name: 'edit-brand', 
	        	state: {				
				url: '/brand/edit/:id',
				role : 'ADMIN',
				templateUrl: 'modules/brands/views/crud-actions-brand.view.html',
				controller: 'BrandCtrl',
				data: {text: "Editar Marca", visible: false }}
			},

			{ name: 'list-brand', 
	        	state: {				
				url: '/brand/list',
				role : 'ADMIN',
				templateUrl: 'modules/brands/views/list-brand.view.html',
				controller: 'BrandCtrl',
				data: {text: "Listar Marcas", visible: true }}
			},


			///////////////

			{ name: 'create-product-category', 
	        	state: {				
				url: '/product-category/create',
				role : 'ADMIN',
				templateUrl: 'modules/product-categories/views/crud-actions-product-category.view.html',
				controller: 'BrandCtrl',
				data: {text: "Crear Cat Prod", visible: false }}
			},

			{ name: 'edit-product-category', 
	        	state: {				
				url: '/product-category/edit/',
				role : 'ADMIN',
				templateUrl: 'modules/product-categories/views/crud-actions-product-category.view.html',
				controller: 'BrandCtrl',
				params:{
					id:undefined
				},
				data: {text: "Editar Cat Prod", visible: false }}
			},


			//////////////

			{ name: 'create-product', 
	        	state: {				
				url: '/product/create',
				role : 'ADMIN',
				templateUrl: 'modules/products/views/crud-actions-product.view.html',
				controller: 'ProductCtrl',
				data: {text: "Crear Prod", visible: false }}
			},

			{ name: 'edit-product', 
	        	state: {				
				url: '/product/edit/',
				role : 'ADMIN',
				templateUrl: 'modules/products/views/crud-actions-product.view.html',
				controller: 'ProductCtrl',
				params:{
					id:undefined
				},
				data: {text: "Editar Prod", visible: false }}
			},

			{ name: 'list-product', 
	        	state: {				
				url: '/product/list',
				role : 'ADMIN',
				templateUrl: 'modules/products/views/list-product.view.html',
				controller: 'ProductCtrl',
				data: {text: "Listar Prod", visible: true }}
			},

			{ name: 'crud-batch', 
	        	state: {				
				url: '/product/crud-batch',
				role : 'ADMIN',
				templateUrl: 'modules/products/views/batch-crud-product.view.html',
				controller: 'ProductCtrl',
				data: {text: "Crear Productos Por Batch", visible: false }}
			},

			//////////////////

			{ name: 'list-purchase', 
	        	state: {				
				url: '/purchase/history-list',
				role : 'CLIENT',
				templateUrl: 'modules/purchases/views/list-purchase.view.html',
				controller: 'PurchaseCtrl',
				data: {text: "Listar Purchase", visible: true }}
			},

			{ name: 'review-purchase', 
	        	state: {				
				url: '/purchase/history',
				role : 'CLIENT',
				templateUrl: 'modules/purchases/views/purchase-detail.view.html',
				controller: 'PurchaseCtrl',
				params:{
					id:undefined
				},
				data: {text: "Revisar Purchase", visible: false }}
			},

			/////////////////////

			{ name: 'create-shopping-list', 
	        	state: {				
				url: '/shopping-list/create',
				role : 'ADMIN',
				templateUrl: 'modules/shopping-lists/views/crud-actions-shopping-list.view.html',
				controller: 'ShoppingListCtrl',
				data: {text: "Crear ShoppingList", visible: false }}
			},

			{ name: 'edit-shopping-list', 
	        	state: {				
				url: '/shopping-list/edit/:id',
				role : 'CLIENT',
				templateUrl: 'modules/shopping-lists/views/crud-actions-shopping-list.view.html',
				controller: 'ShoppingListCtrl',
				data: {text: "Editar ShoppingList", visible: false }}
			},

			{ name: 'list-shopping-list', 
	        	state: {				
				url: '/shopping-list/list',
				role : 'CLIENT',
				templateUrl: 'modules/shopping-lists/views/list-shopping-list.view.html',
				controller: 'ShoppingListCtrl',
				data: {text: "ShoppingList", visible: true }}
			},

			/////////////////////


			{ name: 'edit-profile', 
	        	state: {				
				url: '/profile',
				role : 'CLIENT',
				templateUrl: 'modules/users-profiles/views/edit-actions.view.html',
				controller: 'UserProfileCtrl',
				data: {text: "Ver Perfil", visible: true }}
			},


			{ name: 'discounts', 
	        	state: {
				url: '/list-discount',
				role : 'ADMIN',
				templateUrl: 'modules/discounts/views/list-discount.view.html',
				controller: 'DiscountCtrl',
				data: {text: "Ofertas", visible: true }}
			},

	    ];


		$urlRouterProvider.when('/', '/login');
		$urlRouterProvider.when('/dashboard', '/dashboard/overview');
	    $urlRouterProvider.otherwise('/dashboard');



	    angular.forEach(states, function (state) {
            $stateProvider.state(state.name, state.state);
        });
           

		/*
		To add auth0 to the app
		*/

		var callback_uri = AUTH0_CALLBACK_URL;
		if (URLServerProvider.$get().url === 'https://grupo-a-012017.herokuapp.com'){
			callback_uri = 'https://group-a-comprando-a-lo-loco.herokuapp.com/#/'
		}

		// Initialization for the angular-auth0 library
	    angularAuth0Provider.init({
	      clientID: AUTH0_CLIENT_ID,
	      domain: AUTH0_DOMAIN,
	      responseType: 'token id_token',
	      audience: AUTH0_AUDIENCE,
	      redirectUri: callback_uri,
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