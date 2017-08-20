const assert = require('assert');
const User = require('../src/users')

describe('Updating a User', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', postCount: 0 });
    joe.save()
      .then(() => done());
  })

  const assertName = (operation, done) => {
    operation
      .then(() => User.find({})) // empty obj returns all users
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done)
  });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Alex'}), done)
  });

  // .update({properties to select target}, {properties to be changed})
  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Alex' }),
      done
    );
  });

  it('A user can have their postcount incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        assert(user.postCount === 1);
        done();
      });
  });
});
