'use strict';

const app = angular.module('apox', []);

app.directive('apoxMatch', () => {
  return {
    require: 'ngModel',
    restrict: 'A',
    scope: {
      apoxMatch: '='
    },
    link: function(scope, elem, attr, ctrl) {
      const validate = function() {
        // values
        const val1 = ctrl.$viewValue;
        const val2 = attr.apoxMatch;

        console.log('validate: ', val1, val2);
        // set validity
        ctrl.$setValidity('match', !val1 || !val2 || val1 === val2);
      };

      scope.$watch('apoxMatch', function() {
        console.log("ASFDASDFASDFASDF");
        validate();
      }, true);

      setInterval(() => {
        console.log(scope.apoxMatch);
      }, 1000);

      // console.log('mmmmmmmmmmmmm', scope.apoxMatch);
      // attr.$observe('apoxMatch', function(val) {
      //   console.log(attr.apoxMatch);
      //   console.log('OBSERVER');
      //   validate();
      // });
      // console.log(att.apoxMatch);
      // console.log(scope.$modelValue);
      // console.log('-----');
      console.log(scope);
      console.log(elem);
      console.log(attr);
      console.log(ctrl);
    }
  };
});

// app.directive('apoxPassword', () => {
//   return {
//     require: 'ngModel',
//     restrict: 'A',
//     link: function(scope, elem, att, ctrl) {
//       // console.log(scope);
//       // console.log(elem);
//       // console.log(att);
//       // console.log(ctrl);
//       ctrl.$setValidity('special', false);
//     }
//   };
// });


// app.directive('ensureUnique', ['$http', function($http) {
//   return {
//     require: 'ngModel',
//     link: function(scope, ele, attrs, c) {
//       scope.$watch(attrs.ngModel, function() {
//         $http({
//           method: 'POST',
//           url: '/api/check/' + attrs.ensureUnique,
//           data: {
//             'field': attrs.ensureUnique
//           }
//         }).success(function(data, status, headers, cfg) {
//           c.$setValidity('unique', data.isUnique);
//         }).error(function(data, status, headers, cfg) {
//           c.$setValidity('unique', false);
//         });
//       });
//     }
//   }
// }]);
