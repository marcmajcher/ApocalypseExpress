(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint max-params: ["error", 6] */

  const getDistanceFromId = (location, id) => {
    for (let i = 0; i < location.connections.length; i++) {
      if (location.connections[i].id === id) {
        return location.connections[i].distance;
      }
    }
    return -1; // eslint-disable-line no-magic-numbers
  };

  const GamePageController =
    function gamePageController($scope, GameService, FactionService, // jshint ignore: line
      LocationService, TripService, SocketService) {
      const ctrl = this;

      ctrl.loaded = false;
      ctrl.working = false;
      ctrl.traveling = false;
      ctrl.factionTags = FactionService.factionTags;
      ctrl.trip = {};

      GameService.init()
        .then(() => {
          SocketService.init();
          ctrl.driver = GameService.driver;
          ctrl.currentLocation = GameService.currentLocation;
          if (GameService.trip) {
            const currentTrip = GameService.trip;
            console.log('CURRENT TRIP:', currentTrip);
            if (currentTrip.progress === 'done') {
              ctrl.trip.progress = ctrl.trip.distance;
              ctrl.getCurrentLocation();
              ctrl.traveling = false;
            }
            else {
              ctrl.trip = {
                destination: currentTrip.name,
                progress: currentTrip.progress,
                origin: ctrl.currentLocation.name,
                distance: getDistanceFromId(ctrl.currentLocation, currentTrip.destinationId)
              };
              ctrl.traveling = currentTrip.progress > 0;
            }
          }
          // console.log('DEST', ctrl.destination);

          SocketService.on('tripProgress', (data) => {
            if (data.progress === 'done') {
              ctrl.trip.progress = ctrl.trip.distance;
              $scope.$apply();
              setTimeout(() => {
                ctrl.getCurrentLocation();
                ctrl.traveling = false;
              }, 1000); // eslint-disable-line no-magic-numbers
            }
            else {
              ctrl.trip.progress = data.progress;
              console.log('progress', ctrl.trip.progress);
              $scope.$apply();
            }
          });

          ctrl.loaded = true;
        });

      ctrl.setDestination = function setDestination(id) {
        ctrl.working = true;
        TripService.setNextDestination(id).then((data) => {
          if (data.ok) {
            ctrl.destinationId = data.id;
            ctrl.trip = {
              progress: 0,
              destination: data.name,
              origin: ctrl.currentLocation.name,
              distance: getDistanceFromId(ctrl.currentLocation, data.id)
            };
            ctrl.working = false;
          }
          // TODO: error check
          // TODO: better response from the route - return new id?
        });
      };

      ctrl.goDestination = function goDestination() {
        ctrl.working = true;
        ctrl.traveling = true;
        TripService.beginTrip().then((data) => {
          if (data === 'ok') {
            ctrl.working = false;
          }
        });
      };

      ctrl.getCurrentLocation = function getCurrentLocation() {
        LocationService.getCurrentLocation().then((location) => {
          ctrl.currentLocation = location;
          GameService.currentLocation = location;
          ctrl.trip = {
            origin: location.name
          };
        });
      };

      ctrl.clearDestination = function clearDestination() {
        ctrl.working = true;
        TripService.clearTrip().then((data) => {
          if (data === 'ok') {
            ctrl.destinationId = undefined;
            ctrl.trip = {
              origin: ctrl.currentLocation.name
            };
            ctrl.working = false;
          }
        });
      };
    };

  angular.module('apox').component('gamePage', {
    controller: ['$scope', 'GameService', 'FactionService', 'LocationService',
      'TripService', 'SocketService', GamePageController
    ],
    templateUrl: '../tmpl/game/gamepage.template.html'
  });
})();
