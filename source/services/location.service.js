(function () {

  'use strict';

  angular
    .module('app.core')
    .factory('locationService', locationService);

  /* @ngInject */
  function locationService($http, $q, $geolocation, $httpParamSerializer, $log, appConfig) {

    var _userDefinedGeolocation = {};

    var service = {
      getGeolocation: getGeolocation,
      setGeolocation: setGeolocation,
      getReverseGeolocation: getReverseGeolocation
    };

    return service;

    ////////////////

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


    function setGeolocation(coordinates) {

      // Needs to have valid attributes
      if (coordinates.hasOwnProperty('latitude') && coordinates.hasOwnProperty('longitude')) {
        _userDefinedGeolocation = coordinates;
      } else {
        // Empty object
        _userDefinedGeolocation = {};
      }

    }

    function getReverseGeolocation(coordinates) {

      var deferred = $q.defer();

      if (coordinates) {
        // make the call

        var _params = {
          latlng: coordinates.latitude + ',' + coordinates.longitude,
          key: appConfig.SERVICES.GOOGLE.API_KEY,
          language: 'nl',
          region: 'NL'
        }

        var _qs = $httpParamSerializer(_params);

        $http.get(appConfig.SERVICES.GOOGLE.API_ADDRESS + '?' + _qs)
          .then(function (response) {

            var address = {};

            // Remove bloat from response
            var address_components = response.data.results.map(function (elem) {
              return (elem.address_components) ? elem.address_components : false;
            });

            // Flatten one level:
            address_components = [].concat.apply([], address_components);

            angular.forEach(address_components, function (_address) {

              if (_address.types.indexOf('route') > -1 && !address.street) {
                address.street = _address.long_name;
              }

              if (_address.types.indexOf('administrative_area_level_2') > -1 && !address.city) {
                address.city = _address.long_name;
              }

              if (_address.types.indexOf('administrative_area_level_1') > -1 && !address.region) {
                address.region = _address.long_name;
              }

              if (_address.types.indexOf('country') > -1 && !address.country) {
                address.country = _address.long_name;
              }

            });

            deferred.resolve(address);

          }, function () {

            deferred.reject('Geolocation not supported, fallback failed to retrieve geolocation.');

          });

      } else {
        deferred.reject('No valid coordinates supplied');
      }

      return deferred.promise;

    }

  }

})();
