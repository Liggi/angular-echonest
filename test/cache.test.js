var cache = require('../modules/cache')(),
    assert = require('assert');

describe('Cache', function() {
  describe('value store', function() {
    it('storing value in cache should not error', function(done) {
      cache.flush();
      cache.store('test', { test: "test"});
      done();
    });
    it('stored value should be retrievable', function(done) {
      cache.flush();
      cache.store('test', { test: "test"});
      assert.deepEqual(cache.get('test'), { test: "test" });
      done();
    });
    it('flushing cache should actually flush cache', function(done) {
      cache.store('test', { test: "test"});
      cache.flush();
      assert.notDeepEqual(cache.get('test'), { test: "test" });
      done();
    });
  });
});