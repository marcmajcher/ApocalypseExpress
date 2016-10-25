window.onload = function () {
  document.getElementById('rpassword').addEventListener('change', validatePassword, false);
  document.getElementById('vpassword').addEventListener('change', validatePassword, false);
}

function validatePassword() {
  var pass1 = document.getElementById('rpassword');
  var pass2 = document.getElementById('vpassword');
  var numRegex = /\d+/;
  var sizeRegex = /.{8}/;
  var specialRegex = /[!@#$%\^&*()|\{}\[\]\/\.,<>]/;

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
