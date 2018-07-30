var supertest = require('supertest');

describe('TreeController.list', function() {

  describe('list()', function() {
    it('should return with list', function (done) {
      supertest(sails.hooks.http.app)
        .get('/api/v1/tree')
        .send()
        .expect(200, done);
    });
  });

});
