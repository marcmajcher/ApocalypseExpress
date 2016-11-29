(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController = function gamePageController(DriverService, LocationService) {
    const vm = this;

    DriverService.getDriver().then((driver) => {
      vm.driver = driver;
    });

    LocationService.getCurrentLocation().then((location) => {
      const filteredConnections = [];
      for (let i = 0; i < location.connections.length; i++) {
        const connection = location.connections[i];
        if (connection.name !== location.name) {
          connection.id = connection.loc1 === location.id ? connection.loc2 : connection.loc1;
          delete connection.loc1;
          delete connection.loc2;
          filteredConnections.push(connection);
        }
      }
      location.connections = filteredConnections;
      vm.currentLocation = location;
    });

    vm.setDestination = function(id) {
      vm.currentDestination = id;
      // take the id, set the destination
    };

    vm.clearDestination = function() {
      vm.currentDestination = undefined;
    };

    vm.clearDestination();
  };

  angular.module('apox')
    .controller('GamePageController', ['DriverService', 'LocationService', gamePageController]);
})();
