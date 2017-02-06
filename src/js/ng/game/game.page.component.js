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
                destination: currentTrip.name,
                progress: currentTrip.progress,
                origin: ctrl.currentLocation.name,
                distance: LocationService.getDistanceFromId(
                  ctrl.currentLocation, currentTrip.destinationid)
              };
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

              // ctrl.currentLocation.latitude -= .1;
              // ctrl.currentLocation = angular.copy(ctrl.currentLocation)
              $scope.$apply();
            }
          });

          ctrl.loaded = true;
        });

      ctrl.getCurrentLocation = function getCurrentLocation() {
        LocationService.getCurrentLocation().then((location) => {
          ctrl.currentLocation = location;
          GameService.currentLocation = location;
          ctrl.trip = {
            origin: location.name
          };
        });
      };
    };

  angular.module('apox').component('gamePage', {
    controller: ['$scope', 'GameService', 'LocationService', 'SocketService', GamePageController],
    templateUrl: '../tmpl/game/gamepage.template.html'
  });
})();
