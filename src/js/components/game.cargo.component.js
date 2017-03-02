(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const GameCargoController = function gameCargoController(TabService) {
    const ctrl = this;

    ctrl.state = TabService.state;
  };

  angular.module('apox').component('gameCargo', {
    bindings: {
      goods: '='
    },
    templateUrl: '../template/game.cargo.template.html',
    controller: ['TabService', GameCargoController]
  });
})();
