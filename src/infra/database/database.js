const logger = require('../../utils/logger/logger');
const prisma = require("../../../prisma/prisma.js");

// Conexão com o banco de dados usando Prisma
prisma.$connect()
  .then(() => {
    logger.info('✅ Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch((err) => {
    logger.error('Erro ao conectar com o banco de dados:', err);
  });

module.exports = prisma;