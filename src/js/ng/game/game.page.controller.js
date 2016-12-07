(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController =
    function gamePageController(DriverService, LocationService, TripService) {
      const vm = this;

      vm.working = false;
      vm.traveling = false;

      vm.factionTags = [
        '', 'republic', 'confederation', 'alliance', 'petrex', 'light'
      ];

      DriverService.getDriver().then((driver) => {
        vm.driver = driver;
      });

      vm.getCurrentLocation = function getCurrentLocation() {
        LocationService.getCurrentLocation().then((location) => {
          vm.currentLocation = location;
        });
      };

      vm.getCurrentDestination = function getCurrentDestination() {
        TripService.getCurrentTrip().then((data) => {
          if (data.trip[0]) {
            vm.destinationName = data.trip[0].name;
            vm.destinationId = data.trip[0].id;
          }
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
            vm.getCurrentLocation();
            vm.destinationName = undefined;
            vm.destinationId = undefined;
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

      vm.getCurrentLocation();
      vm.getCurrentDestination();
    };

  angular.module('apox')
    .controller('GamePageController', ['DriverService', 'LocationService', 'TripService', gamePageController]);
})();
