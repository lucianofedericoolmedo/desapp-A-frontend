'use strict';

angular.module('baseModule').service('URLServer', function () {
  this.url = "http://localhost:8080";
});

angular.module('baseModule').provider('URLServerProvider', function () {
  this.url = "http://localhost:8080";

  this.$get= function (){
     // return the factory as a provider
     // that is available during the configuration phase
     return this.url;  
  };
});