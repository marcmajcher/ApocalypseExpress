(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gamePage = function gamePage() {

    return {
      scope: true,
      controller: 'GamePageController',
      controllerAs: 'game'
    };
  };

  angular.module('apox').directive('gamePage', gamePage);

})();
