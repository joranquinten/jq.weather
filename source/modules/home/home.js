(function () {

  'use strict';

  angular
    .module('app.home')
    .controller('home', home);

  /* @ngInject */
  function home($log, locationService, weatherService, darkSky) {

    var vm = this;

    vm.displayLimit = 8;
    vm.forecast = {};

    vm.showHourly = showHourly;
    vm.showDaily = showDaily;

    activate();

    ///////////////

    function activate() {
      showHourly();
    }

    function showHourly() {
      vm.forecastType = 'hourly';
      _getHourlyForecast();
    }

    function showDaily() {
      vm.forecastType = 'daily';
      _getDailyForecast();
    }

    function _getHourlyForecast() {

      locationService.getGeolocation().then(function (position) {

        darkSky.getHourlyForecast(position.latitude, position.longitude)
          .then(function (response) {

            var responseFormatted = weatherService.formatForecast(response.hourly, {
              limitToCurrentDay: false,
              offset: response.offset
            });

            locationService.getReverseGeolocation(position).then(function (response) {
              vm.forecastLocation = response;
            });

            vm.forecast = responseFormatted;
          }, function (response) {
            $log.warn(response);
          });
      }, function (response) {
        $log.error(response);
      });

    }

    function _getDailyForecast() {

      locationService.getGeolocation().then(function (position) {
        $log.info(position);
        darkSky.getDailyForecast(position.latitude, position.longitude)
          .then(function (response) {

            var responseFormatted = weatherService.formatForecast(response.daily, {
              limitToCurrentDay: false,
              offset: response.offset
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
