(() => {
  'use strict';

  /* eslint-env jquery, browser */

  /* A service to interface with the map routes */

  const mapService = function mapService($http) {
    return {
      loadMap: function loadMap() {
        this.mapData.loaded = false;
        return $http.get('/map')
          .then((res) => {
            this.mapData.locations = res.data.locations;
            this.mapData.connections = res.data.connections;
            this.mapData.loaded = true;
          });
      },
      updateLocation: function updateLocation(id, data) {
        return $http.patch(`/admin/map/location/${id}`, data);
      },
      mapData: {
        locations: {},
        connections: [],
        loaded: false
      }
    };
  };

  angular.module('apox').factory('MapService', ['$http', mapService]);
})();
