(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox').component('vehicleInfo', {
    bindings: {
      vehicle: '<'
    },
    template: `
    <div>Vehicle: {{$ctrl.vehicle.name}}</div>
    <ul>
      <li>Model: {{$ctrl.vehicle.model}}</li>
      <li>Size: {{$ctrl.vehicle.size}}</li>
      <li>Type: {{$ctrl.vehicle.type}}</li>
      <li>Cargo Capacity: {{$ctrl.vehicle.cargocap}}</li>
      <li>Passenger Capacity: {{$ctrl.vehicle.passengercap}}</li>
      <li>Armor: {{$ctrl.vehicle.armor}}</li>
      <li>Engine: {{$ctrl.vehicle.engine}}</li>
      <li>Tires: {{$ctrl.vehicle.tires}}</li>
      <li>Top Speed (km/h): {{$ctrl.vehicle.topspeed}}</li>
      <li>Fuel Capacity: {{$ctrl.vehicle.fuelcap}}</li>
      <li>Km/l: {{$ctrl.vehicle.kmpl}}</li>
    </ul>
    `
  });
})();
