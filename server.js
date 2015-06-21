var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  http = require('http'),
  cache = require('./modules/cache')(),
  echonest = require('./modules/echonest')();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

function writeJSONResponse(res, obj) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(obj));
  res.end();
}

app.post('/api/cache/clear', function(req, res) {
  cache.flush();

  writeJSONResponse(res, { status: "OK" });
});

app.get('/api/location/:location', function(req, res) {

  var artists = cache.get('artists') || [];

  if(!artists.length) {
    artists = echonest.query(
      { 'artist_location': req.params.location }, 
      ['artist_location', 'years_active', 'familiarity', 'hotttnesss'],
      function(val) {
        writeJSONResponse(res, { status: "OK", artists: val });
      }
    );

    cache.store('artists', artists);
  }
  else {
    writeJSONResponse(res, { status: "OK", artists: artists });
  }

});

app.get('*', function(req, res) {
  res.redirect('/#' + req.originalUrl);
});

app.listen(3000);