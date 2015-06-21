var cache = require('node-cache');

module.exports = function() {

  var c = new cache({ stdTTL: 600 });

  function flush() {
    c.flushAll();
  }

  function store(key, obj) {
    c.set(key, obj);
  }

  function get(key) {
    return c.get(key)[key];
  }

  return {
    flush: flush,
    store: store,
    get: get
  }
}