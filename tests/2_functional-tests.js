/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *       (if additional are added, keep them at the very end!)
 */

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  suite('POST /api/issues/{project} => object with issue data', function() {
    test('Every field filled in', function(done) {
      const expected = {
        issue_title: 'Every Field Filled',
        issue_text: 'Every field has been filled in',
        created_by: 'chai-testing-suite',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA'
      };
      chai
        .request(server)
        .post('/api/issues/test')
        .send(expected)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          const actual = res.body;

          for (let prop in expected) {
            assert.equal(
              actual[prop],
              expected[prop],
              `The ${prop} is different: actual [${actual[prop]}], expected [${expected[prop]}]`
            );
          }

          assert.isTrue(actual.open, 'The issue is not open');
          assert.isNotNull(actual.projectId, 'The project is not null');
          assert.isNotNull(actual._id, 'The id is null');
          chai
            .request(server)
            .delete('/api/issues/test')
            .send({
              _id: actual._id
            })
            .end(function(delErr, del) {
              assert.equal(del.status, 200);
              assert.equal(del.body, `deleted ${actual._id}`);
              done();
            });
        });
    });

    test('Required fields filled in', function(done) {
      const expected = {
        issue_title: 'Required Fields',
        issue_text: 'The required fields only test',
        created_by: 'chai-testing-suite'
      };

      chai
        .request(server)
        .post('/api/issues/test')
        .send(expected)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          const actual = res.body;
          for (let prop in expected) {
            assert.equal(
              actual[prop],
              expected[prop],
              `The ${prop} is different: actual [${actual[prop]}], expected [${expected[prop]}]`
            );
          }

          assert.isTrue(actual.open);
          assert.isNotNull(actual.projectId, 'The project is not null');
          chai
            .request(server)
            .delete('/api/issues/test')
            .send({
              _id: actual._id
            })
            .end(function(delErr, del) {
              assert.equal(del.status, 200);
              assert.equal(del.body, `deleted ${actual._id}`);
              done();
            });
        });
    });

    test('Missing required fields', function(done) {
      const payload = {
        issue_text: 'We will send a missing title',
        created_by: 'chai-testing-suite'
      };

      chai
        .request(server)
        .post('/api/issues/test')
        .send(payload)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.body, 'not enough data');
          done();
        });
    });
  });

  suite('PUT /api/issues/{project} => text', function() {
    test('No body', function(done) {
      chai
        .request(server)
        .put('/api/issues/test')
        .send({
          _id: '5dc206feacdacd47ef401fe2'
        })
        .end(function(err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.body, 'no updated field sent');
          done();
        });
    });

    test('One field to update', function(done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Update me 1',
          issue_text: 'Lorem ipsum',
          created_by: 'updater'
        })
        .end(function(err, insert) {
          const inserted = insert.body;
          assert.equal(insert.status, 200);
          assert.isNotNull(inserted._id);

          chai
            .request(server)
            .put('/api/issues/test')
            .send({
              _id: inserted._id,
              issue_title: 'Updated now'
            })
            .end(function(updateErr, updatedRes) {
              const actual = updatedRes.body;
              assert.equal(updatedRes.status, 200);
              assert.equal(actual, 'successfully updated');

              chai
                .request(server)
                .delete('/api/issues/test')
                .send({
                  _id: inserted._id
                })
                .end(function(delErr, del) {
                  assert.equal(del.status, 200);
                  assert.equal(del.body, `deleted ${inserted._id}`);
                  done();
                });
            });
        });
    });

    test('Multiple fields to update', function(done) {
      chai
        .request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Update me 1',
          issue_text: 'Lorem ipsum',
          created_by: 'updater'
        })
        .end(function(err, insert) {
          const inserted = insert.body;
          assert.equal(insert.status, 200);
          assert.isNotNull(inserted._id);

          chai
            .request(server)
            .put('/api/issues/test')
            .send({
              _id: inserted._id,
              issue_title: 'Updated now',
              status_text: 'new tag'
            })
            .end(function(updateErr, updatedRes) {
              const actual = updatedRes.body;
              assert.equal(updatedRes.status, 200);
              assert.equal(actual, 'successfully updated');

              chai
                .request(server)
                .delete('/api/issues/test')
                .send({
                  _id: inserted._id
                })
                .end(function(delErr, del) {
                  assert.equal(del.status, 200);
                  assert.equal(del.body, `deleted ${inserted._id}`);
                  done();
                });
            });
        });
    });
  });

  suite(
    'GET /api/issues/{project} => Array of objects with issue data',
    function() {
      test('No filter', function(done) {
        chai
          .request(server)
          .get('/api/issues/apitest')
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.property(res.body[0], 'issue_title');
            assert.property(res.body[0], 'issue_text');
            assert.property(res.body[0], 'created_on');
            assert.property(res.body[0], 'updated_on');
            assert.property(res.body[0], 'created_by');
            assert.property(res.body[0], 'assigned_to');
            assert.property(res.body[0], 'open');
            assert.property(res.body[0], 'status_text');
            assert.property(res.body[0], '_id');
            done();
          });
      });

      test('One filter', function(done) {
        chai
          .request(server)
          .get('/api/issues/apitest')
          .query({
            created_by: 'god'
          })
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body.length, 3);
            assert.equal(res.body[0].created_by, 'god');
            done();
          });
      });

      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai
          .request(server)
          .get('/api/issues/apitest')
          .query({
            created_by: 'morgan',
            issue_title: 'Issue 2'
          })
          .end(function(err, res) {
            if (err) {
              return done(err);
            }
            console.debug('Body:', res.body);
            assert.equal(res.status, 200);
            assert.isArray(res.body);
            assert.equal(res.body.length, 1);
            assert.equal(res.body[0].created_by, 'morgan');
            assert.equal(res.body[0].issue_title, 'Issue 2');
            done();
          });
      });
    }
  );

  suite('DELETE /api/issues/{project} => text', function() {
    test('No _id', function(done) {
      chai
        .request(server)
        .delete('/api/issues/test')
        .send()
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.status, 200);
          assert.equal(res.body, '_id error');
          done();
        });
    });

    test('Valid _id', function(done) {
      const expected = {
        issue_title: 'Every Field Filled',
        issue_text: 'Every field has been filled in',
        created_by: 'chai-testing-suite',
        assigned_to: 'Chai and Mocha',
        status_text: 'In QA'
      };
      chai
        .request(server)
        .post('/api/issues/test')
        .send(expected)
        .end(function(err, res) {
          assert.equal(res.status, 200);
          const actual = res.body;
          assert.isNotNull(actual._id, 'The id is null');
          chai
            .request(server)
            .delete('/api/issues/test')
            .send({
              _id: actual._id
            })
            .end(function(delErr, del) {
              assert.equal(del.status, 200);
              assert.equal(del.body, `deleted ${actual._id}`);
              done();
            });
        });
    });
  });
});
