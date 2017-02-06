(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const refreshTime = 1000;

  const GamePageController =
    function gamePageController($scope, GameService, LocationService, SocketService) {
      const ctrl = this;

      ctrl.error = false;
      ctrl.loaded = false;
      ctrl.working = false;
      ctrl.traveling = false;
      ctrl.trip = {};

      GameService.init()
        .then(() => {
          SocketService.init();
          ctrl.driver = GameService.driver;
          ctrl.currentLocation = GameService.currentLocation;

          if (GameService.trip) {
            const currentTrip = GameService.trip;
            if (currentTrip.progress === 'done') {
              ctrl.trip.progress = ctrl.trip.distance;
              ctrl.getCurrentLocation();
              ctrl.traveling = false;
            }
            else {
              ctrl.trip = {
                origin: ctrl.currentLocation,
                destination: currentTrip,
                progress: currentTrip.progress,
                distance: LocationService.getDistanceFromId(
                  ctrl.currentLocation, currentTrip.destinationid)
              };
              ctrl.setTripLocation();
              ctrl.traveling = currentTrip.progress > 0;
            }
          }

          SocketService.on('tripProgress', (data) => {
            if (data.progress === 'done') {
              ctrl.trip.progress = ctrl.trip.distance;
              $scope.$apply();
              setTimeout(() => {
                ctrl.getCurrentLocation();
                ctrl.traveling = false;
              }, refreshTime);
            }
            else {
              ctrl.trip.progress = data.progress;
              ctrl.setTripLocation();
              $scope.$apply();
            }
          });

          ctrl.loaded = true;
        });

      ctrl.setTripLocation = function setTripLocation() {
        const ratio = ctrl.trip.progress / ctrl.trip.distance;
        ctrl.currentLocation.latitude = ctrl.trip.origin.latitude +
          ((ctrl.trip.destination.latitude - ctrl.trip.origin.latitude) * ratio);
        ctrl.currentLocation.longitude = ctrl.trip.origin.longitude +
          ((ctrl.trip.destination.longitude - ctrl.trip.origin.longitude) * ratio);
        ctrl.currentLocation.render = false;
        ctrl.currentLocation = angular.copy(ctrl.currentLocation);
      };

      ctrl.getCurrentLocation = function getCurrentLocation() {
        LocationService.getCurrentLocation().then((location) => {
          location.render = true;
          ctrl.currentLocation = location;
          GameService.currentLocation = location;
          ctrl.trip = {
            origin: location
          };
        });
      };
    };

  angular.module('apox').component('gamePage', {
    controller: ['$scope', 'GameService', 'LocationService', 'SocketService', GamePageController],
    templateUrl: '../tmpl/game/gamepage.template.html'
  });
})();
