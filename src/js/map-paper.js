'use strict';

/* globals view, Point, Layer, Path, PointText, Group, Raster */
/* eslint-env jquery, browser */
/* exported onMouseDrag */

const locGroups = [];
const mapLayer = new Layer();

const texasMap = new Raster('/img/texasbg.png');
texasMap.position = new Point(840, 880); // eslint-disable-line no-magic-numbers

function getPoint(city) {
  const longScale = 124;
  const latScale = -155;
  const longOffset = 107;
  const latOffset = -37;

  return new Point(
    (city.longitude + longOffset) * longScale, (city.latitude + latOffset) * latScale);
}

function renderMap(data) {
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

  /* Draw connections */
  for (let i = 0; i < data.connections.length; i++) {
    const connection = data.connections[i];
    const path = new Path();
    path.strokeColor = 'black';
    path.moveTo(data.locations[connection.city1].point);
    path.lineTo(data.locations[connection.city2].point);
  }

  mapLayer.position = new Point(240, 150); // eslint-disable-line no-magic-numbers
}

/* initial map load */
$.getJSON('/map', (data) => {
  renderMap(data);
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
  let offset = new Point(deltaX, -deltaY);
  offset = offset.multiply(factor);
  return oldCenter.add(offset);
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
    view.zoom = z; // .newZoom;
    // view.center = view.center.add(z.a);
    event.preventDefault();
  }
});

function onMouseDrag(event) {
  mapLayer.position += event.delta;
}
