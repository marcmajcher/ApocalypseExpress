(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const tabService = function tabService() {
    return {
      state: {
        tab: 'default'
      },
      setTab(tab) {
        this.state.tab = tab;
      }
    };
  };

  angular.module('apox').factory('TabService', [tabService]);
})();
