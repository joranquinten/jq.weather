(function () {

  'use strict';

  angular
    .module('app.core')
    .filter('trust', trust);

  /* @ngInject */
  function trust ($sce) {
    return function (t) {
      return $sce.trustAsHtml(t);
    };
  }

})();
