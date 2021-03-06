(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const adminMapController = function adminMapController(MapService) {
    const vm = this;

    vm.location = {};
    vm.mapData = {};
    vm.showDetailPanel = true;
    vm.dataLoaded = false;

    vm.closeDetailPanel = function close() {
      vm.showDetailPanel = false;
    };

    vm.updateLocationDetails = function update() {
      const loc = vm.location;
      if (loc.id > 0) {
        // TODO: add waiting spinner
        MapService.updateLocation(loc.id, {
            name: loc.name,
            longitude: loc.longitude,
            latitude: loc.latitude,
            description: loc.description,
            population: loc.population,
            tech: loc.tech,
            type: loc.type,
            factionid: loc.factionid
          })
          .catch(() => {
            window.alert('PATCH ERROR'); // eslint-disable-line no-alert
          });
        // .then(() => {
        //   remove spinner
        // });
      }
    };
  };

  angular.module('apox')
    .controller('AdminMapController', ['MapService', adminMapController]);
})();
