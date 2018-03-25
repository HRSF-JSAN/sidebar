const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.log('error', err);
});

redisClient.on('connect', () => {
  console.log('connected to redis');
});

exports.redisClient = redisClient;
