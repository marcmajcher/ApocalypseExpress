'use strict';

/* globals view, Point, Layer, Path, PointText, Group, Raster */
/* eslint-env jquery, browser */
/* exported onMouseDrag, onKeyUp */

var mapLayer = new Layer();

mapLayer.texasMap = new Raster('/img/texasmap.jpg');
view.center = new Point(1100, 500); // eslint-disable-line no-magic-numbers

var baseDotSize = 3;
var baseConWidth = 3;
var xScale = 435.30;
var yScale = -506.5;
var xOffset = 43647;
var yOffset = 15855;

function locToPoint(loc) {
  return new Point(loc.longitude * xScale + xOffset, loc.latitude * yScale + yOffset);
}

function pointToLatLong(point) {
  return {
    longitude: (point.x - xOffset) / xScale,
    latitude: (point.y - yOffset) / yScale
  };
}

function rolloverLocation(event) {
  event.target.children.locname.visible = true;
}

function rolloutLocation(event) {
  event.target.children.locname.visible = false;
}

function clickLocation(event) {
  $('#detailPanel').show();
  $('#detailPanel #locID').text(event.target.location.id);
  $('#detailPanel #locname').val(event.target.location.name);
  $('#detailPanel #locx').val(event.target.location.latitude);
  $('#detailPanel #locy').val(event.target.location.longitude);
  $('#detailPanel #description').val(event.target.location.description);
  $('#detailPanel #population').val(event.target.location.population);
  $('#detailPanel #tech').val(event.target.location.tech);
  $('#detailPanel #type').val(event.target.location.type);
}

function dragLocation(event) {
  event.target.children.dot.fillColor.alpha = 0.5;
  event.target.position += event.delta;
  var location = pointToLatLong(event.target.position);
  event.target.longitude = location.longitude;
  event.target.latitude = location.latitude;
  $('#detailPanel #locx').val(event.target.latitude);
  $('#detailPanel #locy').val(event.target.longitude);
  event.stopPropagation();
}

function mouseupLocation(event) {
  event.target.children.dot.fillColor.alpha = 1;
}

function calculateLocationPoints(data) {
  Object.keys(data.locations).forEach(function (id) {
    data.locations[id].point = locToPoint(data.locations[id]);
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
    locGroup.onClick = clickLocation;
    locGroup.onMouseUp = mouseupLocation;
  });
}

function renderConnections(data) {
  /* Draw connections */
  for (var i = 0; i < data.connections.length; i++) {
    var connection = data.connections[i];
    var path = new Path();
    path.strokeColor = 'black';
    path.strokeWidth = baseConWidth;
    path.moveTo(data.locations[connection.city1].point);
    path.lineTo(data.locations[connection.city2].point);
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

  if (event.shiftKey) {
    view.center = changeCenter(view.center, dx, dy, 1);
    event.preventDefault();
  } else if (event.altKey) {
    var mousePos = new Point(event.offsetX, event.offsetY);
    var z = changeZoom(view.zoom, dy, view.center, mousePos);
    view.zoom = z.newZoom;
    // view.center = view.center.add(z.a);
    event.preventDefault();
  }
});

/* Global interaction handlers */

mapLayer.onMouseDrag = function (event) {
  event.target.position += event.delta;
};

function onKeyUp(event) {
  if (event.key === 'escape') {
    $('#detailPanel').hide();
  }
}