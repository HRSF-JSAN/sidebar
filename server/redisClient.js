const redis = require('redis');

let REDIS_PORT;

if (process.env.REDIS_HOST) {
  REDIS_PORT = process.env.REDIS_HOST;
} else {
  REDIS_PORT = 6379;
}

const redisClient = redis.createClient('redis://ec2-54-183-226-229.us-west-1.compute.amazonaws.com:6379');

redisClient.on('error', (err) => {
  console.log('error', err);
});

redisClient.on('connect', () => {
  console.log('connected to redis');
});

exports.redisClient = redisClient;
