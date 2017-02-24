'use strict';

/* eslint-env node, mocha */
/* globals browser, expect, element, by */

const util = require('../test/_util');

const base = 'http://localhost:3000/';
const mainTitle = 'Apocalypse eXpress';
const gameTitle = 'Apocalypse eXpress - Main';
const driverName = 'Toecutter';
const location1 = 'Garnet';
const location2 = 'Amethyst';
const location3 = 'Pearl';

describe('Apocalypse eXpress', () => {
  it('should have a title', () => {
    browser.get(base);
    expect(browser.getTitle()).toEqual(mainTitle);
  });
});

xdescribe('Game', () => {
  xit('should log in a new user and display name and location', () => {
    browser.get(base);
    element(by.id('login-email')).sendKeys(util.users.testUser.email);
    element(by.id('login-password')).sendKeys(util.users.testUser.password);
    element(by.id('login-submit')).click();

    expect(browser.getTitle()).toEqual(gameTitle);
    expect(element(by.id('driver-name')).getText()).toBe(driverName);
    expect(element(by.id('location-name')).getText()).toBe(location1);

    const destinations = element.all(by.repeater('c in game.currentLocation.connections'));
    expect(destinations.count()).toEqual(2); // eslint-disable-line no-magic-numbers
    expect(destinations.get(0).getText()).toContain(location2);
    expect(destinations.get(1).getText()).toContain(location3);
  });
});
