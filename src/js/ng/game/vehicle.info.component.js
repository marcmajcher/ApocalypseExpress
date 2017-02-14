(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('vehicleInfo', {
    bindings: {
      vehicle: '<'
    },
    template: `
    <div>Vehicle Info</div>
    `
  });
})();
