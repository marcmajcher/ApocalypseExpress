(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const factionService = function factionService() {
    return {
      factionColors: [
        '#aaaaaa', '#0000aa', '#aa0000', '#00aa00', '#440088', '#aaaa00'
      ],
      factionTags: [
        '', 'republic', 'confederation', 'alliance', 'petrex', 'light'
      ]
    };
  };

  angular.module('apox').factory('FactionService', [factionService]);
})();
