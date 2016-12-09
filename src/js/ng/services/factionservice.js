(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const factionService = function factionService() {
    return {
      factionColors: [
        '#000000', '#6666ff', '#ff6666', '#669966', '#ac00e6', '#ffff66'
      ],
      factionTags: [
        '', 'republic', 'confederation', 'alliance', 'petrex', 'light'
      ]
    };
  };

  angular.module('apox').factory('FactionService', [factionService]);
})();
