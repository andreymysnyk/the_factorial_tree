var supertest = require('supertest');
var async = require('async');
var utils = require('./utils');

describe('TreeController', function() {

  describe('POST /tree', function() {
    it('should create tree entity', function (done) {
      async.series([
        function (cb) {
          supertest(sails.hooks.http.app)
            .post('/api/v1/tree')
            .send({
              name: 'tree name'
            })
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .get('/api/v1/tree')
            .expect(function (res) {
              var list = res.body;

              utils.assert('List size', list.length, 1);
              utils.assert('Tree name', list[0].name, 'tree name');
            })
            .expect(200, cb);
        }
      ], done);
    });
  });

  describe('PUT /tree', function() {
    it('should update tree entity', function (done) {
      var createdTree = {};

      async.series([
        function (cb) {
          supertest(sails.hooks.http.app)
            .post('/api/v1/tree')
            .send({
              name: 'tree name'
            })
            .expect(function (res) {
              var data = res.body;
              createdTree.id = data.id;
            })
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .put('/api/v1/tree/' + createdTree.id)
            .send({name: 'updated tree name'})
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .get('/api/v1/tree')
            .expect(function (res) {
              var list = res.body;

              utils.assert('List size', list.length, 1);
              utils.assert('Updated tree name', list[0].name, 'updated tree name');
            })
            .expect(200, cb);
        }
      ], done);
    });
  });

  describe('DELETE /tree', function() {
    it('should delete tree entity', function (done) {
      var createdTree = {};

      async.series([
        function (cb) {
          supertest(sails.hooks.http.app)
            .post('/api/v1/tree')
            .send({
              name: 'tree name'
            })
            .expect(function (res) {
              var data = res.body;
              createdTree.id = data.id;
            })
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .delete('/api/v1/tree/' + createdTree.id)
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .get('/api/v1/tree')
            .expect(function (res) {
              var list = res.body;

              utils.assert('List size', list.length, 0);
            })
            .expect(200, cb);
        }
      ], done);
    });
  });

});
