const faker = require('faker');
const fs = require('fs');

const types = [
 'American',
 'Italian',
 'French',
 'Brunch',
 'Chinese',
 'Mexican',
 'Pizza',
 'Indian',
 'Bars',
 'SmallBites',
 'Salads',
 'WineBars',
 'Seafood',
 'Burmese',
];

const writeStream = fs.createWriteStream('./testData.csv');

const writeData = (start) => {
  let drain = true;
  let i = start;

  while (i < 10000000 && drain) {
    drain = writeStream.write(
      `${i},${faker.random.word()},${faker.random.objectElement(types)},${faker.random.arrayElement([1, 2, 3, 4, 5])},${faker.random.arrayElement(['$', '$$', '$$$', '$$$$'])}\n`);
    i += 1;
  }

  if (i < 10000000) {
    writeStream.once('drain', () => {
      writeData(i) + '\n';
    });
  }
};

writeData(0);