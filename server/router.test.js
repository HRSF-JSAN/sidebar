const request = require('supertest');
const app = require('./server.js');

describe('Test the root path', () => {
  test('It should response the GET method', () => {
    return request(app).get("/").then(response => {
      expect(response.statusCode).toBe(200);
    });
  });
});

describe('Test the root path', () => {
  test('It should response the first data points title ', () => {
    return request(app).get("/information/101").then(response => {
      expect(response.body.title).toBe('Mario\'s Magnificent Pasta');
    });
  });
});
