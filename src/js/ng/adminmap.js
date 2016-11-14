(() => {
  'use strict';

  /* eslint-env jquery, browser */

  angular.module('apox')
    .controller('AdminMapController', ['$http', function map($http) {
      const vm = this;

      vm.closeDetails = function close() {
        $('#detailPanel').removeClass('out');
      };

      vm.updateDetails = function update() {
        if ($('#detailPanel #locid').val() > 0) {
          // TODO: add waiting spinner
          $http.patch(`/admin/map/location/${$('#detailPanel #locid').val()}`, {
            name: $('#detailPanel #name').val(),
            longitude: $('#detailPanel #longitude').val(),
            latitude: $('#detailPanel #latitude').val(),
            description: $('#detailPanel #description').val(),
            population: $('#detailPanel #population').val(),
            tech: $('#detailPanel #tech').val(),
            type: $('#detailPanel #type').val()
          })
          .then((/* res */) => {
            // console.log('cool.');
          });
        }
      };
    }]);
})();
