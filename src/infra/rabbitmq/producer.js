const { connectRabbitMQ, getChannel } = require('./rabbit');
const logger = require('../../utils/logger/logger');

// Função para publicar mensagens em uma fila RabbitMQ
const publishToQueue = async (queue, message) => {
  try {
    let channel = getChannel();
    if (!channel) {
      await connectRabbitMQ();
      channel = getChannel(); 
    }

    await channel.assertQueue(queue, { durable: true });

    const success = channel.sendToQueue(
      queue,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    );

    if (success) {
      logger.info(`Mensagem publicada na fila ${queue}:`);
    } else {
      logger.warn(`Falha ao enviar mensagem para a fila ${queue}`);
    }
  } catch (error) {
    logger.error(`Erro ao publicar mensagem na fila ${queue}:`, error);
    throw error;
  }
};

module.exports = { publishToQueue };
