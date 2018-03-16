const { randomIndex, addData, seededRestaurants } = require('./generatorFunctions/seed.js');
const restaurants = require('./data/seedData.js');

test('randomIndex when passed a string should return undefined', () => {
  expect(randomIndex('hello', Math.random())).toBe(NaN);
});

test('randomIndex when passed a length should return a random number within the range of the length', () => {
  const number = 9;
  expect(randomIndex(number, 0.99)).toBe(number - 1);
  expect(randomIndex(number, 0)).toBe(0);
  expect(randomIndex(number, -1)).toBe(null);
  expect(randomIndex(number, 1)).toBe(null);
});

test('addData should create the dataArray\'s length of restaurants ', (done) => {
  function callback(data) {
    expect(data).toBe(100);
    done();
  }
  let dataArrayLength;
  addData(restaurants, () => {
    dataArrayLength = seededRestaurants.length;
    callback(dataArrayLength);
  });
});

test('addData should return undefined for any non array inputs ', (done) => {
  function callback(data) {
    expect(data).toBe(undefined);
    done();
  }
  addData('restaurants', (seededRestaurants) => {
    callback(seededRestaurants);
  });
});

