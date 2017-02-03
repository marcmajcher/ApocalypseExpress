(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('tripProgress', {
    bindings: {
      trip: '<'
    },
    template: `
    <div class="trip-progress">
    {{$ctrl.trip.origin}} --> {{$ctrl.trip.destination}} <br/>
      {{$ctrl.trip.progress}} / {{$ctrl.trip.distance}}
    </div>
    `
  });
})();
