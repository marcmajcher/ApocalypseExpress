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

  var refreshTime = 1000;

  var GamePageController = function gamePageController($scope, GameService, LocationService, SocketService, TabService) {
    var ç = this;

    ç.error = false;
    ç.loaded = false;
    ç.state = TabService.state;
    ç.traveling = false;
    ç.working = false;
    ç.trip = {};

    GameService.init().then(function () {
      SocketService.init();
      ç.driver = GameService.driver;

      ç.currentLocation = GameService.currentLocation;

      if (GameService.trip && GameService.trip.underway) {
        var currentTrip = GameService.trip;
        if (currentTrip.progress === 'done') {
          ç.trip.progress = ç.trip.distance;
          ç.getCurrentLocation();
          ç.traveling = false;
          ç.state.traveling = false;
        } else {
          ç.trip = {
            origin: ç.currentLocation,
            destination: currentTrip,
            progress: currentTrip.progress,
            distance: LocationService.getDistanceFromId(ç.currentLocation, currentTrip.destinationid)
          };
          ç.setTripLocation();
          ç.traveling = currentTrip.progress > 0;
          ç.state.traveling = currentTrip.progress > 0;
          setTimeout(function () {
            ç.currentLocation.render = false;
          }, 0); // don't set false until after applied
        }
      }

      SocketService.on('tripProgress', function (data) {
        if (data.progress === 'done') {
          ç.trip.progress = ç.trip.distance;
          $scope.$apply();
          setTimeout(function () {
            ç.getCurrentLocation();
            ç.traveling = false;
            ç.state.traveling = false;
          }, refreshTime);
        } else {
          ç.trip.progress = data.progress;
          ç.setTripLocation();
          ç.currentLocation.render = false;
          $scope.$apply();
        }
      });

      ç.loaded = true;
    });

    ç.setTripLocation = function setTripLocation() {
      var ratio = ç.trip.progress / ç.trip.distance;
      ç.currentLocation.latitude = ç.trip.origin.latitude + (ç.trip.destination.latitude - ç.trip.origin.latitude) * ratio;
      ç.currentLocation.longitude = ç.trip.origin.longitude + (ç.trip.destination.longitude - ç.trip.origin.longitude) * ratio;
      ç.currentLocation = angular.copy(ç.currentLocation);
    };

    ç.getCurrentLocation = function getCurrentLocation() {
      LocationService.getCurrentLocation().then(function (location) {
        location.render = true;
        ç.currentLocation = location;
        GameService.currentLocation = location;
        ç.trip = {
          origin: location
        };
      });
    };
  };

  angular.module('apox').component('gamePage', {
    controller: ['$scope', 'GameService', 'LocationService', 'SocketService', 'TabService', GamePageController],
    templateUrl: '../template/_gamepage.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('chatBox', {
    bindings: {},
    templateUrl: '../template/chatbox.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var DestinationListController = function destinationListController(FactionService, LocationService, TripService, TabService) {
    var ç = this;
    ç.tags = FactionService.factionTags;
    ç.state = TabService.state;

    ç.setDestination = function setDestination(id) {
      ç.working = true;
      TripService.setNextDestination(id).then(function (data) {
        if (data.ok) {
          ç.trip = {
            progress: 0,
            destination: data,
            origin: ç.location,
            distance: LocationService.getDistanceFromId(ç.location, data.id)
          };
          ç.working = false;
        } else {
          throw new Error();
        }
      }).catch(function (error) {
        ç.showError(error, 'setDestination');
      });
    };

    ç.goDestination = function goDestination() {
      ç.working = true;
      TripService.beginTrip().then(function (data) {
        if (data === 'ok') {
          ç.working = false;
          ç.traveling = true;
          ç.state.traveling = true;
        } else {
          throw new Error();
        }
      }).catch(function (error) {
        ç.showError(error, 'goDestination');
      });
    };

    ç.clearDestination = function clearDestination() {
      ç.working = true;
      TripService.clearTrip().then(function (data) {
        if (data === 'ok') {
          ç.trip = {
            origin: ç.location.name
          };
          ç.working = false;
        } else {
          throw new Error();
        }
      }).catch(function (error) {
        ç.showError(error, 'clearDestination');
      });
    };

    ç.showError = function showError(error, what) {
      ç.error = what + ' Error: Please try again later.'; // TODO: move to ErrorService
      console.error(what + ' ERROR', error); // eslint-disable-line
    };
  };

  angular.module('apox').component('destinationList', {
    bindings: {
      error: '=',
      location: '<',
      traveling: '=',
      trip: '=',
      working: '='
    },
    controller: ['FactionService', 'LocationService', 'TripService', 'TabService', DestinationListController],
    templateUrl: '../template/destinations.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('driverInfo', {
    bindings: {
      driver: '<'
    },
    templateUrl: '../template/driverinfo.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var GameCargoController = function gameCargoController(TabService) {
    var ctrl = this;

    ctrl.state = TabService.state;
  };

  angular.module('apox').component('gameCargo', {
    bindings: {
      goods: '='
    },
    templateUrl: '../template/game.cargo.template.html',
    controller: ['TabService', GameCargoController]
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var gameTabController = function gameTabController(TabService) {
    var ctrl = this;

    ctrl.state = TabService.state;

    ctrl.setState = function (state) {
      TabService.setTab(state);
    };
  };

  angular.module('apox').component('gameTabs', {
    controller: ['TabService', gameTabController],
    templateUrl: '../template/gametabs.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var LocationDetailsController = function locationDetailsController(FactionService, TabService) {
    var ctrl = this;

    ctrl.tags = FactionService.factionTags;

    ctrl.setLoc = function setLoc(loc) {
      TabService.setLoc(loc);
    };
  };

  angular.module('apox').component('locationDetails', {
    bindings: {
      location: '<'
    },
    controller: ['FactionService', 'TabService', LocationDetailsController],
    templateUrl: '../template/location.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var LocationHeaderController = function locationHeaderController(FactionService) {
    var ctrl = this;
    ctrl.tags = FactionService.factionTags;
  };

  angular.module('apox').component('locationHeader', {
    bindings: {
      location: '<'
    },
    controller: ['FactionService', LocationHeaderController],
    templateUrl: '../template/location.header.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  var ApoxMapController = function apoxMapController($element, GameService, MapService, MapRenderer) {
    var ctrl = this;

    paper.setup($element.context.firstChild);
    var bgLayer = new paper.Layer();
    bgLayer.texasMap = new paper.Raster('/img/playermapbg.jpg');
    var mapLayer = new paper.Layer();

    MapRenderer.setupMouseWheel($element, {
      zoom: true
    });

    function renderMap() {
      MapService.loadMap().then(function () {
        MapRenderer.render({
          isAdmin: false,
          mapLayer: mapLayer
        });
        MapRenderer.centerMap(ctrl.location);
      });
    }

    ctrl.$onChanges = function () {
      if (ctrl.location.render) {
        renderMap();
      } else {
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
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('tripProgress', {
    bindings: {
      trip: '<'
    },
    templateUrl: '../template/trip.progress.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var UserAccountController = function userAccountController($scope, UserService, ModalService) {
    var ctrl = this;
    ctrl.pass = {};

    ctrl.$onInit = function () {
      UserService.getUser().then(function (user) {
        ctrl.user = user;
      }).catch(function (error) {
        console.error('UserInit ERROR', error); // eslint-disable-line
      });
    };

    ctrl.updateInfo = function () {
      ModalService.loadModal();
      UserService.updateInfo({
        firstname: ctrl.user.firstname,
        lastname: ctrl.user.lastname
      }).then(function (res) {
        if (res.ok) {
          ModalService.readyModal('User Info Updated.', true);
        } else {
          throw new Error();
        }
      }).catch(function (error) {
        console.error('updateInfo ERROR', error); // eslint-disable-line
      });
    };

    ctrl.changePassword = function () {
      ModalService.loadModal();
      UserService.changePassword(ctrl.pass).then(function (res) {
        if (res.ok) {
          ModalService.readyModal('Password Updated');
        } else {
          ModalService.readyModal('Error: ' + res.error.name);
        }
      }).catch(function (error) {
        console.error('updateInfo ERROR', error); // eslint-disable-line
      });
    };
  };

  angular.module('apox').component('userAccount', {
    templateUrl: '../template/user.account.template.html',
    controller: ['$scope', 'UserService', 'ModalService', UserAccountController]
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('vehicleInfo', {
    bindings: {
      vehicle: '<'
    },
    templateUrl: '../template/vehicle.template.html'
  });
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var driverRoute = '/driver';
  var vehicleRoute = '/vehicle';

  /* A service to interface with the driver routes */

  var DriverService = function driverService($http, $q) {
    var _getDriver = $http.get(driverRoute);
    var getVehicle = $http.get(vehicleRoute);

    return {
      getDriver: function getDriver() {
        return $q(function (resolve, reject) {
          $q.all([_getDriver, getVehicle]).then(function (data) {
            var driverObj = data[0].data;
            driverObj.vehicle = data[1].data;
            resolve(driverObj);
          }, function (err) {
            reject(err);
          });
        });
      }
    };
  };

  angular.module('apox').factory('DriverService', ['$http', '$q', DriverService]);
})();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var FactionService = function FactionService() {
    _classCallCheck(this, FactionService);

    this.factionColors = ['#aaaaaa', '#0000aa', '#aa0000', '#00aa00', '#440088', '#aaaa00'];
    this.factionTags = ['', 'republic', 'confederation', 'alliance', 'petrex', 'light'];
  };

  angular.module('apox').service('FactionService', FactionService);
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
          location.render = true;
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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  'use strict';

  /* eslint-env jquery, browser */
  /* eslint class-methods-use-this: off */

  var locationRoute = '/location';

  /* A service to interface with the location routes */

  var LocationService = function () {
    function LocationService($http, $q) {
      _classCallCheck(this, LocationService);

      this.$http = $http;
      this.$q = $q;
    }

    _createClass(LocationService, [{
      key: 'getCurrentLocation',
      value: function getCurrentLocation() {
        var _this = this;

        return this.$q(function (resolve, reject) {
          _this.$http.get(locationRoute).then(function (location) {
            resolve(location.data);
          }, function (err) {
            reject(err);
          });
        });
      }
    }, {
      key: 'getDistanceFromId',
      value: function getDistanceFromId(location, id) {
        for (var i = 0; i < location.connections.length; i++) {
          if (location.connections[i].id === id) {
            return location.connections[i].distance;
          }
        }
        return -1; // eslint-disable-line no-magic-numbers
      }
    }]);

    return LocationService;
  }();

  angular.module('apox').service('LocationService', ['$http', '$q', LocationService]);
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
      }
    }

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

/* eslint-env jquery, browser */

(function () {
  var txtLoading = 'Loading';
  var elModal = $('#main-modal');
  var elTitle = $('#main-modal .modal-title');
  var elBody = $('#main-modal .modal-body');
  var elButton = $('#btn-okay');

  var modalService = function modalService() {
    return {
      loadModal: function loadModal() {
        elButton.hide();
        elTitle.text(txtLoading);
        elBody.text('...');
        elModal.modal({
          keyboard: false,
          show: true
        });
      },
      readyModal: function readyModal(msg) {
        var reload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        elButton.show();
        if (reload) {
          elModal.on('hidden.bs.modal', function () {
            window.location.reload();
          });
        }
        elTitle.text('');
        elBody.text(msg);
      }
    };
  };

  angular.module('apox').factory('ModalService', [modalService]);
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

  var tabService = function tabService() {
    return {
      state: {
        tab: 'default',
        traveling: false,
        loc: 'default'
      },
      setTab: function setTab(tab) {
        this.state.tab = tab;
      },
      setLoc: function setLoc(loc) {
        this.state.loc = loc;
      }
    };
  };

  angular.module('apox').factory('TabService', [tabService]);
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
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var userRoute = '/user';
  var accountRoute = userRoute + '/account';

  /* A service to interface with the user route */
  // TODO: refactor out resolve/rejects

  var UserService = function userService($http, $q) {
    return {
      getUser: function getUser() {
        return $q(function (resolve, reject) {
          $http.get(userRoute).then(function (res) {
            resolve(res.data);
          }, function (err) {
            reject(err);
          });
        });
      },
      updateInfo: function updateInfo(info) {
        return $q(function (resolve, reject) {
          $http.patch(accountRoute, info).then(function (res) {
            resolve(res.data);
          }, function (err) {
            reject(err);
          });
        });
      },
      changePassword: function changePassword(pass) {
        return $q(function (resolve, reject) {
          $http.patch(accountRoute, pass).then(function (res) {
            resolve(res.data);
          }, function (err) {
            reject(err);
          });
        });
      }
    };
  };

  angular.module('apox').factory('UserService', ['$http', '$q', UserService]);
})();
'use strict';

(function () {
  'use strict';

  /* eslint-env jquery, browser */

  var vehicleRoute = '/vehicle';

  /* A service to interface with the vehicle route */

  var VehicleService = function vehicleService($http, $q) {
    return {
      getVehicle: function getVehicle() {
        return $q(function (resolve, reject) {
          $http.get(vehicleRoute).then(function (vehicle) {
            resolve(vehicle.data);
          }, function (err) {
            reject(err);
          });
        });
      }
    };
  };

  angular.module('apox').factory('VehicleService', ['$http', '$q', VehicleService]);
})();