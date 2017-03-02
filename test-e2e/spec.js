'use strict';

/* eslint-env node, mocha */
/* globals browser, expect, element, by, beforeAll */

const util = require('../test/_util');

const baseURL = 'http://localhost:3000/';

const testFirstName = 'Greg';
const testLastName = 'Universe';
const testEmail = 'greg@itsawash.com';
const testPassword = '!un1v3rs3';

const titleMain = 'Apocalypse eXpress';
const titleRegister = 'ApoX: Register';
const titleGame = 'Apocalypse eXpress - Main';
const textRegister = 'Register';
const textLogout = `Logout ${testFirstName}`;

describe('Apocalypse eXpress', () => {
  it('should have a title on the home page', () => {
    browser.manage().window().setSize(1400, 900);
    browser.manage().window().maximize();
    browser.get(baseURL);
    expect(browser.getTitle()).toEqual(titleMain);
  });
});

describe('Register and Login', () => {
  beforeAll(util.rollback);

  it('should be able to register a new user', () => {
    browser.get(baseURL);
    expect(element(by.linkText(textRegister)).getTagName()).toBe('a');
    element(by.linkText(textRegister)).click();

    expect(browser.getTitle()).toEqual(titleRegister);
    element(by.id('register-firstname')).sendKeys(testFirstName);
    element(by.id('register-lastname')).sendKeys(testLastName);
    element(by.id('register-email')).sendKeys(testEmail);
    element(by.id('register-vemail')).sendKeys(testEmail);
    element(by.id('register-password')).sendKeys(testPassword);
    element(by.id('register-vpassword')).sendKeys(testPassword);
    element(by.buttonText(textRegister)).click();
  });

  it('should be able to log in a new user', () => {
    element(by.id('login-email')).sendKeys(testEmail);
    element(by.id('login-password')).sendKeys(testPassword);
    element(by.id('login-submit')).click();
    expect(browser.getTitle()).toEqual(titleGame);
  });
});

describe('Basic Game Functionality', () => {
  it('should have standard items for logged in user', () => {
    browser.get(baseURL);
    expect(element(by.linkText(textLogout)).getTagName()).toBe('a');

    element(by.id('game-tab-account')).click();
    expect(element(by.cssContainingText('.user-email', testEmail)).getText()).toContain(testEmail);
    expect(element(by.name('firstname')).getAttribute('value')).toBe(testFirstName);
    expect(element(by.name('lastname')).getAttribute('value')).toBe(testLastName);
  });
});

describe('Logout', () => {
  it('should be able to log out user', () => {
    browser.get(baseURL);
    expect(element(by.linkText(textLogout)).getTagName()).toBe('a');
    element(by.linkText(textLogout)).click();
    expect(browser.getTitle()).toEqual(titleMain);
  });

  xit('should be able to update user name', () => {

  });

  xit('should be able to change the password', () => {

  });

  xit('should be able to log in with new password', () => {

  });
});

//     expect(element(by.id('driver-name')).getText()).toBe(driverName);
//     expect(element(by.id('location-name')).getText()).toBe(location1);
//
//     const destinations = element.all(by.repeater('c in game.currentLocation.connections'));
//     expect(destinations.count()).toEqual(2); // eslint-disable-line no-magic-numbers
//     expect(destinations.get(0).getText()).toContain(location2);
//     expect(destinations.get(1).getText()).toContain(location3);
