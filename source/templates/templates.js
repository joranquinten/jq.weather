/*eslint-disable*/ angular.module("app.core").run(["$templateCache", function($templateCache) {$templateCache.put('modules/home/home.html','<div id="home">\r\n\r\n  <div class="weather">\r\n    <header>\r\n      <h1>{{vm.forecast.hourly.summary}}</h1>\r\n      <span class="date">{{vm.forecast.hourly.currentDay | date : \'EEEE d MMMM\'}}</span>\r\n    </header>\r\n\r\n    <div class="wrapper">\r\n      <ol class="hourly">\r\n        <li ng-repeat="weather in vm.forecast.hourly.data | limitTo: 10" class="card">\r\n\r\n          <div class="summary">\r\n            <span class="time start">{{ weather.timeStart | date : \'H:mm\' }}</span> &ndash;\r\n            <span class="time end">{{ weather.timeEnd | date : \'H:mm\' }}</span>\r\n            <dark-sky-icon icon="{{ weather.icon }}" class="icon"></dark-sky-icon>\r\n            <div class="description">{{ weather.summary }}</div>\r\n          </div>\r\n\r\n          <div class="temparature">\r\n            <div class="name">Temperatuur</div>\r\n            <div class="temparatures">\r\n              <span class="main">{{ weather.temperature | number: 1 }} &deg;C</span>\r\n            </div>\r\n          </div>\r\n\r\n          <div class="wind">\r\n            <div class="name">Wind</div>\r\n            <span class="bearing"><span class="arrow wi wi-wind towards-0-deg" style="transform: rotate({{weather.windBearing + 180}}deg);"></span></span>\r\n            <span class="speed">{{ weather.windSpeed }}</span>\r\n          </div>\r\n\r\n\r\n        </li>\r\n      </ol>\r\n    </div>\r\n\r\n  </div>\r\n\r\n\r\n\r\n</div>\r\n');}]); /*eslint-enable*/