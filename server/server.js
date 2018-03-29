require('newrelic');
const http = require('http');
const handler = require('./requestHandler');
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://ec2-54-153-41-230.us-west-1.compute.amazonaws.com/sidebar');

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
