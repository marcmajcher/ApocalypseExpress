(() => {
  'use strict';

  angular.module('apox', []);
  //
  //   angular.module('apox').directive('draw', function () {
  //     return {
  //         restrict: 'A',
  //         link: function (scope, element, attrs) {
  //             var path;
  //             paper.setup(element.get(0));
  //             var tool = new paper.Tool();
  //             tool.onMouseDown = function (event) {
  //                 path = new paper.Path();
  //                 path.strokeColor = 'black';
  //             };
  //             tool.onMouseDrag = function (event) {
  //                 path.add(event.point);
  //             };
  //             tool.onMouseUp = function (event) {
  //                 //nothing special here
  //             };
  //         }
  //     };
  // });
})();
