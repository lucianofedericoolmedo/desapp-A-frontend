/**
 * @ngdoc function
 * @description
 * # LanguageSelectDirective
 * Directive to append language select and set its view and behavior
 */
angular.module('core')
  .directive('ngTranslateLanguageSelect', function (LocaleService) {
    'use strict';


    var templateElem2 = '<div class="language-select" ng-if="visible">'+
          '<label >'+
            '{{"directives.language-select.Language" | translate}}:'+
            '<select ng-model="currentLocaleDisplayName"'+
              'ng-options="localesDisplayName for localesDisplayName in localesDisplayNames"'+
              'ng-change="changeLanguage(currentLocaleDisplayName)">'+
            '</select>'+
          '</label>'+
        '</div>';

    return {
      restrict: 'A',
      replace: true,
      template: templateElem2,
      controller: function ($scope) {
        $scope.currentLocaleDisplayName = LocaleService.getLocaleDisplayName();
        $scope.localesDisplayNames = LocaleService.getLocalesDisplayNames();
        $scope.visible = $scope.localesDisplayNames &&
        $scope.localesDisplayNames.length > 1;

        $scope.changeLanguage = function (locale) {
          LocaleService.setLocaleByDisplayName(locale);
        };
      }
    };
  });
