(function () {

  'use strict';

  angular
    .module('app.home')
    .controller('home', home);

  /* @ngInject */
  function home($log, locationService, weatherService, darkSky) {

    var vm = this;

    activate();

    ///////////////

    function activate() {

      locationService.getGeolocation()
        .then(function (position) {

          //.getCurrent
          //.getDailyForecast
          //.getHourlyForecast
          //.getMinutelyForecast
          //.getAlerts
          //.getFlags

          darkSky.getHourlyForecast(position.latitude, position.longitude)
            .then(function (response) {

              var responseFormatted = weatherService.formatForecast(response, {
                limitToCurrentDay: false
              });

              vm.forecast = responseFormatted;
            }, function (response) {
              $log.warn(response);
            });
        }, function (response) {
          $log.error(response);
        });
    }

  }

})();
