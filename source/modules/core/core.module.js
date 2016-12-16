(function () {

  'use strict';

  angular
    .module('app.core', [

      /* Angular Modules */
      'ngSanitize',
      'ngCookies',
      'ngGeolocation',

      /* vendor */
      'ui.router',
      'toastr',
      'angular-loading-bar',
      'dark-sky'

  ]);


})();
