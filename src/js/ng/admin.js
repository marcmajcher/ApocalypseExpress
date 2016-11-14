(() => {
  'use strict';

  const app = angular.module('apox');

  app.controller('HelloController', function hello() {
    const vm = this;
    vm.greeting = 'Welcome to the Apocalypse, ';
  });
})();
