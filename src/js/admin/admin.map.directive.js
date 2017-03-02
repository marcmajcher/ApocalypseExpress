(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  const apoxAdminMap = function apoxAdminMap(MapRenderer, MapService) {
    return {
      restrict: 'E',
      template: '<canvas class="map-canvas" resize="true"></canvas>',
      link: (scope, element) => {
        paper.setup(element.context.firstChild);

        const bgLayer = new paper.Layer();
        bgLayer.texasMap = new paper.Raster('/img/texasmap.jpg');

        const mapLayer = new paper.Layer();

        MapService.loadMap()
          .then(() => {
            MapRenderer.render({
              isAdmin: true,
              mapLayer,
              scope
            });
          });

        MapRenderer.setupMouseWheel(element, {
          pan: true,
          zoom: true,
          zoomAlt: true
        });

        paper.view.center = new paper.Point(1100, 500);
      }
    };
  };

  angular.module('apox').directive('apoxAdminMap', ['MapRenderer', 'MapService', apoxAdminMap]);
})();
