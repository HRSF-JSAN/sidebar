const fs = require('fs');
const path = require('path');
const { Information } = require('../generatorFunctions/informationModel.js');
const { redisClient } = require('./redisClient');

module.exports.htmlServe = (req, res) => {
  const htmlPath = path.join(__dirname, '../client/dist/index.html');
  fs.readFile(htmlPath, 'UTF-8', (err, html) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(html);
  });
};

module.exports.cssServe = (req, res) => {
  const cssPath = path.join(__dirname, '../client/dist', req.url);
  const cssStream = fs.createReadStream(cssPath, 'UTF-8');
  res.writeHead(200, { 'Content-Type': 'text/css' });
  cssStream.pipe(res);
};

module.exports.bundleServe = (req, res) => {
  const bundlePath = path.join(__dirname, '../client/dist', req.url);
  const bundleStream = fs.createReadStream(bundlePath, 'UTF-8');
  res.writeHead(200, { 'Content-Type': 'text/javascript' });
  bundleStream.pipe(res);
};

module.exports.restaurantServe = (req, res) => {
  const split = req.url.split('/');
  const searchValue = Number(split[2]);
  redisClient.get(searchValue, (err, reply) => {
    if (err) {
      throw err;
    }
    if (reply === null) {
      Information.findOne({ id: searchValue }, (error, restaurant) => {
        if (error) {
          res.statusCode = 500;
          res.end();
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          redisClient.setex(`${searchValue}`, 3600, JSON.stringify(restaurant));
          res.end(JSON.stringify(restaurant));
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'application/javascript' });
      res.end(reply);
    }
  });
};
