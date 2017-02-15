(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('driverInfo', {
    bindings: {
      driver: '<'
    },
    templateUrl: '../template/driverinfo.template.html'
  });
})();
