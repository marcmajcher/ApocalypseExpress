var myData;
var mapObj = {};
var mapLayer = new Layer();

// var texasMap = new Raster('/img/texasbg.png');
// texasMap.position = new Point(840,880);

/* initial map load */
$.getJSON('/map', function(data) {
  renderMap(data);
});

function renderMap(data) {
  var textOffset = new Point(0, -10);
  for (var id in data.locations) {
    var location = data.locations[id];
    location.point = getPoint(data.locations[id]);
    var dot = new Path.Circle({
      center: location.point,
      radius: 5,
      fillColor: 'black'
    });
    var text = new PointText(location.point + textOffset);
    text.justification = 'center';
    text.fillColor = '#333399';
    text.content = location.name;
  }

  /* Draw connections */
  for (var i = 0; i < data.connections.length; i++) {
    var con = data.connections[i];
    var path = new Path();
    path.strokeColor = 'black';
    path.moveTo(data.locations[con.city1].point);
    path.lineTo(data.locations[con.city2].point);
  }

  mapLayer.position = new Point(240, 150);
}

/* Navigation methods */

$('#mapCanvas').bind('mousewheel', function(event) {
  var dx = event.originalEvent.wheelDeltaX;
  var dy = event.originalEvent.wheelDeltaY;

  if (event.shiftKey) {
    view.center = changeCenter(view.center, dx, dy, 1);
    event.preventDefault();
  }
  else if (event.altKey) {
    var mousePos = new Point(event.offsetX, event.offsetY);
    var z = changeZoom(view.zoom, dy, view.center, mousePos);
    view.zoom = z; //.newZoom;
    // view.center = view.center.add(z.a);
    event.preventDefault();
  }
});

function getPoint(city) {
  var scale = 155;
  return new Point((parseFloat(city.longitude) + 107) * scale * 0.8, (parseFloat(city.latitude) -
    37) * -scale);
}


function changeZoom(oldZoom, delta, c, p) {
  var factor = 1.05;
  var newZoom = oldZoom;
  if (delta > 0) {
    newZoom *= factor;
  }
  if (delta < 0) {
    newZoom /= factor;
  }
  return newZoom;
  // var beta = oldZoom / newZoom;
  // var pc = p.subtract(c);
  // var a = p.subtract(pc.multiply(beta)).subtract(c);
  // return {newZoom: newZoom, a: a};
}

function changeCenter(oldCenter, deltaX, deltaY, factor) {
  var offset;
  offset = new Point(deltaX, -deltaY);
  offset = offset.multiply(factor);
  return oldCenter.add(offset);
}

function onMouseDrag(event) {
  mapLayer.position += event.delta;
}
