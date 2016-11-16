(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox')
    .controller('AdminMapController', ['$http', function map($http) {
      const vm = this;

      vm.location = {};
      vm.mapData = {};
      vm.showDetailPanel = true;
      vm.dataLoaded = false;

      vm.closeDetailPanel = function close() {
        vm.showDetailPanel = false;
      };

      vm.loadMapData = function load() {
        $http.get('/map')
          .then((res) => {
            vm.mapData.locations = res.data.locations;
            vm.mapData.connections = res.data.connections;
            vm.dataLoaded = true;
          });
      };

      vm.updateLocationDetails = function update() {
        const loc = vm.location;
        if (loc.id > 0) {
          // TODO: add waiting spinner
          $http.patch(`/admin/map/location/${loc.id}`, {
              name: loc.name,
              longitude: loc.longitude,
              latitude: loc.latitude,
              description: loc.description,
              population: loc.population,
              tech: loc.tech,
              type: loc.type
            })
            .then(() => {
              // console.log('cool.'); res
            });
        }
      };

      vm.loadMapData();
    }]);
})();
