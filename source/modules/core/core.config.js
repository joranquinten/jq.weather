(function () {

  'use strict';

  angular
    .module('app.core')
    .config(setConfiguration);

  /* @ngInject */
  function setConfiguration($urlRouterProvider, toastrConfig, darkSkyProvider, appConfig) {

    setToastrConfig();
    setRoutingConfig();
    setDarkSkyConfig();

    ////////////////

    function setToastrConfig() {
      angular.extend(toastrConfig, {
        closeButton: true,
        positionClass: 'toast-top-right',
        progressBar: true,
        tapToDismiss: true
      });
    }

    function setRoutingConfig() {
      $urlRouterProvider.otherwise(appConfig.DEFAULT_PAGE);
    }

    function setDarkSkyConfig() {
      darkSkyProvider.setApiKey(appConfig.SERVICES.DARKSKYNET.API_KEY);
      darkSkyProvider.setUnits('si');
      darkSkyProvider.setLanguage('nl')
    }
  }

})();
