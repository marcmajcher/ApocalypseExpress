(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const GameCargoController = function gameCargoController(TabService, GameService) {
    const ctrl = this;

    ctrl.state = TabService.state;
    ctrl.goods = GameService.currentLocation.goods;


  };

  angular.module('apox').component('gameCargo', {
    bindings: {},
    templateUrl: '../template/game.cargo.template.html',
    controller: ['TabService', 'GameService', GameCargoController]
  });
})();
