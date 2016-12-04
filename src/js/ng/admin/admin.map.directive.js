(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  angular.module('apox').directive('apoxAdminMap', () => {
    const baseDotSize = 3;
    const baseConWidth = 3;
    const xScale = 435.30;
    const yScale = -506.5;
    const xOffset = 43647;
    const yOffset = 15855;
    const alphaBlack = new paper.Color(0, 0, 0, 0.5);
    const alphaClear = new paper.Color(255, 255, 255, 0);
    const factionColors = [
      new paper.Color(0, 0, 0, 0.95),
      new paper.Color(0, 0, 255, 0.2),
      new paper.Color(255, 0, 0, 0.2),
      new paper.Color(0, 255, 0, 0.2),
      new paper.Color(75, 0, 130, 0.2),
      new paper.Color(255, 255, 0, 0.2)
    ];

    function locToPoint(loc) {
      return new paper.Point((loc.longitude * xScale) + xOffset, (loc.latitude * yScale) + yOffset);
    }

    function pointToLatLong(point) {
      return {
        longitude: (point.x - xOffset) / xScale,
        latitude: (point.y - yOffset) / yScale
      };
    }

    /* Location dot mouse event handlers */

    function mousedownLocation(event) {
      /* pop target dot to the top of the z-index */
      const parent = event.target.parent;
      event.target.remove();
      parent.addChild(event.target);

      event.target.children.dot.fillColor.alpha = 0.5;
      for (let i = 0; i < event.target.location.paths.length; i++) {
        event.target.location.paths[i].strokeColor = alphaBlack;
      }

      event.target.scope.$apply(() => {
        event.target.scope.admin.showDetailPanel = true;
        event.target.scope.admin.location = event.target.location;
      });
    }

    function mouseupLocation(event) {
      event.target.children.dot.fillColor.alpha = 1;
      for (let i = 0; i < event.target.location.paths.length; i++) {
        event.target.location.paths[i].strokeColor = 'black';
      }
    }

    function dragLocation(event) {
      /* update the position of the target dot based on mouse move */
      const target = event.target;
      target.position = target.position.add([event.delta.x, event.delta.y]);

      /* update all connected paths with new position */
      for (let i = 0; i < target.location.paths.length; i++) {
        target.location.ends[i].x = target.children.dot.position.x;
        target.location.ends[i].y = target.children.dot.position.y;
      }

      /* set the lat/long for the new position on the target dot */
      const newLocation = pointToLatLong(target.position);
      target.location.longitude = newLocation.longitude;
      target.location.latitude = newLocation.latitude;

      /* update controller model */
      target.scope.$apply(() => {
        target.scope.admin.location.longitude = newLocation.longitude;
        target.scope.admin.location.latitude = newLocation.latitude;
      });

      event.stopPropagation();
    }

    function rolloverLocation(event) {
      event.target.children.locname.visible = true;
    }

    function rolloutLocation(event) {
      event.target.children.locname.visible = false;
    }

    /* Mousewheel navigation methods */

    function changeZoom(oldZoom, delta, c, p) {
      const factor = 1.05;
      let newZoom = oldZoom;
      if (delta > 0) {
        newZoom *= factor;
      }
      if (delta < 0) {
        newZoom /= factor;
      }
      // return newZoom;
      const beta = oldZoom / newZoom;
      const pc = p.subtract(c);
      const a = p.subtract(pc.multiply(beta)).subtract(c);
      return {
        newZoom,
        a
      };
    }

    function changeCenter(oldCenter, deltaX, deltaY, factor) {
      const offset = new paper.Point(deltaX, deltaY).multiply(factor);
      return oldCenter.subtract(offset);
    }

    /* Main directive declaration */

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
              data.locations[id].point = locToPoint(data.locations[id]);
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
              path.strokeWidth = baseConWidth;

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
                radius: baseDotSize * Math.ceil(Math.log10(location.population)) * 40,
                name: 'faction'
              });
              faction.fillColor = {
                gradient: {
                  stops: [
                    [factionColors[location.factionid], 0.6],
                    [alphaClear, 1]
                  ],
                  radial: true
                },
                origin: faction.position,
                destination: faction.bounds.rightCenter
              };
              factionLayer.addChild(faction);

              const dot = new paper.Path.Circle({
                center: location.point,
                radius: baseDotSize * Math.ceil(Math.log10(location.population)),
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

              locGroup.onMouseEnter = rolloverLocation;
              locGroup.onMouseLeave = rolloutLocation;
              locGroup.onMouseDrag = dragLocation;
              locGroup.onMouseDown = mousedownLocation;
              locGroup.onMouseUp = mouseupLocation;
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
            const z = changeZoom(paper.view.zoom, dy, paper.view.center, mousePos);
            paper.view.zoom = z.newZoom;
            // view.center = view.center.add(z.a);
            event.preventDefault();
          }
          else {
            paper.view.center = changeCenter(paper.view.center, dx, dy, 1);
            event.preventDefault();
          }
        });
      }
    };
  });
})();
