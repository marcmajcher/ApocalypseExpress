(() => {
  'use strict';

  /* eslint-env jquery, browser */

  /* A service to interface with the map routes */

  const mapData = {
    locations: {},
    connections: []
  };

  const mapService = function mapService($http) {
    return {
      loadMap: function loadMap() {
        return $http.get('/map');
      },
      updateLocation: function updateLocation(id, data) {
        return $http.patch(`/admin/map/location/${id}`, data);
      }
    };
  };

  angular.module('apox').factory('MapService', ['$http', mapService]);
})();
