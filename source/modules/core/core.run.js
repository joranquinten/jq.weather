(function () {

  'use strict';

  angular
    .module('app.core')
    .run(setRun);

  /* @ngInject */
  function setRun($window, $rootScope, appConfig) {

    setAppProperties();
    stateChangeStart();

    ///////////

    function setAppProperties() {
      $window.document.title = appConfig.APP_NAME;
    }

    function stateChangeStart() {
      var listenStateChangeStart = $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        $rootScope.stateParams = toParams;
        $rootScope.stateState = toState;

      });
      $rootScope.$on('$destroy', listenStateChangeStart);
    }
  }

})();
