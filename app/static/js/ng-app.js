"use strict";!function(){angular.module("apox",[])}(),function(){var t=function(t){var n=this;n.location={},n.mapData={},n.showDetailPanel=!0,n.dataLoaded=!1,n.closeDetailPanel=function(){n.showDetailPanel=!1},n.loadMapData=function(){t.getMap().then(function(t){n.mapData.locations=t.data.locations,n.mapData.connections=t.data.connections,n.dataLoaded=!0})},n.updateLocationDetails=function(){var o=n.location;o.id>0&&t.updateLocation(o.id,{name:o.name,longitude:o.longitude,latitude:o.latitude,description:o.description,population:o.population,tech:o.tech,type:o.type})},n.loadMapData()};angular.module("apox").controller("AdminMapController",["MapService",t])}(),function(){angular.module("apox").directive("apoxAdminMap",function(){function t(t){return new paper.Point(t.longitude*s+f,t.latitude*d+v)}function n(t){return{longitude:(t.x-f)/s,latitude:(t.y-v)/d}}function o(t){var n=t.target.parent;t.target.remove(),n.addChild(t.target),t.target.children.dot.fillColor.alpha=.5;for(var o=0;o<t.target.location.paths.length;o++)t.target.location.paths[o].strokeColor=g;t.target.scope.$apply(function(){t.target.scope.admin.showDetailPanel=!0,t.target.scope.admin.location=t.target.location})}function a(t){t.target.children.dot.fillColor.alpha=1;for(var n=0;n<t.target.location.paths.length;n++)t.target.location.paths[n].strokeColor="black"}function e(t){var o=t.target;o.position=o.position.add([t.delta.x,t.delta.y]);for(var a=0;a<o.location.paths.length;a++)o.location.ends[a].x=o.children.dot.position.x,o.location.ends[a].y=o.children.dot.position.y;var e=n(o.position);o.location.longitude=e.longitude,o.location.latitude=e.latitude,o.scope.$apply(function(){o.scope.admin.location.longitude=e.longitude,o.scope.admin.location.latitude=e.latitude}),t.stopPropagation()}function i(t){t.target.children.locname.visible=!0}function r(t){t.target.children.locname.visible=!1}function c(t,n,o,a){var e=1.05,i=t;n>0&&(i*=e),n<0&&(i/=e);var r=t/i,c=a.subtract(o),l=a.subtract(c.multiply(r)).subtract(o);return{newZoom:i,a:l}}function l(t,n,o,a){var e=new paper.Point(n,o).multiply(a);return t.subtract(e)}var p=3,u=3,s=435.3,d=-506.5,f=43647,v=15855,g=new paper.Color(0,0,0,.5);return{restrict:"E",template:'<canvas class="map-canvas" resize="true"></canvas>',link:function(n,s){paper.setup(s.context.firstChild);var d=new paper.Layer;d.texasMap=new paper.Raster("/img/texasmap.jpg"),n.$watch("admin.dataLoaded",function(){var c=n.admin.mapData;c.locations&&c.connections&&!function(){Object.keys(c.locations).forEach(function(n){c.locations[n].point=t(c.locations[n]),c.locations[n].paths=[],c.locations[n].ends=[]});for(var l=0;l<c.connections.length;l++){var s=c.connections[l],d=c.locations[s.loc1],f=c.locations[s.loc2],v=new paper.Path.Line(d.point,f.point);v.strokeColor="black",v.strokeWidth=u,d.ends.push(v.segments[0].point),f.ends.push(v.segments[1].point),d.paths.push(v),f.paths.push(v)}var g=[0,-20],h=Object.keys(c.locations);h.forEach(function(t){var l=c.locations[t],u=new paper.Path.Circle({center:l.point,radius:p*Math.ceil(Math.log10(l.population)),fillColor:"black",name:"dot"}),s=new paper.PointText(l.point.add(g));s.justification="center",s.fillColor="#3333ff",s.strokeColor="#9999cc",s.content=l.name,s.name="locname",s.visible=!1,s.fontSize=24;var d=new paper.Group([u,s]);d.location=l,d.scope=n,d.onMouseEnter=i,d.onMouseLeave=r,d.onMouseDrag=e,d.onMouseDown=o,d.onMouseUp=a})}()}),d.onMouseDrag=function(t){d.position=d.position.add([t.delta.x,t.delta.y])},paper.view.center=new paper.Point(1100,500),s.bind("mousewheel",function(t){var n=t.originalEvent.wheelDeltaX,o=t.originalEvent.wheelDeltaY;if(t.altKey){var a=new paper.Point(t.offsetX,t.offsetY),e=c(paper.view.zoom,o,paper.view.center,a);paper.view.zoom=e.newZoom,t.preventDefault()}else paper.view.center=l(paper.view.center,n,o,1),t.preventDefault()})}}})}(),function(){var t=function(t,n){var o=this;t.getDriver().then(function(t){o.driver=t}),n.getCurrentLocation().then(function(t){o.currentLocation=t})};angular.module("apox").controller("GamePageController",["DriverService","LocationService",t])}(),function(){var t="/driver",n=function(n,o){return{getDriver:function(){return o(function(o,a){n.get(t).then(function(t){o(t.data)},function(t){a(t)})})}}};angular.module("apox").factory("DriverService",["$http","$q",n])}(),function(){var t="/location",n=function(n,o){return{getCurrentLocation:function(){return o(function(o,a){n.get(t).then(function(t){o(t.data)},function(t){a(t)})})}}};angular.module("apox").factory("LocationService",["$http","$q",n])}(),function(){var t=function(t){return{getMap:function(){return t.get("/map")},updateLocation:function(n,o){return t.patch("/admin/map/location/"+n,o)}}};angular.module("apox").factory("MapService",["$http",t])}();