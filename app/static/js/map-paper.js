// (() => {

'use strict';

/* globals view, Point, Layer, Path, PointText, Group, Raster */
/* eslint-env jquery, browser */
/* exported onMouseDrag, onKeyUp */
// TODO: add "loading" thinger

var mapLayer = new Layer();

mapLayer.texasMap = new Raster('/img/texasmap.jpg');
view.center = new Point(1100, 500); // eslint-disable-line no-magic-numbers

var baseDotSize = 3;
var baseConWidth = 3;
var xScale = 435.30;
var yScale = -506.5;
var xOffset = 43647;
var yOffset = 15855;

/* TODO: take zoom into account for point conversion */

function locToPoint(loc) {
  return new Point(loc.longitude * xScale + xOffset, loc.latitude * yScale + yOffset);
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

function updatePositionDetail(loc) {
  $('#detailPanel #longitude').val(loc.longitude);
  $('#detailPanel #latitude').val(loc.latitude);
}

function mousedownLocation(event) {
  // add close/notification
  event.target.children.dot.fillColor.alpha = 0.5;
  var loc = event.target.location;
  $('#detailPanel').addClass('out');
  $('#detailPanel #locid').val(loc.id);
  $('#detailPanel #name').val(loc.name);
  $('#detailPanel #description').val(loc.description);
  $('#detailPanel #population').val(loc.population);
  $('#detailPanel #tech').val(loc.tech);
  $('#detailPanel #type').val(loc.type);
  updatePositionDetail(loc);
}

function mouseupLocation(event) {
  event.target.children.dot.fillColor.alpha = 1;
  event.preventDefault();
}

function dragLocation(event) {
  var target = event.target;
  target.position += event.delta;
  var location = pointToLatLong(target.position);
  target.location.longitude = location.longitude;
  target.location.latitude = location.latitude;
  $('#detailPanel #locx').val(target.location.latitude);
  $('#detailPanel #locy').val(target.location.longitude);
  for (var i = 0; i < target.location.paths.length; i++) {
    target.location.paths[i].x = target.children.dot.position.x;
    target.location.paths[i].y = target.children.dot.position.y;
  }
  updatePositionDetail(location);
  event.stopPropagation();
}

/* Draw locations and connections on map */

function calculateLocationPoints(data) {
  Object.keys(data.locations).forEach(function (id) {
    data.locations[id].point = locToPoint(data.locations[id]);
    data.locations[id].paths = [];
  });
}

function renderLocations(data) {
  var textOffset = new Point(0, -15); // eslint-disable-line no-magic-numbers
  Object.keys(data.locations).forEach(function (id) {
    var location = data.locations[id];
    var dot = new Path.Circle({
      center: location.point,
      radius: baseDotSize * Math.ceil(Math.log10(location.population)),
      fillColor: 'black', // set color/halo according to faction
      name: 'dot'
    });

    var text = new PointText(location.point + textOffset);
    text.justification = 'center';
    text.fillColor = '#3333ff';
    text.strokeColor = '#9999cc';
    text.content = location.name;
    text.name = 'locname';
    text.visible = false;
    text.fontSize = 24;

    var locGroup = new Group([dot, text]);
    locGroup.location = location;
    locGroup.onMouseEnter = rolloverLocation;
    locGroup.onMouseLeave = rolloutLocation;
    locGroup.onMouseDrag = dragLocation;
    locGroup.onMouseDown = mousedownLocation;
    locGroup.onMouseUp = mouseupLocation;
  });
}

function renderConnections(data) {
  /* Draw connections */
  for (var i = 0; i < data.connections.length; i++) {
    var connection = data.connections[i];
    var loc1 = data.locations[connection.loc1];
    var loc2 = data.locations[connection.loc2];

    var path = new Path.Line(loc1.point, loc2.point);
    path.strokeColor = 'black';
    path.strokeWidth = baseConWidth;

    loc1.paths.push(path.segments[0].point);
    loc2.paths.push(path.segments[1].point);
  }
}

/* initial map load */

$.getJSON('/map', function (data) {
  calculateLocationPoints(data);
  renderConnections(data);
  renderLocations(data);
});

/* Navigation methods */

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
  var offset = new Point(deltaX, deltaY).multiply(factor);
  return oldCenter.subtract(offset);
}

$('#mapCanvas').bind('mousewheel', function (event) {
  var dx = event.originalEvent.wheelDeltaX;
  var dy = event.originalEvent.wheelDeltaY;

  if (event.altKey) {
    var mousePos = new Point(event.offsetX, event.offsetY);
    var z = changeZoom(view.zoom, dy, view.center, mousePos);
    view.zoom = z.newZoom;
    // view.center = view.center.add(z.a);
    event.preventDefault();
  } else {
    view.center = changeCenter(view.center, dx, dy, 1);
    event.preventDefault();
  }
});

/* Global interaction handlers */

mapLayer.onMouseDrag = function (event) {
  event.target.position += event.delta;
};
// })();