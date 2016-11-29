(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController =
    function gamePageController(DriverService, LocationService, TripService) {
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

      vm.getCurrentDestination = function getCurrentDestination() {
        TripService.getCurrentTrip().then((data) => {
          vm.currentDestination = data.trip[0].locationid; // TODO: get/display location name/info
        });
      };

      vm.setDestination = function setDestination(id) {
        TripService.setNextDestination(id).then((data) => {
          // console.log('set destination got:', data);
          if (data === 'ok') {
            vm.currentDestination = id;
          }
          // TODO: error check
        });
        // take the id, set the destination
      };

      vm.goDestination = function goDestination() {

      };

      vm.clearDestination = function clearDestination() {
        // disable button
        // send delete route request
        //  - set undefined
        //  -- enable button
        vm.currentDestination = undefined;
      };

      vm.getCurrentDestination();
    };

  angular.module('apox')
    .controller('GamePageController', ['DriverService', 'LocationService', 'TripService', gamePageController]);
})();
