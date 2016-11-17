(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController = function gamePageController(DriverService, LocationService) {
    const vm = this;

    DriverService.getDriver().then((driver) => {
      vm.driver = driver;
    });
    // (error) => {
    //   // console.log('was error!'); // TODO: handle error
    // });

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
    // TODO: handle error
  };

  angular.module('apox')
    .controller('GamePageController', ['DriverService', 'LocationService', gamePageController]);
})();
