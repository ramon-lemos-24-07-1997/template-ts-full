const { connectRabbitMQ, getChannel } = require('./rabbit');
const logger = require('../../utils/logger/logger');

// Função para consumir mensagens de uma fila RabbitMQ
const consumeQueue = async (queue, callback) => {
  try {
    let channel = getChannel();
    if (!channel) {
      await connectRabbitMQ();
      channel = getChannel(); 
    }
    await channel.assertQueue(queue, { durable: true });
    const consumerTag = `consumer-${queue}`;
    try {
      await channel.cancel(consumerTag);
    } catch (err) {
      logger.warn(`Erro ao cancelar consumidor anterior na fila ${queue}:`, err);
    }
    channel.consume(
      queue,
      async (msg) => {
        if (!msg) return;
        const data = JSON.parse(msg.content.toString());
        try {
          await callback(data);
          channel.ack(msg);
          logger.info(`Mensagem processada e confirmada na fila ${queue}`);
        } catch (error) {
          logger.error(`Erro ao processar mensagem na fila ${queue}:`, error);
          channel.nack(msg, false, false);
        }
      },
      { consumerTag }
    );
    logger.info(`✅ Consumidor registrado na fila ${queue}`);
  } catch (error) {
    logger.error(`❌ Erro ao consumir fila ${queue}:`, error);
    throw error;
  }
};

module.exports = { consumeQueue };
