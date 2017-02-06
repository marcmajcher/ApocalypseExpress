'use strict';

(function () {
  'use strict';

  angular.module('apox', []);
})();
'use strict';

(function () {
  'use strict';

  angular.module('apox').directive('apoxMatch', function () {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=apoxMatch'
      },
      link: function link(scope, elem, attr, ngModel) {
        ngModel.$validators.match = function (modelValue) {
          return modelValue === scope.otherModelValue;
        };

        scope.$watch('otherModelValue', function () {
          ngModel.$validate();
        });
      }
    };
  }).directive('apoxPassword', function () {
    return {
      require: 'ngModel',
      link: function link(scope, elem, attr, ngModel) {
        ngModel.$validators.pw = function (modelValue) {
          return modelValue && !!modelValue.match(/\d/) && !!modelValue.match(/[\^`~!@#$%&*()_+=[{}|'";:/?.,><\-\\\]]/);
        };
      }
    };
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var adminMapController = function adminMapController(MapService) {
    var vm = this;

    vm.location = {};
    vm.mapData = {};
    vm.showDetailPanel = true;
    vm.dataLoaded = false;

    vm.closeDetailPanel = function close() {
      vm.showDetailPanel = false;
    };

    vm.updateLocationDetails = function update() {
      var loc = vm.location;
      if (loc.id > 0) {
        // TODO: add waiting spinner
        MapService.updateLocation(loc.id, {
          name: loc.name,
          longitude: loc.longitude,
          latitude: loc.latitude,
          description: loc.description,
          population: loc.population,
          tech: loc.tech,
          type: loc.type,
          factionid: loc.factionid
        }).catch(function () {
          window.alert('PATCH ERROR'); // eslint-disable-line no-alert
        });
        // .then(() => {
        //   remove spinner
        // });
      }
    };
  };

  angular.module('apox').controller('AdminMapController', ['MapService', adminMapController]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  var apoxAdminMap = function apoxAdminMap(MapRenderer, MapService) {
    return {
      restrict: 'E',
      template: '<canvas class="map-canvas" resize="true"></canvas>',
      link: function link(scope, element) {
        paper.setup(element.context.firstChild);

        var bgLayer = new paper.Layer();
        bgLayer.texasMap = new paper.Raster('/img/texasmap.jpg');

        var mapLayer = new paper.Layer();

        MapService.loadMap().then(function () {
          MapRenderer.render({
            isAdmin: true,
            mapLayer: mapLayer,
            scope: scope
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
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var DestinationListController = function destinationListController(LocationService, TripService) {
    var ctrl = this;

    ctrl.setDestination = function setDestination(id) {
      ctrl.working = true;
      TripService.setNextDestination(id).then(function (data) {
        if (data.ok) {
          ctrl.trip = {
            progress: 0,
            destination: data.name,
            origin: ctrl.location.name,
            distance: LocationService.getDistanceFromId(ctrl.location, data.id)
          };
          ctrl.working = false;
        } else {
          ctrl.error = 'setNextDestination Error: Please try again later.';
          console.error(data); // eslint-disable-line
        }
      }).catch(function (error) {
        ctrl.error = 'setNextDestination Error: Please try again later.';
        console.error(error); // eslint-disable-line
      });
    };

    ctrl.goDestination = function goDestination() {
      ctrl.working = true;
      ctrl.traveling = true;
      TripService.beginTrip().then(function (data) {
        if (data === 'ok') {
          ctrl.working = false;
        }
      });
    };

    ctrl.clearDestination = function clearDestination() {
      ctrl.working = true;
      TripService.clearTrip().then(function (data) {
        if (data === 'ok') {
          ctrl.trip = {
            origin: ctrl.location.name
          };
          ctrl.working = false;
        }
      });
    };
  };

  angular.module('apox').component('destinationList', {
    bindings: {
      error: '=',
      location: '<',
      tags: '<',
      traveling: '=',
      trip: '=',
      working: '='
    },
    controller: ['LocationService', 'TripService', DestinationListController],
    templateUrl: '../tmpl/game/destinations.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('driverName', {
    bindings: {
      name: '<'
    },
    template: '\n    <div class="driver-name text-center">\n      <span id="driver-name">{{$ctrl.name}}</span>\n    </div>\n    '
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint max-params: ["error", 6] */

  var refreshTime = 1000;

  var GamePageController = function gamePageController($scope, GameService, FactionService, // jshint ignore: line
  LocationService, SocketService) {
    var ctrl = this;

    ctrl.error = false;
    ctrl.loaded = false;
    ctrl.working = false;
    ctrl.traveling = false;
    ctrl.factionTags = FactionService.factionTags;
    ctrl.trip = {};

    GameService.init().then(function () {
      SocketService.init();
      ctrl.driver = GameService.driver;
      ctrl.currentLocation = GameService.currentLocation;

      if (GameService.trip) {
        var currentTrip = GameService.trip;
        if (currentTrip.progress === 'done') {
          ctrl.trip.progress = ctrl.trip.distance;
          ctrl.getCurrentLocation();
          ctrl.traveling = false;
        } else {
          ctrl.trip = {
            destination: currentTrip.name,
            progress: currentTrip.progress,
            origin: ctrl.currentLocation.name,
            distance: LocationService.getDistanceFromId(ctrl.currentLocation, currentTrip.destinationid)
          };
          ctrl.traveling = currentTrip.progress > 0;
        }
      }

      SocketService.on('tripProgress', function (data) {
        if (data.progress === 'done') {
          ctrl.trip.progress = ctrl.trip.distance;
          $scope.$apply();
          setTimeout(function () {
            ctrl.getCurrentLocation();
            ctrl.traveling = false;
          }, refreshTime);
        } else {
          ctrl.trip.progress = data.progress;
          $scope.$apply();
        }
      });

      ctrl.loaded = true;
    });

    ctrl.getCurrentLocation = function getCurrentLocation() {
      LocationService.getCurrentLocation().then(function (location) {
        ctrl.currentLocation = location;
        GameService.currentLocation = location;
        ctrl.trip = {
          origin: location.name
        };
      });
    };
  };

  angular.module('apox').component('gamePage', {
    controller: ['$scope', 'GameService', 'FactionService', 'LocationService', 'SocketService', GamePageController],
    templateUrl: '../tmpl/game/gamepage.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('locationDetails', {
    bindings: {
      location: '<',
      tags: '<'
    },
    template: '\n    <div class="location-header">\n      Location:\n      <span class="location-name" id="location-name">{{$ctrl.location.name}}</span>\n      <div class="faction-slug {{$ctrl.tags[$ctrl.location.factionid]}}"></div>\n    </div>\n    <div class="location-info">\n      Population: {{$ctrl.location.population}}<br/> Tech Level: {{$ctrl.location.tech}}\n    </div>\n    <div class="location-description">{{$ctrl.location.description}}</div>\n    '
  });
})();
'use strict';

(function () {
  'use strict';

  var apoxMap = function apoxMap(GameService, MapService, MapRenderer) {
    return {
      restrict: 'E',
      template: '<canvas class="map-canvas" resize="true"></canvas>',
      link: function link(scope, element) {
        // console.log(element);
        paper.setup(element.context.firstChild);

        var bgLayer = new paper.Layer();
        bgLayer.texasMap = new paper.Raster('/img/texasmap2.jpg');

        var mapLayer = new paper.Layer();

        MapRenderer.setupMouseWheel(element, {
          zoom: true
        });

        function renderMap() {
          MapService.loadMap().then(function () {
            MapRenderer.render({
              isAdmin: false,
              mapLayer: mapLayer
            });
            MapRenderer.centerMap(GameService.currentLocation);
          });
        }

        scope.$watch(function () {
          return GameService.currentLocation;
        }, function () {
          renderMap();
        }, true);
      }
    };
  };

  angular.module('apox').directive('apoxMap', ['GameService', 'MapService', 'MapRenderer', apoxMap]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('tripProgress', {
    bindings: {
      trip: '<'
    },
    template: '\n    <div class="progress trip-progress-bar">\n      <div class="progress-bar" role="progressbar" style="width: {{100*($ctrl.trip.progress/$ctrl.trip.distance)}}%"></div>\n    </div>\n    <div class="trip-progress">\n      <span class="pull-left">{{$ctrl.trip.origin}}</span>\n      <span class="pull-right">{{$ctrl.trip.destination}}</span>\n    </div>\n    '
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var driverRoute = '/driver';

  /* A service to interface with the driver routes */

  var driverService = function driverService($http, $q) {
    return {
      getDriver: function getDriver() {
        return $q(function (resolve, reject) {
          $http.get(driverRoute).then(function (driver) {
            resolve(driver.data);
          }, function (err) {
            reject(err);
          });
        });
      }
    };
  };

  angular.module('apox').factory('DriverService', ['$http', '$q', driverService]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var factionService = function factionService() {
    return {
      factionColors: ['#000000', '#6666ff', '#ff6666', '#669966', '#ac00e6', '#ffff66'],
      factionTags: ['', 'republic', 'confederation', 'alliance', 'petrex', 'light']
    };
  };

  angular.module('apox').factory('FactionService', [factionService]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var gameService = function gameService($q, DriverService, LocationService, TripService) {
    return {
      init: function init() {
        var _this = this;

        return $q.all([
        /* Get driver info */
        DriverService.getDriver().then(function (driver) {
          _this.driver = driver;
        }),

        /* Get info for current location */
        LocationService.getCurrentLocation().then(function (location) {
          _this.currentLocation = location;
        }),

        /* Get info for current trip, if any */
        TripService.getCurrentTrip().then(function (data) {
          if (data.trip[0]) {
            _this.trip = data.trip[0];
          }
        })]);
      },
      driver: undefined,
      currentLocation: undefined,
      trip: undefined

    };
  };

  angular.module('apox').factory('GameService', ['$q', 'DriverService', 'LocationService', 'TripService', gameService]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var locationRoute = '/location';

  /* A service to interface with the location routes */

  var locationService = function locationService($http, $q) {
    return {
      getCurrentLocation: function getCurrentLocation() {
        return $q(function (resolve, reject) {
          $http.get(locationRoute).then(function (location) {
            resolve(location.data);
          }, function (err) {
            reject(err);
          });
        });
      },
      getDistanceFromId: function getDistanceFromId(location, id) {
        for (var i = 0; i < location.connections.length; i++) {
          if (location.connections[i].id === id) {
            return location.connections[i].distance;
          }
        }
        return -1; // eslint-disable-line no-magic-numbers
      }
    };
  };

  angular.module('apox').factory('LocationService', ['$http', '$q', locationService]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint no-magic-numbers: "off" */

  var mapRenderer = function mapRenderer(MapService, FactionService) {
    var xScale = 435.30;
    var yScale = -506.5;
    var xOffset = 43647;
    var yOffset = 15855;

    var baseDotSize = 3;
    var baseConWidth = 6;

    function locToPoint(loc) {
      return new paper.Point(loc.longitude * xScale + xOffset, loc.latitude * yScale + yOffset);
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
      var parent = event.target.parent;
      event.target.remove();
      parent.addChild(event.target);

      event.target.children.dot.fillColor.alpha = 0.5;
      for (var i = 0; i < event.target.location.paths.length; i++) {
        event.target.location.paths[i].strokeColor = new paper.Color(0, 0, 0, 0.5);
      }

      event.target.scope.$apply(function () {
        event.target.scope.admin.showDetailPanel = true;
        event.target.scope.admin.location = event.target.location;
      });
    }

    function mouseupLocation(event) {
      event.target.children.dot.fillColor.alpha = 1;
      for (var i = 0; i < event.target.location.paths.length; i++) {
        event.target.location.paths[i].strokeColor = 'black';
      }
    }

    function dragLocation(event) {
      /* update the position of the target dot based on mouse move */
      var target = event.target;
      target.position = target.position.add([event.delta.x, event.delta.y]);

      /* update all connected paths with new position */
      for (var i = 0; i < target.location.paths.length; i++) {
        target.location.ends[i].x = target.children.dot.position.x;
        target.location.ends[i].y = target.children.dot.position.y;
      }

      /* set the lat/long for the new position on the target dot */
      var newLocation = pointToLatLong(target.position);
      target.location.longitude = newLocation.longitude;
      target.location.latitude = newLocation.latitude;

      /* update controller model */
      target.scope.$apply(function () {
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
      var factor = 1.05;
      var newZoom = oldZoom;
      if (delta > 0) {
        newZoom *= factor;
      }
      if (delta < 0) {
        newZoom /= factor;
      }
      // return newZoom;
      var beta = oldZoom / newZoom;
      var pc = p.subtract(c);
      var a = p.subtract(pc.multiply(beta)).subtract(c);
      return {
        newZoom: newZoom,
        a: a
      };
    }

    function changeCenter(oldCenter, deltaX, deltaY, factor) {
      var offset = new paper.Point(deltaX, deltaY).multiply(factor);
      return oldCenter.subtract(offset);
    }

    function setupMouseWheel(element, actions) {
      var maxZoom = 1;
      var minZoom = 0.2;

      if (actions.zoom) {
        element.bind('mousewheel', function (event) {
          if (!actions.zoomAlt || event.altKey) {
            var mousePos = new paper.Point(event.offsetX, event.offsetY);
            var zoom = changeZoom(paper.view.zoom, event.originalEvent.wheelDeltaY, paper.view.center, mousePos);
            if (zoom.newZoom < maxZoom && zoom.newZoom > minZoom) {
              paper.view.zoom = zoom.newZoom;
            }
            // view.center = view.center.add(z.a);
            event.preventDefault();
          }
        });
      }

      if (actions.pan) {
        element.bind('mousewheel', function (event) {
          paper.view.center = changeCenter(paper.view.center, event.originalEvent.wheelDeltaX, event.originalEvent.wheelDeltaY, 1);
          event.preventDefault();
        });
      }
    }

    function centerMap(location) {
      if (location) {
        paper.view.center = locToPoint(location);
      }
    }

    /* Main rendering method */

    function render(args) {
      var isAdmin = args.isAdmin,
          mapLayer = args.mapLayer,
          scope = args.scope;


      var data = MapService.mapData;

      if (data.locations && data.connections) {
        (function () {
          /* calculate location points */
          Object.keys(data.locations).forEach(function (id) {
            data.locations[id].point = locToPoint(data.locations[id]);
            data.locations[id].paths = [];
            data.locations[id].ends = [];
          });

          mapLayer.removeChildren();

          /* Draw connections */
          for (var i = 0; i < data.connections.length; i++) {
            var connection = data.connections[i];
            var start = data.locations[connection.start];
            var end = data.locations[connection.end];

            if (start && end) {
              var path = new paper.Path.Line({
                from: start.point,
                to: end.point,
                strokeColor: 'black',
                strokeWidth: baseConWidth
              });
              mapLayer.addChild(path);

              start.ends.push(path.segments[0].point);
              end.ends.push(path.segments[1].point);
              start.paths.push(path);
              end.paths.push(path);
            }
          }

          /* render locations */
          var textOffset = [0, -20];
          var locationKeys = Object.keys(data.locations).sort(function (a, b) {
            return data.locations[a].latitude < data.locations[b].latitude;
          });

          locationKeys.forEach(function (id) {
            var location = data.locations[id];

            var dot = new paper.Path.Circle({
              center: location.point,
              radius: baseDotSize * Math.ceil(Math.log10(location.population)),
              fillColor: new paper.Color(FactionService.factionColors[location.factionid]),
              strokeColor: 'black',
              name: 'dot'
            });

            var text = new paper.PointText({
              point: location.point.add(textOffset),
              justification: 'center',
              fillColor: 'white',
              strokeColor: 'black',
              strokeWidth: 0.5,
              content: location.name,
              name: 'locname',
              visible: !isAdmin,
              fontSize: 30
            });

            var locGroup = new paper.Group([dot, text]);
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
        })();
      }
    }

    /* Factory object */

    return {
      centerMap: centerMap,
      render: render,
      setupMouseWheel: setupMouseWheel
    };
  };

  angular.module('apox').factory('MapRenderer', ['MapService', 'FactionService', mapRenderer]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  /* A service to interface with the map routes */

  var mapService = function mapService($http) {
    return {
      loadMap: function loadMap() {
        var _this = this;

        this.mapData.loaded = false;
        return $http.get('/map').then(function (res) {
          _this.mapData.locations = res.data.locations;
          _this.mapData.connections = res.data.connections;
          _this.mapData.loaded = true;
        });
      },
      updateLocation: function updateLocation(id, data) {
        return $http.patch('/admin/map/location/' + id, data);
      },
      mapData: {
        locations: {},
        connections: [],
        loaded: false
      }
    };
  };

  angular.module('apox').factory('MapService', ['$http', mapService]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var socketService = function socketService() {
    var socket = io();

    return {
      init: function init() {
        socket.on('message', function (data) {
          console.log(data); // eslint-disable-line no-console
        });
        socket.on('disconnect', function (data) {
          console.log('DISCONNECTED:', data); // eslint-disable-line no-console
          socket.io.reconnection(false);
        });
      },
      on: function on(eventName, callback) {
        socket.on(eventName, callback);
      }
    };
  };

  angular.module('apox').factory('SocketService', ['$http', socketService]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var tripRoute = '/trip';

  /* A service to interface with the trip routes */

  var tripService = function tripService($http, $q) {
    return {
      getCurrentTrip: function getCurrentTrip() {
        return $q(function (resolve, reject) {
          $http.get(tripRoute).then(function (trip) {
            resolve(trip.data);
          }, function (err) {
            reject(err);
          });
        });
      },
      setNextDestination: function setNextDestination(id) {
        return $q(function (resolve, reject) {
          $http.put(tripRoute, {
            destination: id
          }).then(function (res) {
            resolve(res.data);
          }, function (err) {
            reject(err);
          });
        });
      },
      clearTrip: function clearTrip() {
        return $q(function (resolve, reject) {
          $http.delete(tripRoute).then(function (res) {
            resolve(res.data);
          }, function (err) {
            reject(err);
          });
        });
      },
      beginTrip: function beginTrip() {
        return $q(function (resolve, reject) {
          $http.post(tripRoute + '/go').then(function (res) {
            resolve(res.data);
          }, function (err) {
            reject(err);
          });
        });
      }
    };
  };

  angular.module('apox').factory('TripService', ['$http', '$q', tripService]);
})();