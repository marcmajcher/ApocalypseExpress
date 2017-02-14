(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('driverInfo', {
    bindings: {
      driver: '<'
    },
    template: `
    <div class="driver-name text-center">
      <span id="driver-name">{{$ctrl.driver.name}}</span>
    </div>
    <div class="driver-info">
    Bux: {{$ctrl.driver.money}}
    </div>
    `
  });
})();
