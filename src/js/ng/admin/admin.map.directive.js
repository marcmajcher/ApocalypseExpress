(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  const apoxAdminMap = function apoxAdminMap(MapRenderer) {
    return {
      restrict: 'E',
      template: '<canvas class="map-canvas" resize="true"></canvas>',
      link: (scope, element) => {
        paper.setup(element.context.firstChild);

        const bgLayer = new paper.Layer();
        bgLayer.texasMap = new paper.Raster('/img/texasmap.jpg');
        const factionLayer = new paper.Layer();
        const mapLayer = new paper.Layer();

        scope.$watch('admin.dataLoaded', () => {
          if (scope.admin.dataLoaded) {
            const data = scope.admin.mapData;
            MapRenderer.render({
              isAdmin: true,
              data,
              scope,
              factionLayer,
              mapLayer
            });
            MapRenderer.setupMouseWheel(element, {
              zoom: true,
              pan: true
            });
          }
        });

        paper.view.center = new paper.Point(1100, 500);
        element.bind('mousewheel', MapRenderer.onMouseWheel);
      }
    };
  };

  angular.module('apox').directive('apoxAdminMap', ['MapRenderer', apoxAdminMap]);
})();
