var http = require('http');

module.exports = function() {

  var api_key = "FILDTEOIK2HBORODV";
  var format = "json";
  var url = "http://developer.echonest.com/api/v4/artist/search?api_key=" + api_key + "&format=" + format + "&results=3";

  function query(search, bucket, callback) {
    var query_url = url + process_query_items(search) + process_bucket_items(bucket);

    http.get(query_url, function(res) {
      res.on('data', function (data) {
        var json_response = JSON.parse(data.toString()).response;

        if(json_response.status.code == 3) {
          callback([]);
          console.log('API responded with "Too many requests" error');
        }
        else {
          callback(json_response.artists);
        }        
      });
    }).on('error', function(e) {
      console.log('Failed to retrieve data.')
    });
  }

  function process_bucket_items(arr) {
    var query_string = "";

    arr.forEach(function(el, idx, arr) {
      query_string += "&bucket=" + el;
    });

    return query_string;
  }

  function process_query_items(obj) {
    var query_string = "";

    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        query_string += construct_query_item(key, obj[key]);
      }
    }

    return query_string;
  }

  function construct_query_item(key, val) {
    return "&" + key + "=" + val;
  }

  return {
    query: query
  }
}