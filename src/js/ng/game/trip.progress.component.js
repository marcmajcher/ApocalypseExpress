(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('tripProgress', {
    bindings: {
      trip: '<'
    },
    templateUrl: '../template/progress.template.html'
  });
})();
