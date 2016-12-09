(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const mapController = function mapController(MapService) {
    const vm = this;

    vm.mapData = {};
    vm.dataLoaded = false;

    vm.loadMapData = function loadMapData() {
      vm.dataLoaded = false;
      MapService.getMap()
        .then((res) => {
          vm.mapData = res.data;
          vm.dataLoaded = true;
        });
    };

    vm.loadMapData();
  };

  angular.module('apox')
    .controller('GameMapController', ['MapService', mapController]);
})();
