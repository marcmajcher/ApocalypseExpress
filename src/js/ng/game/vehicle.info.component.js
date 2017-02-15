(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('vehicleInfo', {
    bindings: {
      vehicle: '<'
    },
    templateUrl: '../template/vehicle.template.html'
  });
})();
