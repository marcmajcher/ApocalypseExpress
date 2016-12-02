(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController =
    function gamePageController(DriverService, LocationService, TripService) {
      const vm = this;

      vm.working = false;
      vm.traveling = false;

      DriverService.getDriver().then((driver) => {
        vm.driver = driver;
      });

      vm.getCurrentConnections = function getCurrentConnections() {
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
      };

      vm.getCurrentDestination = function getCurrentDestination() {
        TripService.getCurrentTrip().then((data) => {
          vm.destinationName = data.trip[0].name;
          vm.destinationId = data.trip[0].id;
        });
      };

      vm.setDestination = function setDestination(id) {
        vm.working = true;
        TripService.setNextDestination(id).then((data) => {
          // console.log('set destination got:', data);
          if (data.ok) {
            vm.destinationName = data.name;
            vm.destinationId = data.id;
            vm.working = false;
          }
          // TODO: error check
          // TODO: better response from the route - return new id?
        });
      };

      vm.goDestination = function goDestination() {
        vm.working = true;
        TripService.beginTrip().then((data) => {
          if (data === 'ok') {
            vm.working = false;
            vm.getCurrentConnections();
          }
        });
      };

      vm.clearDestination = function clearDestination() {
        vm.working = true;
        TripService.clearTrip().then((data) => {
          if (data === 'ok') {
            vm.destinationName = undefined;
            vm.destinationId = undefined;
            vm.working = false;
          }
        });
      };

      vm.getCurrentConnections();
      vm.getCurrentDestination();
    };

  angular.module('apox')
    .controller('GamePageController', ['DriverService', 'LocationService', 'TripService', gamePageController]);
})();
