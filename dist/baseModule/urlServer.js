'use strict';

//This is the heroku File

angular.module('baseModule').service('URLServer', function () {
  this.url = "https://grupo-a-012017.herokuapp.com";
});

angular.module('baseModule').provider('URLServerProvider', function () {
  this.url = "https://grupo-a-012017.herokuapp.com";

  this.$get= function (){
     // return the factory as a provider
     // that is available during the configuration phase
     return this.url;  
  };
});
