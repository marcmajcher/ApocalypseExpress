(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  const apoxMap = function apoxMap(MapRenderer) {
    return {
      restrict: 'E',
      template: '<canvas class="map-canvas" resize="true"></canvas>',
      link: (scope, element) => {
        paper.setup(element.context.firstChild);
        const bgLayer = new paper.Layer();
        bgLayer.texasMap = new paper.Raster('/img/texasmap2.jpg');
        bgLayer.opacity = 0.5;

        const mapLayer = new paper.Layer();

        function centerMap() {
          if (scope.$parent.game.currentLocation && scope.map.mapData.locations) {
            const loc = scope.map.mapData.locations[scope.$parent.game.currentLocation.id];
            paper.view.center = new paper.Point(loc.point.x, loc.point.y);
          }
        }

        scope.$watch('map.dataLoaded', () => {
          if (scope.map.dataLoaded) {
            const data = scope.map.mapData;
            MapRenderer.render({
              isAdmin: false,
              data,
              scope,
              mapLayer
            });
            centerMap();
          }
          MapRenderer.setupMouseWheel(element, {
            zoom: true,
            pan: false
          });
        });

        scope.$watch('$parent.game.currentLocation', () => {
          centerMap();
        });
      }
    };
  };

  angular.module('apox').directive('apoxMap', ['MapRenderer', apoxMap]);
})();
