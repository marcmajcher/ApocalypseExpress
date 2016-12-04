(() => {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  const renderMap = function renderMap() {
    const xScale = 435.30;
    const yScale = -506.5;
    const xOffset = 43647;
    const yOffset = 15855;

    return {
      baseDotSize: 3,
      baseConWidth: 3,
      alphaBlack: new paper.Color(0, 0, 0, 0.5),
      alphaClear: new paper.Color(255, 255, 255, 0),
      factionColors: [
        new paper.Color(0, 0, 0, 0.95),
        new paper.Color(0, 0, 255, 0.2),
        new paper.Color(255, 0, 0, 0.2),
        new paper.Color(0, 255, 0, 0.2),
        new paper.Color(75, 0, 130, 0.2),
        new paper.Color(255, 255, 0, 0.2)
      ],

      locToPoint: function locToPoint(loc) {
        return new paper.Point(
          (loc.longitude * xScale) + xOffset,
          (loc.latitude * yScale) + yOffset);
      },

      pointToLatLong: function pointToLatLong(point) {
        return {
          longitude: (point.x - xOffset) / xScale,
          latitude: (point.y - yOffset) / yScale
        };
      },

      /* Location dot mouse event handlers */

      mousedownLocation: function mousedownLocation(event) {
        /* pop target dot to the top of the z-index */
        const parent = event.target.parent;
        event.target.remove();
        parent.addChild(event.target);

        event.target.children.dot.fillColor.alpha = 0.5;
        for (let i = 0; i < event.target.location.paths.length; i++) {
          event.target.location.paths[i].strokeColor = this.alphaBlack;
        }

        event.target.scope.$apply(() => {
          event.target.scope.admin.showDetailPanel = true;
          event.target.scope.admin.location = event.target.location;
        });
      },

      mouseupLocation: function mouseupLocation(event) {
        event.target.children.dot.fillColor.alpha = 1;
        for (let i = 0; i < event.target.location.paths.length; i++) {
          event.target.location.paths[i].strokeColor = 'black';
        }
      },

      dragLocation: function dragLocation(event) {
        /* update the position of the target dot based on mouse move */
        const target = event.target;
        target.position = target.position.add([event.delta.x, event.delta.y]);

        /* update all connected paths with new position */
        for (let i = 0; i < target.location.paths.length; i++) {
          target.location.ends[i].x = target.children.dot.position.x;
          target.location.ends[i].y = target.children.dot.position.y;
        }

        /* set the lat/long for the new position on the target dot */
        const newLocation = this.pointToLatLong(target.position);
        target.location.longitude = newLocation.longitude;
        target.location.latitude = newLocation.latitude;

        /* update controller model */
        target.scope.$apply(() => {
          target.scope.admin.location.longitude = newLocation.longitude;
          target.scope.admin.location.latitude = newLocation.latitude;
        });

        event.stopPropagation();
      },

      rolloverLocation: function rolloverLocation(event) {
        event.target.children.locname.visible = true;
      },

      rolloutLocation: function rolloutLocation(event) {
        event.target.children.locname.visible = false;
      },

      /* Mousewheel navigation methods */

      changeZoom: function changeZoom(oldZoom, delta, c, p) {
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
      },

      changeCenter: function changeCenter(oldCenter, deltaX, deltaY, factor) {
        const offset = new paper.Point(deltaX, deltaY).multiply(factor);
        return oldCenter.subtract(offset);
      }
    };
  };

  angular.module('apox').factory('RenderMap', renderMap);
})();
