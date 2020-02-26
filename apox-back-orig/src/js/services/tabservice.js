(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const tabService = function tabService() {
    return {
      state: {
        tab: 'default',
        traveling: false,
        loc: 'default'
      },
      setTab(tab) {
        this.state.tab = tab;
      },
      setLoc(loc) {
        this.state.loc = loc;
      }
    };
  };

  angular.module('apox').factory('TabService', [tabService]);
})();
