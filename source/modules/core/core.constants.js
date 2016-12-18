(function () {


  'use strict';

  angular
    .module('app.core')
    .constant('appConfig', {
      'APP_NAME': 'Weather',
      'DEFAULT_PAGE': 'home',
      'GEO_SERVICE': {
        'ENABLE_FALLBACK': true,
        'FALLBACK_API': 'https://freegeoip.net/json/'
      },
      'SERVICES': {
        'DARKSKYNET': {
          'API_KEY': 'ec8f74ce8161a69abde344251cbc2146'
        },
        'GOOGLE': {
          'API_KEY': 'AIzaSyBGRj5qZGUTSpmnENwEMGrS9a5cgCZvwtc',
          'API_ADDRESS': 'https://maps.googleapis.com/maps/api/geocode/json'
        }
      }
    });

})();
