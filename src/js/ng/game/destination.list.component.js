(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const DestinationListController =
    function destinationListController(LocationService, TripService) {
      const ctrl = this;

      ctrl.setDestination = function setDestination(id) {
        ctrl.working = true;
        TripService.setNextDestination(id).then((data) => {
            if (data.ok) {
              ctrl.trip = {
                progress: 0,
                destination: data.name,
                origin: ctrl.location.name,
                distance: LocationService.getDistanceFromId(ctrl.location, data.id)
              };
              ctrl.working = false;
            }
            else {
              ctrl.error = 'setNextDestination Error: Please try again later.';
              console.error(data); // eslint-disable-line
            }
          })
          .catch((error) => {
            ctrl.error = 'setNextDestination Error: Please try again later.';
            console.error(error); // eslint-disable-line
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

      ctrl.clearDestination = function clearDestination() {
        ctrl.working = true;
        TripService.clearTrip().then((data) => {
          if (data === 'ok') {
            ctrl.trip = {
              origin: ctrl.location.name
            };
            ctrl.working = false;
          }
        });
      };
    };

  angular.module('apox').component('destinationList', {
    bindings: {
      traveling: '=',
      working: '=',
      location: '<',
      tags: '<',
      trip: '='
    },
    controller: ['LocationService', 'TripService', DestinationListController],
    templateUrl: '../tmpl/game/destinations.template.html'
  });
})();
