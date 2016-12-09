(() => {
  'use strict';

  const apoxMap = function apoxMap(GameService, MapService, MapRenderer) {
    return {
      restrict: 'E',
      template: '<canvas class="map-canvas" resize="true"></canvas>',
      link: (scope, element) => {
        paper.setup(element.context.firstChild);

        const bgLayer = new paper.Layer();
        bgLayer.texasMap = new paper.Raster('/img/texasmap2.jpg');

        const mapLayer = new paper.Layer();

        MapRenderer.setupMouseWheel(element, {
          zoom: true
        });

        function renderMap() {
          MapService.loadMap()
            .then(() => {
              MapRenderer.render({
                isAdmin: false,
                mapLayer
              });
              MapRenderer.centerMap(GameService.currentLocation);
            });
        }

        scope.$watch(() => GameService.currentLocation, () => {
          renderMap();
        }, true);
      }
    };
  };

  angular.module('apox').directive('apoxMap', ['GameService', 'MapService', 'MapRenderer', apoxMap]);
})();
