(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gameService = function gameService($q, DriverService, LocationService, TripService) {
    return {
      init: function init() {
        return $q.all([
          /* Get driver info */
          DriverService.getDriver().then((driver) => {
            this.driver = driver;
          }),

          /* Get info for current location */
          LocationService.getCurrentLocation().then((location) => {
            this.currentLocation = location;
          }),

          /* Get info for current trip, if any */
          TripService.getCurrentTrip().then((data) => {
            if (data.trip[0]) {
              this.destination = {
                id: data.trip[0].id,
                name: data.trip[0].name
              };
            }
          })
        ]);
      },
      driver: undefined,
      currentLocation: undefined,
      destination: undefined
    };
  };

  angular.module('apox').factory('GameService', [
    '$q', 'DriverService', 'LocationService', 'TripService', gameService
  ]);
})();