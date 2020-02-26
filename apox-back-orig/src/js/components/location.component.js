(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const LocationDetailsController =
    function locationDetailsController(FactionService, TabService) {
      const ctrl = this;

      ctrl.tags = FactionService.factionTags;

      ctrl.setLoc = function setLoc(loc) {
        TabService.setLoc(loc);
      };
    };

  angular.module('apox').component('locationDetails', {
    bindings: {
      location: '<',
    },
    controller: ['FactionService', 'TabService', LocationDetailsController],
    templateUrl: '../template/location.template.html'
  });
})();
