const { RateLimiterMemory } = require('rate-limiter-flexible');
const logger = require('../utils/logger/logger');

const rateLimiter = new RateLimiterMemory({
  points: 2, // 2 requisições
  duration: 1, // Por segundo
  blockDuration: 5, // Bloqueio por 15 segundos após o limite
});

const rateLimiterMiddleware = async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (rejRes) {
    logger.warn("Muitas requisições, tente novamente em breve");
    res.status(429).send();
  }
};

module.exports = rateLimiterMiddleware;