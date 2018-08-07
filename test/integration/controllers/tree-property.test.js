var supertest = require('supertest');
var async = require('async');
var utils = require('./utils');

describe('TreePropertyController', function() {

  describe('POST /treeProperty', function() {
    it('should create tree property entity', function (done) {
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
            .post('/api/v1/treeProperty')
            .send({tree: createdTree.id, key: 'key', value: 'value'})
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .get('/api/v1/treeProperty?tree=' + createdTree.id + '&populate=false')
            .expect(function (res) {
              var list = res.body;

              utils.assert('TreeProperty list', list.length, 1);
              utils.assert('TreeProperty key', list[0].key, 'key');
              utils.assert('TreeProperty value', list[0].value, 'value');
              utils.assert('TreeProperty tree', list[0].tree, createdTree.id);
            })
            .expect(200, cb);
        }
      ], done);
    });
  });

  describe('PUT /treeProperty', function() {
    it('should update tree property entity', function (done) {
      var createdTree = {};
      var createdTreeProperty = {};

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
            .post('/api/v1/treeProperty')
            .send({tree: createdTree.id, key: 'key', value: 'value'})
            .expect(function (res) {
              createdTreeProperty.id = res.body.id;
            })
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .put('/api/v1/treeProperty/' + createdTreeProperty.id)
            .send({key: 'updated_key', value: 'updated_value'})
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .get('/api/v1/treeProperty/' + createdTreeProperty.id)
            .expect(function (res) {
              var data = res.body;

              utils.assert('TreeProperty key', data.key, 'updated_key');
              utils.assert('TreeProperty value', data.value, 'updated_value');
            })
            .expect(200, cb);
        }
      ], done);
    });
  });

  describe('DELETE /treeProperty', function() {
    it('should delete tree property entity', function (done) {
      var createdTree = {};
      var createdTreeProperty = {};

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
            .post('/api/v1/treeProperty')
            .send({tree: createdTree.id, key: 'key', value: 'value'})
            .expect(function (res) {
              createdTreeProperty.id = res.body.id;
            })
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .delete('/api/v1/treeProperty/' + createdTreeProperty.id)
            .expect(200, cb);
        },
        function (cb) {
          supertest(sails.hooks.http.app)
            .get('/api/v1/treeProperty?tree=' + createdTree.id + '&populate=false')
            .expect(function (res) {
              var list = res.body;

              utils.assert('TreeProperty list', list.length, 0);
            })
            .expect(200, cb);
        }
      ], done);
    });
  });

});
