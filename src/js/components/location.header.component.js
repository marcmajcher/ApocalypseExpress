(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const LocationHeaderController = function locationHeaderController(FactionService) {
    const ctrl = this;
    ctrl.tags = FactionService.factionTags;
  };

  angular.module('apox').component('locationHeader', {
    bindings: {
      location: '<',
    },
    controller: ['FactionService', LocationHeaderController],
    templateUrl: '../template/location.header.template.html'
  });
})();
