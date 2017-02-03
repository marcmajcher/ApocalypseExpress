(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('destinationList', {
    bindings: {
      working: '<',
      location: '<',
      tags: '<',
      trip: '<',
      setDestination: '&',
      clearDestination: '&',
      goDestination: '&'
    },
    templateUrl: '../tmpl/game/destinations.template.html'
  });
})();
