(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const LocationDetailsController = function locationDetailsController(FactionService) {
    const ctrl = this;
    ctrl.tags = FactionService.factionTags;
  };

  angular.module('apox').component('locationDetails', {
    bindings: {
      location: '<',
    },
    controller: ['FactionService', LocationDetailsController],
    templateUrl: '../template/location.template.html'
  });
})();
