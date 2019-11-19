/*
 *
 *
 *       FILL IN EACH UNIT TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]----
 *       (if additional are added, keep them at the very end!)
 */

const chai = require('chai');
const assert = chai.assert;
const slugify = require('underscore.string/slugify');

suite('Unit Tests', function() {
  test('Testing slug creation', function(done) {
    const name = 'The project name';
    const slug = slugify(name);
    const slugSlug = slugify(slug);
    assert.equal(slug, slugSlug);
    done();
  });
});
