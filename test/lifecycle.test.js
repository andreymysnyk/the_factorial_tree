var sails = require('sails');
var async = require('async');

// Before running any tests...
before(function(done) {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.
  this.timeout(5000);

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: { grunt: false },
    log: { level: 'warn' },
    datastores: {
      default: {
        adapter: 'sails-disk',
        inMemoryOnly: true
      }
    },
    models: {
      dontUseObjectIds: true,
      attributes: {
        id: { type: 'number', autoIncrement: true, columnName: 'id' }
      }
    }
  }, function(err) {
    if (err) { return done(err); }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    return done();
  });
});

beforeEach(function(done) {
  // Clean database between each test
  async.series([
    function (cb) {
      Tree.destroy({}).exec(cb);
    },
    function (cb) {
      TreeProperty.destroy({}).exec(cb);
    }
  ], done);
});

// After all tests have finished...
after(function(done) {
  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);
});
