(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const DestinationListController =
    function destinationListController(FactionService, LocationService, TripService) {
      const ctrl = this;
      ctrl.tags = FactionService.factionTags;

      ctrl.setDestination = function setDestination(id) {
        ctrl.working = true;
        TripService.setNextDestination(id).then((data) => {
            if (data.ok) {
              ctrl.trip = {
                progress: 0,
                destination: data,
                origin: ctrl.location,
                distance: LocationService.getDistanceFromId(ctrl.location, data.id)
              };
              ctrl.working = false;
            }
            else {
              throw new Error();
            }
          })
          .catch((error) => {
            ctrl.showError(error, 'setDestination');
          });
      };

      ctrl.goDestination = function goDestination() {
        ctrl.working = true;
        TripService.beginTrip().then((data) => {
            if (data === 'ok') {
              ctrl.working = false;
              ctrl.traveling = true;
            }
            else {
              throw new Error();
            }
          })
          .catch((error) => {
            ctrl.showError(error, 'goDestination');
          });
      };

      ctrl.clearDestination = function clearDestination() {
        ctrl.working = true;
        TripService.clearTrip().then((data) => {
            if (data === 'ok') {
              ctrl.trip = {
                origin: ctrl.location.name
              };
              ctrl.working = false;
            }
            else {
              throw new Error();
            }
          })
          .catch((error) => {
            ctrl.showError(error, 'clearDestination');
          });
      };

      ctrl.showError = function showError(error, what) {
        ctrl.error = `${what} Error: Please try again later.`;
        console.error(`${what} ERROR`, error); // eslint-disable-line
      };
    };

  angular.module('apox').component('destinationList', {
    bindings: {
      error: '=',
      location: '<',
      traveling: '=',
      trip: '=',
      working: '='
    },
    controller: ['FactionService', 'LocationService', 'TripService', DestinationListController],
    templateUrl: '../tmpl/game/destinations.template.html'
  });
})();
