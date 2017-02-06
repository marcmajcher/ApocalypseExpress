(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('tripProgress', {
    bindings: {
      trip: '<'
    },
    template: `
    <div class="progress trip-progress-bar">
      <div class="progress-bar" role="progressbar" style="width: {{100*($ctrl.trip.progress/$ctrl.trip.distance)}}%"></div>
    </div>
    <div class="trip-progress">
      <span class="pull-left">{{$ctrl.trip.origin.name}}</span>
      <span class="pull-right">{{$ctrl.trip.destination.name}}</span>
    </div>
    `
  });
})();
