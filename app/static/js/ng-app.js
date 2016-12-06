"use strict";!function(){angular.module("apox",[])}(),function(){var n=function(n){var t=this;t.location={},t.mapData={},t.showDetailPanel=!0,t.dataLoaded=!1,t.closeDetailPanel=function(){t.showDetailPanel=!1},t.loadMapData=function(){n.getMap().then(function(n){t.mapData.locations=n.data.locations,t.mapData.connections=n.data.connections,t.dataLoaded=!0})},t.updateLocationDetails=function(){var e=t.location;e.id>0&&n.updateLocation(e.id,{name:e.name,longitude:e.longitude,latitude:e.latitude,description:e.description,population:e.population,tech:e.tech,type:e.type,factionid:e.factionid}).catch(function(){window.alert("PATCH ERROR")})},t.loadMapData()};angular.module("apox").controller("AdminMapController",["MapService",n])}(),function(){var n=function(n){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(t,e){paper.setup(e.context.firstChild);var a=new paper.Layer;a.texasMap=new paper.Raster("/img/texasmap.jpg");var o=new paper.Layer,i=new paper.Layer;t.$watch("admin.dataLoaded",function(){if(t.admin.dataLoaded){var a=t.admin.mapData;n.render({isAdmin:!0,data:a,scope:t,factionLayer:o,mapLayer:i}),n.setupMouseWheel(e,{zoom:!0,pan:!0})}}),paper.view.center=new paper.Point(1100,500),e.bind("mousewheel",n.onMouseWheel)}}};angular.module("apox").directive("apoxAdminMap",["MapRenderer",n])}(),function(){var n=function(n,t,e){var a=this;a.working=!1,a.traveling=!1,a.factionTags=["","republic","confederation","alliance","petrex","light"],n.getDriver().then(function(n){a.driver=n}),a.getCurrentConnections=function(){t.getCurrentLocation().then(function(n){for(var t=[],e=0;e<n.connections.length;e++){var o=n.connections[e];o.name!==n.name&&(o.id=o.loc1===n.id?o.loc2:o.loc1,delete o.loc1,delete o.loc2,t.push(o))}n.connections=t,a.currentLocation=n})},a.getCurrentDestination=function(){e.getCurrentTrip().then(function(n){n.trip[0]&&(a.destinationName=n.trip[0].name,a.destinationId=n.trip[0].id)})},a.setDestination=function(n){a.working=!0,e.setNextDestination(n).then(function(n){n.ok&&(a.destinationName=n.name,a.destinationId=n.id,a.working=!1)})},a.goDestination=function(){a.working=!0,e.beginTrip().then(function(n){"ok"===n&&(a.working=!1,a.getCurrentConnections(),a.destinationName=void 0,a.destinationId=void 0)})},a.clearDestination=function(){a.working=!0,e.clearTrip().then(function(n){"ok"===n&&(a.destinationName=void 0,a.destinationId=void 0,a.working=!1)})},a.getCurrentConnections(),a.getCurrentDestination()};angular.module("apox").controller("GamePageController",["DriverService","LocationService","TripService",n])}(),function(){var n=function(n){var t=this;t.location={},t.mapData={},t.dataLoaded=!1,t.loadMapData=function(){n.getMap().then(function(n){t.mapData.locations=n.data.locations,t.mapData.connections=n.data.connections,t.dataLoaded=!0})},t.loadMapData()};angular.module("apox").controller("GameMapController",["MapService",n])}(),function(){var n=function(n){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(t,e){function a(){if(t.$parent.game.currentLocation&&t.map.mapData.locations){var n=t.map.mapData.locations[t.$parent.game.currentLocation.id];paper.view.center=new paper.Point(n.point.x,n.point.y)}}paper.setup(e.context.firstChild);var o=new paper.Layer;o.texasMap=new paper.Raster("/img/texasmap2.jpg"),o.opacity=.5;var i=new paper.Layer,r=new paper.Layer;t.$watch("map.dataLoaded",function(){if(t.map.dataLoaded){var o=t.map.mapData;n.render({isAdmin:!1,data:o,scope:t,factionLayer:i,mapLayer:r}),a()}n.setupMouseWheel(e,{zoom:!0,pan:!1})}),t.$watch("$parent.game.currentLocation",function(){a()})}}};angular.module("apox").directive("apoxMap",["MapRenderer",n])}(),function(){var n="/driver",t=function(t,e){return{getDriver:function(){return e(function(e,a){t.get(n).then(function(n){e(n.data)},function(n){a(n)})})}}};angular.module("apox").factory("DriverService",["$http","$q",t])}(),function(){var n="/location",t=function(t,e){return{getCurrentLocation:function(){return e(function(e,a){t.get(n).then(function(n){e(n.data)},function(n){a(n)})})}}};angular.module("apox").factory("LocationService",["$http","$q",t])}(),function(){var n=function(){function n(n){return new paper.Point(n.longitude*d+f,n.latitude*s+g)}function t(n){return{longitude:(n.x-f)/d,latitude:(n.y-g)/s}}function e(n){var t=n.target.parent;n.target.remove(),t.addChild(n.target),n.target.children.dot.fillColor.alpha=.5;for(var e=0;e<n.target.location.paths.length;e++)n.target.location.paths[e].strokeColor=new paper.Color(0,0,0,.5);n.target.scope.$apply(function(){n.target.scope.admin.showDetailPanel=!0,n.target.scope.admin.location=n.target.location})}function a(n){n.target.children.dot.fillColor.alpha=1;for(var t=0;t<n.target.location.paths.length;t++)n.target.location.paths[t].strokeColor="black"}function o(n){var e=n.target;e.position=e.position.add([n.delta.x,n.delta.y]);for(var a=0;a<e.location.paths.length;a++)e.location.ends[a].x=e.children.dot.position.x,e.location.ends[a].y=e.children.dot.position.y;var o=t(e.position);e.location.longitude=o.longitude,e.location.latitude=o.latitude,e.scope.$apply(function(){e.scope.admin.location.longitude=o.longitude,e.scope.admin.location.latitude=o.latitude}),n.stopPropagation()}function i(n){n.target.children.locname.visible=!0}function r(n){n.target.children.locname.visible=!1}function c(n,t,e,a){var o=1.05,i=n;t>0&&(i*=o),t<0&&(i/=o);var r=n/i,c=a.subtract(e),p=a.subtract(c.multiply(r)).subtract(e);return{newZoom:i,a:p}}function p(n,t,e,a){var o=new paper.Point(t,e).multiply(a);return n.subtract(o)}function l(n,t){var e=1,a=.2;t.zoom&&n.bind("mousewheel",function(n){if(n.altKey){var t=new paper.Point(n.offsetX,n.offsetY),o=c(paper.view.zoom,n.originalEvent.wheelDeltaY,paper.view.center,t);o.newZoom<e&&o.newZoom>a&&(paper.view.zoom=o.newZoom),n.preventDefault()}}),t.pan&&n.bind("mousewheel",function(n){paper.view.center=p(paper.view.center,n.originalEvent.wheelDeltaX,n.originalEvent.wheelDeltaY,1),n.preventDefault()})}function u(t){var c=t.isAdmin,p=t.data,l=t.scope,u=t.mapLayer,d=t.factionLayer;p.locations&&p.connections&&!function(){Object.keys(p.locations).forEach(function(t){p.locations[t].point=n(p.locations[t]),p.locations[t].paths=[],p.locations[t].ends=[]});for(var t=0;t<p.connections.length;t++){var s=p.connections[t],f=p.locations[s.loc1],g=p.locations[s.loc2];if(f&&g){var w=new paper.Path.Line(f.point,g.point);w.strokeColor=c?"black":"dimgrey",w.strokeWidth=v,f.ends.push(w.segments[0].point),g.ends.push(w.segments[1].point),f.paths.push(w),g.paths.push(w)}}var C=[0,-20],D=Object.keys(p.locations).sort(function(n,t){return p.locations[n].latitude>p.locations[t].latitude});D.forEach(function(n){var t=p.locations[n],s=new paper.Path.Circle({center:t.point,radius:m*Math.ceil(Math.log10(t.population))*40,name:"faction"});s.fillColor={gradient:{stops:[[h[t.factionid],.6],[new paper.Color(255,255,255,0),1]],radial:!0},origin:s.position,destination:s.bounds.rightCenter},d.addChild(s);var f=new paper.Path.Circle({center:t.point,radius:m*Math.ceil(Math.log10(t.population)),fillColor:c?"black":"dimgrey",name:"dot"}),g=new paper.PointText({point:t.point.add(C),justification:"center",fillColor:"black",strokeColor:c?"white":"none",content:t.name,name:"locname",visible:!c,fontSize:30}),v=new paper.Group([f,g]);v.location=t,v.scope=l,c&&(v.onMouseEnter=i,v.onMouseLeave=r,v.onMouseDrag=o,v.onMouseDown=e,v.onMouseUp=a),u.addChild(v)}),d.visible=c}()}var d=435.3,s=-506.5,f=43647,g=15855,m=3,v=3,h=[new paper.Color(0,0,0,.95),new paper.Color(0,0,255,.2),new paper.Color(255,0,0,.2),new paper.Color(0,255,0,.2),new paper.Color(75,0,130,.2),new paper.Color(255,255,0,.2)];return{setupMouseWheel:l,render:u}};angular.module("apox").factory("MapRenderer",n)}(),function(){var n=function(n){return{getMap:function(){return n.get("/map")},updateLocation:function(t,e){return n.patch("/admin/map/location/"+t,e)}}};angular.module("apox").factory("MapService",["$http",n])}(),function(){var n="/trip",t=function(t,e){return{getCurrentTrip:function(){return e(function(e,a){t.get(n).then(function(n){e(n.data)},function(n){a(n)})})},setNextDestination:function(a){return e(function(e,o){t.put(n,{destination:a}).then(function(n){e(n.data)},function(n){o(n)})})},clearTrip:function(){return e(function(e,a){t.delete(n).then(function(n){e(n.data)},function(n){a(n)})})},beginTrip:function(){return e(function(e,a){t.post(n).then(function(n){e(n.data)},function(n){a(n)})})}}};angular.module("apox").factory("TripService",["$http","$q",t])}();