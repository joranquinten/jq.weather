(function () {

  'use strict';

  angular
    .module('app.core')
    .factory('locationService', locationService);

  /* @ngInject */
  function locationService($http, $q, $geolocation, $log, appConfig) {

    var _userDefinedGeolocation = {};

    var service = {
      getGeolocation: getGeolocation,
      setGeolocation: setGeolocation
    };

    return service;

    ////////////////

    function setGeolocation(coordinates) {

      // Needs to have valid attributes
      if (coordinates.hasOwnProperty('latitude') && coordinates.hasOwnProperty('longitude')) {
        _userDefinedGeolocation = coordinates;
      } else {
        // Empty object
        _userDefinedGeolocation = {};
      }

    }

    function getGeolocation() {

      var deferred = $q.defer();

      // _userDefinedGeolocation overrides navigator geolocation
      if (_userDefinedGeolocation.hasOwnProperty('latitude') && _userDefinedGeolocation.hasOwnProperty('longitude')) {
        deferred.resolve(_userDefinedGeolocation);

      } else {

        $geolocation.getCurrentPosition({

          timeout: 5000,
          enabeHighAccuracy: true
        }).then(function (position) {

          deferred.resolve(position.coords);

        }, function () {

          // Fallback, get geolocation based on IP address
          if (appConfig.GEO_SERVICE.ENABLE_FALLBACK) {

            $http.get(appConfig.GEO_SERVICE.FALLBACK_API)
              .then(function (response) {

                var coordinates = response.data;
                var _coords = {
                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude
                };

                deferred.resolve(_coords);

              }, function () {

                deferred.reject('Geolocation not supported, fallback failed to retrieve geolocation.');

              });

          } else {
            deferred.reject('Geolocation not supported, fallback is disabled.');
          }

        });
      }

      return deferred.promise;

    }

  }

})();
