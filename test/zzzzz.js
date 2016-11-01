'use strict';

const util = require('./_util');

describe('Close DB', () => {
  it('should destroy the knexxion', (done) => {
    util.knex.destroy();
    done();
  });
});
