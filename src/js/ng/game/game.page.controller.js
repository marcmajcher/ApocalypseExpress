(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController =
    function gamePageController(GameService, FactionService, LocationService, TripService) {
      const vm = this;

      vm.working = false;
      vm.traveling = false;
      vm.factionTags = FactionService.factionTags;

      GameService.init()
        .then(() => {
          vm.driver = GameService.driver;
          vm.currentLocation = GameService.currentLocation;
          vm.destination = GameService.destination;
        });

      vm.setDestination = function setDestination(id) {
        vm.working = true;
        TripService.setNextDestination(id).then((data) => {
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
            vm.getCurrentLocation();
            vm.destinationName = undefined;
            vm.destinationId = undefined;
            vm.working = false;
          }
        });
      };

      vm.getCurrentLocation = function getCurrentLocation() {
        LocationService.getCurrentLocation().then((location) => {
          vm.currentLocation = location;
          GameService.currentLocation = location;
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
    };

  angular.module('apox')
    .controller('GamePageController', [
      'GameService', 'FactionService', 'LocationService', 'TripService', gamePageController
    ]);
})();
