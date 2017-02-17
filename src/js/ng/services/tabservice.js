(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const tabService = function tabService() {
    return {
      state: 'default'
    };
  };

  angular.module('apox').factory('TabService', [tabService]);
})();
