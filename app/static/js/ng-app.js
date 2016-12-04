"use strict";!function(){angular.module("apox",[])}(),function(){var t=function(t){var n=this;n.location={},n.mapData={},n.showDetailPanel=!0,n.dataLoaded=!1,n.closeDetailPanel=function(){n.showDetailPanel=!1},n.loadMapData=function(){t.getMap().then(function(t){n.mapData.locations=t.data.locations,n.mapData.connections=t.data.connections,n.dataLoaded=!0})},n.updateLocationDetails=function(){var o=n.location;o.id>0&&t.updateLocation(o.id,{name:o.name,longitude:o.longitude,latitude:o.latitude,description:o.description,population:o.population,tech:o.tech,type:o.type,factionid:o.factionid})},n.loadMapData()};angular.module("apox").controller("AdminMapController",["MapService",t])}(),function(){angular.module("apox").directive("apoxAdminMap",function(){function t(t){return new paper.Point(t.longitude*s+f,t.latitude*d+g)}function n(t){return{longitude:(t.x-f)/s,latitude:(t.y-g)/d}}function o(t){var n=t.target.parent;t.target.remove(),n.addChild(t.target),t.target.children.dot.fillColor.alpha=.5;for(var o=0;o<t.target.location.paths.length;o++)t.target.location.paths[o].strokeColor=h;t.target.scope.$apply(function(){t.target.scope.admin.showDetailPanel=!0,t.target.scope.admin.location=t.target.location})}function e(t){t.target.children.dot.fillColor.alpha=1;for(var n=0;n<t.target.location.paths.length;n++)t.target.location.paths[n].strokeColor="black"}function a(t){var o=t.target;o.position=o.position.add([t.delta.x,t.delta.y]);for(var e=0;e<o.location.paths.length;e++)o.location.ends[e].x=o.children.dot.position.x,o.location.ends[e].y=o.children.dot.position.y;var a=n(o.position);o.location.longitude=a.longitude,o.location.latitude=a.latitude,o.scope.$apply(function(){o.scope.admin.location.longitude=a.longitude,o.scope.admin.location.latitude=a.latitude}),t.stopPropagation()}function i(t){t.target.children.locname.visible=!0}function r(t){t.target.children.locname.visible=!1}function c(t,n,o,e){var a=1.05,i=t;n>0&&(i*=a),n<0&&(i/=a);var r=t/i,c=e.subtract(o),l=e.subtract(c.multiply(r)).subtract(o);return{newZoom:i,a:l}}function l(t,n,o,e){var a=new paper.Point(n,o).multiply(e);return t.subtract(a)}var u=3,p=3,s=435.3,d=-506.5,f=43647,g=15855,h=new paper.Color(0,0,0,.5),v=new paper.Color(255,255,255,0),m=[new paper.Color(0,0,0,.95),new paper.Color(0,0,255,.1),new paper.Color(255,0,0,.1),new paper.Color(0,255,0,.1),new paper.Color(200,0,255,.1),new paper.Color(255,255,0,.2)];return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(n,s){paper.setup(s.context.firstChild);var d=new paper.Layer;d.texasMap=new paper.Raster("/img/texasmap.jpg");var f=new paper.Layer,g=new paper.Layer;n.$watch("admin.dataLoaded",function(){var c=n.admin.mapData;c.locations&&c.connections&&!function(){Object.keys(c.locations).forEach(function(n){c.locations[n].point=t(c.locations[n]),c.locations[n].paths=[],c.locations[n].ends=[]});for(var l=0;l<c.connections.length;l++){var s=c.connections[l],d=c.locations[s.loc1],g=c.locations[s.loc2],h=new paper.Path.Line(d.point,g.point);h.strokeColor="black",h.strokeWidth=p,d.ends.push(h.segments[0].point),g.ends.push(h.segments[1].point),d.paths.push(h),g.paths.push(h)}var w=[0,-20],C=Object.keys(c.locations).sort(function(t,n){return c.locations[t].latitude>c.locations[n].latitude});C.forEach(function(t){var l=c.locations[t],p=new paper.Path.Circle({center:l.point,radius:u*Math.ceil(Math.log10(l.population))*40,name:"faction"});p.fillColor={gradient:{stops:[[m[l.factionid],.5],[v,1]],radial:!0},origin:p.position,destination:p.bounds.rightCenter},f.addChild(p);var s=new paper.Path.Circle({center:l.point,radius:u*Math.ceil(Math.log10(l.population)),fillColor:"black",name:"dot"}),d=new paper.PointText({point:l.point.add(w),justification:"center",fillColor:"black",strokeColor:"white",content:l.name,name:"locname",visible:!1,fontSize:30}),g=new paper.Group([s,d]);g.location=l,g.scope=n,g.onMouseEnter=i,g.onMouseLeave=r,g.onMouseDrag=a,g.onMouseDown=o,g.onMouseUp=e})}()}),g.onMouseDrag=function(t){g.position=g.position.add([t.delta.x,t.delta.y])},paper.view.center=new paper.Point(1100,500),s.bind("mousewheel",function(t){var n=t.originalEvent.wheelDeltaX,o=t.originalEvent.wheelDeltaY;if(t.altKey){var e=new paper.Point(t.offsetX,t.offsetY),a=c(paper.view.zoom,o,paper.view.center,e);paper.view.zoom=a.newZoom,t.preventDefault()}else paper.view.center=l(paper.view.center,n,o,1),t.preventDefault()})}}})}(),function(){var t="/driver",n=function(n,o){return{getDriver:function(){return o(function(o,e){n.get(t).then(function(t){o(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("DriverService",["$http","$q",n])}(),function(){var t="/location",n=function(n,o){return{getCurrentLocation:function(){return o(function(o,e){n.get(t).then(function(t){o(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("LocationService",["$http","$q",n])}(),function(){var t=function(t){return{getMap:function(){return t.get("/map")},updateLocation:function(n,o){return t.patch("/admin/map/location/"+n,o)}}};angular.module("apox").factory("MapService",["$http",t])}(),function(){var t="/trip",n=function(n,o){return{getCurrentTrip:function(){return o(function(o,e){n.get(t).then(function(t){o(t.data)},function(t){e(t)})})},setNextDestination:function(e){return o(function(o,a){n.put(t,{destination:e}).then(function(t){o(t.data)},function(t){a(t)})})},clearTrip:function(){return o(function(o,e){n.delete(t).then(function(t){o(t.data)},function(t){e(t)})})},beginTrip:function(){return o(function(o,e){n.post(t).then(function(t){o(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("TripService",["$http","$q",n])}(),function(){var t=function(t,n,o){var e=this;e.working=!1,e.traveling=!1,t.getDriver().then(function(t){e.driver=t}),e.getCurrentConnections=function(){n.getCurrentLocation().then(function(t){for(var n=[],o=0;o<t.connections.length;o++){var a=t.connections[o];a.name!==t.name&&(a.id=a.loc1===t.id?a.loc2:a.loc1,delete a.loc1,delete a.loc2,n.push(a))}t.connections=n,e.currentLocation=t})},e.getCurrentDestination=function(){o.getCurrentTrip().then(function(t){t.trip[0]&&(e.destinationName=t.trip[0].name,e.destinationId=t.trip[0].id)})},e.setDestination=function(t){e.working=!0,o.setNextDestination(t).then(function(t){t.ok&&(e.destinationName=t.name,e.destinationId=t.id,e.working=!1)})},e.goDestination=function(){e.working=!0,o.beginTrip().then(function(t){"ok"===t&&(e.working=!1,e.getCurrentConnections())})},e.clearDestination=function(){e.working=!0,o.clearTrip().then(function(t){"ok"===t&&(e.destinationName=void 0,e.destinationId=void 0,e.working=!1)})},e.getCurrentConnections(),e.getCurrentDestination()};angular.module("apox").controller("GamePageController",["DriverService","LocationService","TripService",t])}();