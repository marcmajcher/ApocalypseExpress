'use strict';

/* eslint-env jquery, browser */

(() => {
  const txtLoading = 'Loading';
  const elModal = $('#main-modal');
  const elTitle = $('#main-modal .modal-title');
  const elBody = $('#main-modal .modal-body');
  const elButton = $('#btn-okay');

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
      readyModal(msg, reload = false) {
        elButton.show();
        if (reload) {
          elModal.on('hidden.bs.modal', () => {
            window.location.reload();
          });
        }
        elTitle.text('');
        elBody.text(msg);
      }
    };
  };

  angular.module('apox').factory('ModalService', [modalService]);
})();
