(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox')
    .controller('AdminMapController', ['$http', function map($http) {
      const vm = this;

      vm.location = {};
      vm.mapData = {};
      vm.showDetailPanel = true;
      vm.dataLoaded = false;

      vm.closeDetailPanel = function close() {
        vm.showDetailPanel = false;
      };

      vm.loadMapData = function load() {
        $http.get('/map')
          .then((res) => {
            vm.mapData.locations = res.data.locations;
            vm.mapData.connections = res.data.connections;
            vm.dataLoaded = true;
          });
      };

      vm.updateLocationDetails = function update() {
        const loc = vm.location;
        if (loc.id > 0) {
          // TODO: add waiting spinner
          $http.patch(`/admin/map/location/${loc.id}`, {
              name: loc.name,
              longitude: loc.longitude,
              latitude: loc.latitude,
              description: loc.description,
              population: loc.population,
              tech: loc.tech,
              type: loc.type
            })
            .then(() => {
              // console.log('cool.'); res
            });
        }
      };

      vm.loadMapData();
    }]);

  angular.module('apox').directive('adminmap', () => {
    const baseDotSize = 3;
    const baseConWidth = 3;
    const xScale = 435.30;
    const yScale = -506.5;
    const xOffset = 43647;
    const yOffset = 15855;

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

    function rolloverLocation(event) {
      event.target.children.locname.visible = true;
    }

    function rolloutLocation(event) {
      event.target.children.locname.visible = false;
    }

    function mousedownLocation(event) {
      event.target.children.dot.fillColor.alpha = 0.5;
      event.target.scope.$apply(() => {
        event.target.scope.admin.location = event.target.location;
      });
    }

    function mouseupLocation(event) {
      event.target.children.dot.fillColor.alpha = 1;
      event.preventDefault();
    }

    function dragLocation(event) {
      const target = event.target;
      target.position = target.position.add([event.delta.x, event.delta.y]);

      const location = pointToLatLong(target.position);
      target.location.longitude = location.longitude;
      target.location.latitude = location.latitude;

      for (let i = 0; i < target.location.paths.length; i++) {
        target.location.paths[i].x = target.children.dot.position.x;
        target.location.paths[i].y = target.children.dot.position.y;
      }

      target.scope.$apply(() => {
        target.scope.admin.location.longitude = location.longitude;
        target.scope.admin.location.latitude = location.latitude;
      });

      event.stopPropagation();
    }

    return {
      restrict: 'A',
      controller: 'AdminMapController',
      controllerAs: 'admin',
      link: (scope, element) => {
        paper.setup(element.context);
        const mapLayer = new paper.Layer();
        mapLayer.texasMap = new paper.Raster('/img/texasmap.jpg');

        scope.$watch('admin.dataLoaded', () => {
          const data = scope.admin.mapData;
          if (data.locations && data.connections) {
            /* calculate location points */
            Object.keys(data.locations).forEach((id) => {
              data.locations[id].point = locToPoint(data.locations[id]);
              data.locations[id].paths = [];
            });

            /* Draw connections */
            for (let i = 0; i < data.connections.length; i++) {
              const connection = data.connections[i];
              const loc1 = data.locations[connection.loc1];
              const loc2 = data.locations[connection.loc2];

              const path = new paper.Path.Line(loc1.point, loc2.point);
              path.strokeColor = 'black';
              path.strokeWidth = baseConWidth;

              loc1.paths.push(path.segments[0].point);
              loc2.paths.push(path.segments[1].point);
            }

            /* render locations */
            const textOffset = [0, -20]; // eslint-disable-line no-magic-numbers
            Object.keys(data.locations).forEach((id) => {
              const location = data.locations[id];
              const dot = new paper.Path.Circle({
                center: location.point,
                radius: baseDotSize * Math.ceil(Math.log10(location.population)),
                fillColor: 'black', // set color/halo according to faction
                name: 'dot'
              });

              const text = new paper.PointText(location.point.add(textOffset));
              text.justification = 'center';
              text.fillColor = '#3333ff';
              text.strokeColor = '#9999cc';
              text.content = location.name;
              text.name = 'locname';
              text.visible = false;
              text.fontSize = 24;

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

        paper.view.center = new paper.Point(1100, 500); // eslint-disable-line no-magic-numbers
      }
    };
  });
})();

//
// function calcCrow(lat1, lon1, lat2, lon2)
//   {
//     var R = 6371; // km
//     var dLat = toRad(lat2-lat1);
//     var dLon = toRad(lon2-lon1);
//     var lat1 = toRad(lat1);
//     var lat2 = toRad(lat2);
//
//     var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//     var d = R * c;
//     return d;
//   }
//
//   // Converts numeric degrees to radians
//   function toRad(Value)
//   {
//       return Value * Math.PI / 180;
//   }
//
//

/* Navigation methods */

// function changeZoom(oldZoom, delta, c, p) {
//   const factor = 1.05;
//   let newZoom = oldZoom;
//   if (delta > 0) {
//     newZoom *= factor;
//   }
//   if (delta < 0) {
//     newZoom /= factor;
//   }
//   // return newZoom;
//   const beta = oldZoom / newZoom;
//   const pc = p.subtract(c);
//   const a = p.subtract(pc.multiply(beta)).subtract(c);
//   return {
//     newZoom,
//     a
//   };
// }
//
// function changeCenter(oldCenter, deltaX, deltaY, factor) {
//   const offset = new paper.Point(deltaX, deltaY).multiply(factor);
//   return oldCenter.subtract(offset);
// }

// $('#mapCanvas').bind('mousewheel', (event) => {
//   const dx = event.originalEvent.wheelDeltaX;
//   const dy = event.originalEvent.wheelDeltaY;
//
//   if (event.altKey) {
//     const mousePos = new Point(event.offsetX, event.offsetY);
//     const z = changeZoom(view.zoom, dy, view.center, mousePos);
//     view.zoom = z.newZoom;
//     // view.center = view.center.add(z.a);
//     event.preventDefault();
//   }
//   else {
//     view.center = changeCenter(view.center, dx, dy, 1);
//     event.preventDefault();
//   }
// });
