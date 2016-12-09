(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gameService = function gameService() {
    return {
      booyah: function booyah() {
        console.log('BOOYAH');
      }
    };
  };

  angular.module('apox').factory('GameService', [gameService]);
})();
