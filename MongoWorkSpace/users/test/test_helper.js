const mongoose = require('mongoose');

// reference to use es6 primse library in mongoose
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => done())
    .on('error', (error) => {
      console.warn('Warning', error);
    });
})


beforeEach((done) => {
  mongoose.connection.collections.users.drop((d) => {
    // Ready to run the next test!
    done();
  });
})
