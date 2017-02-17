(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const gameTabController = function gameTabController(TabService) {
    const ctrl = this;

    ctrl.state = TabService.state;

    ctrl.setState = function(state) {
      TabService.setTab(state);
    };
  };

  angular.module('apox').component('gameTabs', {
    controller: ['TabService', gameTabController],
    templateUrl: '../template/gametabs.template.html'
  });
})();
