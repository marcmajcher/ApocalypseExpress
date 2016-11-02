'use strict';

/* globals view, Point, Layer, Path, PointText, Group, Raster */
/* eslint-env jquery, browser */
/* exported onMouseDrag, onKeyUp */

const mapLayer = new Layer();

mapLayer.texasMap = new Raster('/img/texasmap.jpg');
view.center = new Point(1100, 500); // eslint-disable-line no-magic-numbers

const baseDotSize = 3;
const baseConWidth = 3;

function getPoint(loc) {
  const xScale = 435.30;
  const yScale = -506.5;
  const xOffset = 43647;
  const yOffset = 15855;

  return new Point((loc.longitude * xScale) + xOffset, (loc.latitude * yScale) + yOffset);
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

function calculateLocationPoints(data) {
  Object.keys(data.locations).forEach((id) => {
    data.locations[id].point = getPoint(data.locations[id]);
  });
}

function renderLocations(data) {
  const textOffset = new Point(0, -15); // eslint-disable-line no-magic-numbers
  Object.keys(data.locations).forEach((id) => {
    const location = data.locations[id];
    const dot = new Path.Circle({
      center: location.point,
      radius: baseDotSize * Math.ceil(Math.log10(location.population)),
      fillColor: 'black' // set color/halo according to faction
    });
    const text = new PointText(location.point + textOffset);
    text.justification = 'center';
    text.fillColor = '#3333ff';
    text.strokeColor = '#9999cc';
    text.content = location.name;
    text.name = 'locname';
    text.visible = false;
    text.fontSize = 24;

    const locGroup = new Group([dot, text]);
    locGroup.location = location;
    locGroup.onMouseEnter = rolloverLocation;
    locGroup.onMouseLeave = rolloutLocation;
    locGroup.onClick = clickLocation;
  });
}

function renderConnections(data) {
  /* Draw connections */
  for (let i = 0; i < data.connections.length; i++) {
    const connection = data.connections[i];
    const path = new Path();
    path.strokeColor = 'black';
    path.strokeWidth = baseConWidth;
    path.moveTo(data.locations[connection.city1].point);
    path.lineTo(data.locations[connection.city2].point);
  }
}

/* initial map load */
$.getJSON('/map', (data) => {
  calculateLocationPoints(data);
  renderConnections(data);
  renderLocations(data);
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

function onKeyUp(event) {
  if (event.key === 'escape') {
    $('#detailPanel').hide();
  }
}
