require('newrelic');
const http = require('http');
const handler = require('./requestHandler');

http.createServer((req, res) => {
  req.on('error', (err) => {
    if (err) {
      throw err;
    }
    res.statusCode = 400;
    res.end();
  });
  res.on('error', (err) => {
    if (err) {
      throw err;
    }
  });
  if (req.url === '/') {
    handler.htmlServe(req, res);
  } else if (req.url.match('.css')) {
    handler.cssServe(req, res);
  } else if (req.url.match(/\/(\w+-)?bundle.js/)) {
    handler.bundleServe(req, res);
  } else if (req.url.split('/')[1] === 'information') {
    handler.restaurantServe(req, res);
  } else {
    res.StatusCode = 404;
    res.end();
  }
}).listen(3400);
