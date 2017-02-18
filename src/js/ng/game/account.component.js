(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const UserAccountController =
    function userAccountController($scope, UserService) {
      const ctrl = this;

      UserService.getUser()
        .then((user) => {
          ctrl.user = user;
        });
    };

  angular.module('apox').component('userAccount', {
    bindings: {},
    templateUrl: '../template/user.account.template.html',
    controller: ['$scope', 'UserService', UserAccountController]
  });
})();
