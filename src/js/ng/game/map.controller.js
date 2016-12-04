(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const mapController = function mapController(MapService) {
    const vm = this;

    vm.location = {};
    vm.mapData = {};
    vm.dataLoaded = false;

    vm.loadMapData = function load() {
      MapService.getMap()
        .then((res) => {
          vm.mapData.locations = res.data.locations;
          vm.mapData.connections = res.data.connections;
          vm.dataLoaded = true;
        });
    };

    vm.loadMapData();
  };

  angular.module('apox')
    .controller('GameMapController', ['MapService', mapController]);
})();
