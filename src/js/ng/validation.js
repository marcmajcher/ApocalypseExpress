'use strict';

angular.module('apox').directive('apoxMatch', () => ({
  require: 'ngModel',
  scope: {
    otherModelValue: '=apoxMatch'
  },
  link: (scope, element, attributes, ngModel) => {
    ngModel.$validators.match = modelValue => modelValue === scope.otherModelValue;

    scope.$watch('otherModelValue', () => {
      ngModel.$validate();
    });
  }
}));
