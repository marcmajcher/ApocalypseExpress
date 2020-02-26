(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const refreshTime = 1000;

  const GamePageController =
    function gamePageController($scope, GameService, LocationService, SocketService, TabService) {
      const ç = this;

      ç.error = false;
      ç.loaded = false;
      ç.state = TabService.state;
      ç.traveling = false;
      ç.working = false;
      ç.trip = {};

      GameService.init()
        .then(() => {
          SocketService.init();
          ç.driver = GameService.driver;

          ç.currentLocation = GameService.currentLocation;

          if (GameService.trip && GameService.trip.underway) {
            const currentTrip = GameService.trip;
            if (currentTrip.progress === 'done') {
              ç.trip.progress = ç.trip.distance;
              ç.getCurrentLocation();
              ç.traveling = false;
              ç.state.traveling = false;
            }
            else {
              ç.trip = {
                origin: ç.currentLocation,
                destination: currentTrip,
                progress: currentTrip.progress,
                distance: LocationService.getDistanceFromId(
                  ç.currentLocation, currentTrip.destinationid),
              };
              ç.setTripLocation();
              ç.traveling = currentTrip.progress > 0;
              ç.state.traveling = currentTrip.progress > 0;
              setTimeout(() => {
                ç.currentLocation.render = false;
              }, 0); // don't set false until after applied
            }
          }

          SocketService.on('tripProgress', (data) => {
            if (data.progress === 'done') {
              ç.trip.progress = ç.trip.distance;
              $scope.$apply();
              setTimeout(() => {
                ç.getCurrentLocation();
                ç.traveling = false;
                ç.state.traveling = false;
              }, refreshTime);
            }
            else {
              ç.trip.progress = data.progress;
              ç.setTripLocation();
              ç.currentLocation.render = false;
              $scope.$apply();
            }
          });

          ç.loaded = true;
        });

      ç.setTripLocation = function setTripLocation() {
        const ratio = ç.trip.progress / ç.trip.distance;
        ç.currentLocation.latitude = ç.trip.origin.latitude +
          ((ç.trip.destination.latitude - ç.trip.origin.latitude) * ratio);
        ç.currentLocation.longitude = ç.trip.origin.longitude +
          ((ç.trip.destination.longitude - ç.trip.origin.longitude) * ratio);
        ç.currentLocation = angular.copy(ç.currentLocation);
      };

      ç.getCurrentLocation = function getCurrentLocation() {
        LocationService.getCurrentLocation().then((location) => {
          location.render = true;
          ç.currentLocation = location;
          GameService.currentLocation = location;
          ç.trip = {
            origin: location
          };
        });
      };
    };

  angular.module('apox').component('gamePage', {
    controller: ['$scope', 'GameService', 'LocationService', 'SocketService', 'TabService', GamePageController],
    templateUrl: '../template/_gamepage.template.html'
  });
})();
