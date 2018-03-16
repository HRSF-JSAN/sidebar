const axios = require('axios');
const key = require('../api.js');

module.exports = (state, callback) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address= ${state} &key=${key}`)
    .then((response) => {
      const latLong = response.data.results[0].geometry.location;
      callback(latLong);
    })
    .catch((error) => {
      callback('error');
      throw error;
    });
};

