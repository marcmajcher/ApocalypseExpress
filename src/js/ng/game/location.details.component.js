(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('locationDetails', {
    bindings: {
      location: '<',
      tags: '<'
    },
    template: `
    <div class="location-header">
      Location:
      <span class="location-name" id="location-name">{{$ctrl.location.name}}</span>
      <div class="faction-slug {{$ctrl.tags[$ctrl.location.factionid]}}"></div>
    </div>
    <div class="location-info">
      Population: {{$ctrl.location.population}}<br/> Tech Level: {{$ctrl.location.tech}}
    </div>
    <div class="location-description">{{$ctrl.location.description}}</div>
    `
  });
})();
