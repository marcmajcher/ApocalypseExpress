'use strict';

/* globals view, Point, Layer, Path, PointText, Group, Raster */
/* eslint-env jquery, browser */
/* exported onMouseDrag */

const locGroups = [];
const mapLayer = new Layer();
mapLayer.texasMap = new Raster('/img/texasmap.jpg');
view.center = new Point(1100, 500); // eslint-disable-line no-magic-numbers

function getPoint(loc) {
  const xScale = 435.30;
  const yScale = -506.5;
  const xOffset = 43650;
  const yOffset = 15850;

  return new Point((loc.longitude * xScale) + xOffset, (loc.latitude * yScale) + yOffset);
}

function renderLocations(data) {
  const textOffset = new Point(0, -10); // eslint-disable-line no-magic-numbers
  Object.keys(data.locations).forEach((id) => {
    const location = data.locations[id];
    location.point = getPoint(location);
    const dot = new Path.Circle({
      center: location.point,
      radius: 5,
      fillColor: 'black'
    });
    const text = new PointText(location.point + textOffset);
    text.justification = 'center';
    text.fillColor = '#333399';
    text.content = location.name;
    text.name = 'locname';
    locGroups.push(new Group([dot, text]));
  });
}

function renderConnections(data) {
  /* Draw connections */
  for (let i = 0; i < data.connections.length; i++) {
    const connection = data.connections[i];
    const path = new Path();
    path.strokeColor = 'black';
    path.moveTo(data.locations[connection.city1].point);
    path.lineTo(data.locations[connection.city2].point);
  }
}

/* initial map load */
$.getJSON('/map', (data) => {
  renderLocations(data);
  renderConnections(data);
});

/* Navigation methods */

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
  const offset = new Point(deltaX, deltaY).multiply(factor);
  return oldCenter.subtract(offset);
}

$('#mapCanvas').bind('mousewheel', (event) => {
  const dx = event.originalEvent.wheelDeltaX;
  const dy = event.originalEvent.wheelDeltaY;

  if (event.shiftKey) {
    view.center = changeCenter(view.center, dx, dy, 1);
    event.preventDefault();
  }
  else if (event.altKey) {
    const mousePos = new Point(event.offsetX, event.offsetY);
    const z = changeZoom(view.zoom, dy, view.center, mousePos);
    view.zoom = z.newZoom;
    // view.center = view.center.add(z.a);
    event.preventDefault();
  }
});

function onMouseDrag(event) {
  mapLayer.position += event.delta;
}
