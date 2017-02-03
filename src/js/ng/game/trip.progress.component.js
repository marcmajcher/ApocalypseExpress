(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('tripProgress', {
    bindings: {
      trip: '<'
    },
    template: `
    <div class="progress">
      <div class="progress-bar" role="progressbar" style="width: {{100*($ctrl.trip.progress/$ctrl.trip.distance)}}%"></div>
    </div>
    <div>
      <span class="pull-left">{{$ctrl.trip.origin}}</span>
      <span class="pull-right">{{$ctrl.trip.destination}}</span>
    </div>
    `
  });
})();
