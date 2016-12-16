(function () {

  'use strict';

  angular
    .module('app.core')
    .directive('httpSrc', httpSrc);

  /* @ngInject */
  function httpSrc($http) {
    // Source: https://github.com/dougmoscrop/angular-img-http-src
    var directive = {
      link: link,
      restrict: 'A'
    };
    return directive;

    function link(scope, element, attrs) {
      var requestConfig = {
        method: 'Get',
        url: attrs.httpSrc,
        responseType: 'arraybuffer',
        cache: 'true'
      };

      $http(requestConfig)
        .then(function () {
          // Deviates from source: simply return the result in the src tag instead of generating an blob URL
          attrs.$set('src', attrs.httpSrc);
        });
    }
  }

})();
