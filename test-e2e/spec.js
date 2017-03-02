'use strict';

/* eslint-env node, mocha */
/* globals browser, expect, element, by, beforeAll, protractor */

const util = require('../test/_util');

const baseURL = 'http://localhost:3000/';

const testFirstName = 'Greg';
const testLastName = 'Universe';
const testFirstName2 = 'Rose';
const testLastName2 = 'Quartz';
const testEmail = 'greg@itsawash.com';
const testPassword = '!un1v3rs3';
const testPassword2 = 'v3rs3!un1';

const titleMain = 'Apocalypse eXpress';
const titleRegister = 'ApoX: Register';
const titleGame = 'Apocalypse eXpress - Main';
const textRegister = 'Register';
const textLogout = `Logout ${testFirstName}`;
const textLogout2 = `Logout ${testFirstName2}`;
const textUpdateInfo = 'Update Info';
const textChangePassword = 'Change Password';
const location1 = 'Garnet';

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

  it('should be able to update user name', () => {
    element(by.name('firstname')).clear();
    element(by.name('firstname')).sendKeys(testFirstName2);
    element(by.name('lastname')).clear();
    element(by.name('lastname')).sendKeys(testLastName2);
    element(by.buttonText(textUpdateInfo)).click();
    const okButton = element(by.id('btn-ok'));
    browser.wait(protractor.ExpectedConditions.presenceOf(okButton));
    // okButton.click();

    browser.get(baseURL);
    expect(element(by.linkText(textLogout2)).getTagName()).toBe('a');
    element(by.id('game-tab-account')).click();
    expect(element(by.name('firstname')).getAttribute('value')).toBe(testFirstName2);
    expect(element(by.name('lastname')).getAttribute('value')).toBe(testLastName2);
  });

  it('should be able to change the password', () => {
    browser.get(baseURL);
    element(by.id('game-tab-account')).click();
    element(by.name('cpassword')).clear();
    element(by.name('cpassword')).sendKeys(testPassword);
    element(by.name('password')).clear();
    element(by.name('password')).sendKeys(testPassword2);
    element(by.name('vpassword')).clear();
    element(by.name('vpassword')).sendKeys(testPassword2);

    element(by.buttonText(textChangePassword)).click();
    const okButton = element(by.id('btn-ok'));
    browser.wait(protractor.ExpectedConditions.presenceOf(okButton));
    // okButton.click();
  });

  it('should be able to log in with new password', () => {
    browser.get(baseURL);
    element(by.linkText(textLogout2)).click();
    element(by.id('login-email')).sendKeys(testEmail);
    element(by.id('login-password')).sendKeys(testPassword2);
    element(by.id('login-submit')).click();
    expect(browser.getTitle()).toEqual(titleGame);
    expect(element(by.linkText(textLogout2)).getTagName()).toBe('a');
  });
});

describe('News', () => {
  it('should be able to visit the news tab', () => {
    browser.get(baseURL);
    element(by.id('game-tab-news')).click();
    expect(element(by.css('#ui-state-news .location-name')).getText()).toBe(location1);
  });
});

describe('Location', () => {
  it('should be able to visit the location tab', () => {
    browser.get(baseURL);
    element(by.id('game-tab-location')).click();
    expect(element(by.css('#ui-state-location .location-name')).getText()).toBe(location1);
    // get location population
    // get location tech level
    // get location description
  });

  it('should be able to visit sub menus', () => {
    browser.get(baseURL);
    element(by.id('game-tab-location')).click();
    // Rumors
    // Cargo
    // Service Station
    // Equipment
    // Chop Shop
    // Mission Board
  });
});

describe('Driver', () => {
  it('should be able to visit the driver tab', () => {
    browser.get(baseURL);
    element(by.id('game-tab-driver')).click();
    // expect(element(by.css('#ui-state-driver .driver-name')).getText()).toContain(driverName);
    // get driver health
  });
});

describe('Vehicle', () => {
  it('should be able to visit the vehicle tab', () => {
    browser.get(baseURL);
    element(by.id('game-tab-vehicle')).click();
    // expect(element(by.css('#ui-state-vehicle .vehicle-name')).getText()).toBe(vehicleName);
    // get vehicle stats
    // get cargo
  });
});

describe('Travel', () => {
  it('should be able to visit the travel tab', () => {
    browser.get(baseURL);
    element(by.id('game-tab-travel')).click();
    expect(element(by.css('#ui-state-travel .location-name')).getText()).toBe(location1);
    //     const destinations = element.all(by.repeater('c in game.currentLocation.connections'));
    //     expect(destinations.count()).toEqual(2); // eslint-disable-line no-magic-numbers
    //     expect(destinations.get(0).getText()).toContain(location2);
    //     expect(destinations.get(1).getText()).toContain(location3);  });
  });
});

describe('Logout', () => {
  it('should be able to log out user', () => {
    browser.get(baseURL);
    expect(element(by.linkText(textLogout2)).getTagName()).toBe('a');
    element(by.linkText(textLogout2)).click();
    expect(browser.getTitle()).toEqual(titleMain);
  });
});
