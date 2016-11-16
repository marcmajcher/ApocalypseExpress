(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController = function gamePageController(DriverService, LocationService) {
    const vm = this;

    DriverService.getDriver().then((driver) => {
      vm.driver = driver;
    });
    // (error) => {
    //   // console.log('was error!'); // TODO: handle error
    // });

    LocationService.getCurrentLocation().then((location) => {
      vm.currentLocation = location;
    });
    // TODO: handle error
  };

  angular.module('apox')
    .controller('GamePageController', ['DriverService', 'LocationService', gamePageController]);
})();
