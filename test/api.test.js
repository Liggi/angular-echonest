var echonest = require('../modules/echonest')(),
    assert = require('assert');

describe('API', function() {
  describe('response', function() {
    it('query should not error', function(done) {
      echonest.query(
        { artist_location: "London" }, 
        [], 
        function(val) {
          done();
        }
      );
    });
    it('should return an array', function(done) {
      echonest.query(
        { artist_location: "London" }, 
        [], 
        function(val) {
          assert(Array.isArray(val), "did not return an array");
          done();
        }
      )      
    });
    it('objects in array response should have "name" property', function(done) {
      echonest.query(
        { artist_location: "London" }, 
        [], 
        function(val) {
          assert(val[0].name, "first object did not have a 'name' property");
          done();
        }
      )  
    });
    it('should return objects with properties specified in bucket', function(done) {
      echonest.query(
        { artist_location: "London" }, 
        ['familiarity', 'hotttnesss'], 
        function(val) {
          assert(val[0].familiarity && val[0].hotttnesss, "returned object did not properties specified in bucket");
          done();
        }
      )  
    });
  });
});