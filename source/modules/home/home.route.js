(function () {

  'use strict';

  angular
    .module('app.home')
    .config(config);

  /* @ngInject */
  function config($stateProvider) {

    addState();

    ///////////

    function addState() {
      $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'modules/home/home.html',
        controller: 'home as vm',
        ncyBreadcrumb: {
          label: 'Home'
        }
      });
    }

  }

})();
