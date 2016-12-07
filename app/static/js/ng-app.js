"use strict";!function(){angular.module("apox",[])}(),function(){var t=function(t){var n=this;n.location={},n.mapData={},n.showDetailPanel=!0,n.dataLoaded=!1,n.closeDetailPanel=function(){n.showDetailPanel=!1},n.loadMapData=function(){t.getMap().then(function(t){n.mapData.locations=t.data.locations,n.mapData.connections=t.data.connections,n.dataLoaded=!0})},n.updateLocationDetails=function(){var a=n.location;a.id>0&&t.updateLocation(a.id,{name:a.name,longitude:a.longitude,latitude:a.latitude,description:a.description,population:a.population,tech:a.tech,type:a.type,factionid:a.factionid}).catch(function(){window.alert("PATCH ERROR")})},n.loadMapData()};angular.module("apox").controller("AdminMapController",["MapService",t])}(),function(){var t=function(t){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(n,a){paper.setup(a.context.firstChild);var e=new paper.Layer;e.texasMap=new paper.Raster("/img/texasmap.jpg");var o=new paper.Layer,i=new paper.Layer;n.$watch("admin.dataLoaded",function(){if(n.admin.dataLoaded){var e=n.admin.mapData;t.render({isAdmin:!0,data:e,scope:n,factionLayer:o,mapLayer:i}),t.setupMouseWheel(a,{zoom:!0,pan:!0})}}),paper.view.center=new paper.Point(1100,500),a.bind("mousewheel",t.onMouseWheel)}}};angular.module("apox").directive("apoxAdminMap",["MapRenderer",t])}(),function(){var t=function(t,n,a){var e=this;e.working=!1,e.traveling=!1,e.factionTags=["","republic","confederation","alliance","petrex","light"],t.getDriver().then(function(t){e.driver=t}),e.getCurrentLocation=function(){n.getCurrentLocation().then(function(t){e.currentLocation=t,console.log(t)})},e.getCurrentDestination=function(){a.getCurrentTrip().then(function(t){t.trip[0]&&(e.destinationName=t.trip[0].name,e.destinationId=t.trip[0].id)})},e.setDestination=function(t){e.working=!0,a.setNextDestination(t).then(function(t){t.ok&&(e.destinationName=t.name,e.destinationId=t.id,e.working=!1)})},e.goDestination=function(){e.working=!0,a.beginTrip().then(function(t){"ok"===t&&(e.getCurrentLocation(),e.destinationName=void 0,e.destinationId=void 0,e.working=!1)})},e.clearDestination=function(){e.working=!0,a.clearTrip().then(function(t){"ok"===t&&(e.destinationName=void 0,e.destinationId=void 0,e.working=!1)})},e.getCurrentLocation(),e.getCurrentDestination()};angular.module("apox").controller("GamePageController",["DriverService","LocationService","TripService",t])}(),function(){var t=function(t){var n=this;n.location={},n.mapData={},n.dataLoaded=!1,n.loadMapData=function(){t.getMap().then(function(t){n.mapData.locations=t.data.locations,n.mapData.connections=t.data.connections,n.dataLoaded=!0})},n.loadMapData()};angular.module("apox").controller("GameMapController",["MapService",t])}(),function(){var t=function(t){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(n,a){function e(){if(n.$parent.game.currentLocation&&n.map.mapData.locations){var t=n.map.mapData.locations[n.$parent.game.currentLocation.id];paper.view.center=new paper.Point(t.point.x,t.point.y)}}paper.setup(a.context.firstChild);var o=new paper.Layer;o.texasMap=new paper.Raster("/img/texasmap2.jpg"),o.opacity=.5;var i=new paper.Layer,r=new paper.Layer;n.$watch("map.dataLoaded",function(){if(n.map.dataLoaded){var o=n.map.mapData;t.render({isAdmin:!1,data:o,scope:n,factionLayer:i,mapLayer:r}),e()}t.setupMouseWheel(a,{zoom:!0,pan:!1})}),n.$watch("$parent.game.currentLocation",function(){e()})}}};angular.module("apox").directive("apoxMap",["MapRenderer",t])}(),function(){var t="/driver",n=function(n,a){return{getDriver:function(){return a(function(a,e){n.get(t).then(function(t){a(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("DriverService",["$http","$q",n])}(),function(){var t="/location",n=function(n,a){return{getCurrentLocation:function(){return a(function(a,e){n.get(t).then(function(t){a(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("LocationService",["$http","$q",n])}(),function(){var t=function(){function t(t){return new paper.Point(t.longitude*d+f,t.latitude*s+g)}function n(t){return{longitude:(t.x-f)/d,latitude:(t.y-g)/s}}function a(t){var n=t.target.parent;t.target.remove(),n.addChild(t.target),t.target.children.dot.fillColor.alpha=.5;for(var a=0;a<t.target.location.paths.length;a++)t.target.location.paths[a].strokeColor=new paper.Color(0,0,0,.5);t.target.scope.$apply(function(){t.target.scope.admin.showDetailPanel=!0,t.target.scope.admin.location=t.target.location})}function e(t){t.target.children.dot.fillColor.alpha=1;for(var n=0;n<t.target.location.paths.length;n++)t.target.location.paths[n].strokeColor="black"}function o(t){var a=t.target;a.position=a.position.add([t.delta.x,t.delta.y]);for(var e=0;e<a.location.paths.length;e++)a.location.ends[e].x=a.children.dot.position.x,a.location.ends[e].y=a.children.dot.position.y;var o=n(a.position);a.location.longitude=o.longitude,a.location.latitude=o.latitude,a.scope.$apply(function(){a.scope.admin.location.longitude=o.longitude,a.scope.admin.location.latitude=o.latitude}),t.stopPropagation()}function i(t){t.target.children.locname.visible=!0}function r(t){t.target.children.locname.visible=!1}function c(t,n,a,e){var o=1.05,i=t;n>0&&(i*=o),n<0&&(i/=o);var r=t/i,c=e.subtract(a),p=e.subtract(c.multiply(r)).subtract(a);return{newZoom:i,a:p}}function p(t,n,a,e){var o=new paper.Point(n,a).multiply(e);return t.subtract(o)}function l(t,n){var a=1,e=.2;n.zoom&&t.bind("mousewheel",function(t){if(t.altKey){var n=new paper.Point(t.offsetX,t.offsetY),o=c(paper.view.zoom,t.originalEvent.wheelDeltaY,paper.view.center,n);o.newZoom<a&&o.newZoom>e&&(paper.view.zoom=o.newZoom),t.preventDefault()}}),n.pan&&t.bind("mousewheel",function(t){paper.view.center=p(paper.view.center,t.originalEvent.wheelDeltaX,t.originalEvent.wheelDeltaY,1),t.preventDefault()})}function u(n){var c=n.isAdmin,p=n.data,l=n.scope,u=n.mapLayer,d=n.factionLayer;p.locations&&p.connections&&!function(){Object.keys(p.locations).forEach(function(n){p.locations[n].point=t(p.locations[n]),p.locations[n].paths=[],p.locations[n].ends=[]});for(var n=0;n<p.connections.length;n++){var s=p.connections[n],f=p.locations[s.loc1],g=p.locations[s.loc2];if(f&&g){var w=new paper.Path.Line(f.point,g.point);w.strokeColor=c?"black":"dimgrey",w.strokeWidth=v,f.ends.push(w.segments[0].point),g.ends.push(w.segments[1].point),f.paths.push(w),g.paths.push(w)}}var C=[0,-20],D=Object.keys(p.locations).sort(function(t,n){return p.locations[t].latitude>p.locations[n].latitude});D.forEach(function(t){var n=p.locations[t],s=new paper.Path.Circle({center:n.point,radius:m*Math.ceil(Math.log10(n.population))*40,name:"faction"});s.fillColor={gradient:{stops:[[h[n.factionid],.6],[new paper.Color(255,255,255,0),1]],radial:!0},origin:s.position,destination:s.bounds.rightCenter},d.addChild(s);var f=new paper.Path.Circle({center:n.point,radius:m*Math.ceil(Math.log10(n.population)),fillColor:c?"black":h[n.factionid],strokeColor:"black",name:"dot"}),g=new paper.PointText({point:n.point.add(C),justification:"center",fillColor:"black",strokeColor:c?"white":"none",content:n.name,name:"locname",visible:!c,fontSize:30}),v=new paper.Group([f,g]);v.location=n,v.scope=l,c&&(v.onMouseEnter=i,v.onMouseLeave=r,v.onMouseDrag=o,v.onMouseDown=a,v.onMouseUp=e),u.addChild(v)}),d.visible=c}()}var d=435.3,s=-506.5,f=43647,g=15855,m=3,v=3,h=[new paper.Color(0,0,0,.95),new paper.Color(0,0,255,.5),new paper.Color(255,0,0,.5),new paper.Color(0,255,0,.5),new paper.Color(75,0,130,.5),new paper.Color(255,255,0,.5)];return{setupMouseWheel:l,render:u}};angular.module("apox").factory("MapRenderer",t)}(),function(){var t=function(t){return{getMap:function(){return t.get("/map")},updateLocation:function(n,a){return t.patch("/admin/map/location/"+n,a)}}};angular.module("apox").factory("MapService",["$http",t])}(),function(){var t="/trip",n=function(n,a){return{getCurrentTrip:function(){return a(function(a,e){n.get(t).then(function(t){a(t.data)},function(t){e(t)})})},setNextDestination:function(e){return a(function(a,o){n.put(t,{destination:e}).then(function(t){a(t.data)},function(t){o(t)})})},clearTrip:function(){return a(function(a,e){n.delete(t).then(function(t){a(t.data)},function(t){e(t)})})},beginTrip:function(){return a(function(a,e){n.post(t).then(function(t){a(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("TripService",["$http","$q",n])}();