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

        const factionLayer = new paper.Layer();
        const mapLayer = new paper.Layer();

        scope.$watch('map.dataLoaded', () => {
          const data = scope.map.mapData;
          MapRenderer.render({
            isAdmin: false,
            data,
            scope,
            factionLayer,
            mapLayer
          });
        });

        paper.view.center = new paper.Point(1100, 500);
        element.bind('mousewheel', MapRenderer.onMouseWheel);
      }
    };
  };

  angular.module('apox').directive('apoxMap', ['MapRenderer', apoxMap]);
})();
