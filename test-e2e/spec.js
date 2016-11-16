'use strict';

/* eslint-env node, mocha */
/* globals browser, expect */

const util = require('../test/_util');

const base = 'http://localhost:3000/';
const mainTitle = 'Apocalypse eXpress';
const gameTitle = 'Apocalypse eXpress - Main';
const driverName = 'Toecutter';
const locationName = 'Garnet';

describe('Apocalypse eXpress', () => {
  it('should have a title', () => {
    browser.get(base);
    expect(browser.getTitle()).toEqual(mainTitle);
  });
});

describe('Driver', () => {
  it('should log in a new user and display name and location', () => {
    browser.get(base);
    element(by.id('login-email')).sendKeys(util.users.testUser.email);
    element(by.id('login-password')).sendKeys(util.users.testUser.password);
    element(by.id('login-submit')).click();

    expect(browser.getTitle()).toEqual(gameTitle);
    element(by.id('driver-name')).getText().then(function(driver) {
      expect(driver).toBe(driverName);
    });
    expect(element(by.id('location-name')).getText()).toBe(locationName);

  });
});
