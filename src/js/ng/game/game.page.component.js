(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const GamePageController =
    function gamePageController(GameService, FactionService, LocationService, TripService) {
      const ctrl = this;

      ctrl.working = false;
      ctrl.traveling = false;
      ctrl.factionTags = FactionService.factionTags;

      GameService.init()
        .then(() => {
          ctrl.driver = GameService.driver;
          ctrl.currentLocation = GameService.currentLocation;
          ctrl.destination = GameService.destination;

          // TODO: move to socketService
          const socket = io('//localhost:3000');
          socket.on('message', (data) => {
            console.log(data); // eslint-disable-line no-console
          });
        });

      ctrl.setDestination = function setDestination(id) {
        ctrl.working = true;
        TripService.setNextDestination(id).then((data) => {
          if (data.ok) {
            ctrl.destinationName = data.name;
            ctrl.destinationId = data.id;
            ctrl.working = false;
          }
          // TODO: error check
          // TODO: better response from the route - return new id?
        });
      };

      ctrl.goDestination = function goDestination() {
        ctrl.working = true;
        TripService.beginTrip().then((data) => {
          if (data === 'ok') {
            ctrl.getCurrentLocation();
            ctrl.destinationName = undefined;
            ctrl.destinationId = undefined;
            ctrl.working = false;
          }
        });
      };

      ctrl.getCurrentLocation = function getCurrentLocation() {
        LocationService.getCurrentLocation().then((location) => {
          ctrl.currentLocation = location;
          GameService.currentLocation = location;
        });
      };

      ctrl.clearDestination = function clearDestination() {
        ctrl.working = true;
        TripService.clearTrip().then((data) => {
          if (data === 'ok') {
            ctrl.destinationName = undefined;
            ctrl.destinationId = undefined;
            ctrl.working = false;
          }
        });
      };
    };

  angular.module('apox').component('gamePage', {
    controller: ['GameService', 'FactionService', 'LocationService', 'TripService', GamePageController],
    templateUrl: '../tmpl/game/gamepage.template.html'
  });
})();
