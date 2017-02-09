(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('vehicleInfo', {
    bindings: {
      name: '<'
    },
    template: `
    <div>Vehicle Info</div>
    `
  });
})();
