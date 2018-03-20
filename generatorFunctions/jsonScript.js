const faker = require('faker');
const fs = require('fs');
const randomData = require('../data/randomData.js');

const types = [
  'American', 'Italian', 'French', 'Brunch', 'Chinese',
  'Mexican', 'Pizza', 'Indian', 'Bars', 'SmallBites',
  'Salads', 'WineBars', 'Seafood', 'Burmese',
];

const writeStream = fs.createWriteStream('./seedData.js');
const writeData = (start) => {
  let drain = true;
  let i = start;

  while (i < 10000000 && drain) {
    drain = writeStream.write(`{id: ${i}, title: "${faker.random.word()}", foodType: "${faker.random.objectElement(types)}", rating: ${faker.random.arrayElement([1, 2, 3, 4, 5])}, price: "${faker.random.arrayElement(['$', '$$', '$$$', '$$$$'])}", possibleHours: { sunday: [10, 6], restOfDays: [10, 10], saturday: [10, 11]}, minimumDelivery: "${faker.random.arrayElement(randomData.mins)}", text: "${faker.random.arrayElement(randomData.descriptions)}", location: { lat: 39.7701723, lng: -93.6739507 }}\n`);
    i += 1;
  }

  if (i < 10000000) {
    writeStream.once('drain', () => {
      writeData(i) + '\n';
    });
  }
};

writeData(0);

