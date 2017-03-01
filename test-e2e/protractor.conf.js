'use strict';

/* eslint-env node */

exports.config = {
  framework: 'jasmine',
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: '../node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.1.0.jar',
  specs: ['spec.js']
};
