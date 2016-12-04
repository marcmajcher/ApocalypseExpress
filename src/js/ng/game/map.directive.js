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
        bgLayer.texasMap = new paper.Raster('/img/texasmap.jpg');

        const factionLayer = new paper.Layer();
        const mapLayer = new paper.Layer();

        scope.$watch('admin.dataLoaded', () => {
          const data = scope.admin.mapData;
          if (data.locations && data.connections) {
            /* calculate location points */
            Object.keys(data.locations).forEach((id) => {
              data.locations[id].point = RenderMap.locToPoint(data.locations[id]);
              data.locations[id].paths = [];
              data.locations[id].ends = [];
            });

            /* Draw connections */
            for (let i = 0; i < data.connections.length; i++) {
              const connection = data.connections[i];
              const loc1 = data.locations[connection.loc1];
              const loc2 = data.locations[connection.loc2];

              const path = new paper.Path.Line(loc1.point, loc2.point);
              path.strokeColor = 'black';
              path.strokeWidth = RenderMap.baseConWidth;

              loc1.ends.push(path.segments[0].point);
              loc2.ends.push(path.segments[1].point);
              loc1.paths.push(path);
              loc2.paths.push(path);
            }

            /* render locations */
            const textOffset = [0, -20];
            const locationKeys = Object.keys(data.locations).sort((a, b) =>
              data.locations[a].latitude > data.locations[b].latitude
            );

            locationKeys.forEach((id) => {
              const location = data.locations[id];

              const faction = new paper.Path.Circle({
                center: location.point,
                radius: RenderMap.baseDotSize * Math.ceil(Math.log10(location.population)) * 40,
                name: 'faction'
              });
              faction.fillColor = {
                gradient: {
                  stops: [
                    [RenderMap.factionColors[location.factionid], 0.6],
                    [RenderMap.alphaClear, 1]
                  ],
                  radial: true
                },
                origin: faction.position,
                destination: faction.bounds.rightCenter
              };
              factionLayer.addChild(faction);

              const dot = new paper.Path.Circle({
                center: location.point,
                radius: RenderMap.baseDotSize * Math.ceil(Math.log10(location.population)),
                fillColor: 'black',
                name: 'dot'
              });

              const text = new paper.PointText({
                point: location.point.add(textOffset),
                justification: 'center',
                fillColor: 'black',
                strokeColor: 'white',
                content: location.name,
                name: 'locname',
                visible: false,
                fontSize: 30
              });

              const locGroup = new paper.Group([dot, text]);
              locGroup.location = location;
              locGroup.scope = scope;

              locGroup.onMouseEnter = RenderMap.rolloverLocation;
              locGroup.onMouseLeave = RenderMap.rolloutLocation;
              locGroup.onMouseDrag = RenderMap.dragLocation;
              locGroup.onMouseDown = RenderMap.mousedownLocation;
              locGroup.onMouseUp = RenderMap.mouseupLocation;
            });
          }
        });

        mapLayer.onMouseDrag = (event) => {
          mapLayer.position = mapLayer.position.add([event.delta.x, event.delta.y]);
        };

        paper.view.center = new paper.Point(1100, 500);

        element.bind('mousewheel', (event) => {
          const dx = event.originalEvent.wheelDeltaX;
          const dy = event.originalEvent.wheelDeltaY;

          if (event.altKey) {
            const mousePos = new paper.Point(event.offsetX, event.offsetY);
            const z = RenderMap.changeZoom(paper.view.zoom, dy, paper.view.center, mousePos);
            paper.view.zoom = z.newZoom;
            // view.center = view.center.add(z.a);
            event.preventDefault();
          }
          else {
            paper.view.center = RenderMap.changeCenter(paper.view.center, dx, dy, 1);
            event.preventDefault();
          }
        });
      }
    };
  };

  angular.module('apox').directive('apoxMap', ['RenderMap', renderMap]);
})();
