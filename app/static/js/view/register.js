function validatePassword(){var e=document.getElementById("rpassword"),t=document.getElementById("vpassword"),a=/\d+/,d=/.{8}/,s=/[!@#$%\^&*()|\{}\[\]\/\.,<>]/;e.value.match(a)?e.value.match(d)?e.value.match(s)?e.value!==t.value?e.setCustomValidity("Passwords do not match"):(e.setCustomValidity(""),t.setCustomValidity("")):e.setCustomValidity("Password must contain a special character"):e.setCustomValidity("Password must be at least 8 characters long"):e.setCustomValidity("Password must contain a number")}function validateEmails(){var e=document.getElementById("remail"),t=document.getElementById("vemail");e.value!==t.value?e.setCustomValidity("Email addresses do not match"):e.setCustomValidity("")}window.onload=function(){document.getElementById("rpassword").addEventListener("change",validatePassword,!1),document.getElementById("vpassword").addEventListener("change",validatePassword,!1),document.getElementById("remail").addEventListener("change",validateEmails,!1),document.getElementById("vemail").addEventListener("change",validateEmails,!1)};