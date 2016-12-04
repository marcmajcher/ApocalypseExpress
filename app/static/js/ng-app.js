"use strict";!function(){angular.module("apox",[])}(),function(){var n=function(n){var t=this;t.location={},t.mapData={},t.showDetailPanel=!0,t.dataLoaded=!1,t.closeDetailPanel=function(){t.showDetailPanel=!1},t.loadMapData=function(){n.getMap().then(function(n){t.mapData.locations=n.data.locations,t.mapData.connections=n.data.connections,t.dataLoaded=!0})},t.updateLocationDetails=function(){var o=t.location;o.id>0&&n.updateLocation(o.id,{name:o.name,longitude:o.longitude,latitude:o.latitude,description:o.description,population:o.population,tech:o.tech,type:o.type,factionid:o.factionid}).catch(function(){window.alert("PATCH ERROR")})},t.loadMapData()};angular.module("apox").controller("AdminMapController",["MapService",n])}(),function(){var n=function(n){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(t,o){paper.setup(o.context.firstChild);var e=new paper.Layer;e.texasMap=new paper.Raster("/img/texasmap.jpg");var a=new paper.Layer,i=new paper.Layer;t.$watch("admin.dataLoaded",function(){n.render(t,a,i)}),paper.view.center=new paper.Point(1100,500),o.bind("mousewheel",n.onMouseWheel)}}};angular.module("apox").directive("apoxAdminMap",["RenderMap",n])}(),function(){var n=function(n,t,o){var e=this;e.working=!1,e.traveling=!1,e.factionTags=["","republic","confederation","alliance","petrex","light"],n.getDriver().then(function(n){e.driver=n}),e.getCurrentConnections=function(){t.getCurrentLocation().then(function(n){for(var t=[],o=0;o<n.connections.length;o++){var a=n.connections[o];a.name!==n.name&&(a.id=a.loc1===n.id?a.loc2:a.loc1,delete a.loc1,delete a.loc2,t.push(a))}n.connections=t,e.currentLocation=n})},e.getCurrentDestination=function(){o.getCurrentTrip().then(function(n){n.trip[0]&&(e.destinationName=n.trip[0].name,e.destinationId=n.trip[0].id)})},e.setDestination=function(n){e.working=!0,o.setNextDestination(n).then(function(n){n.ok&&(e.destinationName=n.name,e.destinationId=n.id,e.working=!1)})},e.goDestination=function(){e.working=!0,o.beginTrip().then(function(n){"ok"===n&&(e.working=!1,e.getCurrentConnections(),e.destinationName=void 0,e.destinationId=void 0)})},e.clearDestination=function(){e.working=!0,o.clearTrip().then(function(n){"ok"===n&&(e.destinationName=void 0,e.destinationId=void 0,e.working=!1)})},e.getCurrentConnections(),e.getCurrentDestination()};angular.module("apox").controller("GamePageController",["DriverService","LocationService","TripService",n])}(),function(){var n=function(n){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(t,o){paper.setup(o.context.firstChild);var e=new paper.Layer;e.texasMap=new paper.Raster("/img/texasmap.jpg");var a=new paper.Layer,i=new paper.Layer;t.$watch("admin.dataLoaded",function(){var o=t.admin.mapData;o.locations&&o.connections&&!function(){Object.keys(o.locations).forEach(function(t){o.locations[t].point=n.locToPoint(o.locations[t]),o.locations[t].paths=[],o.locations[t].ends=[]});for(var e=0;e<o.connections.length;e++){var i=o.connections[e],r=o.locations[i.loc1],c=o.locations[i.loc2],l=new paper.Path.Line(r.point,c.point);l.strokeColor="black",l.strokeWidth=n.baseConWidth,r.ends.push(l.segments[0].point),c.ends.push(l.segments[1].point),r.paths.push(l),c.paths.push(l)}var p=[0,-20],u=Object.keys(o.locations).sort(function(n,t){return o.locations[n].latitude>o.locations[t].latitude});u.forEach(function(e){var i=o.locations[e],r=new paper.Path.Circle({center:i.point,radius:n.baseDotSize*Math.ceil(Math.log10(i.population))*40,name:"faction"});r.fillColor={gradient:{stops:[[n.factionColors[i.factionid],.6],[n.alphaClear,1]],radial:!0},origin:r.position,destination:r.bounds.rightCenter},a.addChild(r);var c=new paper.Path.Circle({center:i.point,radius:n.baseDotSize*Math.ceil(Math.log10(i.population)),fillColor:"black",name:"dot"}),l=new paper.PointText({point:i.point.add(p),justification:"center",fillColor:"black",strokeColor:"white",content:i.name,name:"locname",visible:!1,fontSize:30}),u=new paper.Group([c,l]);u.location=i,u.scope=t,u.onMouseEnter=n.rolloverLocation,u.onMouseLeave=n.rolloutLocation,u.onMouseDrag=n.dragLocation,u.onMouseDown=n.mousedownLocation,u.onMouseUp=n.mouseupLocation})}()}),i.onMouseDrag=function(n){i.position=i.position.add([n.delta.x,n.delta.y])},paper.view.center=new paper.Point(1100,500),o.bind("mousewheel",function(t){var o=t.originalEvent.wheelDeltaX,e=t.originalEvent.wheelDeltaY;if(t.altKey){var a=new paper.Point(t.offsetX,t.offsetY),i=n.changeZoom(paper.view.zoom,e,paper.view.center,a);paper.view.zoom=i.newZoom,t.preventDefault()}else paper.view.center=n.changeCenter(paper.view.center,o,e,1),t.preventDefault()})}}};angular.module("apox").directive("apoxMap",["RenderMap",n])}(),function(){var n="/driver",t=function(t,o){return{getDriver:function(){return o(function(o,e){t.get(n).then(function(n){o(n.data)},function(n){e(n)})})}}};angular.module("apox").factory("DriverService",["$http","$q",t])}(),function(){var n="/location",t=function(t,o){return{getCurrentLocation:function(){return o(function(o,e){t.get(n).then(function(n){o(n.data)},function(n){e(n)})})}}};angular.module("apox").factory("LocationService",["$http","$q",t])}(),function(){var n=function(){function n(n){return new paper.Point(n.longitude*s+f,n.latitude*d+h)}function t(n){return{longitude:(n.x-f)/s,latitude:(n.y-h)/d}}function o(n){var t=n.target.parent;n.target.remove(),t.addChild(n.target),n.target.children.dot.fillColor.alpha=.5;for(var o=0;o<n.target.location.paths.length;o++)n.target.location.paths[o].strokeColor=g;n.target.scope.$apply(function(){n.target.scope.admin.showDetailPanel=!0,n.target.scope.admin.location=n.target.location})}function e(n){n.target.children.dot.fillColor.alpha=1;for(var t=0;t<n.target.location.paths.length;t++)n.target.location.paths[t].strokeColor="black"}function a(n){var o=n.target;o.position=o.position.add([n.delta.x,n.delta.y]);for(var e=0;e<o.location.paths.length;e++)o.location.ends[e].x=o.children.dot.position.x,o.location.ends[e].y=o.children.dot.position.y;var a=t(o.position);o.location.longitude=a.longitude,o.location.latitude=a.latitude,o.scope.$apply(function(){o.scope.admin.location.longitude=a.longitude,o.scope.admin.location.latitude=a.latitude}),n.stopPropagation()}function i(n){n.target.children.locname.visible=!0}function r(n){n.target.children.locname.visible=!1}function c(n,t,o,e){var a=1.05,i=n;t>0&&(i*=a),t<0&&(i/=a);var r=n/i,c=e.subtract(o),l=e.subtract(c.multiply(r)).subtract(o);return{newZoom:i,a:l}}function l(n,t,o,e){var a=new paper.Point(t,o).multiply(e);return n.subtract(a)}function p(n){var t=n.originalEvent.wheelDeltaX,o=n.originalEvent.wheelDeltaY;if(n.altKey){var e=new paper.Point(n.offsetX,n.offsetY),a=c(paper.view.zoom,o,paper.view.center,e);paper.view.zoom=a.newZoom,n.preventDefault()}else paper.view.center=l(paper.view.center,t,o,1),n.preventDefault()}function u(t,c,l){var p=t.admin.mapData;p.locations&&p.connections&&!function(){Object.keys(p.locations).forEach(function(t){p.locations[t].point=n(p.locations[t]),p.locations[t].paths=[],p.locations[t].ends=[]});for(var l=0;l<p.connections.length;l++){var u=p.connections[l],s=p.locations[u.loc1],d=p.locations[u.loc2],f=new paper.Path.Line(s.point,d.point);f.strokeColor="black",f.strokeWidth=m,s.ends.push(f.segments[0].point),d.ends.push(f.segments[1].point),s.paths.push(f),d.paths.push(f)}var h=[0,-20],g=Object.keys(p.locations).sort(function(n,t){return p.locations[n].latitude>p.locations[t].latitude});g.forEach(function(n){var l=p.locations[n],u=new paper.Path.Circle({center:l.point,radius:v*Math.ceil(Math.log10(l.population))*40,name:"faction"});u.fillColor={gradient:{stops:[[C[l.factionid],.6],[w,1]],radial:!0},origin:u.position,destination:u.bounds.rightCenter},c.addChild(u);var s=new paper.Path.Circle({center:l.point,radius:v*Math.ceil(Math.log10(l.population)),fillColor:"black",name:"dot"}),d=new paper.PointText({point:l.point.add(h),justification:"center",fillColor:"black",strokeColor:"white",content:l.name,name:"locname",visible:!1,fontSize:30}),f=new paper.Group([s,d]);f.location=l,f.scope=t,f.onMouseEnter=i,f.onMouseLeave=r,f.onMouseDrag=a,f.onMouseDown=o,f.onMouseUp=e})}()}var s=435.3,d=-506.5,f=43647,h=15855,g=new paper.Color(0,0,0,.5),v=3,m=3,w=new paper.Color(255,255,255,0),C=[new paper.Color(0,0,0,.95),new paper.Color(0,0,255,.2),new paper.Color(255,0,0,.2),new paper.Color(0,255,0,.2),new paper.Color(75,0,130,.2),new paper.Color(255,255,0,.2)];return{locToPoint:n,pointToLatLong:t,mousedownLocation:o,mouseupLocation:e,dragLocation:a,rolloverLocation:i,rolloutLocation:r,onMouseWheel:p,changeZoom:c,changeCenter:l,render:u}};angular.module("apox").factory("RenderMap",n)}(),function(){var n=function(n){return{getMap:function(){return n.get("/map")},updateLocation:function(t,o){return n.patch("/admin/map/location/"+t,o)}}};angular.module("apox").factory("MapService",["$http",n])}(),function(){var n="/trip",t=function(t,o){return{getCurrentTrip:function(){return o(function(o,e){t.get(n).then(function(n){o(n.data)},function(n){e(n)})})},setNextDestination:function(e){return o(function(o,a){t.put(n,{destination:e}).then(function(n){o(n.data)},function(n){a(n)})})},clearTrip:function(){return o(function(o,e){t.delete(n).then(function(n){o(n.data)},function(n){e(n)})})},beginTrip:function(){return o(function(o,e){t.post(n).then(function(n){o(n.data)},function(n){e(n)})})}}};angular.module("apox").factory("TripService",["$http","$q",t])}();