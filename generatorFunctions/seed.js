// data
const restaurants = require('../data/seedData.js');
const { descriptions, possibleHours, mins } = require('../data/randomData.js');
const addresses = require('../data/addresses.js');
// generators
const coordGen = require('./coordinateFinder.js');

const { Information, end } = require('./informationModel.js');

const seededRestaurants = [];

const randomIndex = (length, randomNumber) => {
  if (randomNumber >= 0 && randomNumber < 1) {
    const index = Math.floor(randomNumber * Math.floor(length));
    return index;
  }
  return null;
};

const addData = (restaurantsArray, callback) => {
  if (Array.isArray(restaurantsArray)) {
    restaurantsArray.forEach((item) => {
      const restaurant = item;
      const hours = possibleHours[randomIndex(descriptions.length, Math.random())];
      const descriptionData = descriptions[randomIndex(descriptions.length, Math.random())];
      const deliveryMin = mins[randomIndex(descriptions.length, Math.random())];
      restaurant.minimumDelivery = deliveryMin;
      restaurant.hours = hours;
      restaurant.text = descriptionData;

      const newInfo = new Information({
        id: item.id,
        title: item.title,
        location: item.location,
        minimumDelivery: item.minimumDelivery,
        price: item.price,
        text: item.text,
        hours: item.hours,
      });
      seededRestaurants.push(newInfo);
    });
    callback(seededRestaurants, end);
  }
  if (!Array.isArray(restaurantsArray)) {
    callback(undefined);
  }
};

const save = (seededRestaurantsArray, endFunction) => {
  let saved;
  if (Array.isArray(seededRestaurantsArray)) {
    Information.create(seededRestaurantsArray, () => {
      endFunction(connections => connections);
      saved = true;
      return saved;
    });
  }
};

const searchCoordinates = (restaurantsArray, addressesArray, fn) => {
  restaurantsArray.forEach((item, increment) => {
    const restaurant = item;
    let incrementAddress = increment;
    coordGen(addressesArray[incrementAddress], (latLong) => {
      if (latLong === 'error') {
        restaurant.location = { lat: 39.7701723, lng: -93.6739507 };
      } else {
        restaurant.location = latLong;
      }
      if (incrementAddress === restaurantsArray.length - 1) {
        fn(restaurantsArray, save);
        return;
      }
      incrementAddress += 1;
    });
  });
};

searchCoordinates(restaurants, addresses, addData);

exports.randomIndex = randomIndex;
exports.addData = addData;
exports.searchCoordinates = searchCoordinates;
exports.save = save;
exports.seededRestaurants = seededRestaurants;
