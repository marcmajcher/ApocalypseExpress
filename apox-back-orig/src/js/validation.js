(() => {
  'use strict';

  angular.module('apox')
    .directive('apoxMatch', () => ({
      require: 'ngModel',
      scope: {
        otherModelValue: '=apoxMatch'
      },
      link: (scope, elem, attr, ngModel) => {
        ngModel.$validators.match = modelValue =>
          modelValue === scope.otherModelValue;

        scope.$watch('otherModelValue', () => {
          ngModel.$validate();
        });
      }
    }))
    .directive('apoxPassword', () => ({
      require: 'ngModel',
      link: (scope, elem, attr, ngModel) => {
        ngModel.$validators.pw = modelValue =>
          modelValue && !!modelValue.match(/\d/) &&
          !!modelValue.match(/[\^`~!@#$%&*()_+=[{}|'";:/?.,><\-\\\]]/);
      }
    }));
})();
