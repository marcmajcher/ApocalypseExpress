(() => {
  'use strict';

  /* eslint-env jquery, browser */

  const UserAccountController =
    function userAccountController($scope, UserService, ModalService) {
      const ctrl = this;
      ctrl.pass = {};

      ctrl.$onInit = () => {
        UserService.getUser()
          .then((user) => {
            ctrl.user = user;
          })
          .catch((error) => {
            console.error(`UserInit ERROR`, error); // eslint-disable-line
          });
      };

      ctrl.updateInfo = () => {
        ModalService.loadModal();
        UserService.updateInfo({
            firstname: ctrl.user.firstname,
            lastname: ctrl.user.lastname
          })
          .then((res) => {
            if (res.ok) {
              ModalService.readyModal('User Info Updated.', true);
            }
            else {
              throw new Error();
            }
          })
          .catch((error) => {
            console.error('updateInfo ERROR', error); // eslint-disable-line
          });
      };

      ctrl.changePassword = () => {
        ModalService.loadModal();
        UserService.changePassword(ctrl.pass)
          .then((res) => {
            if (res.ok) {
              ModalService.readyModal('Password Updated');
            }
            else {
              ModalService.readyModal(`Error: ${res.error.name}`);
            }
          })
          .catch((error) => {
            console.error('updateInfo ERROR', error); // eslint-disable-line
          });
      };
    };

  angular.module('apox').component('userAccount', {
    templateUrl: '../template/user.account.template.html',
    controller: ['$scope', 'UserService', 'ModalService', UserAccountController]
  });
})();
