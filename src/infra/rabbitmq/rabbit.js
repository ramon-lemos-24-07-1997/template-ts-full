const amqp = require('amqplib');
const logger = require('../../utils/logger/logger');

let channel = null;
// Função para conectar ao RabbitMQ
// Esta função deve ser chamada antes de usar getChannel()
const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URL);
    channel = await connection.createChannel();
  } catch (error) {
    throw error;
  }
};

connectRabbitMQ()
  .then(() => {
    logger.info('Conexão com RabbitMQ estabelecida com sucesso!');
  })
  .catch((error) => {
    logger.error('Erro ao estabelecer conexão com RabbitMQ:', error);
  });


module.exports = { connectRabbitMQ, getChannel: () => channel };