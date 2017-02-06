(() => {
  'use strict';

  const ApoxMapController = function apoxMapController($element,
    GameService, MapService, MapRenderer) {
    const ctrl = this;

    paper.setup($element.context.firstChild);
    const bgLayer = new paper.Layer();
    bgLayer.texasMap = new paper.Raster('/img/texasmap2.jpg');
    const mapLayer = new paper.Layer();

    MapRenderer.setupMouseWheel($element, {
      zoom: true
    });

    function renderMap() {
      MapService.loadMap()
        .then(() => {
          MapRenderer.render({
            isAdmin: false,
            mapLayer
          });
          MapRenderer.centerMap(ctrl.location);
        });
    }

    ctrl.$onChanges = () => {
      if (ctrl.location.render) {
        renderMap();
      }
      else {
        MapRenderer.centerMap(ctrl.location);
      }
    };
  };

  angular.module('apox').component('apoxMap', {
    controller: ['$element', 'GameService', 'MapService', 'MapRenderer', ApoxMapController],
    template: '<canvas class="map-canvas" resize="true"></canvas>',
    bindings: {
      location: '<'
    }
  });
})();
