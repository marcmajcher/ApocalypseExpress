(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('driverName', {
    bindings: {
      name: '<'
    },
    template: `
    <div class="driver-name text-center">
      <span id="driver-name">{{$ctrl.name}}</span>
    </div>
    `
  });
})();
