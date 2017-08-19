const assert = require('assert');
const User = require('../src/users')

describe('Create Records', () => {
  it('saves a user', (done) => {
    const joe = new User({ name: 'Joe' })

    joe.save()
      .then(() => {
        // Check if joe has been saved successfully
        assert(!joe.isNew);
        done();
      })
  });
});
