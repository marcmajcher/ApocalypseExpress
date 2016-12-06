(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  const renderMap = function renderMap(RenderMap) {
    return {
      restrict: 'E',
      template: '<canvas class="map-canvas" resize="true"></canvas>',
      link: (scope, element) => {
        paper.setup(element.context.firstChild);
        const bgLayer = new paper.Layer();
        bgLayer.texasMap = new paper.Raster('/img/texasmap2.jpg');

        const factionLayer = new paper.Layer();
        const mapLayer = new paper.Layer();

        scope.$watch('map.dataLoaded', () => {
          const data = scope.map.mapData;
          RenderMap.render({
            isAdmin: false,
            data,
            scope,
            factionLayer,
            mapLayer
          });
          RenderMap.toggleFactions();
        });

        paper.view.center = new paper.Point(1100, 500);
        element.bind('mousewheel', RenderMap.onMouseWheel);
      }
    };
  };

  angular.module('apox').directive('apoxMap', ['RenderMap', renderMap]);
})();
