'use strict';

/* globals view, Point, Layer, Path, PointText, Group, Raster */
/* eslint-env jquery, browser */
/* exported onMouseDrag */

var locGroups = [];
var mapLayer = new Layer();

var texasMap = new Raster('/img/texasbg.png');
texasMap.position = new Point(840, 880); // eslint-disable-line no-magic-numbers

function getPoint(city) {
  var longScale = 124;
  var latScale = -155;
  var longOffset = 107;
  var latOffset = -37;

  return new Point((city.longitude + longOffset) * longScale, (city.latitude + latOffset) * latScale);
}

function renderMap(data) {
  var textOffset = new Point(0, -10); // eslint-disable-line no-magic-numbers
  Object.keys(data.locations).forEach(function (id) {
    var location = data.locations[id];
    location.point = getPoint(location);
    var dot = new Path.Circle({
      center: location.point,
      radius: 5,
      fillColor: 'black'
    });
    var text = new PointText(location.point + textOffset);
    text.justification = 'center';
    text.fillColor = '#333399';
    text.content = location.name;
    text.name = 'locname';
    locGroups.push(new Group([dot, text]));
  });

  /* Draw connections */
  for (var i = 0; i < data.connections.length; i++) {
    var connection = data.connections[i];
    var path = new Path();
    path.strokeColor = 'black';
    path.moveTo(data.locations[connection.city1].point);
    path.lineTo(data.locations[connection.city2].point);
  }

  mapLayer.position = new Point(240, 150); // eslint-disable-line no-magic-numbers
}

/* initial map load */
$.getJSON('/map', function (data) {
  renderMap(data);
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
  var offset = new Point(deltaX, -deltaY);
  offset = offset.multiply(factor);
  return oldCenter.add(offset);
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
    view.zoom = z; // .newZoom;
    // view.center = view.center.add(z.a);
    event.preventDefault();
  }
});

function onMouseDrag(event) {
  mapLayer.position += event.delta;
}