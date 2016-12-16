(function () {

  'use strict';

  angular
    .module('app.core')
    .factory('weatherService', weatherService);

  /* @ngInject */
  function weatherService($http, $window, $log, $q, appConfig) {

    var service = {
      getWeather: getWeather,
      formatForecast: formatForecast
    };

    return service;

    ////////////////

    function formatForecast(forecast, params) {

      if (angular.isUndefined(params)) params = {};

      var _params = {};
      _params.limitToCurrentDay = (params.limitToCurrentDay) || false;

      var offset = forecast.offset;

      var utcSeconds = forecast.hourly.data[0].time;
      var currentTime = new Date(0);
      currentTime.setUTCSeconds(utcSeconds);

      forecast.hourly.currentDay = moment(currentTime, 'nl').add(offset, 'hour').format();

      angular.forEach(forecast.hourly.data, function (data) {

        var utcSeconds = data.time;
        var time = new Date(0);
        time.setUTCSeconds(utcSeconds);

        data.timeStart = moment(time, 'nl').add(offset, 'hour').format();
        data.timeEnd = moment(time, 'nl').add(offset + 1, 'hour').format();
      });

      return forecast;
    }

    function getWeather(params) {

      params = (angular.isDefined(params)) ? params : {};

      var apiAddress = 'weather/';
      var apiURL = appConfig.API_SERVER.URL;
      var _params = {};

      if (params.hasOwnProperty('ids')) {
        _params.ids = params.ids;
      }

      if (params.hasOwnProperty('tags')) {
        _params.tags = params.tags;
      }

      return $http({
        method: 'POST',
        url: apiURL + apiAddress,
        data: _params
      }).then(function success(response) {
        return response.data.activities;
      }, function error(error) {
        $log.info(error);
      });
    }

  }

})();
