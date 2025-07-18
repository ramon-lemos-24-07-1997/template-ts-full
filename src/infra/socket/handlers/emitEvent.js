const logger = require("../../../utils/logger/logger");
let io;

const emitEvent = async (event, data, room) => {
  try {
    if (!io) {
      const { getSocketServer } = await import("../socket.js");
      io = getSocketServer();
    }
    if (room) {
      io.to(String(room)).emit(event, data);
    } else {
      io.emit(event, data);
    }
  } catch (error) {
    logger.error(`Erro ao emitir evento '${event}':`, error);
  }
};

const emitEventForUsers = async (event, data, userIds) => {
  try {
    if (!io) {
      const { getSocketServer } = await import("../socket.js");
      io = getSocketServer();
    }
    userIds.forEach(userId => {
      io.to(`user_${userId}`).emit(event, data);
    });
  } catch (error) {
    logger.error(`Erro ao emitir evento '${event}' para usuários:`, error);
  }
};

module.exports = { emitEvent, emitEventForUsers };

