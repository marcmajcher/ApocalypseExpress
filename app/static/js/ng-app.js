"use strict";!function(){angular.module("apox",[])}(),function(){var t=function(t){var n=this;n.location={},n.mapData={},n.showDetailPanel=!0,n.dataLoaded=!1,n.closeDetailPanel=function(){n.showDetailPanel=!1},n.loadMapData=function(){t.getMap().then(function(t){n.mapData.locations=t.data.locations,n.mapData.connections=t.data.connections,n.dataLoaded=!0})},n.updateLocationDetails=function(){var o=n.location;o.id>0&&t.updateLocation(o.id,{name:o.name,longitude:o.longitude,latitude:o.latitude,description:o.description,population:o.population,tech:o.tech,type:o.type,factionid:o.factionid}).catch(function(){window.alert("PATCH ERROR")})},n.loadMapData()};angular.module("apox").controller("AdminMapController",["MapService",t])}(),function(){var t=function(t){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(n,o){paper.setup(o.context.firstChild);var e=new paper.Layer;e.texasMap=new paper.Raster("/img/texasmap.jpg");var a=new paper.Layer,i=new paper.Layer;n.$watch("admin.dataLoaded",function(){if(n.admin.dataLoaded){var o=n.admin.mapData;t.render({isAdmin:!0,data:o,scope:n,factionLayer:a,mapLayer:i})}}),paper.view.center=new paper.Point(1100,500),o.bind("mousewheel",t.onMouseWheel)}}};angular.module("apox").directive("apoxAdminMap",["MapRenderer",t])}(),function(){var t=function(t,n,o){var e=this;e.working=!1,e.traveling=!1,e.factionTags=["","republic","confederation","alliance","petrex","light"],t.getDriver().then(function(t){e.driver=t}),e.getCurrentConnections=function(){n.getCurrentLocation().then(function(t){for(var n=[],o=0;o<t.connections.length;o++){var a=t.connections[o];a.name!==t.name&&(a.id=a.loc1===t.id?a.loc2:a.loc1,delete a.loc1,delete a.loc2,n.push(a))}t.connections=n,e.currentLocation=t})},e.getCurrentDestination=function(){o.getCurrentTrip().then(function(t){t.trip[0]&&(e.destinationName=t.trip[0].name,e.destinationId=t.trip[0].id)})},e.setDestination=function(t){e.working=!0,o.setNextDestination(t).then(function(t){t.ok&&(e.destinationName=t.name,e.destinationId=t.id,e.working=!1)})},e.goDestination=function(){e.working=!0,o.beginTrip().then(function(t){"ok"===t&&(e.working=!1,e.getCurrentConnections(),e.destinationName=void 0,e.destinationId=void 0)})},e.clearDestination=function(){e.working=!0,o.clearTrip().then(function(t){"ok"===t&&(e.destinationName=void 0,e.destinationId=void 0,e.working=!1)})},e.getCurrentConnections(),e.getCurrentDestination()};angular.module("apox").controller("GamePageController",["DriverService","LocationService","TripService",t])}(),function(){var t=function(t){var n=this;n.location={},n.mapData={},n.dataLoaded=!1,n.loadMapData=function(){t.getMap().then(function(t){n.mapData.locations=t.data.locations,n.mapData.connections=t.data.connections,n.dataLoaded=!0})},n.loadMapData()};angular.module("apox").controller("GameMapController",["MapService",t])}(),function(){var t=function(t){return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(n,o){function e(){if(n.$parent.game.currentLocation){var t=n.map.mapData.locations[n.$parent.game.currentLocation.id];paper.view.center=new paper.Point(t.point.x,t.point.y)}}paper.setup(o.context.firstChild);var a=new paper.Layer;a.texasMap=new paper.Raster("/img/texasmap2.jpg"),a.opacity=.5;var i=new paper.Layer,r=new paper.Layer;o.bind("mousewheel",t.onMouseWheel),n.$watch("map.dataLoaded",function(){if(n.map.dataLoaded){var o=n.map.mapData;t.render({isAdmin:!1,data:o,scope:n,factionLayer:i,mapLayer:r}),e()}}),n.$watch("$parent.game.currentLocation",function(){e()})}}};angular.module("apox").directive("apoxMap",["MapRenderer",t])}(),function(){var t="/driver",n=function(n,o){return{getDriver:function(){return o(function(o,e){n.get(t).then(function(t){o(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("DriverService",["$http","$q",n])}(),function(){var t="/location",n=function(n,o){return{getCurrentLocation:function(){return o(function(o,e){n.get(t).then(function(t){o(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("LocationService",["$http","$q",n])}(),function(){var t=function(){function t(t){return new paper.Point(t.longitude*s+f,t.latitude*d+g)}function n(t){return{longitude:(t.x-f)/s,latitude:(t.y-g)/d}}function o(t){var n=t.target.parent;t.target.remove(),n.addChild(t.target),t.target.children.dot.fillColor.alpha=.5;for(var o=0;o<t.target.location.paths.length;o++)t.target.location.paths[o].strokeColor=new paper.Color(0,0,0,.5);t.target.scope.$apply(function(){t.target.scope.admin.showDetailPanel=!0,t.target.scope.admin.location=t.target.location})}function e(t){t.target.children.dot.fillColor.alpha=1;for(var n=0;n<t.target.location.paths.length;n++)t.target.location.paths[n].strokeColor="black"}function a(t){var o=t.target;o.position=o.position.add([t.delta.x,t.delta.y]);for(var e=0;e<o.location.paths.length;e++)o.location.ends[e].x=o.children.dot.position.x,o.location.ends[e].y=o.children.dot.position.y;var a=n(o.position);o.location.longitude=a.longitude,o.location.latitude=a.latitude,o.scope.$apply(function(){o.scope.admin.location.longitude=a.longitude,o.scope.admin.location.latitude=a.latitude}),t.stopPropagation()}function i(t){t.target.children.locname.visible=!0}function r(t){t.target.children.locname.visible=!1}function c(t,n,o,e){var a=1.05,i=t;n>0&&(i*=a),n<0&&(i/=a);var r=t/i,c=e.subtract(o),l=e.subtract(c.multiply(r)).subtract(o);return{newZoom:i,a:l}}function l(t,n,o,e){var a=new paper.Point(n,o).multiply(e);return t.subtract(a)}function p(t){var n=t.originalEvent.wheelDeltaX,o=t.originalEvent.wheelDeltaY;if(t.altKey){var e=new paper.Point(t.offsetX,t.offsetY),a=c(paper.view.zoom,o,paper.view.center,e);paper.view.zoom=a.newZoom,t.preventDefault()}else paper.view.center=l(paper.view.center,n,o,1),t.preventDefault()}function u(n){var c=n.isAdmin,l=n.data,p=n.scope,u=n.mapLayer,s=n.factionLayer;l.locations&&l.connections&&!function(){Object.keys(l.locations).forEach(function(n){l.locations[n].point=t(l.locations[n]),l.locations[n].paths=[],l.locations[n].ends=[]});for(var n=0;n<l.connections.length;n++){var d=l.connections[n],f=l.locations[d.loc1],g=l.locations[d.loc2],w=new paper.Path.Line(f.point,g.point);w.strokeColor=c?"black":"dimgrey",w.strokeWidth=v,f.ends.push(w.segments[0].point),g.ends.push(w.segments[1].point),f.paths.push(w),g.paths.push(w)}var C=[0,-20],y=Object.keys(l.locations).sort(function(t,n){return l.locations[t].latitude>l.locations[n].latitude});y.forEach(function(t){var n=l.locations[t],d=new paper.Path.Circle({center:n.point,radius:h*Math.ceil(Math.log10(n.population))*40,name:"faction"});d.fillColor={gradient:{stops:[[m[n.factionid],.6],[new paper.Color(255,255,255,0),1]],radial:!0},origin:d.position,destination:d.bounds.rightCenter},s.addChild(d);var f=new paper.Path.Circle({center:n.point,radius:h*Math.ceil(Math.log10(n.population)),fillColor:c?"black":"dimgrey",name:"dot"}),g=new paper.PointText({point:n.point.add(C),justification:"center",fillColor:"black",strokeColor:c?"white":"none",content:n.name,name:"locname",visible:!c,fontSize:30}),v=new paper.Group([f,g]);v.location=n,v.scope=p,c&&(v.onMouseEnter=i,v.onMouseLeave=r,v.onMouseDrag=a,v.onMouseDown=o,v.onMouseUp=e),u.addChild(v)}),s.visible=c}()}var s=435.3,d=-506.5,f=43647,g=15855,h=3,v=3,m=[new paper.Color(0,0,0,.95),new paper.Color(0,0,255,.2),new paper.Color(255,0,0,.2),new paper.Color(0,255,0,.2),new paper.Color(75,0,130,.2),new paper.Color(255,255,0,.2)];return{onMouseWheel:p,render:u}};angular.module("apox").factory("RenderMap",t)}(),function(){var t=function(){function t(t){return new paper.Point(t.longitude*s+f,t.latitude*d+g)}function n(t){return{longitude:(t.x-f)/s,latitude:(t.y-g)/d}}function o(t){var n=t.target.parent;t.target.remove(),n.addChild(t.target),t.target.children.dot.fillColor.alpha=.5;for(var o=0;o<t.target.location.paths.length;o++)t.target.location.paths[o].strokeColor=new paper.Color(0,0,0,.5);t.target.scope.$apply(function(){t.target.scope.admin.showDetailPanel=!0,t.target.scope.admin.location=t.target.location})}function e(t){t.target.children.dot.fillColor.alpha=1;for(var n=0;n<t.target.location.paths.length;n++)t.target.location.paths[n].strokeColor="black"}function a(t){var o=t.target;o.position=o.position.add([t.delta.x,t.delta.y]);for(var e=0;e<o.location.paths.length;e++)o.location.ends[e].x=o.children.dot.position.x,o.location.ends[e].y=o.children.dot.position.y;var a=n(o.position);o.location.longitude=a.longitude,o.location.latitude=a.latitude,o.scope.$apply(function(){o.scope.admin.location.longitude=a.longitude,o.scope.admin.location.latitude=a.latitude}),t.stopPropagation()}function i(t){t.target.children.locname.visible=!0}function r(t){t.target.children.locname.visible=!1}function c(t,n,o,e){var a=1.05,i=t;n>0&&(i*=a),n<0&&(i/=a);var r=t/i,c=e.subtract(o),l=e.subtract(c.multiply(r)).subtract(o);return{newZoom:i,a:l}}function l(t,n,o,e){var a=new paper.Point(n,o).multiply(e);return t.subtract(a)}function p(t){var n=t.originalEvent.wheelDeltaX,o=t.originalEvent.wheelDeltaY;if(t.altKey){var e=new paper.Point(t.offsetX,t.offsetY),a=c(paper.view.zoom,o,paper.view.center,e);paper.view.zoom=a.newZoom,t.preventDefault()}else paper.view.center=l(paper.view.center,n,o,1),t.preventDefault()}function u(n){var c=n.isAdmin,l=n.data,p=n.scope,u=n.mapLayer,s=n.factionLayer;l.locations&&l.connections&&!function(){Object.keys(l.locations).forEach(function(n){l.locations[n].point=t(l.locations[n]),l.locations[n].paths=[],l.locations[n].ends=[]});for(var n=0;n<l.connections.length;n++){var d=l.connections[n],f=l.locations[d.loc1],g=l.locations[d.loc2],w=new paper.Path.Line(f.point,g.point);w.strokeColor=c?"black":"dimgrey",w.strokeWidth=v,f.ends.push(w.segments[0].point),g.ends.push(w.segments[1].point),f.paths.push(w),g.paths.push(w)}var C=[0,-20],y=Object.keys(l.locations).sort(function(t,n){return l.locations[t].latitude>l.locations[n].latitude});y.forEach(function(t){var n=l.locations[t],d=new paper.Path.Circle({center:n.point,radius:h*Math.ceil(Math.log10(n.population))*40,name:"faction"});d.fillColor={gradient:{stops:[[m[n.factionid],.6],[new paper.Color(255,255,255,0),1]],radial:!0},origin:d.position,destination:d.bounds.rightCenter},s.addChild(d);var f=new paper.Path.Circle({center:n.point,radius:h*Math.ceil(Math.log10(n.population)),fillColor:c?"black":"dimgrey",name:"dot"}),g=new paper.PointText({point:n.point.add(C),justification:"center",fillColor:"black",strokeColor:c?"white":"none",content:n.name,name:"locname",visible:!c,fontSize:30}),v=new paper.Group([f,g]);v.location=n,v.scope=p,c&&(v.onMouseEnter=i,v.onMouseLeave=r,v.onMouseDrag=a,v.onMouseDown=o,v.onMouseUp=e),u.addChild(v)}),s.visible=c}()}var s=435.3,d=-506.5,f=43647,g=15855,h=3,v=3,m=[new paper.Color(0,0,0,.95),new paper.Color(0,0,255,.2),new paper.Color(255,0,0,.2),new paper.Color(0,255,0,.2),new paper.Color(75,0,130,.2),new paper.Color(255,255,0,.2)];return{onMouseWheel:p,render:u}};angular.module("apox").factory("MapRenderer",t)}(),function(){var t=function(t){return{getMap:function(){return t.get("/map")},updateLocation:function(n,o){return t.patch("/admin/map/location/"+n,o)}}};angular.module("apox").factory("MapService",["$http",t])}(),function(){var t="/trip",n=function(n,o){return{getCurrentTrip:function(){return o(function(o,e){n.get(t).then(function(t){o(t.data)},function(t){e(t)})})},setNextDestination:function(e){return o(function(o,a){n.put(t,{destination:e}).then(function(t){o(t.data)},function(t){a(t)})})},clearTrip:function(){return o(function(o,e){n.delete(t).then(function(t){o(t.data)},function(t){e(t)})})},beginTrip:function(){return o(function(o,e){n.post(t).then(function(t){o(t.data)},function(t){e(t)})})}}};angular.module("apox").factory("TripService",["$http","$q",n])}();