const fs = require('fs');
const path = require('path');
const { Information } = require('../generatorFunctions/informationModel.js');

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
  res.writeHead(200, { 'Content-Type': 'application/javascript' });
  bundleStream.pipe(res);
};

module.exports.restaurantServe = (req, res) => {
  const split = req.url.split('/');
  const searchValue = split[2];
  Information.findOne({ id: searchValue }, (err, restaurant) => {
    if (err) {
      throw err;
    }
    res.end(JSON.stringify(restaurant));
  });
};
