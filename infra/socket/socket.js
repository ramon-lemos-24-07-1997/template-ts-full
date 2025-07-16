const { Server: SocketIO } = require("socket.io");
const { authSocket } = require("./authSocket");
const { handleConnection, handleDisconnection, } = require("./handlers/connection");
const logger = require("../../utils/logger/logger");

let io;

const startSocketServer = (httpServer) => {
  io = new SocketIO(httpServer, {
    cors: { origin: "*" },
    pingTimeout: 180000,
    pingInterval: 60000,
  });

  io.use(authSocket);

  io.on("connection", (socket) => {
    handleConnection(socket);

    socket.on("disconnect", () => {
      handleDisconnection(socket);
    });
  });

  logger.info("✅ Socket.IO iniciado com sucesso!");
  return io;
};

const getSocketServer = () => {
  if (!io) throw new Error("Socket.IO não foi inicializado.");
  return io;
};

module.exports = {
  startSocketServer,
  getSocketServer,
};
