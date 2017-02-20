'use strict';

/* eslint-env jquery, browser */

(() => {
  const txtLoading = 'Loading';
  const elModal = $('#main-modal');
  const elTitle = $('#main-modal .modal-title');
  const elBody = $('#main-modal .modal-body');
  const elButton = $('#btn-okay')

  const modalService = function modalService() {
    return {
      loadModal() {
        elButton.hide();
        elTitle.text(txtLoading);
        elBody.text('...');
        elModal.modal({
          keyboard: false,
          show: true
        });
      },
      // .on('hide.bs.modal', (e) => {
      //   e.preventDefault();
      // });
      readyModal(msg) {
        elButton.show();
        elTitle.text('');
        elBody.text(msg);
      }
    };
  };

  angular.module('apox').factory('ModalService', [modalService]);
})();
