(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePageController = function gamePageController() {
    const vm = this;

    vm.driver = {
      name: 'Barney'
    };
    vm.currentLocation = {
      name: 'Buttsville'
    };
  };

  angular.module('apox')
    .controller('GamePageController', ['$http', gamePageController]);
})();
