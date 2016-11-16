(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController = function gamePageController(DriverService) {
    const vm = this;

    DriverService.getDriver()
      .then((driver) => {
        vm.driver = driver.data;
      });
    vm.currentLocation = {
      name: 'Buttsville'
    };
  };

  angular.module('apox')
    .controller('GamePageController', ['DriverService', gamePageController]);
})();
