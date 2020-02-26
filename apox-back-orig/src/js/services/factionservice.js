(() => {
  'use strict';

  /* eslint-env jquery, browser */

  class FactionService {
    constructor() {
      this.factionColors = [
        '#aaaaaa', '#0000aa', '#aa0000', '#00aa00', '#440088', '#aaaa00'
      ];
      this.factionTags = [
        '', 'republic', 'confederation', 'alliance', 'petrex', 'light'
      ];
    }
  }

  angular.module('apox').service('FactionService', FactionService);
})();
