'use strict';

/* eslint-env jquery, browser */
/* exported onLoadAccount, onLoadRegister */

function validatePassword() {
  const pass1 = document.getElementById('rpassword');
  const pass2 = document.getElementById('vpassword');
  const numRegex = /\d+/;
  const sizeRegex = /.{8}/;
  const specialRegex = /[!@#$%^&*()|{}[\]/.,<>]/;

  if (!pass1.value.match(numRegex)) {
    pass1.setCustomValidity('Password must contain a number');
  }
  else if (!pass1.value.match(sizeRegex)) {
    pass1.setCustomValidity('Password must be at least 8 characters long');
  }
  else if (!pass1.value.match(specialRegex)) {
    pass1.setCustomValidity('Password must contain a special character');
  }
  else if (pass1.value !== pass2.value) {
    pass1.setCustomValidity('Passwords do not match');
  }
  else {
    pass1.setCustomValidity('');
    pass2.setCustomValidity('');
  }
}

function validateEmails() {
  const email1 = document.getElementById('remail');
  const email2 = document.getElementById('vemail');

  if (email1.value !== email2.value) {
    email1.setCustomValidity('Email addresses do not match');
  }
  else {
    email1.setCustomValidity('');
  }
}

function onLoadAccount() {
  document.getElementById('rpassword').addEventListener('change', validatePassword, false);
  document.getElementById('vpassword').addEventListener('change', validatePassword, false);
}

function onLoadRegister() {
  document.getElementById('rpassword').addEventListener('change', validatePassword, false);
  document.getElementById('vpassword').addEventListener('change', validatePassword, false);
  document.getElementById('remail').addEventListener('change', validateEmails, false);
  document.getElementById('vemail').addEventListener('change', validateEmails, false);
}
