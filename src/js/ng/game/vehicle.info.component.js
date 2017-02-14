(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('vehicleInfo', {
    bindings: {
      vehicle: '<'
    },
    template: `
    <div class="vehicle-name">Vehicle: {{$ctrl.vehicle.name}}</div>
    <ul>
      <li><b>Model:</b> {{$ctrl.vehicle.model}}</li>
      <li><b>Size:</b> {{$ctrl.vehicle.size}}</li>
      <li><b>Type:</b> {{$ctrl.vehicle.type}}</li>
      <li><b>Cargo Capacity:</b> {{$ctrl.vehicle.cargocap}}</li>
      <li><b>Passenger Capacity:</b> {{$ctrl.vehicle.passengercap}}</li>
      <li><b>Armor:</b> {{$ctrl.vehicle.armor}}</li>
      <li><b>Engine:</b> {{$ctrl.vehicle.engine}}</li>
      <li><b>Tires:</b> {{$ctrl.vehicle.tires}}</li>
      <li><b>Top Speed (km/h):</b> {{$ctrl.vehicle.topspeed}}</li>
      <li><b>Fuel Capacity:</b> {{$ctrl.vehicle.fuelcap}}</li>
      <li><b>Km/l:</b> {{$ctrl.vehicle.kmpl}}</li>
    </ul>
    `
  });
})();
