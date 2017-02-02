(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const GamePageController =
    function gamePageController(GameService, FactionService, LocationService,
      TripService, SocketService) {
      const ctrl = this;

      ctrl.working = false;
      ctrl.traveling = false;
      ctrl.factionTags = FactionService.factionTags;

      GameService.init()
        .then(() => {
          SocketService.init();
          ctrl.driver = GameService.driver;
          ctrl.currentLocation = GameService.currentLocation;
          ctrl.destination = GameService.destination;

          SocketService.on('message', (data) => {
            console.log('here is the thing set on on in gameservice', data.progress);
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
    controller: ['GameService', 'FactionService', 'LocationService',
      'TripService', 'SocketService', GamePageController
    ],
    templateUrl: '../tmpl/game/gamepage.template.html'
  });
})();
