const { consumeQueue } = require('../consumer');
const logger = require('../../../utils/logger/logger');


// Consumidor da fila 'teste'
consumeQueue('teste', async () => {
  try { 
    logger.info('Teste consumer iniciado');
  } catch (err) {
    logger.error('Erro ao processar teste :', err);
  }
});