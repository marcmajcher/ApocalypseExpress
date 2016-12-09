(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  const mapRenderer = function mapRenderer() {
    const xScale = 435.30;
    const yScale = -506.5;
    const xOffset = 43647;
    const yOffset = 15855;

    const baseDotSize = 3;
    const baseConWidth = 3;

    const factionColors = [
      new paper.Color(0, 0, 0),
      new paper.Color('#6666ff'),
      new paper.Color('#ff6666'),
      new paper.Color('#669966'),
      new paper.Color('#ac00e6'),
      new paper.Color('#ffff66')
    ];

    function locToPoint(loc) {
      return new paper.Point(
        (loc.longitude * xScale) + xOffset,
        (loc.latitude * yScale) + yOffset);
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
        event.target.location.paths[i].strokeColor = new paper.Color(0, 0, 0, 0.5);
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

    function setupMouseWheel(element, actions) {
      const maxZoom = 1;
      const minZoom = 0.2;

      if (actions.zoom) {
        element.bind('mousewheel', (event) => {
          if (!actions.zoomAlt || event.altKey) {
            const mousePos = new paper.Point(event.offsetX, event.offsetY);
            const zoom = changeZoom(paper.view.zoom, event.originalEvent.wheelDeltaY,
              paper.view.center, mousePos);
            if (zoom.newZoom < maxZoom && zoom.newZoom > minZoom) {
              paper.view.zoom = zoom.newZoom;
            }
            // view.center = view.center.add(z.a);
            event.preventDefault();
          }
        });
      }

      if (actions.pan) {
        element.bind('mousewheel', (event) => {
          paper.view.center = changeCenter(paper.view.center,
            event.originalEvent.wheelDeltaX,
            event.originalEvent.wheelDeltaY, 1);
          event.preventDefault();
        });
      }
    }

    /* Main rendering method */

    function render(args) {
      const {
        isAdmin,
        data,
        scope,
        mapLayer
      } = args;

      if (data.locations && data.connections) {
        /* calculate location points */
        Object.keys(data.locations).forEach((id) => {
          data.locations[id].point = locToPoint(data.locations[id]);
          data.locations[id].paths = [];
          data.locations[id].ends = [];
        });

        mapLayer.removeChildren();

        /* Draw connections */
        for (let i = 0; i < data.connections.length; i++) {
          const connection = data.connections[i];
          const start = data.locations[connection.start];
          const end = data.locations[connection.end];

          if (start && end) {
            const path = new paper.Path.Line(start.point, end.point);
            path.strokeColor = isAdmin ? 'black' : 'dimgrey';
            path.strokeWidth = baseConWidth;
            mapLayer.addChild(path);

            start.ends.push(path.segments[0].point);
            end.ends.push(path.segments[1].point);
            start.paths.push(path);
            end.paths.push(path);
          }
        }

        /* render locations */
        const textOffset = [0, -20];
        const locationKeys = Object.keys(data.locations).sort((a, b) =>
          data.locations[a].latitude > data.locations[b].latitude
        );

        locationKeys.forEach((id) => {
          const location = data.locations[id];

          const dot = new paper.Path.Circle({
            center: location.point,
            radius: baseDotSize * Math.ceil(Math.log10(location.population)),
            fillColor: factionColors[location.factionid],
            strokeColor: 'black',
            name: 'dot'
          });

          const text = new paper.PointText({
            point: location.point.add(textOffset),
            justification: 'center',
            fillColor: 'black',
            strokeColor: isAdmin ? 'white' : 'none',
            content: location.name,
            name: 'locname',
            visible: !isAdmin,
            fontSize: 30
          });

          const locGroup = new paper.Group([dot, text]);
          locGroup.location = location;
          locGroup.scope = scope;

          if (isAdmin) {
            locGroup.onMouseEnter = rolloverLocation;
            locGroup.onMouseLeave = rolloutLocation;
            locGroup.onMouseDrag = dragLocation;
            locGroup.onMouseDown = mousedownLocation;
            locGroup.onMouseUp = mouseupLocation;
          }
          mapLayer.addChild(locGroup);
        });
      }
    }

    /* Factory object */

    return {
      render,
      setupMouseWheel
    };
  };

  angular.module('apox').factory('MapRenderer', mapRenderer);
})();
