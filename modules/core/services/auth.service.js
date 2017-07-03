'use strict';

angular.module('core').service('authService', 

  //authService);


  function($state, angularAuth0, $timeout, UserAuthentication, $location) {

    var userProfile;

    function login() {
      angularAuth0.authorize();
    }
    
    function handleAuthentication() {
      angularAuth0.parseHash(function(err, authResult) {
        if (authResult && authResult.idToken) {
          setSession(authResult);
          $state.go('home');
        } else if (err) {
          $timeout(function() {
            $state.go('home');
          });
          console.log(err);
          alert('Error: ' + err.error + '. Check the console for further details.');
        }
      });
    }

    function getProfile(cb) {
      var accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        throw new Error('Access token must exist to fetch profile');
      }
      angularAuth0.client.userInfo(accessToken, function(err, profile) {
        if (profile) {
          console.log("SETEO PROFILE");
          console.log(profile)
          setUserProfile(profile);
        }
        cb(err, profile);
      });
    }

    function setUserProfile(profile) {
      userProfile = profile;
    }

    function getCachedProfile() {
      return userProfile;
    }

    function setSession(authResult) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());

      // If there is a value on the `scope` param from the authResult,
      // use it to set scopes in the session for the user. Otherwise
      // use the scopes as requested. If no scopes were requested,
      // set it to nothing
      var scopes = authResult.scope || REQUESTED_SCOPES || '';
      console.log(authResult);
      localStorage.setItem('email', authResult.idTokenPayload.nickname + '@gmail.com');
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      localStorage.setItem('scopes', JSON.stringify(scopes));

      UserAuthentication.getOrCreateProfile(
        {'email' :  localStorage.getItem('email'),
         'name' : authResult.idTokenPayload.given_name,
         'surname' : authResult.idTokenPayload.family_name,
         'gender' : authResult.idTokenPayload.gender,
         'picture_url' : authResult.idTokenPayload.picture,
        }
        ,
        function(response){
          //setearse un id del profile
          localStorage.setItem('userId' , response.userId);
          localStorage.setItem("roles", JSON.stringify(response.roles));

        }, 
        function(errorResponse){

          console.log("Error la manqueaste no se pudo cargar el id");
        });

    }
    
    function logout() {
      // Remove tokens and expiry time from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('email');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      localStorage.removeItem('scopes');
      localStorage.removeItem('userId');
      localStorage.removeItem('roles');
      $location.path('/login');
      //$state.target('login');
    }
    
    function isAuthenticated() {
      // Check whether the current time is past the 
      // access token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
    }

    function userHasScopes(scopes) {
      var grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
      for (var i = 0; i < scopes.length; i++) {
        if (grantedScopes.indexOf(scopes[i]) < 0) {
          return false;
        }
      }
      return true;
    }

    return {
      login: login,
      getProfile: getProfile,
      getCachedProfile: getCachedProfile,
      handleAuthentication: handleAuthentication,
      logout: logout,
      isAuthenticated: isAuthenticated,
      userHasScopes: userHasScopes
    }
  }
);
