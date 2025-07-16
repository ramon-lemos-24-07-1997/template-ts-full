const { startListeners } = require('./listeners/startListeners');

const handleConnection =  async (socket) => {
  const user = socket.data.user;
  if (!user) {
    return socket.disconnect();
  }
  startListeners(socket); 
  // Exemplo de como adicionar o usuário a um canal específico
  socket.join(String(user.org));
  // Exemplo de como adicionar o usuário a um canal específico, para enviar mensagens para usuários específicos no lugar para organização inteira
  socket.join(`user_${user.id}`);
};

const handleDisconnection = (socket) => {
  console.log(`Usuário desconectado: ${socket.id}`);
};

module.exports = { 
  handleConnection, 
  handleDisconnection
};