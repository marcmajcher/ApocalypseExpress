(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const mapService = function mapService($http) {
    return {
      getMap: function getMap() {
        return $http.get('/map');
      },
      updateLocation: function updateLocation(id, data) {
        return $http.patch(`/admin/map/location/${id}`, data);
      }
    };
  };

  angular.module('apox').factory('MapService', ['$http', mapService]);
})();
