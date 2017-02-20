(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const UserAccountController =
    function userAccountController($scope, UserService) {
      const ctrl = this;
      ctrl.pass = {};

      ctrl.$onInit = () => {
        UserService.getUser()
          .then((user) => {
            ctrl.user = user;
          });
      };

      ctrl.updateInfo = () => {
        UserService.updateInfo(ctrl.user);
      };

      ctrl.changePassword = () => {
        UserService.changePassword(ctrl.pass);
      };
    };

  angular.module('apox').component('userAccount', {
    templateUrl: '../template/user.account.template.html',
    controller: ['$scope', 'UserService', UserAccountController]
  });
})();
