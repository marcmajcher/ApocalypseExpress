"use strict";!function(){angular.module("apox",[])}(),function(){var n=function(n){var t=this;t.location={},t.mapData={},t.showDetailPanel=!0,t.dataLoaded=!1,t.closeDetailPanel=function(){t.showDetailPanel=!1},t.loadMapData=function(){n.getMap().then(function(n){t.mapData.locations=n.data.locations,t.mapData.connections=n.data.connections,t.dataLoaded=!0})},t.updateLocationDetails=function(){var o=t.location;o.id>0&&n.updateLocation(o.id,{name:o.name,longitude:o.longitude,latitude:o.latitude,description:o.description,population:o.population,tech:o.tech,type:o.type,factionid:o.factionid}).catch(function(){window.alert("PATCH ERROR")})},t.loadMapData()};angular.module("apox").controller("AdminMapController",["MapService",n])}(),function(){var n=function(n){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(t,o){paper.setup(o.context.firstChild);var e=new paper.Layer;e.texasMap=new paper.Raster("/img/texasmap.jpg");var a=new paper.Layer,i=new paper.Layer;t.$watch("admin.dataLoaded",function(){var o=t.admin.mapData;o.locations&&o.connections&&!function(){Object.keys(o.locations).forEach(function(t){o.locations[t].point=n.locToPoint(o.locations[t]),o.locations[t].paths=[],o.locations[t].ends=[]});for(var e=0;e<o.connections.length;e++){var i=o.connections[e],r=o.locations[i.loc1],c=o.locations[i.loc2],l=new paper.Path.Line(r.point,c.point);l.strokeColor="black",l.strokeWidth=n.baseConWidth,r.ends.push(l.segments[0].point),c.ends.push(l.segments[1].point),r.paths.push(l),c.paths.push(l)}var p=[0,-20],u=Object.keys(o.locations).sort(function(n,t){return o.locations[n].latitude>o.locations[t].latitude});u.forEach(function(e){var i=o.locations[e],r=new paper.Path.Circle({center:i.point,radius:n.baseDotSize*Math.ceil(Math.log10(i.population))*40,name:"faction"});r.fillColor={gradient:{stops:[[n.factionColors[i.factionid],.6],[n.alphaClear,1]],radial:!0},origin:r.position,destination:r.bounds.rightCenter},a.addChild(r);var c=new paper.Path.Circle({center:i.point,radius:n.baseDotSize*Math.ceil(Math.log10(i.population)),fillColor:"black",name:"dot"}),l=new paper.PointText({point:i.point.add(p),justification:"center",fillColor:"black",strokeColor:"white",content:i.name,name:"locname",visible:!1,fontSize:30}),u=new paper.Group([c,l]);u.location=i,u.scope=t,u.onMouseEnter=n.rolloverLocation,u.onMouseLeave=n.rolloutLocation,u.onMouseDrag=n.dragLocation,u.onMouseDown=n.mousedownLocation,u.onMouseUp=n.mouseupLocation})}()}),i.onMouseDrag=function(n){i.position=i.position.add([n.delta.x,n.delta.y])},paper.view.center=new paper.Point(1100,500),o.bind("mousewheel",function(t){var o=t.originalEvent.wheelDeltaX,e=t.originalEvent.wheelDeltaY;if(t.altKey){var a=new paper.Point(t.offsetX,t.offsetY),i=n.changeZoom(paper.view.zoom,e,paper.view.center,a);paper.view.zoom=i.newZoom,t.preventDefault()}else paper.view.center=n.changeCenter(paper.view.center,o,e,1),t.preventDefault()})}}};angular.module("apox").directive("apoxAdminMap",["RenderMap",n])}(),function(){var n=function(n,t,o){var e=this;e.working=!1,e.traveling=!1,e.factionTags=["","republic","confederation","alliance","petrex","light"],n.getDriver().then(function(n){e.driver=n}),e.getCurrentConnections=function(){t.getCurrentLocation().then(function(n){for(var t=[],o=0;o<n.connections.length;o++){var a=n.connections[o];a.name!==n.name&&(a.id=a.loc1===n.id?a.loc2:a.loc1,delete a.loc1,delete a.loc2,t.push(a))}n.connections=t,e.currentLocation=n})},e.getCurrentDestination=function(){o.getCurrentTrip().then(function(n){n.trip[0]&&(e.destinationName=n.trip[0].name,e.destinationId=n.trip[0].id)})},e.setDestination=function(n){e.working=!0,o.setNextDestination(n).then(function(n){n.ok&&(e.destinationName=n.name,e.destinationId=n.id,e.working=!1)})},e.goDestination=function(){e.working=!0,o.beginTrip().then(function(n){"ok"===n&&(e.working=!1,e.getCurrentConnections(),e.destinationName=void 0,e.destinationId=void 0)})},e.clearDestination=function(){e.working=!0,o.clearTrip().then(function(n){"ok"===n&&(e.destinationName=void 0,e.destinationId=void 0,e.working=!1)})},e.getCurrentConnections(),e.getCurrentDestination()};angular.module("apox").controller("GamePageController",["DriverService","LocationService","TripService",n])}(),function(){var n=function(n){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(t,o){paper.setup(o.context.firstChild);var e=new paper.Layer;e.texasMap=new paper.Raster("/img/texasmap.jpg");var a=new paper.Layer,i=new paper.Layer;t.$watch("admin.dataLoaded",function(){var o=t.admin.mapData;o.locations&&o.connections&&!function(){Object.keys(o.locations).forEach(function(t){o.locations[t].point=n.locToPoint(o.locations[t]),o.locations[t].paths=[],o.locations[t].ends=[]});for(var e=0;e<o.connections.length;e++){var i=o.connections[e],r=o.locations[i.loc1],c=o.locations[i.loc2],l=new paper.Path.Line(r.point,c.point);l.strokeColor="black",l.strokeWidth=n.baseConWidth,r.ends.push(l.segments[0].point),c.ends.push(l.segments[1].point),r.paths.push(l),c.paths.push(l)}var p=[0,-20],u=Object.keys(o.locations).sort(function(n,t){return o.locations[n].latitude>o.locations[t].latitude});u.forEach(function(e){var i=o.locations[e],r=new paper.Path.Circle({center:i.point,radius:n.baseDotSize*Math.ceil(Math.log10(i.population))*40,name:"faction"});r.fillColor={gradient:{stops:[[n.factionColors[i.factionid],.6],[n.alphaClear,1]],radial:!0},origin:r.position,destination:r.bounds.rightCenter},a.addChild(r);var c=new paper.Path.Circle({center:i.point,radius:n.baseDotSize*Math.ceil(Math.log10(i.population)),fillColor:"black",name:"dot"}),l=new paper.PointText({point:i.point.add(p),justification:"center",fillColor:"black",strokeColor:"white",content:i.name,name:"locname",visible:!1,fontSize:30}),u=new paper.Group([c,l]);u.location=i,u.scope=t,u.onMouseEnter=n.rolloverLocation,u.onMouseLeave=n.rolloutLocation,u.onMouseDrag=n.dragLocation,u.onMouseDown=n.mousedownLocation,u.onMouseUp=n.mouseupLocation})}()}),i.onMouseDrag=function(n){i.position=i.position.add([n.delta.x,n.delta.y])},paper.view.center=new paper.Point(1100,500),o.bind("mousewheel",function(t){var o=t.originalEvent.wheelDeltaX,e=t.originalEvent.wheelDeltaY;if(t.altKey){var a=new paper.Point(t.offsetX,t.offsetY),i=n.changeZoom(paper.view.zoom,e,paper.view.center,a);paper.view.zoom=i.newZoom,t.preventDefault()}else paper.view.center=n.changeCenter(paper.view.center,o,e,1),t.preventDefault()})}}};angular.module("apox").directive("apoxMap",["RenderMap",n])}(),function(){var n="/driver",t=function(t,o){return{getDriver:function(){return o(function(o,e){t.get(n).then(function(n){o(n.data)},function(n){e(n)})})}}};angular.module("apox").factory("DriverService",["$http","$q",t])}(),function(){var n="/location",t=function(t,o){return{getCurrentLocation:function(){return o(function(o,e){t.get(n).then(function(n){o(n.data)},function(n){e(n)})})}}};angular.module("apox").factory("LocationService",["$http","$q",t])}(),function(){var n=function(){var n=435.3,t=-506.5,o=43647,e=15855;return{baseDotSize:3,baseConWidth:3,alphaBlack:new paper.Color(0,0,0,.5),alphaClear:new paper.Color(255,255,255,0),factionColors:[new paper.Color(0,0,0,.95),new paper.Color(0,0,255,.2),new paper.Color(255,0,0,.2),new paper.Color(0,255,0,.2),new paper.Color(75,0,130,.2),new paper.Color(255,255,0,.2)],locToPoint:function(a){return new paper.Point(a.longitude*n+o,a.latitude*t+e)},pointToLatLong:function(a){return{longitude:(a.x-o)/n,latitude:(a.y-e)/t}},mousedownLocation:function(n){var t=n.target.parent;n.target.remove(),t.addChild(n.target),n.target.children.dot.fillColor.alpha=.5;for(var o=0;o<n.target.location.paths.length;o++)n.target.location.paths[o].strokeColor=this.alphaBlack;n.target.scope.$apply(function(){n.target.scope.admin.showDetailPanel=!0,n.target.scope.admin.location=n.target.location})},mouseupLocation:function(n){n.target.children.dot.fillColor.alpha=1;for(var t=0;t<n.target.location.paths.length;t++)n.target.location.paths[t].strokeColor="black"},dragLocation:function(n){var t=n.target;t.position=t.position.add([n.delta.x,n.delta.y]);for(var o=0;o<t.location.paths.length;o++)t.location.ends[o].x=t.children.dot.position.x,t.location.ends[o].y=t.children.dot.position.y;var e=this.pointToLatLong(t.position);t.location.longitude=e.longitude,t.location.latitude=e.latitude,t.scope.$apply(function(){t.scope.admin.location.longitude=e.longitude,t.scope.admin.location.latitude=e.latitude}),n.stopPropagation()},rolloverLocation:function(n){n.target.children.locname.visible=!0},rolloutLocation:function(n){n.target.children.locname.visible=!1},changeZoom:function(n,t,o,e){var a=1.05,i=n;t>0&&(i*=a),t<0&&(i/=a);var r=n/i,c=e.subtract(o),l=e.subtract(c.multiply(r)).subtract(o);return{newZoom:i,a:l}},changeCenter:function(n,t,o,e){var a=new paper.Point(t,o).multiply(e);return n.subtract(a)}}};angular.module("apox").factory("RenderMap",n)}(),function(){var n=function(n){return{getMap:function(){return n.get("/map")},updateLocation:function(t,o){return n.patch("/admin/map/location/"+t,o)}}};angular.module("apox").factory("MapService",["$http",n])}(),function(){var n="/trip",t=function(t,o){return{getCurrentTrip:function(){return o(function(o,e){t.get(n).then(function(n){o(n.data)},function(n){e(n)})})},setNextDestination:function(e){return o(function(o,a){t.put(n,{destination:e}).then(function(n){o(n.data)},function(n){a(n)})})},clearTrip:function(){return o(function(o,e){t.delete(n).then(function(n){o(n.data)},function(n){e(n)})})},beginTrip:function(){return o(function(o,e){t.post(n).then(function(n){o(n.data)},function(n){e(n)})})}}};angular.module("apox").factory("TripService",["$http","$q",t])}();