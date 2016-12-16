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
      }
    });

})();
