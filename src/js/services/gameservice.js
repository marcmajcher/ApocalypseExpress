(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gameService = function gameService($q, DriverService, LocationService, TripService) {
    return {
      init() {
        return $q.all([
          /* Get driver info */
          DriverService.getDriver().then((driver) => {
            this.driver = driver;
          }),

          /* Get info for current location */
          LocationService.getCurrentLocation().then((location) => {
            location.render = true;
            this.currentLocation = location;
          }),

          /* Get info for current trip, if any */
          TripService.getCurrentTrip().then((data) => {
            if (data.trip[0]) {
              this.trip = data.trip[0];
            }
          })
        ]);
      },
      driver: undefined,
      currentLocation: undefined,
      trip: undefined
    };
  };

  angular.module('apox').factory('GameService', [
    '$q', 'DriverService', 'LocationService', 'TripService', gameService
  ]);
})();
