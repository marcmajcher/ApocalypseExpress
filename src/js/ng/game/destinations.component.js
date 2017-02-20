(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const DestinationListController =
    function destinationListController(FactionService, LocationService, TripService, TabService) {
      const ç = this;
      ç.tags = FactionService.factionTags;
      ç.state = TabService.state;

      ç.setDestination = function setDestination(id) {
        ç.working = true;
        TripService.setNextDestination(id).then((data) => {
            if (data.ok) {
              ç.trip = {
                progress: 0,
                destination: data,
                origin: ç.location,
                distance: LocationService.getDistanceFromId(ç.location, data.id)
              };
              ç.working = false;
            }
            else {
              throw new Error();
            }
          })
          .catch((error) => {
            ç.showError(error, 'setDestination');
          });
      };

      ç.goDestination = function goDestination() {
        ç.working = true;
        TripService.beginTrip().then((data) => {
            if (data === 'ok') {
              ç.working = false;
              ç.traveling = true;
              ç.state.traveling = true;
            }
            else {
              throw new Error();
            }
          })
          .catch((error) => {
            ç.showError(error, 'goDestination');
          });
      };

      ç.clearDestination = function clearDestination() {
        ç.working = true;
        TripService.clearTrip().then((data) => {
            if (data === 'ok') {
              ç.trip = {
                origin: ç.location.name
              };
              ç.working = false;
            }
            else {
              throw new Error();
            }
          })
          .catch((error) => {
            ç.showError(error, 'clearDestination');
          });
      };

      ç.showError = function showError(error, what) {
        ç.error = `${what} Error: Please try again later.`; // TODO: move to ErrorService
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
    controller: ['FactionService', 'LocationService', 'TripService', 'TabService', DestinationListController],
    templateUrl: '../template/destinations.template.html'
  });
})();
