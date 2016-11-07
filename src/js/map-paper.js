'use strict';

/* globals view, Point, Layer, Path, PointText, Group, Raster */
/* eslint-env jquery, browser */
/* exported onMouseDrag, onKeyUp */

// TODO: add "loading" thinger

const mapLayer = new Layer();

mapLayer.texasMap = new Raster('/img/texasmap.jpg');
view.center = new Point(1100, 500); // eslint-disable-line no-magic-numbers

const baseDotSize = 3;
const baseConWidth = 3;
const xScale = 435.30;
const yScale = -506.5;
const xOffset = 43647;
const yOffset = 15855;

function locToPoint(loc) {
  return new Point((loc.longitude * xScale) + xOffset, (loc.latitude * yScale) + yOffset);
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

function updatePositionDetail(loc) {
  $('#detailPanel #longitude').val(loc.longitude);
  $('#detailPanel #latitude').val(loc.latitude);
}

function mousedownLocation(event) {
  // add close/notification
  event.target.children.dot.fillColor.alpha = 0.5;
  const loc = event.target.location;
  $('#detailPanel').show();
  $('#mapsubmit').attr('action', `/admin/map/location/${loc.id}?_method=PATCH`);
  $('#detailPanel #name').val(loc.name);
  $('#detailPanel #description').val(loc.description);
  $('#detailPanel #population').val(loc.population);
  $('#detailPanel #tech').val(loc.tech);
  $('#detailPanel #type').val(loc.type);
  updatePositionDetail(loc);
}

function dragLocation(event) {
  const target = event.target;
  target.position += event.delta;
  const location = pointToLatLong(target.position);
  target.location.longitude = location.longitude;
  target.location.latitude = location.latitude;
  $('#detailPanel #locx').val(target.location.latitude);
  $('#detailPanel #locy').val(target.location.longitude);
  for (let i = 0; i < target.location.paths.length; i++) {
    target.location.paths[i].x = target.children.dot.position.x;
    target.location.paths[i].y = target.children.dot.position.y;
  }
  updatePositionDetail(location);
  event.stopPropagation();
}

function mouseupLocation(event) {
  event.target.children.dot.fillColor.alpha = 1;
}

function calculateLocationPoints(data) {
  Object.keys(data.locations).forEach((id) => {
    data.locations[id].point = locToPoint(data.locations[id]);
    data.locations[id].paths = [];
  });
}

function renderLocations(data) {
  const textOffset = new Point(0, -15); // eslint-disable-line no-magic-numbers
  Object.keys(data.locations).forEach((id) => {
    const location = data.locations[id];
    const dot = new Path.Circle({
      center: location.point,
      radius: baseDotSize * Math.ceil(Math.log10(location.population)),
      fillColor: 'black', // set color/halo according to faction
      name: 'dot'
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
    locGroup.onMouseDrag = dragLocation;
    locGroup.onMouseDown = mousedownLocation;
    locGroup.onMouseUp = mouseupLocation;
  });
}

function renderConnections(data) {
  /* Draw connections */
  for (let i = 0; i < data.connections.length; i++) {
    const connection = data.connections[i];
    const loc1 = data.locations[connection.city1];
    const loc2 = data.locations[connection.city2];

    const path = new Path.Line(loc1.point, loc2.point);
    path.strokeColor = 'black';
    path.strokeWidth = baseConWidth;

    loc1.paths.push(path.segments[0].point);
    loc2.paths.push(path.segments[1].point);
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

/* Global interaction handlers */

mapLayer.onMouseDrag = (event) => {
  event.target.position += event.delta;
};

function onKeyUp(event) {
  if (event.key === 'escape') {
    $('#detailPanel').hide();
  }
}
