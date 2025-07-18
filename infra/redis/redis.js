const redis = require('redis');
const logger = require('../../utils/logger/logger');

const redisInstance = redis.createClient({
  url: process.env.REDIS_URL || `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisInstance.connect().then(() => {
        logger.info('Redis client connected successfully');
    }).catch((error) => {
        logger.error('Error connecting to Redis:', error);
    });


module.exports = redisInstance;

