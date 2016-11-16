'use strict';

/* eslint-env node, mocha */
/* globals browser, expect */

describe('Apocalypse eXpress', () => {
  it('should have a title', () => {
    browser.get('http://localhost:3000/');
    expect(browser.getTitle()).toEqual('Apocalypse eXpress');
  });
});
